/**
 * ============================================================
 *  Тесты воркера. Запуск: node worker/test/run.js
 * ============================================================
 *
 *  Воркер — единственное место, где живут правила доступа, поэтому
 *  его нельзя проверять «на глаз при деплое». Здесь настоящий код
 *  воркера гоняется на поддельном KV и настоящей криптографии
 *  (crypto.subtle есть и в Node), без Cloudflare и без сети.
 *
 *  Что проверяется в первую очередь — то, что молча ломается:
 *  подпись Telegram, одноразовость кода входа, разделение прав,
 *  и главное свойство оверлея: правка курса НЕ ТРОГАЕТ прогресс.
 */

import worker from '../index.js';

// ---------- Поддельный KV ----------
function makeKV() {
    const map = new Map();
    return {
        _map: map,
        async get(key, type) {
            const v = map.get(key);
            if (v === undefined) return null;
            return type === 'json' ? JSON.parse(v) : v;
        },
        async put(key, val) { map.set(key, String(val)); },
        async delete(key) { map.delete(key); },
    };
}

const BOT_TOKEN = '123456:TEST-TOKEN-NOT-REAL';
const ADMIN_ID = '111';
const STUDENT_ID = '222';

function makeEnv() {
    return {
        DATA: makeKV(),
        BOT_TOKEN,
        ADMIN_IDS: ADMIN_ID,
        WEBHOOK_SECRET: 'hookhook',
        ALLOWED_ORIGINS: 'https://demodaygit.github.io,http://127.0.0.1:8099',
    };
}

const BASE = 'https://api.test';
function req(method, path, { body, headers } = {}) {
    return new Request(BASE + path, {
        method,
        headers: { 'Content-Type': 'application/json', Origin: 'https://demodaygit.github.io', ...(headers || {}) },
        body: body === undefined ? undefined : JSON.stringify(body),
    });
}

async function call(env, method, path, opts) {
    const res = await worker.fetch(req(method, path, opts), env);
    let data = null;
    try { data = await res.json(); } catch (e) { /* пустой ответ */ }
    return { status: res.status, data, headers: res.headers };
}

// ---------- Настоящая подпись initData ----------
async function hmac(keyBytes, msg) {
    const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    return new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(msg)));
}
const hex = (b) => [...b].map((x) => x.toString(16).padStart(2, '0')).join('');

async function signInitData(user, token, authDate) {
    const params = new URLSearchParams();
    params.set('auth_date', String(authDate || Math.floor(Date.now() / 1000)));
    params.set('query_id', 'AAF');
    params.set('user', JSON.stringify(user));
    const pairs = [...params.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1));
    const dcs = pairs.map(([k, v]) => k + '=' + v).join('\n');
    const secret = await hmac(new TextEncoder().encode('WebAppData'), token);
    params.set('hash', hex(await hmac(secret, dcs)));
    return params.toString();
}

// ---------- Мини-фреймворк ----------
let passed = 0, failed = 0;
const fails = [];
function ok(cond, name, detail) {
    if (cond) { passed++; console.log('  ✓ ' + name); }
    else { failed++; fails.push(name + (detail ? ' — ' + detail : '')); console.log('  ✗ ' + name + (detail ? ' — ' + detail : '')); }
}
function group(name) { console.log('\n' + name); }

