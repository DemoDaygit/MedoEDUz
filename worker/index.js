/**
 * ============================================================
 *  MedoEDUz Platform Worker
 * ============================================================
 *
 *  Cloudflare Worker + KV. Делает четыре вещи:
 *   1. Удостоверяет личность через Telegram (Mini App или бот).
 *   2. Хранит и сливает прогресс учеников.
 *   3. Хранит ОВЕРЛЕЙ модели курса и правил геймификации —
 *      то, чем администратор меняет курс без деплоя.
 *   4. Отдаёт администратору список учеников и журнал изменений.
 *
 *  Почему устроено именно так — docs/ARCHITECTURE-TRIZ.md.
 *  Коротко о главном:
 *
 *  - Оверлей НЕ УМЕЕТ УДАЛЯТЬ. Только upsert и hide. Прогресс
 *    ученика ссылается на узлы по id; удаление узла обнулило бы
 *    освоенное. Скрытый узел исчезает из интерфейса, но id жив.
 *  - Bot-токен живёт ТОЛЬКО здесь, в секретах воркера. Клиент его
 *    не видит никогда.
 *  - На сайте (вне Telegram) initData недоступен, поэтому вход
 *    идёт по одноразовому коду из бота, который обменивается на
 *    сессионный токен.
 *
 *  Требуется: KV namespace DATA, secret BOT_TOKEN,
 *  vars ADMIN_IDS, ALLOWED_ORIGINS, secret WEBHOOK_SECRET.
 *  Развёртывание: worker/README.md.
 * ============================================================
 */

const DEFAULT_ORIGINS = 'https://demodaygit.github.io';

const SESSION_TTL = 60 * 60 * 24 * 30;   // 30 дней
const CODE_TTL = 60 * 10;                // одноразовый код входа — 10 минут
const AUDIT_CAP = 500;                   // кольцевой журнал изменений

// ------------------------------------------------------------
//  Ответы и CORS
// ------------------------------------------------------------
function corsHeaders(request, env) {
    const allowed = String(env.ALLOWED_ORIGINS || DEFAULT_ORIGINS)
        .split(',').map((s) => s.trim()).filter(Boolean);
    const origin = request.headers.get('Origin') || '';
    // Совпадение по точному origin: '*' здесь нельзя — запросы носят
    // сессионный токен, и открытый CORS означал бы кражу сессии с
    // любого стороннего сайта.
    const allow = allowed.indexOf(origin) !== -1 ? origin : allowed[0];
    return {
        'Access-Control-Allow-Origin': allow,
        'Vary': 'Origin',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Telegram-Init-Data',
        'Access-Control-Max-Age': '86400',
    };
}

function json(data, status, request, env) {
    return new Response(JSON.stringify(data), {
        status: status || 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders(request, env) },
    });
}

// ------------------------------------------------------------
//  Криптография: подпись Telegram и токены сессий
// ------------------------------------------------------------
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
 * Проверяет подпись initData Telegram Mini App.
 * Возвращает объект пользователя или null.
 */
async function verifyInitData(initData, botToken) {
    if (!initData || !botToken) return null;
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    if (!hash) return null;
    params.delete('hash');

    const pairs = [...params.entries()].sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
    const dcs = pairs.map(([k, v]) => k + '=' + v).join('\n');

    const secret = await hmacSha256(new TextEncoder().encode('WebAppData'), botToken);
    const computed = toHex(await hmacSha256(secret, dcs));
    if (computed !== hash) return null;

    // Просроченная подпись не принимается: иначе перехваченный initData
    // работал бы вечно.
    const authDate = Number(params.get('auth_date') || 0);
    if (!authDate || Date.now() / 1000 - authDate > 86400) return null;

    try {
        const user = JSON.parse(params.get('user') || 'null');
        return user && user.id ? user : null;
    } catch (e) {
        return null;
    }
}

function randomToken(bytes) {
    const a = new Uint8Array(bytes || 32);
    crypto.getRandomValues(a);
    return toHex(a);
}

/** Короткий код для ручного ввода: без похожих символов (0/O, 1/I) */
function loginCode() {
    const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const a = new Uint8Array(8);
    crypto.getRandomValues(a);
    return [...a].map((b) => ALPHABET[b % ALPHABET.length]).join('');
}

// ------------------------------------------------------------
//  Роли
// ------------------------------------------------------------
function isAdmin(userId, env) {
    const ids = String(env.ADMIN_IDS || '').split(',').map((s) => s.trim()).filter(Boolean);
    return ids.indexOf(String(userId)) !== -1;
}

