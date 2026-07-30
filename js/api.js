/**
 * ============================================================
 *  MedoEDUz API — клиент платформы
 * ============================================================
 *
 *  Одна точка общения с бэкендом. Два транспорта за одним и тем же
 *  интерфейсом:
 *
 *   1. СЕТЕВОЙ — когда в js/config.js задан MEDOEDUZ_SYNC_URL.
 *   2. ДЕМО — когда адрес пуст. Тогда те же самые вызовы работают
 *      на localStorage этого браузера.
 *
 *  Демо-режим здесь не заглушка «чтобы не падало», а осознанное
 *  решение: кабинеты должны быть работоспособны и проверяемы до
 *  того, как у владельца дойдут руки развернуть воркер. Интерфейс
 *  ОБЯЗАН показывать плашку «демо», иначе локальные данные легко
 *  принять за реальных учеников — этого допускать нельзя.
 *
 *  Офлайн-первичность (см. ТРИЗ, противоречие 2): запись прогресса
 *  никогда не блокирует обучение. Не прошло — легло в очередь и
 *  уедет при следующей возможности.
 */

'use strict';

window.API = (function () {
    var BASE = (window.MEDOEDUZ_SYNC_URL || '').replace(/\/+$/, '');
    var DEMO = !BASE;

    var K_SESSION = 'medoeduz_session';
    var K_QUEUE = 'medoeduz_sync_queue';
    var K_OVERLAY = 'medoeduz_overlay';

    // ---------- мелочи ----------
    function readJson(key, fallback) {
        try { var v = JSON.parse(localStorage.getItem(key)); return v === null ? fallback : v; }
        catch (e) { return fallback; }
    }
    function writeJson(key, val) {
        try { localStorage.setItem(key, JSON.stringify(val)); return true; }
        catch (e) { return false; }
    }
    function now() { return new Date().toISOString(); }

    function session() { return readJson(K_SESSION, null); }
    function setSession(s) { if (s) writeJson(K_SESSION, s); else localStorage.removeItem(K_SESSION); }

    // ============================================================
    //  ДЕМО-ТРАНСПОРТ
    //  Повторяет семантику воркера, включая ГЛАВНОЕ: операции
    //  удаления узла нет, только скрытие.
    // ============================================================
    var demo = (function () {
        var K = 'medoeduz_demo_db';
        function db() {
            return readJson(K, {
                users: {},
                progress: {},
                overlay: { version: 0, patches: [], updatedAt: null },
                mechanics: { version: 0, rules: null },
                audit: [],
            });
        }
        function save(d) { writeJson(K, d); }

        /** В демо «Telegram» нет: личность назначается на месте. */
        function login(who) {
            var d = db();
            var id = String(who.id);
            var prev = d.users[id] || {};
            d.users[id] = {
                id: id,
                name: who.name || prev.name || 'Демо-ученик',
                username: who.username || prev.username || '',
                firstSeen: prev.firstSeen || now(),
                lastSeen: now(),
                note: prev.note || '',
            };
            save(d);
            return { token: 'demo:' + id, user: d.users[id], role: who.role || 'student' };
        }

        function audit(d, entry) {
            d.audit.unshift({ at: now(), ...entry });
            d.audit = d.audit.slice(0, 200);
        }

        return {
            login: login,
            me: function (uid) {
                var d = db();
                return { user: d.users[uid] || { id: uid }, role: (session() || {}).role || 'student', via: 'demo' };
            },
            getProgress: function (uid) { return { progress: db().progress[uid] || null }; },
            putProgress: function (uid, body, merge) {
                var d = db();
                var server = d.progress[uid] || {};
                var next;
                if (merge) {
                    next = { ...server, ...body };
                    ['skills', 'achievements', 'syn', 'artifacts'].forEach(function (k) {
                        var a = (server[k] || []).concat(body[k] || []);
                        next[k] = a.filter(function (x, i) { return a.indexOf(x) === i; });
                    });
                    next.xp = Math.max(server.xp || 0, body.xp || 0);
                    next.level = Math.max(server.level || 1, body.level || 1);
                } else {
                    next = { ...body };
                }
                next.syncedAt = now();
                d.progress[uid] = next;
                if (d.users[uid]) d.users[uid].lastSeen = now();
                save(d);
                return { ok: true, progress: next };
            },
            putProfile: function (uid, patch) {
                var d = db();
                var p = d.progress[uid] || {};
                p.profile = { ...(p.profile || {}), ...patch };
                p.syncedAt = now();
                d.progress[uid] = p;
                save(d);
                return { ok: true, profile: p.profile };
            },
            deleteProgress: function (uid) {
                var d = db(); delete d.progress[uid]; save(d); return { ok: true };
            },
            getOverlay: function () { return db().overlay; },
            getMechanics: function () { return db().mechanics; },
            patchCurriculum: function (uid, patch) {
                var d = db();
                d.overlay.patches = d.overlay.patches.filter(function (p) {
                    return !(p.entity === patch.entity && p.id === patch.id && p.op === patch.op);
                });
                d.overlay.patches.push({ entity: patch.entity, op: patch.op, id: patch.id, data: patch.data || null });
                d.overlay.version += 1;
                d.overlay.updatedAt = now();
                audit(d, { who: uid, what: 'curriculum.' + patch.op, id: patch.entity + ':' + patch.id });
                save(d);
                return { ok: true, version: d.overlay.version, patches: d.overlay.patches.length };
            },
            revertCurriculum: function (uid, entity, id) {
                var d = db();
                var before = d.overlay.patches.length;
                d.overlay.patches = d.overlay.patches.filter(function (p) { return !(p.entity === entity && p.id === id); });
                d.overlay.version += 1;
                d.overlay.updatedAt = now();
                audit(d, { who: uid, what: 'curriculum.revert', id: entity + ':' + id });
                save(d);
                return { ok: true, removed: before - d.overlay.patches.length, version: d.overlay.version };
            },
            putMechanics: function (uid, rules) {
                var d = db();
                d.mechanics = { version: Date.now(), rules: rules, updatedAt: now() };
                audit(d, { who: uid, what: 'mechanics.update', id: 'rules' });
                save(d);
                return { ok: true, version: d.mechanics.version };
            },
            students: function () {
                var d = db();
                var out = Object.keys(d.users).map(function (id) {
                    var u = d.users[id], p = d.progress[id] || {};
                    return {
                        id: id, name: u.name, username: u.username, note: u.note || '',
                        firstSeen: u.firstSeen, lastSeen: u.lastSeen,
                        track: (p.profile && p.profile.track) || null,
                        level: p.level || 1, xp: p.xp || 0,
                        skills: (p.skills || []).length,
                        achievements: (p.achievements || []).length,
                        syncedAt: p.syncedAt || null,
                    };
                });
                out.sort(function (a, b) { return String(b.lastSeen).localeCompare(String(a.lastSeen)); });
                return { students: out, total: out.length };
            },
            student: function (id) {
                var d = db();
                if (!d.users[id]) return null;
                return { user: d.users[id], progress: d.progress[id] || null };
            },
            noteStudent: function (uid, id, note) {
                var d = db();
                if (!d.users[id]) return null;
                d.users[id].note = String(note || '').slice(0, 2000);
                audit(d, { who: uid, what: 'student.note', id: id });
                save(d);
                return { ok: true, user: d.users[id] };
            },
            audit: function () { return { audit: db().audit }; },
            stats: function () {
                var d = db();
                var ids = Object.keys(d.users);
                var weekAgo = Date.now() - 7 * 86400000;
                var active7 = 0, withTrack = 0, totalSkills = 0, byTrack = {};
                ids.forEach(function (id) {
                    var u = d.users[id], p = d.progress[id];
                    if (u.lastSeen && Date.parse(u.lastSeen) > weekAgo) active7++;
                    if (p) {
                        totalSkills += (p.skills || []).length;
                        var tr = p.profile && p.profile.track;
                        if (tr) { withTrack++; byTrack[tr] = (byTrack[tr] || 0) + 1; }
                    }
                });
                return { total: ids.length, active7: active7, withTrack: withTrack, totalSkills: totalSkills, byTrack: byTrack };
            },
            seed: function (curriculum) {
                // Демонстрационные ученики. Помечены явно: их нельзя
                // спутать с реальными, потому что кабинет пишет «демо».
                var d = db();
                if (Object.keys(d.users).length > 1) return false;
                var tracks = curriculum ? Object.keys(curriculum.TRACKS) : ['generalist', 'developer'];
                var nodes = curriculum ? curriculum.NODES.map(function (n) { return n.id; }) : [];
                var names = [
                    ['Анна', 'anna_demo', 0], ['Борис', 'boris_demo', 3], ['Вера', 'vera_demo', 9],
                    ['Глеб', 'gleb_demo', 14], ['Дина', 'dina_demo', 21], ['Егор', 'egor_demo', 6],
                ];
                names.forEach(function (row, i) {
                    var id = 'demo' + (100 + i);
                    var skills = nodes.slice(0, row[2]);
                    d.users[id] = {
                        id: id, name: row[0], username: row[1],
                        firstSeen: new Date(Date.now() - (40 - i * 5) * 86400000).toISOString(),
                        lastSeen: new Date(Date.now() - i * 86400000 * 2).toISOString(),
                        note: '',
                    };
                    d.progress[id] = {
                        skills: skills,
                        xp: skills.length * 45,
                        level: 1 + Math.floor(skills.length / 3),
                        achievements: [],
                        profile: { track: tracks[i % tracks.length], onboardedAt: d.users[id].firstSeen },
                        syncedAt: new Date(Date.now() - i * 86400000 * 2).toISOString(),
                    };
                });
                save(d);
                return true;
            },
            reset: function () { localStorage.removeItem(K); },
        };
    })();

    // ============================================================
    //  СЕТЕВОЙ ТРАНСПОРТ
    // ============================================================
    function http(method, path, body) {
        var s = session();
        var headers = { 'Content-Type': 'application/json' };
        if (s && s.token) headers.Authorization = 'Bearer ' + s.token;
        if (window.TG && TG.getState && TG.getState().initData) {
            headers['X-Telegram-Init-Data'] = TG.getState().initData;
        }
        return fetch(BASE + path, {
            method: method,
            headers: headers,
            body: body === undefined ? undefined : JSON.stringify(body),
        }).then(function (res) {
            return res.json().catch(function () { return {}; }).then(function (data) {
                if (!res.ok) {
                    var err = new Error((data && data.error) || ('HTTP ' + res.status));
                    err.status = res.status;
                    throw err;
                }
                return data;
            });
        });
    }

    // ============================================================
    //  Публичный интерфейс — одинаков для обоих транспортов
    // ============================================================
    var uid = function () { var s = session(); return s && s.user ? s.user.id : null; };

    var api = {
        isDemo: DEMO,
        base: BASE,

        session: session,
        isAuthed: function () { return !!session(); },
        role: function () { var s = session(); return s ? s.role : null; },
        user: function () { var s = session(); return s ? s.user : null; },

        /** Вход по коду из бота (или назначение личности в демо) */
        loginByCode: function (code) {
            if (DEMO) {
                // В демо код не проверяется: проверять нечем, бота нет.
                // Роль назначается по коду ADMIN — чтобы можно было
                // посмотреть админку до развёртывания.
                var isAdm = String(code || '').trim().toUpperCase() === 'ADMIN';
                var s = demo.login({ id: isAdm ? 'demo-admin' : 'demo-me', name: isAdm ? 'Демо-админ' : 'Демо-ученик', role: isAdm ? 'admin' : 'student' });
                setSession(s);
                return Promise.resolve(s);
            }
            return http('POST', '/v1/auth/code', { code: String(code || '').trim().toUpperCase() })
                .then(function (s) { setSession(s); return s; });
        },

        /** Вход изнутри Telegram Mini App */
        loginByTelegram: function () {
            if (DEMO) return api.loginByCode('');
            var initData = window.TG && TG.getState ? TG.getState().initData : null;
            if (!initData) return Promise.reject(new Error('нет данных Telegram'));
            return http('POST', '/v1/auth/telegram', { initData: initData })
                .then(function (s) { setSession(s); return s; });
        },

        logout: function () {
            var p = DEMO ? Promise.resolve({ ok: true }) : http('POST', '/v1/auth/logout').catch(function () { return {}; });
            return p.then(function () { setSession(null); return { ok: true }; });
        },

        me: function () {
            if (DEMO) return Promise.resolve(demo.me(uid()));
            return http('GET', '/v1/me');
        },

        // ---------- прогресс ----------
        getProgress: function () {
            if (DEMO) return Promise.resolve(demo.getProgress(uid()));
            return http('GET', '/v1/progress');
        },
        pushProgress: function (state, merge) {
            if (DEMO) return Promise.resolve(demo.putProgress(uid(), state, merge !== false));
            return http(merge === false ? 'PUT' : 'PATCH', '/v1/progress', state);
        },
        setProfile: function (patch) {
            if (DEMO) return Promise.resolve(demo.putProfile(uid(), patch));
            return http('PUT', '/v1/profile', patch);
        },
        forgetMe: function () {
            if (DEMO) return Promise.resolve(demo.deleteProgress(uid()));
            return http('DELETE', '/v1/progress');
        },

        // ---------- модель курса ----------
        getOverlay: function () {
            if (DEMO) return Promise.resolve(demo.getOverlay());
            return http('GET', '/v1/curriculum');
        },
        /**
         * Синхронное чтение оверлея — им пользуется model-overlay.js
         * ДО первой отрисовки. В демо источник локальный, поэтому
         * правка видна сразу. По сети синхронно доступен только кэш:
         * блокировать первую отрисовку сетевым запросом нельзя.
         */
        getOverlaySync: function () {
            return DEMO ? demo.getOverlay() : readJson(K_OVERLAY, null);
        },
        getMechanics: function () {
            if (DEMO) return Promise.resolve(demo.getMechanics());
            return http('GET', '/v1/mechanics');
        },
        patchCurriculum: function (patch) {
            if (DEMO) return Promise.resolve(demo.patchCurriculum(uid(), patch));
            return http('POST', '/v1/admin/curriculum', patch);
        },
        revertCurriculum: function (entity, id) {
            if (DEMO) return Promise.resolve(demo.revertCurriculum(uid(), entity, id));
            return http('DELETE', '/v1/admin/curriculum', { entity: entity, id: id });
        },
        putMechanics: function (rules) {
            if (DEMO) return Promise.resolve(demo.putMechanics(uid(), rules));
            return http('PUT', '/v1/admin/mechanics', rules);
        },

        // ---------- ученики ----------
        students: function () {
            if (DEMO) return Promise.resolve(demo.students());
            return http('GET', '/v1/admin/students');
        },
        student: function (id) {
            if (DEMO) { var s = demo.student(id); return s ? Promise.resolve(s) : Promise.reject(new Error('ученик не найден')); }
            return http('GET', '/v1/admin/students/' + encodeURIComponent(id));
        },
        noteStudent: function (id, note) {
            if (DEMO) return Promise.resolve(demo.noteStudent(uid(), id, note));
            return http('PATCH', '/v1/admin/students/' + encodeURIComponent(id), { note: note });
        },
        audit: function () {
            if (DEMO) return Promise.resolve(demo.audit());
            return http('GET', '/v1/admin/audit');
        },
        stats: function () {
            if (DEMO) return Promise.resolve(demo.stats());
            return http('GET', '/v1/admin/stats');
        },

        // ---------- офлайн-очередь ----------
        // Обучение никогда не ждёт сеть: не ушло — легло в очередь.
        enqueue: function (state) {
            var q = readJson(K_QUEUE, []);
            q.push({ at: now(), state: state });
            writeJson(K_QUEUE, q.slice(-50));
        },
        flush: function () {
            var q = readJson(K_QUEUE, []);
            if (!q.length || !api.isAuthed()) return Promise.resolve({ sent: 0 });
            var last = q[q.length - 1];
            return api.pushProgress(last.state, true).then(function () {
                writeJson(K_QUEUE, []);
                return { sent: q.length };
            }).catch(function () { return { sent: 0 }; });
        },
        queueSize: function () { return readJson(K_QUEUE, []).length; },

        // ---------- кэш оверлея ----------
        // Оверлей применяется СИНХРОННО из кэша при загрузке страницы,
        // а свежий тянется в фоне: иначе карта ждала бы сеть.
        cachedOverlay: function () { return readJson(K_OVERLAY, null); },
        cacheOverlay: function (o) { writeJson(K_OVERLAY, o); },

        _demo: demo,
    };

    return api;
})();
