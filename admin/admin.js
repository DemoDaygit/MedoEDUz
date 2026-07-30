/**
 * ============================================================
 *  MedoEDUz — административный кабинет
 * ============================================================
 *
 *  Правит курс, механики обучения и ведёт учеников.
 *
 *  Три вещи, которые здесь принципиальны:
 *
 *  1. КНОПКИ «УДАЛИТЬ УЗЕЛ» НЕТ и не будет. Есть «скрыть».
 *     Прогресс ученика — это список id; удаление узла обнулило бы
 *     освоенное у всех, кто его прошёл. Скрытый узел исчезает из
 *     интерфейса, но id остаётся жив (docs/ARCHITECTURE-TRIZ.md).
 *
 *  2. ФОРМЫ ГЕНЕРИРУЮТСЯ из admin/schema.js. Добавили поле в схему —
 *     оно появилось в редакторе. Ручная форма на каждую сущность
 *     разошлась бы с моделью на второй правке.
 *
 *  3. ДАННЫЕ УЧЕНИКОВ — ЭТО СНИМОК, а не «сейчас». Рядом с каждым
 *     числом показывается время последней синхронизации. Прогресс
 *     доезжает до сервера только когда ученик открыл приложение.
 */

'use strict';

(function () {
    var C = window.CURRICULUM;
    var S = window.ADMIN_SCHEMA;
    var app = document.getElementById('app');
    if (!C || !S || !app) return;

    var view = 'overview';
    var entityKind = 'node';
    var editing = null;
    var cache = { students: null, audit: null, stats: null, mechanics: null };

    function esc(s) {
        return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    }
    function fmtDate(iso) {
        if (!iso) return '—';
        var d = new Date(iso);
        if (isNaN(d)) return '—';
        var days = Math.floor((Date.now() - d.getTime()) / 86400000);
        var s = d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit' });
        if (days === 0) return 'сегодня';
        if (days === 1) return 'вчера';
        if (days < 30) return days + ' дн. назад';
        return s;
    }
    function get(obj, path) {
        return path.split('.').reduce(function (o, k) { return o && o[k] !== undefined ? o[k] : undefined; }, obj);
    }
    function setPath(obj, path, val) {
        var parts = path.split('.');
        var cur = obj;
        for (var i = 0; i < parts.length - 1; i++) {
            if (!cur[parts[i]] || typeof cur[parts[i]] !== 'object') cur[parts[i]] = {};
            cur = cur[parts[i]];
        }
        cur[parts[parts.length - 1]] = val;
    }
    function toast(msg, kind) {
        var el = document.getElementById('toast');
        el.textContent = msg;
        el.className = 'toast show' + (kind ? ' toast--' + kind : '');
        setTimeout(function () { el.className = 'toast'; }, 3200);
    }

    // ============================================================
    //  Вход
    // ============================================================
    function renderLogin(message) {
        document.getElementById('shell').hidden = true;
        var box = document.getElementById('login');
        box.hidden = false;
        box.innerHTML =
            '<div class="login__card">' +
                '<h1>Кабинет администратора</h1>' +
                (API.isDemo
                    ? '<p class="login__demo"><b>Демо-режим.</b> Бэкенд не подключён, поэтому данные живут в этом браузере и никуда не уходят. ' +
                      'Введите <code>ADMIN</code>, чтобы войти администратором. После развёртывания воркера код будет выдавать бот.</p>'
                    : '<p>Откройте бота <a href="https://t.me/ogcyberbot" target="_blank" rel="noopener">@ogcyberbot</a>, отправьте <code>/login</code> и введите полученный код.</p>') +
                (message ? '<p class="login__err">' + esc(message) + '</p>' : '') +
                '<label class="fld"><span>Код входа</span>' +
                    '<input id="code" type="text" autocomplete="one-time-code" placeholder="' + (API.isDemo ? 'ADMIN' : 'например, K7F2QW9B') + '"></label>' +
                '<button class="btn btn--primary" id="doLogin">Войти</button>' +
            '</div>';
        document.getElementById('doLogin').addEventListener('click', doLogin);
        document.getElementById('code').addEventListener('keydown', function (e) { if (e.key === 'Enter') doLogin(); });
    }

    function doLogin() {
        var code = document.getElementById('code').value;
        API.loginByCode(code).then(function (s) {
            if (s.role !== 'admin') {
                API.logout();
                renderLogin('У этой учётной записи нет прав администратора.');
                return;
            }
            boot();
        }).catch(function (e) { renderLogin(e.message || 'Не удалось войти'); });
    }

    // ============================================================
    //  Оболочка
    // ============================================================
    var NAV = [
        ['overview', '📊', 'Обзор'],
        ['course', '🗺️', 'Курс'],
        ['mechanics', '⚙️', 'Механики'],
        ['students', '👥', 'Ученики'],
        ['audit', '🧾', 'Журнал'],
    ];

    function renderShell() {
        document.getElementById('login').hidden = true;
        var shell = document.getElementById('shell');
        shell.hidden = false;
        var user = API.user() || {};
        shell.innerHTML =
            '<aside class="side">' +
                '<div class="side__brand"><img src="../images/logo-medoed.svg" alt="" width="30" height="30">' +
                    '<span>MedoEDU<b>z</b></span></div>' +
                '<nav class="side__nav">' +
                    NAV.map(function (n) {
                        return '<button data-view="' + n[0] + '" class="side__item' + (view === n[0] ? ' is-on' : '') + '">' +
                            '<span>' + n[1] + '</span>' + n[2] + '</button>';
                    }).join('') +
                '</nav>' +
                '<div class="side__foot">' +
                    (API.isDemo ? '<span class="badge badge--demo">демо-режим</span>' : '<span class="badge">подключено</span>') +
                    '<span class="side__user">' + esc(user.name || 'админ') + '</span>' +
                    '<button class="btn btn--ghost btn--sm" id="logout">Выйти</button>' +
                '</div>' +
            '</aside>' +
            '<main class="main" id="main"></main>';

        shell.querySelectorAll('.side__item').forEach(function (b) {
            b.addEventListener('click', function () { view = b.dataset.view; editing = null; renderShell(); renderView(); });
        });
        document.getElementById('logout').addEventListener('click', function () {
            API.logout().then(function () { location.reload(); });
        });
    }

    // ============================================================
    //  Обзор
    // ============================================================
    function renderOverview() {
        var m = document.getElementById('main');
        m.innerHTML = '<h1>Обзор</h1><div class="cards" id="statCards">Загрузка…</div>' +
            '<h2>Модель курса</h2><div class="cards" id="modelCards"></div>' +
            '<div id="overlayBox"></div>';

        API.stats().then(function (st) {
            cache.stats = st;
            var byTrack = Object.keys(st.byTrack || {}).map(function (k) {
                var tr = C.TRACKS[k];
                return '<li>' + (tr ? tr.emoji + ' ' + esc(tr.name) : esc(k)) + ' — <b>' + st.byTrack[k] + '</b></li>';
            }).join('') || '<li class="muted">никто ещё не выбрал трек</li>';

            document.getElementById('statCards').innerHTML =
                card('Учеников всего', st.total) +
                card('Активны за 7 дней', st.active7) +
                card('Выбрали трек', st.withTrack) +
                card('Освоено узлов суммарно', st.totalSkills) +
                '<div class="card card--wide"><h3>По трекам</h3><ul class="plain">' + byTrack + '</ul></div>';
        });

        document.getElementById('modelCards').innerHTML =
            card('Узлов', C.NODES.length) +
            card('Веток', Object.keys(C.BRANCHES).length) +
            card('Треков', Object.keys(C.TRACKS).length) +
            card('Синергий', (C.SYNERGIES || []).length);

        API.getOverlay().then(function (o) {
            var box = document.getElementById('overlayBox');
            if (!o || !o.patches || !o.patches.length) {
                box.innerHTML = '<p class="muted">Правок поверх базовой модели нет — ученики видят курс как он есть в репозитории.</p>';
                return;
            }
            box.innerHTML = '<h2>Действующие правки <span class="muted">версия ' + o.version + '</span></h2>' +
                '<table class="tbl"><thead><tr><th>Сущность</th><th>Операция</th><th>Идентификатор</th><th></th></tr></thead><tbody>' +
                o.patches.map(function (p) {
                    return '<tr><td>' + esc(p.entity) + '</td><td><span class="op op--' + esc(p.op) + '">' + esc(p.op) + '</span></td>' +
                        '<td><code>' + esc(p.id) + '</code></td>' +
                        '<td><button class="btn btn--ghost btn--sm" data-revert="' + esc(p.entity) + '|' + esc(p.id) + '">Откатить</button></td></tr>';
                }).join('') + '</tbody></table>';
            box.querySelectorAll('[data-revert]').forEach(function (b) {
                b.addEventListener('click', function () {
                    var parts = b.dataset.revert.split('|');
                    API.revertCurriculum(parts[0], parts[1]).then(function () {
                        toast('Правка откачена. Ученики увидят базовую версию при следующей загрузке.');
                        renderOverview();
                    });
                });
            });
        });
    }
    function card(title, val) {
        return '<div class="card"><h3>' + esc(title) + '</h3><div class="card__num">' + val + '</div></div>';
    }

    // ============================================================
    //  Курс: список сущностей + редактор
    // ============================================================
    function entityList(kind) {
        if (kind === 'node') return C.NODES.map(function (n) { return { id: n.id, title: n.title, emoji: n.emoji, sub: (C.BRANCHES[n.branch] || {}).name || n.branch, obj: n }; });
        if (kind === 'branch') return Object.keys(C.BRANCHES).map(function (k) { return { id: k, title: C.BRANCHES[k].name, emoji: C.BRANCHES[k].emoji, sub: k, obj: { key: k, ...C.BRANCHES[k] } }; });
        if (kind === 'track') return Object.keys(C.TRACKS).map(function (k) { return { id: k, title: C.TRACKS[k].name, emoji: C.TRACKS[k].emoji, sub: k, obj: { key: k, ...C.TRACKS[k] } }; });
        if (kind === 'synergy') return (C.SYNERGIES || []).map(function (s) { return { id: s.id, title: s.name, emoji: s.emoji, sub: (s.nodes || []).join(', '), obj: s }; });
        return [];
    }

    function renderCourse() {
        var m = document.getElementById('main');
        var tabs = [['node', 'Узлы'], ['branch', 'Ветки'], ['track', 'Треки'], ['synergy', 'Синергии']];
        m.innerHTML =
            '<h1>Курс</h1>' +
            '<p class="muted">Правки применяются поверх базовой модели и вступают в силу у учеников при следующей загрузке страницы. ' +
            'Удаления нет намеренно: скрытый узел исчезает из интерфейса, но прогресс по нему сохраняется.</p>' +
            '<div class="tabs">' + tabs.map(function (t) {
                return '<button data-kind="' + t[0] + '" class="tab' + (entityKind === t[0] ? ' is-on' : '') + '">' + t[1] + '</button>';
            }).join('') + '</div>' +
            '<div class="split"><div class="split__list">' +
                '<input class="search" id="entSearch" type="search" placeholder="Поиск…">' +
                '<button class="btn btn--ghost btn--sm" id="addNew">+ Создать</button>' +
                '<div id="entList" class="entlist"></div>' +
            '</div><div class="split__form" id="entForm"><p class="muted">Выберите элемент слева или создайте новый.</p></div></div>';

        m.querySelectorAll('.tab').forEach(function (b) {
            b.addEventListener('click', function () { entityKind = b.dataset.kind; editing = null; renderCourse(); });
        });
        document.getElementById('addNew').addEventListener('click', function () { editing = { __new: true }; drawForm(); });
        document.getElementById('entSearch').addEventListener('input', drawList);
        drawList();
        if (editing) drawForm();
    }

    function drawList() {
        var q = (document.getElementById('entSearch') || {}).value || '';
        q = q.toLowerCase().trim();
        var items = entityList(entityKind).filter(function (it) {
            return !q || (it.title + ' ' + it.id + ' ' + it.sub).toLowerCase().indexOf(q) !== -1;
        });
        document.getElementById('entList').innerHTML = items.map(function (it) {
            return '<button class="ent" data-id="' + esc(it.id) + '">' +
                '<span class="ent__emoji">' + (it.emoji || '•') + '</span>' +
                '<span class="ent__t"><b>' + esc(it.title) + '</b><i>' + esc(it.sub || '') + '</i></span></button>';
        }).join('') || '<p class="muted">Ничего не найдено</p>';
        document.getElementById('entList').querySelectorAll('.ent').forEach(function (b) {
            b.addEventListener('click', function () {
                var found = entityList(entityKind).filter(function (x) { return x.id === b.dataset.id; })[0];
                editing = JSON.parse(JSON.stringify(found.obj));
                drawForm();
            });
        });
    }

    // ---------- генератор формы из схемы ----------
    function field(f, val) {
        var id = 'f_' + f.key.replace(/\./g, '_');
        var help = f.help ? '<i class="fld__help">' + esc(f.help) + '</i>' : '';
        var ro = (f.readonlyOnEdit && editing && !editing.__new) ? ' readonly' : '';
        var html = '<label class="fld" data-key="' + esc(f.key) + '" data-type="' + f.type + '"><span>' + esc(f.label) + '</span>';

        if (f.type === 'textarea') {
            html += '<textarea id="' + id + '" rows="' + (f.rows || 3) + '">' + esc(val || '') + '</textarea>';
        } else if (f.type === 'number') {
            html += '<input id="' + id + '" type="number"' + (f.step ? ' step="' + f.step + '"' : '') +
                ' value="' + (val === undefined || val === null ? '' : esc(val)) + '" placeholder="' + esc(f.placeholder || '') + '">';
        } else if (f.type === 'color') {
            html += '<span class="row"><input id="' + id + '" type="color" value="' + esc(val || '#22E0C8') + '">' +
                '<input id="' + id + '_t" type="text" value="' + esc(val || '#22E0C8') + '" class="mono"></span>';
        } else if (f.type === 'select') {
            var opts = f.source === 'branches' ? Object.keys(C.BRANCHES).map(function (k) { return [k, C.BRANCHES[k].name]; })
                : f.source === 'levels' ? Object.keys(C.LEVELS || {}).map(function (k) { return [k, C.LEVELS[k].name]; })
                : [];
            html += '<select id="' + id + '">' + opts.map(function (o) {
                return '<option value="' + esc(o[0]) + '"' + (val === o[0] ? ' selected' : '') + '>' + esc(o[1]) + '</option>';
            }).join('') + '</select>';
        } else if (f.type === 'tracks') {
            html += '<span class="chips">' + Object.keys(C.TRACKS).map(function (k) {
                var on = (val || []).indexOf(k) !== -1;
                return '<label class="chip' + (on ? ' is-on' : '') + '"><input type="checkbox" value="' + esc(k) + '"' + (on ? ' checked' : '') + '>' +
                    C.TRACKS[k].emoji + ' ' + esc(C.TRACKS[k].name) + '</label>';
            }).join('') + '</span>';
        } else if (f.type === 'nodes') {
            html += '<span class="chips chips--scroll">' + C.NODES.map(function (n) {
                var on = (val || []).indexOf(n.id) !== -1;
                return '<label class="chip' + (on ? ' is-on' : '') + '"><input type="checkbox" value="' + esc(n.id) + '"' + (on ? ' checked' : '') + '>' +
                    n.emoji + ' ' + esc(n.title) + '</label>';
            }).join('') + '</span>';
        } else if (f.type === 'list') {
            html += '<textarea id="' + id + '" rows="' + Math.min(8, Math.max(2, (val || []).length + 1)) + '" placeholder="по одному пункту в строке">' +
                esc((val || []).join('\n')) + '</textarea>';
        } else if (f.type === 'checks') {
            html += '<textarea id="' + id + '" rows="8" class="mono" placeholder=' + '"вопрос | вариант1 ;; вариант2 ;; вариант3 | индекс верного | пояснение"' + '>' +
                esc((val || []).map(function (c) {
                    return [c.q, (c.a || []).join(' ;; '), c.ok, c.why || ''].join(' | ');
                }).join('\n')) + '</textarea>';
        } else {
            html += '<input id="' + id + '" type="text" value="' + esc(val === undefined ? '' : val) + '"' + ro + '>';
        }
        return html + help + '</label>';
    }

    function drawForm() {
        var schema = S[entityKind];
        var box = document.getElementById('entForm');
        var isNew = !!editing.__new;
        box.innerHTML =
            '<h2>' + esc(schema.title) + (isNew ? ' <span class="muted">— новый</span>' : '') + '</h2>' +
            '<form id="entEdit">' + schema.fields.map(function (f) { return field(f, get(editing, f.key)); }).join('') +
            '<div class="formbar">' +
                '<button type="submit" class="btn btn--primary">Сохранить правку</button>' +
                (isNew ? '' :
                    '<button type="button" class="btn btn--ghost" id="hideEnt">Скрыть у учеников</button>' +
                    '<button type="button" class="btn btn--ghost" id="revertEnt">Откатить к базовой</button>') +
            '</div>' +
            '<p class="muted small">Кнопки «удалить» нет намеренно: прогресс учеников ссылается на элементы по идентификатору.</p>' +
            '</form>';

        // чипы переключаются кликом по метке
        box.querySelectorAll('.chip input').forEach(function (i) {
            i.addEventListener('change', function () { i.parentElement.classList.toggle('is-on', i.checked); });
        });
        // цвет: два поля синхронно
        box.querySelectorAll('input[type=color]').forEach(function (c) {
            var t = document.getElementById(c.id + '_t');
            c.addEventListener('input', function () { t.value = c.value; });
            if (t) t.addEventListener('input', function () { if (/^#[0-9a-fA-F]{6}$/.test(t.value)) c.value = t.value; });
        });

        document.getElementById('entEdit').addEventListener('submit', function (e) {
            e.preventDefault();
            saveEntity();
        });
        var hb = document.getElementById('hideEnt');
        if (hb) hb.addEventListener('click', function () {
            var id = editing[S[entityKind].idField];
            API.patchCurriculum({ entity: entityKind, op: 'hide', id: id }).then(function () {
                toast('Скрыто. Прогресс учеников по этому элементу сохранён.');
                renderCourse();
            });
        });
        var rb = document.getElementById('revertEnt');
        if (rb) rb.addEventListener('click', function () {
            var id = editing[S[entityKind].idField];
            API.revertCurriculum(entityKind, id).then(function () { toast('Откачено к базовой модели.'); renderCourse(); });
        });
    }

    function collectForm() {
        var schema = S[entityKind];
        var data = {};
        schema.fields.forEach(function (f) {
            var wrap = document.querySelector('.fld[data-key="' + f.key + '"]');
            if (!wrap) return;
            var id = 'f_' + f.key.replace(/\./g, '_');
            var el = document.getElementById(id);
            var v;
            if (f.type === 'tracks' || f.type === 'nodes') {
                v = [...wrap.querySelectorAll('input:checked')].map(function (i) { return i.value; });
            } else if (f.type === 'list') {
                v = String(el.value || '').split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
            } else if (f.type === 'checks') {
                v = String(el.value || '').split('\n').map(function (s) { return s.trim(); }).filter(Boolean).map(function (line) {
                    var parts = line.split('|').map(function (s) { return s.trim(); });
                    return { q: parts[0] || '', a: (parts[1] || '').split(';;').map(function (s) { return s.trim(); }).filter(Boolean), ok: Number(parts[2] || 0), why: parts[3] || '' };
                });
            } else if (f.type === 'number') {
                v = el.value === '' ? undefined : Number(el.value);
            } else if (f.type === 'color') {
                v = el.value;
            } else {
                v = el.value;
            }
            if (v !== undefined) setPath(data, f.key, v);
        });
        return data;
    }

    /** Проверки, которые дешевле сделать здесь, чем ловить у ученика */
    function validate(kind, data) {
        var errs = [];
        var schema = S[kind];
        schema.fields.forEach(function (f) {
            if (!f.required) return;
            var v = get(data, f.key);
            if (v === undefined || v === '' || (Array.isArray(v) && !v.length)) errs.push('не заполнено: ' + f.label);
        });

        if (kind === 'branch' || kind === 'track') {
            var col = get(data, 'color');
            if (col && honeyish(col)) errs.push('цвет из зарезервированного диапазона мёда — он принадлежит бренду Медоеда');
        }
        if (kind === 'node') {
            var id = data.id;
            (data.prereqs || []).forEach(function (p) {
                if (p === id) errs.push('узел не может быть предпосылкой самому себе');
            });
            // Цикл: если предпосылка зависит (транзитивно) от нас — граф замкнётся
            if (id && hasCycle(id, data.prereqs || [])) errs.push('предпосылки образуют цикл — обе стороны заблокируются навсегда');
            (data.check || []).forEach(function (c, i) {
                if (!c.q) errs.push('вопрос ' + (i + 1) + ': нет текста');
                if (!c.a || c.a.length < 2) errs.push('вопрос ' + (i + 1) + ': нужно минимум два варианта');
                if (!(c.ok >= 0 && c.ok < (c.a || []).length)) errs.push('вопрос ' + (i + 1) + ': индекс верного ответа вне списка');
            });
        }
        if (kind === 'synergy' && (data.nodes || []).length < 2) errs.push('синергия требует минимум двух узлов');
        return errs;
    }

    function hasCycle(id, prereqs) {
        var seen = {};
        var stack = prereqs.slice();
        while (stack.length) {
            var cur = stack.pop();
            if (cur === id) return true;
            if (seen[cur]) continue;
            seen[cur] = 1;
            var n = C.BY_ID[cur];
            if (n && n.prereqs) stack = stack.concat(n.prereqs);
        }
        return false;
    }

    function honeyish(hex) {
        var m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim());
        if (!m) return false;
        var n = parseInt(m[1], 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
        var mx = Math.max(r, g, b), mn = Math.min(r, g, b);
        if (mx === mn) return false;
        var h = mx === r ? ((g - b) / (mx - mn)) % 6 : mx === g ? (b - r) / (mx - mn) + 2 : (r - g) / (mx - mn) + 4;
        h = (h * 60 + 360) % 360;
        return h >= 35 && h <= 62 && (mx - mn) / mx > 0.45 && mx > 150;
    }

    function saveEntity() {
        var data = collectForm();
        var idField = S[entityKind].idField;
        var id = data[idField] || (editing && editing[idField]);
        if (!id) { toast('Не задан идентификатор', 'err'); return; }

        var errs = validate(entityKind, data);
        if (errs.length) { toast(errs[0], 'err'); return; }

        // Ключ живёт отдельно от данных: у веток и треков он имя поля в объекте
        var payload = { ...data };
        delete payload[idField];
        if (entityKind === 'node' || entityKind === 'synergy') payload.id = id;

        API.patchCurriculum({ entity: entityKind, op: 'upsert', id: id, data: payload }).then(function (r) {
            toast('Сохранено. Версия оверлея ' + r.version + '. Ученики увидят при следующей загрузке.');
            renderCourse();
        }).catch(function (e) { toast(e.message || 'Не удалось сохранить', 'err'); });
    }

    // ============================================================
    //  Механики обучения
    // ============================================================
    function renderMechanics() {
        var m = document.getElementById('main');
        m.innerHTML = '<h1>Механики обучения</h1>' +
            '<p class="muted">Пустое поле означает «оставить как в коде». Правила вступают в силу у учеников при следующей загрузке.</p>' +
            '<div class="note note--warn"><b>Чего здесь нет намеренно.</b> Нет опыта за визит, прокрутку и клики. ' +
            'Внешняя награда за интересное занятие гасит интерес к самому занятию, поэтому опыт даётся только за освоение и за удержание.</div>' +
            '<form id="mechForm" class="formgrid"></form>' +
            '<div class="formbar"><button class="btn btn--primary" id="saveMech">Сохранить правила</button></div>';

        API.getMechanics().then(function (rec) {
            cache.mechanics = rec;
            var rules = (rec && rec.rules) || {};
            document.getElementById('mechForm').innerHTML =
                S.mechanics.fields.map(function (f) { return field(f, rules[f.key]); }).join('');
        });

        document.getElementById('saveMech').addEventListener('click', function () {
            var rules = {};
            S.mechanics.fields.forEach(function (f) {
                var el = document.getElementById('f_' + f.key.replace(/\./g, '_'));
                if (el && el.value !== '') rules[f.key] = Number(el.value);
            });
            if (rules.checkPassRatio !== undefined && (rules.checkPassRatio <= 0 || rules.checkPassRatio > 1)) {
                toast('Порог прохождения задаётся долей от 0 до 1', 'err'); return;
            }
            API.putMechanics(rules).then(function () { toast('Правила сохранены.'); });
        });
    }

    // ============================================================
    //  Ученики
    // ============================================================
    function renderStudents() {
        var m = document.getElementById('main');
        m.innerHTML = '<h1>Ученики</h1>' +
            '<div class="note"><b>Это снимок, а не «сейчас».</b> Прогресс попадает сюда только после того, как ученик открыл ' +
            'приложение с доступом к сети. Рядом с каждой строкой — время последней синхронизации.</div>' +
            (API.isDemo ? '<div class="note note--warn"><b>Демо-режим.</b> Ниже показаны вымышленные ученики из локального хранилища этого браузера. ' +
                '<button class="btn btn--ghost btn--sm" id="seedDemo">Создать демо-учеников</button></div>' : '') +
            '<input class="search" id="stSearch" type="search" placeholder="Поиск по имени или треку…">' +
            '<div id="stTable">Загрузка…</div>';

        var seed = document.getElementById('seedDemo');
        if (seed) seed.addEventListener('click', function () {
            API._demo.seed(C);
            toast('Демо-ученики созданы');
            renderStudents();
        });

        API.students().then(function (r) {
            cache.students = r.students;
            drawStudents();
            var s = document.getElementById('stSearch');
            if (s) s.addEventListener('input', drawStudents);
        });
    }

    function drawStudents() {
        var q = ((document.getElementById('stSearch') || {}).value || '').toLowerCase().trim();
        var list = (cache.students || []).filter(function (s) {
            if (!q) return true;
            var tr = s.track && C.TRACKS[s.track] ? C.TRACKS[s.track].name : (s.track || '');
            return (s.name + ' ' + (s.username || '') + ' ' + tr).toLowerCase().indexOf(q) !== -1;
        });
        var total = C.NODES.length;
        document.getElementById('stTable').innerHTML = !list.length
            ? '<p class="muted">Учеников пока нет.</p>'
            : '<table class="tbl"><thead><tr><th>Ученик</th><th>Трек</th><th>Уровень</th><th>Прогресс</th><th>Синхронизация</th><th></th></tr></thead><tbody>' +
                list.map(function (s) {
                    var tr = s.track && C.TRACKS[s.track] ? C.TRACKS[s.track].emoji + ' ' + C.TRACKS[s.track].name : '<span class="muted">не выбран</span>';
                    var pct = total ? Math.round((s.skills / total) * 100) : 0;
                    return '<tr>' +
                        '<td><b>' + esc(s.name) + '</b>' + (s.username ? ' <span class="muted">@' + esc(s.username) + '</span>' : '') + '</td>' +
                        '<td>' + tr + '</td>' +
                        '<td>' + s.level + '</td>' +
                        '<td><div class="bar"><i style="width:' + pct + '%"></i></div><span class="muted small">' + s.skills + ' из ' + total + '</span></td>' +
                        '<td class="muted small">' + fmtDate(s.syncedAt) + '</td>' +
                        '<td><button class="btn btn--ghost btn--sm" data-st="' + esc(s.id) + '">Открыть</button></td>' +
                    '</tr>';
                }).join('') + '</tbody></table>';

        document.querySelectorAll('[data-st]').forEach(function (b) {
            b.addEventListener('click', function () { openStudent(b.dataset.st); });
        });
    }

    function openStudent(id) {
        API.student(id).then(function (r) {
            var p = r.progress || {};
            var skills = p.skills || [];
            var byBranch = {};
            skills.forEach(function (sid) {
                var n = C.BY_ID[sid];
                if (!n) return;   // узел мог быть скрыт — прогресс всё равно цел
                byBranch[n.branch] = (byBranch[n.branch] || 0) + 1;
            });
            var lost = skills.filter(function (sid) { return !C.BY_ID[sid]; }).length;

            var m = document.getElementById('main');
            m.innerHTML =
                '<button class="btn btn--ghost btn--sm" id="backSt">← К списку</button>' +
                '<h1>' + esc(r.user.name || r.user.id) + (r.user.username ? ' <span class="muted">@' + esc(r.user.username) + '</span>' : '') + '</h1>' +
                '<div class="cards">' +
                    card('Уровень', p.level || 1) +
                    card('Опыт', p.xp || 0) +
                    card('Освоено узлов', skills.length) +
                    card('Достижений', (p.achievements || []).length) +
                '</div>' +
                '<p class="muted">Первый вход: ' + fmtDate(r.user.firstSeen) + ' · последняя активность: ' + fmtDate(r.user.lastSeen) +
                ' · синхронизация: ' + fmtDate(p.syncedAt) + '</p>' +
                '<h2>Трек</h2><p>' + (p.profile && p.profile.track && C.TRACKS[p.profile.track]
                    ? C.TRACKS[p.profile.track].emoji + ' ' + esc(C.TRACKS[p.profile.track].name)
                    : '<span class="muted">не выбран</span>') + '</p>' +
                '<h2>По веткам</h2><ul class="plain">' +
                    (Object.keys(byBranch).map(function (k) {
                        var br = C.BRANCHES[k];
                        var totalIn = C.NODES.filter(function (n) { return n.branch === k; }).length;
                        return '<li>' + (br ? br.emoji + ' ' + esc(br.name) : esc(k)) + ' — <b>' + byBranch[k] + '</b> из ' + totalIn + '</li>';
                    }).join('') || '<li class="muted">пока ничего не освоено</li>') + '</ul>' +
                (lost ? '<p class="muted small">Узлов вне текущей модели: ' + lost + '. Это освоенные узлы, которые сейчас скрыты — прогресс по ним сохранён.</p>' : '') +
                '<h2>Заметка</h2>' +
                '<textarea id="stNote" rows="4" placeholder="Видна только администраторам">' + esc(r.user.note || '') + '</textarea>' +
                '<div class="formbar"><button class="btn btn--primary" id="saveNote">Сохранить заметку</button></div>';

            document.getElementById('backSt').addEventListener('click', renderStudents);
            document.getElementById('saveNote').addEventListener('click', function () {
                API.noteStudent(id, document.getElementById('stNote').value).then(function () { toast('Заметка сохранена'); });
            });
        }).catch(function (e) { toast(e.message || 'Ученик не найден', 'err'); });
    }

    // ============================================================
    //  Журнал
    // ============================================================
    function renderAudit() {
        var m = document.getElementById('main');
        m.innerHTML = '<h1>Журнал изменений</h1><p class="muted">Кто и что менял в курсе и правилах.</p><div id="auditBox">Загрузка…</div>';
        API.audit().then(function (r) {
            var log = r.audit || [];
            document.getElementById('auditBox').innerHTML = !log.length
                ? '<p class="muted">Изменений пока не было.</p>'
                : '<table class="tbl"><thead><tr><th>Когда</th><th>Кто</th><th>Что</th><th>Объект</th></tr></thead><tbody>' +
                    log.map(function (e) {
                        return '<tr><td class="muted small">' + fmtDate(e.at) + '</td><td>' + esc(e.who) + '</td>' +
                            '<td>' + esc(e.what) + '</td><td><code>' + esc(e.id) + '</code></td></tr>';
                    }).join('') + '</tbody></table>';
        });
    }

    // ============================================================
    function renderView() {
        if (view === 'overview') return renderOverview();
        if (view === 'course') return renderCourse();
        if (view === 'mechanics') return renderMechanics();
        if (view === 'students') return renderStudents();
        if (view === 'audit') return renderAudit();
    }

    function boot() {
        renderShell();
        renderView();
    }

    // Точка входа: сессия есть — сразу внутрь, нет — экран входа
    if (API.isAuthed() && API.role() === 'admin') boot();
    else renderLogin();
})();