// ------------------------------------------------------------
//  Личность запроса
//  Два пути: сессионный токен (сайт) или initData (Mini App).
// ------------------------------------------------------------
async function identify(request, env) {
    const auth = request.headers.get('Authorization') || '';
    if (auth.indexOf('Bearer ') === 0) {
        const token = auth.slice(7).trim();
        const uid = await env.DATA.get('session:' + token);
        if (uid) return { userId: uid, via: 'session' };
    }

    const initData = request.headers.get('X-Telegram-Init-Data');
    if (initData) {
        const user = await verifyInitData(initData, env.BOT_TOKEN);
        if (user) {
            await touchUser(env, user);
            return { userId: String(user.id), via: 'initData' };
        }
    }
    return null;
}

/** Заводит или обновляет карточку ученика. Персональных данных — минимум. */
async function touchUser(env, tgUser, patch) {
    const key = 'user:' + tgUser.id;
    const prev = (await env.DATA.get(key, 'json')) || {};
    const now = new Date().toISOString();
    const rec = {
        id: String(tgUser.id),
        name: tgUser.first_name || prev.name || '',
        username: tgUser.username || prev.username || '',
        lang: tgUser.language_code || prev.lang || '',
        firstSeen: prev.firstSeen || now,
        lastSeen: now,
        ...(prev.note ? { note: prev.note } : {}),
        ...(patch || {}),
    };
    await env.DATA.put(key, JSON.stringify(rec));

    // Индекс: перебор ключей в KV дорог и постраничен, поэтому
    // держим явный список идентификаторов
    const idx = (await env.DATA.get('index:users', 'json')) || [];
    if (idx.indexOf(rec.id) === -1) {
        idx.push(rec.id);
        await env.DATA.put('index:users', JSON.stringify(idx));
    }
    return rec;
}

// ------------------------------------------------------------
//  Журнал изменений: кольцевой буфер
// ------------------------------------------------------------
async function audit(env, entry) {
    const log = (await env.DATA.get('audit', 'json')) || [];
    log.unshift({ at: new Date().toISOString(), ...entry });
    await env.DATA.put('audit', JSON.stringify(log.slice(0, AUDIT_CAP)));
}

