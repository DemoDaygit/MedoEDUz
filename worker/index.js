/**
 * ============================================================
 *  MedoEDUz Sync Worker — синхронизация прогресса по Telegram ID
 * ============================================================
 *
 *  Cloudflare Worker + KV. Хранит прогресс ученика под ключом
 *  его Telegram user_id и синхронизирует между устройствами.
 *
 *  Безопасность: КАЖДЫЙ запрос обязан прислать заголовок
 *  X-Telegram-Init-Data с подписанной строкой initData.
 *  Воркер проверяет HMAC-SHA256 подпись секретным bot-токеном.
 *  Подделать user_id невозможно без токена, который лежит только
 *  в секретах воркера и никогда не покидает сервер.
 *
 *  Развёртывание: см. worker/README.md.
 *  Требуется: KV namespace PROGRESS, secret BOT_TOKEN.
 * ============================================================
 */

const CORS = {
    'Access-Control-Allow-Origin': 'https://demodaygit.github.io',
    'Access-Control-Allow-Methods': 'GET, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Telegram-Init-Data',
    'Access-Control-Max-Age': '86400',
};

function json(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json', ...CORS },
    });
}

// ---------- Валидация Telegram initData (HMAC-SHA256) ----------
async function hmacSha256(keyBytes, msg) {
    const key = await crypto.subtle.importKey(
        'raw', keyBytes, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(msg));
    return new Uint8Array(sig);
}

function toHex(bytes) {
    return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Проверяет подпись initData и возвращает user_id при успехе.
 * Алгоритм — стандартный для Telegram Web Apps.
 */
async function verifyInitData(initData, botToken) {
    if (!initData) return null;
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    if (!hash) return null;
    params.delete('hash');

    // data-check-string: пары key=value, отсортированные по ключу, через \n
    const pairs = [...params.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    const dcs = pairs.map(([k, v]) => `${k}=${v}`).join('\n');

    // secret_key = HMAC_SHA256("WebAppData", bot_token)
    const secret = await hmacSha256(new TextEncoder().encode('WebAppData'), botToken);
    const computed = toHex(await hmacSha256(secret, dcs));
    if (computed !== hash) return null;

    // auth_date не старше 24 часов
    const authDate = Number(params.get('auth_date') || 0);
    if (!authDate || Date.now() / 1000 - authDate > 86400) return null;

    try {
        const user = JSON.parse(params.get('user') || 'null');
        return user && user.id ? String(user.id) : null;
    } catch (e) {
        return null;
    }
}

// ---------- Слияние состояний (last-write-wins по узлу) ----------
function mergeProgress(server, client) {
    server = server || {};
    client = client || {};
    const out = { ...server, ...client };

    // Освоенные узлы — объединение (освоенное не «разосваивается»)
    out.skills = [...new Set([...(server.skills || []), ...(client.skills || [])])];
    out.achievements = [...new Set([...(server.achievements || []), ...(client.achievements || [])])];
    out.syn = [...new Set([...(server.syn || []), ...(client.syn || [])])];

    // Числовые максимумы
    out.xp = Math.max(server.xp || 0, client.xp || 0);
    out.level = Math.max(server.level || 1, client.level || 1);

    // Проверки и квесты — по узлам, берём более свежую попытку
    out.checks = { ...(server.checks || {}), ...(client.checks || {}) };
    out.quests = { ...(server.quests || {}), ...(client.quests || {}) };
    for (const id in server.quests || {}) {
        const s = (server.quests[id] || []).length;
        const c = (out.quests[id] || []).length;
        if (s > c) out.quests[id] = server.quests[id];
    }

    out.syncedAt = new Date().toISOString();
    return out;
}

export default {
    async fetch(request, env) {
        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: CORS });
        }

        const url = new URL(request.url);
        const initData = request.headers.get('X-Telegram-Init-Data');
        const userId = await verifyInitData(initData, env.BOT_TOKEN);

        if (!userId) {
            return json({ error: 'Unauthorized: bad or missing initData' }, 401);
        }

        const key = `progress:${userId}`;

        // GET — вернуть прогресс
        if (request.method === 'GET' && url.pathname === '/v1/progress') {
            const stored = await env.PROGRESS.get(key, 'json');
            return json({ progress: stored || null });
        }

        // PUT — заменить целиком (клиент новее)
        if (request.method === 'PUT' && url.pathname === '/v1/progress') {
            const body = await request.json().catch(() => null);
            if (!body) return json({ error: 'Bad body' }, 400);
            body.syncedAt = new Date().toISOString();
            await env.PROGRESS.put(key, JSON.stringify(body));
            return json({ ok: true, syncedAt: body.syncedAt });
        }

        // PATCH — слить с серверным
        if (request.method === 'PATCH' && url.pathname === '/v1/progress') {
            const body = await request.json().catch(() => null);
            if (!body) return json({ error: 'Bad body' }, 400);
            const server = await env.PROGRESS.get(key, 'json');
            const merged = mergeProgress(server, body);
            await env.PROGRESS.put(key, JSON.stringify(merged));
            return json({ ok: true, progress: merged });
        }

        // DELETE — удалить свой прогресс (право на забвение)
        if (request.method === 'DELETE' && url.pathname === '/v1/progress') {
            await env.PROGRESS.delete(key);
            return json({ ok: true });
        }

        return json({ error: 'Not found' }, 404);
    },
};