// ============================================================
(async function main() {

    group('Подпись Telegram');
    {
        const env = makeEnv();
        const good = await signInitData({ id: 222, first_name: 'Тест', username: 'test' }, BOT_TOKEN);
        let r = await call(env, 'POST', '/v1/auth/telegram', { body: { initData: good } });
        ok(r.status === 200 && r.data.token, 'валидная подпись даёт сессию');
        ok(r.data.role === 'student', 'обычный пользователь получает роль student');

        const forged = await signInitData({ id: 222 }, '999:OTHER-TOKEN');
        r = await call(env, 'POST', '/v1/auth/telegram', { body: { initData: forged } });
        ok(r.status === 401, 'подпись чужим токеном отклоняется');

        const stale = await signInitData({ id: 222 }, BOT_TOKEN, Math.floor(Date.now() / 1000) - 90000);
        r = await call(env, 'POST', '/v1/auth/telegram', { body: { initData: stale } });
        ok(r.status === 401, 'просроченная подпись (старше суток) отклоняется');

        // Подмена user_id при сохранении чужой подписи
        const tampered = good.replace(/user=[^&]+/, 'user=' + encodeURIComponent(JSON.stringify({ id: 111 })));
        r = await call(env, 'POST', '/v1/auth/telegram', { body: { initData: tampered } });
        ok(r.status === 401, 'подмена user_id ломает подпись и отклоняется');
    }

    group('Вход по коду из бота');
    {
        const env = makeEnv();
        // Бот выдаёт код (эмулируем апдейт Telegram)
        globalThis.fetch = async () => new Response('{"ok":true}', { headers: { 'Content-Type': 'application/json' } });
        const upd = { message: { chat: { id: 5 }, from: { id: 222, first_name: 'Тест', username: 'test' }, text: '/start' } };
        let r = await call(env, 'POST', '/tg/webhook?s=hookhook', { body: upd });
        ok(r.status === 200, 'вебхук с верным секретом принят');

        r = await call(env, 'POST', '/tg/webhook?s=ПОДДЕЛКА', { body: upd });
        ok(r.status === 403, 'вебхук с неверным секретом отклонён');

        const code = [...env.DATA._map.keys()].filter((k) => k.indexOf('logincode:') === 0)[0].split(':')[1];
        ok(!!code, 'бот выдал одноразовый код');

        r = await call(env, 'POST', '/v1/auth/code', { body: { code: code.toLowerCase() } });
        ok(r.status === 200 && r.data.token, 'код обменивается на сессию (регистр не важен)');
        const token = r.data.token;

        r = await call(env, 'POST', '/v1/auth/code', { body: { code } });
        ok(r.status === 401, 'ПОВТОРНОЕ использование кода отклоняется');

        r = await call(env, 'GET', '/v1/me', { headers: { Authorization: 'Bearer ' + token } });
        ok(r.status === 200 && r.data.user.id === '222', 'сессия опознаёт ученика');

        r = await call(env, 'GET', '/v1/me', { headers: { Authorization: 'Bearer not-a-real-token' } });
        ok(r.status === 401, 'выдуманный токен не пускает');

        r = await call(env, 'POST', '/v1/auth/logout', { headers: { Authorization: 'Bearer ' + token } });
        ok(r.status === 200, 'выход выполняется');
        r = await call(env, 'GET', '/v1/me', { headers: { Authorization: 'Bearer ' + token } });
        ok(r.status === 401, 'после выхода токен мёртв');
    }

    group('Разделение прав');
    {
        const env = makeEnv();
        globalThis.fetch = async () => new Response('{"ok":true}');
        async function sessionFor(id) {
            await call(env, 'POST', '/tg/webhook?s=hookhook', { body: { message: { chat: { id: 1 }, from: { id: Number(id), first_name: 'U' + id }, text: '/start' } } });
            const code = [...env.DATA._map.keys()].filter((k) => k.indexOf('logincode:') === 0).pop().split(':')[1];
            const r = await call(env, 'POST', '/v1/auth/code', { body: { code } });
            return r.data.token;
        }
        const sAdmin = await sessionFor(ADMIN_ID);
        const sStud = await sessionFor(STUDENT_ID);

        let r = await call(env, 'GET', '/v1/me', { headers: { Authorization: 'Bearer ' + sAdmin } });
        ok(r.data.role === 'admin', 'администратор опознан по ADMIN_IDS');

        r = await call(env, 'GET', '/v1/admin/students', { headers: { Authorization: 'Bearer ' + sStud } });
        ok(r.status === 403, 'ученик НЕ видит список учеников');

        r = await call(env, 'GET', '/v1/admin/students', { headers: { Authorization: 'Bearer ' + sAdmin } });
        ok(r.status === 200 && r.data.total >= 2, 'администратор видит список учеников');

        r = await call(env, 'POST', '/v1/admin/curriculum', {
            headers: { Authorization: 'Bearer ' + sStud },
            body: { entity: 'node', op: 'hide', id: 'intro' },
        });
        ok(r.status === 403, 'ученик НЕ может править курс');

        r = await call(env, 'GET', '/v1/admin/students');
        ok(r.status === 401, 'без авторизации админ-API закрыт');
    }

    group('Прогресс: слияние и право на забвение');
    {
        const env = makeEnv();
        globalThis.fetch = async () => new Response('{"ok":true}');
        await call(env, 'POST', '/tg/webhook?s=hookhook', { body: { message: { chat: { id: 1 }, from: { id: 222, first_name: 'Т' }, text: '/start' } } });
        const code = [...env.DATA._map.keys()].filter((k) => k.indexOf('logincode:') === 0)[0].split(':')[1];
        const token = (await call(env, 'POST', '/v1/auth/code', { body: { code } })).data.token;
        const H = { Authorization: 'Bearer ' + token };

        await call(env, 'PUT', '/v1/progress', { headers: H, body: { skills: ['intro', 'prompt'], xp: 100, level: 3 } });
        let r = await call(env, 'PATCH', '/v1/progress', { headers: H, body: { skills: ['c-text'], xp: 50, level: 2 } });
        ok(r.data.progress.skills.length === 3, 'освоенные узлы объединяются, а не затираются');
        ok(r.data.progress.xp === 100 && r.data.progress.level === 3, 'XP и уровень берутся по максимуму (устройство с отставшим состоянием не откатывает прогресс)');

        r = await call(env, 'PUT', '/v1/profile', { headers: H, body: { track: 'developer' } });
        ok(r.status === 200 && r.data.profile.track === 'developer', 'ученик сам меняет трек');
        r = await call(env, 'GET', '/v1/progress', { headers: H });
        ok(r.data.progress.skills.length === 3, 'СМЕНА ТРЕКА НЕ ТРОГАЕТ освоенное');

        r = await call(env, 'DELETE', '/v1/progress', { headers: H });
        ok(r.status === 200, 'ученик удаляет свой прогресс');
        r = await call(env, 'GET', '/v1/progress', { headers: H });
        ok(r.data.progress === null, 'после удаления прогресса нет');
    }

    group('Оверлей курса: правка без деплоя и без потери прогресса');
    {
        const env = makeEnv();
        globalThis.fetch = async () => new Response('{"ok":true}');
        await call(env, 'POST', '/tg/webhook?s=hookhook', { body: { message: { chat: { id: 1 }, from: { id: Number(ADMIN_ID), first_name: 'A' }, text: '/start' } } });
        let code = [...env.DATA._map.keys()].filter((k) => k.indexOf('logincode:') === 0)[0].split(':')[1];
        const admin = { Authorization: 'Bearer ' + (await call(env, 'POST', '/v1/auth/code', { body: { code } })).data.token };

        await call(env, 'POST', '/tg/webhook?s=hookhook', { body: { message: { chat: { id: 2 }, from: { id: 222, first_name: 'S' }, text: '/start' } } });
        code = [...env.DATA._map.keys()].filter((k) => k.indexOf('logincode:') === 0)[0].split(':')[1];
        const stud = { Authorization: 'Bearer ' + (await call(env, 'POST', '/v1/auth/code', { body: { code } })).data.token };

        // У ученика есть прогресс по узлу, который админ сейчас скроет
        await call(env, 'PUT', '/v1/progress', { headers: stud, body: { skills: ['intro', 'prompt'], xp: 70 } });

        let r = await call(env, 'POST', '/v1/admin/curriculum', {
            headers: admin,
            body: { entity: 'node', op: 'upsert', id: 'intro', data: { title: 'Введение в ИИ (2026)' } },
        });
        ok(r.status === 200 && r.data.version === 1, 'админ правит узел, версия оверлея растёт');

        r = await call(env, 'POST', '/v1/admin/curriculum', { headers: admin, body: { entity: 'node', op: 'hide', id: 'prompt' } });
        ok(r.status === 200, 'админ скрывает узел');

        r = await call(env, 'GET', '/v1/curriculum');
        ok(r.status === 200 && r.data.patches.length === 2, 'оверлей читается БЕЗ авторизации (нужен всем гостям сайта)');

        r = await call(env, 'GET', '/v1/progress', { headers: stud });
        ok(r.data.progress.skills.indexOf('prompt') !== -1, 'СКРЫТИЕ УЗЛА НЕ УДАЛИЛО его из прогресса ученика');

        r = await call(env, 'POST', '/v1/admin/curriculum', { headers: admin, body: { entity: 'node', op: 'delete', id: 'intro' } });
        ok(r.status === 400, 'операции delete не существует — прогресс защищён по построению');

        r = await call(env, 'POST', '/v1/admin/curriculum', { headers: admin, body: { entity: 'выдумка', op: 'upsert', id: 'x', data: {} } });
        ok(r.status === 400, 'неизвестная сущность отклоняется');

        r = await call(env, 'DELETE', '/v1/admin/curriculum', { headers: admin, body: { entity: 'node', id: 'prompt' } });
        ok(r.status === 200 && r.data.removed === 1, 'откат патча возвращает базовую модель');

        r = await call(env, 'PUT', '/v1/admin/mechanics', { headers: admin, body: { xpPerLevelBase: 120, streakGraceDays: 2 } });
        ok(r.status === 200, 'админ меняет правила геймификации');
        r = await call(env, 'GET', '/v1/mechanics');
        ok(r.data.rules.xpPerLevelBase === 120, 'правила читаются клиентом');

        r = await call(env, 'GET', '/v1/admin/audit', { headers: admin });
        ok(r.data.audit.length >= 4, 'журнал изменений пишется');
        ok(r.data.audit[0].who === ADMIN_ID, 'в журнале виден автор правки');

        r = await call(env, 'GET', '/v1/admin/stats', { headers: admin });
        ok(r.status === 200 && typeof r.data.total === 'number', 'сводка по ученикам считается');
    }

    group('Ученики: карточка и заметка администратора');
    {
        const env = makeEnv();
        globalThis.fetch = async () => new Response('{"ok":true}');
        await call(env, 'POST', '/tg/webhook?s=hookhook', { body: { message: { chat: { id: 1 }, from: { id: Number(ADMIN_ID), first_name: 'A' }, text: '/start' } } });
        const code = [...env.DATA._map.keys()].filter((k) => k.indexOf('logincode:') === 0)[0].split(':')[1];
        const admin = { Authorization: 'Bearer ' + (await call(env, 'POST', '/v1/auth/code', { body: { code } })).data.token };

        let r = await call(env, 'PATCH', '/v1/admin/students/' + ADMIN_ID, { headers: admin, body: { note: 'Пилотная группа' } });
        ok(r.status === 200 && r.data.user.note === 'Пилотная группа', 'заметка о ученике сохраняется');

        r = await call(env, 'GET', '/v1/admin/students/999999', { headers: admin });
        ok(r.status === 404, 'несуществующий ученик даёт 404, а не пустую карточку');
    }

    group('CORS');
    {
        const env = makeEnv();
        const res = await worker.fetch(new Request(BASE + '/v1/health', { headers: { Origin: 'https://evil.example' } }), env);
        ok(res.headers.get('Access-Control-Allow-Origin') !== 'https://evil.example',
            'чужой домен не получает разрешение (иначе кража сессии с любого сайта)');
        const res2 = await worker.fetch(new Request(BASE + '/v1/health', { headers: { Origin: 'http://127.0.0.1:8099' } }), env);
        ok(res2.headers.get('Access-Control-Allow-Origin') === 'http://127.0.0.1:8099', 'разрешённый домен из списка проходит');
    }

    console.log('\n' + '='.repeat(52));
    console.log('пройдено: ' + passed + ', провалено: ' + failed);
    if (failed) {
        console.log('\nПРОВАЛЫ:');
        fails.forEach((f) => console.log('  ✗ ' + f));
        process.exit(1);
    }
})();