// ------------------------------------------------------------
//  Слияние прогресса (last-write-wins по полю, объединение по спискам)
// ------------------------------------------------------------
function mergeProgress(server, client) {
    server = server || {};
    client = client || {};
    const out = { ...server, ...client };

    // Освоенное не «разосваивается» — только объединение
    ['skills', 'achievements', 'syn', 'artifacts'].forEach((k) => {
        out[k] = [...new Set([...(server[k] || []), ...(client[k] || [])])];
    });

    out.xp = Math.max(server.xp || 0, client.xp || 0);
    out.level = Math.max(server.level || 1, client.level || 1);

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

/** Короткая сводка для списка учеников — без выгрузки всего прогресса */
function summarize(user, progress) {
    const p = progress || {};
    return {
        id: user.id,
        name: user.name,
        username: user.username,
        note: user.note || '',
        firstSeen: user.firstSeen,
        lastSeen: user.lastSeen,
        track: (p.profile && p.profile.track) || null,
        level: p.level || 1,
        xp: p.xp || 0,
        skills: (p.skills || []).length,
        achievements: (p.achievements || []).length,
        // ВАЖНО: это время СНИМКА, а не «сейчас». Интерфейс обязан
        // показывать его рядом с цифрами.
        syncedAt: p.syncedAt || null,
    };
}

// ------------------------------------------------------------
//  Оверлей модели курса
//
//  Патч: { entity, op, id, data }
//    entity: node | branch | track | synergy | mechanics
//    op:     upsert | hide | show
//  Операции delete НЕТ намеренно — см. ТРИЗ-разбор, противоречие 1.
// ------------------------------------------------------------
const ENTITIES = ['node', 'branch', 'track', 'synergy'];
const OPS = ['upsert', 'hide', 'show'];

function validatePatch(p) {
    if (!p || typeof p !== 'object') return 'патч не объект';
    if (ENTITIES.indexOf(p.entity) === -1) return 'неизвестная сущность: ' + p.entity;
    if (OPS.indexOf(p.op) === -1) return 'недопустимая операция: ' + p.op;
    if (!p.id || typeof p.id !== 'string') return 'нет id';
    if (p.op === 'upsert' && (!p.data || typeof p.data !== 'object')) return 'upsert без data';
    return null;
}

async function getOverlay(env) {
    return (await env.DATA.get('overlay:curriculum', 'json')) || { version: 0, patches: [], updatedAt: null };
}

// ------------------------------------------------------------
//  Бот: выдача одноразового кода входа
// ------------------------------------------------------------
async function tgApi(env, method, payload) {
    if (!env.BOT_TOKEN) return null;
    const res = await fetch('https://api.telegram.org/bot' + env.BOT_TOKEN + '/' + method, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    return res.json().catch(() => null);
}

async function handleBotUpdate(update, env) {
    const msg = update && (update.message || update.edited_message);
    if (!msg || !msg.from) return;
    const from = msg.from;
    const text = String(msg.text || '').trim();

    await touchUser(env, from);

    if (text === '/start' || text === '/login' || text.indexOf('/start ') === 0) {
        const code = loginCode();
        await env.DATA.put('logincode:' + code, String(from.id), { expirationTtl: CODE_TTL });
        const admin = isAdmin(from.id, env);
        await tgApi(env, 'sendMessage', {
            chat_id: msg.chat.id,
            parse_mode: 'HTML',
            text:
                'Код для входа в личный кабинет:\n\n<code>' + code + '</code>\n\n' +
                'Код действует 10 минут и сгорает после первого использования.\n' +
                (admin ? '\nУ вас права администратора.\n' : '') +
                '\nЕсли вы не запрашивали вход — просто не вводите код.',
        });
        return;
    }

    if (text === '/progress') {
        const p = await env.DATA.get('progress:' + from.id, 'json');
        await tgApi(env, 'sendMessage', {
            chat_id: msg.chat.id,
            text: p
                ? 'Уровень ' + (p.level || 1) + ', освоено узлов: ' + ((p.skills || []).length) +
                  '\nПоследняя синхронизация: ' + (p.syncedAt || 'не было')
                : 'Прогресса пока нет. Откройте карту знаний и освойте первый узел.',
        });
        return;
    }

    if (text === '/help') {
        await tgApi(env, 'sendMessage', {
            chat_id: msg.chat.id,
            text: '/login — код для входа в кабинет\n/progress — краткий прогресс\n/forget — удалить мои данные с сервера',
        });
        return;
    }

    if (text === '/forget') {
        await env.DATA.delete('progress:' + from.id);
        await env.DATA.delete('user:' + from.id);
        const idx = (await env.DATA.get('index:users', 'json')) || [];
        await env.DATA.put('index:users', JSON.stringify(idx.filter((x) => x !== String(from.id))));
        await tgApi(env, 'sendMessage', { chat_id: msg.chat.id, text: 'Ваши данные удалены с сервера. Локальный прогресс на устройстве остаётся у вас.' });
        return;
    }
}

// ------------------------------------------------------------
//  Маршрутизация
// ------------------------------------------------------------
export default {
    async fetch(request, env) {
        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: corsHeaders(request, env) });
        }

        const url = new URL(request.url);
        const path = url.pathname.replace(/\/+$/, '') || '/';
        const R = (d, s) => json(d, s, request, env);

        // ---------- Вебхук бота ----------
        // Секрет в пути: Telegram шлёт сюда без наших заголовков.
        if (path === '/tg/webhook' && request.method === 'POST') {
            if (!env.WEBHOOK_SECRET || url.searchParams.get('s') !== env.WEBHOOK_SECRET) {
                return R({ error: 'forbidden' }, 403);
            }
            const update = await request.json().catch(() => null);
            if (update) await handleBotUpdate(update, env);
            return R({ ok: true });
        }

        // ---------- Здоровье ----------
        if (path === '/v1/health') {
            return R({ ok: true, service: 'medoeduz', time: new Date().toISOString() });
        }

        // ---------- Обмен кода на сессию ----------
        if (path === '/v1/auth/code' && request.method === 'POST') {
            const body = await request.json().catch(() => null);
            const code = body && String(body.code || '').trim().toUpperCase();
            if (!code) return R({ error: 'нет кода' }, 400);

            const uid = await env.DATA.get('logincode:' + code);
            if (!uid) return R({ error: 'код неверен или истёк' }, 401);
            // Одноразовость: код сгорает сразу, повтор не пройдёт
            await env.DATA.delete('logincode:' + code);

            const token = randomToken(32);
            await env.DATA.put('session:' + token, uid, { expirationTtl: SESSION_TTL });
            const user = (await env.DATA.get('user:' + uid, 'json')) || { id: uid };
            return R({ token, user: { id: uid, name: user.name || '', username: user.username || '' }, role: isAdmin(uid, env) ? 'admin' : 'student' });
        }

        // ---------- Обмен initData на сессию (Mini App) ----------
        if (path === '/v1/auth/telegram' && request.method === 'POST') {
            const body = await request.json().catch(() => null);
            const user = await verifyInitData(body && body.initData, env.BOT_TOKEN);
            if (!user) return R({ error: 'подпись не подтверждена' }, 401);
            await touchUser(env, user);
            const token = randomToken(32);
            await env.DATA.put('session:' + token, String(user.id), { expirationTtl: SESSION_TTL });
            return R({ token, user: { id: String(user.id), name: user.first_name || '', username: user.username || '' }, role: isAdmin(user.id, env) ? 'admin' : 'student' });
        }

        // ---------- Оверлей курса: ЧТЕНИЕ ОТКРЫТО ----------
        // Его читает сайт при каждой загрузке, в том числе у гостей.
        if (path === '/v1/curriculum' && request.method === 'GET') {
            return R(await getOverlay(env));
        }
        if (path === '/v1/mechanics' && request.method === 'GET') {
            return R((await env.DATA.get('overlay:mechanics', 'json')) || { version: 0, rules: null });
        }

        // ---------- Дальше нужна личность ----------
        const me = await identify(request, env);
        if (!me) return R({ error: 'нужна авторизация' }, 401);
        const admin = isAdmin(me.userId, env);

        if (path === '/v1/me') {
            const user = (await env.DATA.get('user:' + me.userId, 'json')) || { id: me.userId };
            return R({ user, role: admin ? 'admin' : 'student', via: me.via });
        }

        if (path === '/v1/auth/logout' && request.method === 'POST') {
            const auth = request.headers.get('Authorization') || '';
            if (auth.indexOf('Bearer ') === 0) await env.DATA.delete('session:' + auth.slice(7).trim());
            return R({ ok: true });
        }

        // ---------- Прогресс ученика ----------
        const pkey = 'progress:' + me.userId;

        if (path === '/v1/progress') {
            if (request.method === 'GET') {
                return R({ progress: await env.DATA.get(pkey, 'json') });
            }
            if (request.method === 'PUT' || request.method === 'PATCH') {
                const body = await request.json().catch(() => null);
                if (!body) return R({ error: 'плохое тело запроса' }, 400);
                const server = await env.DATA.get(pkey, 'json');
                const next = request.method === 'PUT'
                    ? { ...body, syncedAt: new Date().toISOString() }
                    : mergeProgress(server, body);
                await env.DATA.put(pkey, JSON.stringify(next));
                return R({ ok: true, progress: next });
            }
            if (request.method === 'DELETE') {
                await env.DATA.delete(pkey);
                return R({ ok: true });
            }
        }

        // ---------- Ученик управляет своим треком ----------
        if (path === '/v1/profile' && request.method === 'PUT') {
            const body = await request.json().catch(() => null);
            if (!body) return R({ error: 'плохое тело запроса' }, 400);
            const cur = (await env.DATA.get(pkey, 'json')) || {};
            // Смена трека НЕ трогает освоенное: меняется только профиль.
            cur.profile = { ...(cur.profile || {}), ...body };
            cur.syncedAt = new Date().toISOString();
            await env.DATA.put(pkey, JSON.stringify(cur));
            return R({ ok: true, profile: cur.profile });
        }

        // ============================================================
        //  Администратор
        // ============================================================
        if (path.indexOf('/v1/admin/') === 0 && !admin) {
            return R({ error: 'недостаточно прав' }, 403);
        }

        if (path === '/v1/admin/students' && request.method === 'GET') {
            const idx = (await env.DATA.get('index:users', 'json')) || [];
            const out = [];
            for (const uid of idx) {
                const user = await env.DATA.get('user:' + uid, 'json');
                if (!user) continue;
                out.push(summarize(user, await env.DATA.get('progress:' + uid, 'json')));
            }
            out.sort((a, b) => String(b.lastSeen || '').localeCompare(String(a.lastSeen || '')));
            return R({ students: out, total: out.length });
        }

        const mStudent = path.match(/^\/v1\/admin\/students\/([^/]+)$/);
        if (mStudent && request.method === 'GET') {
            const uid = mStudent[1];
            const user = await env.DATA.get('user:' + uid, 'json');
            if (!user) return R({ error: 'ученик не найден' }, 404);
            return R({ user, progress: await env.DATA.get('progress:' + uid, 'json') });
        }
        if (mStudent && request.method === 'PATCH') {
            const uid = mStudent[1];
            const body = await request.json().catch(() => null);
            const user = await env.DATA.get('user:' + uid, 'json');
            if (!user) return R({ error: 'ученик не найден' }, 404);
            if (body && typeof body.note === 'string') user.note = body.note.slice(0, 2000);
            await env.DATA.put('user:' + uid, JSON.stringify(user));
            await audit(env, { who: me.userId, what: 'student.note', id: uid });
            return R({ ok: true, user });
        }

        // ---------- Правка курса ----------
        if (path === '/v1/admin/curriculum' && request.method === 'POST') {
            const patch = await request.json().catch(() => null);
            const err = validatePatch(patch);
            if (err) return R({ error: err }, 400);

            const overlay = await getOverlay(env);
            // Патч на ту же сущность заменяет предыдущий: журнал ведём
            // отдельно, а оверлей держим компактным.
            overlay.patches = overlay.patches.filter(
                (p) => !(p.entity === patch.entity && p.id === patch.id && p.op === patch.op));
            overlay.patches.push({ entity: patch.entity, op: patch.op, id: patch.id, data: patch.data || null });
            overlay.version = (overlay.version || 0) + 1;
            overlay.updatedAt = new Date().toISOString();
            await env.DATA.put('overlay:curriculum', JSON.stringify(overlay));
            await audit(env, { who: me.userId, what: 'curriculum.' + patch.op, id: patch.entity + ':' + patch.id });
            return R({ ok: true, version: overlay.version, patches: overlay.patches.length });
        }

        if (path === '/v1/admin/curriculum' && request.method === 'DELETE') {
            // Откат ОДНОГО патча — возврат к базовой модели по этой сущности.
            const body = await request.json().catch(() => null);
            if (!body || !body.entity || !body.id) return R({ error: 'нужны entity и id' }, 400);
            const overlay = await getOverlay(env);
            const before = overlay.patches.length;
            overlay.patches = overlay.patches.filter((p) => !(p.entity === body.entity && p.id === body.id));
            overlay.version = (overlay.version || 0) + 1;
            overlay.updatedAt = new Date().toISOString();
            await env.DATA.put('overlay:curriculum', JSON.stringify(overlay));
            await audit(env, { who: me.userId, what: 'curriculum.revert', id: body.entity + ':' + body.id });
            return R({ ok: true, removed: before - overlay.patches.length, version: overlay.version });
        }

        // ---------- Правила геймификации ----------
        if (path === '/v1/admin/mechanics' && request.method === 'PUT') {
            const body = await request.json().catch(() => null);
            if (!body || typeof body !== 'object') return R({ error: 'плохое тело запроса' }, 400);
            const rec = { version: Date.now(), rules: body, updatedAt: new Date().toISOString() };
            await env.DATA.put('overlay:mechanics', JSON.stringify(rec));
            await audit(env, { who: me.userId, what: 'mechanics.update', id: 'rules' });
            return R({ ok: true, version: rec.version });
        }

        if (path === '/v1/admin/audit' && request.method === 'GET') {
            return R({ audit: (await env.DATA.get('audit', 'json')) || [] });
        }

        if (path === '/v1/admin/stats' && request.method === 'GET') {
            const idx = (await env.DATA.get('index:users', 'json')) || [];
            let active7 = 0, withTrack = 0, totalSkills = 0;
            const weekAgo = Date.now() - 7 * 86400000;
            const byTrack = {};
            for (const uid of idx) {
                const p = await env.DATA.get('progress:' + uid, 'json');
                const u = await env.DATA.get('user:' + uid, 'json');
                if (u && u.lastSeen && Date.parse(u.lastSeen) > weekAgo) active7++;
                if (p) {
                    totalSkills += (p.skills || []).length;
                    const tr = p.profile && p.profile.track;
                    if (tr) { withTrack++; byTrack[tr] = (byTrack[tr] || 0) + 1; }
                }
            }
            return R({ total: idx.length, active7, withTrack, totalSkills, byTrack });
        }

        return R({ error: 'не найдено', path }, 404);
    },
};
