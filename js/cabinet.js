/**
 * ============================================================
 *  MedoEDUz — личный кабинет ученика
 * ============================================================
 *
 *  Вход через Telegram-бота: бот выдаёт одноразовый код, кабинет
 *  меняет его на сессию. Пароля нет — значит, его нельзя украсть
 *  (docs/ARCHITECTURE-TRIZ.md, противоречие 3).
 *
 *  Что здесь может ученик:
 *   - видеть свой прогресс и ареал;
 *   - СМЕНИТЬ ТРЕК, не потеряв освоенное;
 *   - подстроить ритм и цель под изменившиеся потребности;
 *   - забрать свои данные или удалить их с сервера.
 *
 *  Смена трека НЕ трогает освоенные узлы. Это принципиально: трек
 *  здесь — маршрут по общей карте, а не отдельный курс, и человек
 *  должен иметь право передумать без наказания.
 */

'use strict';

(function () {
    var C = window.CURRICULUM;
    var root = document.getElementById('cab');
    if (!C || !root) return;

    var progress = null;

    function esc(s) {
        return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    }
    function toast(msg, kind) {
        var el = document.getElementById('toast');
        el.textContent = msg;
        el.className = 'toast show' + (kind ? ' toast--' + kind : '');
        setTimeout(function () { el.className = 'toast'; }, 3000);
    }
    function fmt(iso) {
        if (!iso) return 'ещё не было';
        var d = new Date(iso);
        var days = Math.floor((Date.now() - d) / 86400000);
        return days === 0 ? 'сегодня' : days === 1 ? 'вчера' : days + ' дн. назад';
    }

    /** Локальный прогресс с устройства — он первичен, сервер вторичен */
    function localState() {
        try { return JSON.parse(localStorage.getItem('medoeduz_game_state')) || {}; }
        catch (e) { return {}; }
    }

    // ============================================================
    //  Вход
    // ============================================================
    function renderLogin(err) {
        root.innerHTML =
            '<div class="cab-login">' +
                '<h1>Личный кабинет</h1>' +
                (API.isDemo
                    ? '<p class="cab-demo"><b>Демо-режим.</b> Бэкенд не подключён: данные живут в этом браузере. ' +
                      'Введите любой код, чтобы посмотреть кабинет. После развёртывания воркера код будет выдавать бот.</p>'
                    : '<p>Откройте бота <a href="https://t.me/Medo_cyberbot" target="_blank" rel="noopener">@Medo_cyberbot</a>, ' +
                      'отправьте <code>/login</code> и введите полученный код.</p>') +
                (err ? '<p class="cab-err">' + esc(err) + '</p>' : '') +
                '<label class="fld"><span>Код входа</span>' +
                    '<input id="code" type="text" autocomplete="one-time-code" placeholder="' + (API.isDemo ? 'любой' : 'например, K7F2QW9B') + '"></label>' +
                '<button class="btn btn--primary" id="go">Войти</button>' +
                '<p class="cab-note">Обучение работает и без входа — прогресс хранится на устройстве. ' +
                'Вход нужен, чтобы прогресс переезжал между устройствами.</p>' +
            '</div>';

        function submit() {
            API.loginByCode(document.getElementById('code').value)
                .then(boot)
                .catch(function (e) { renderLogin(e.message || 'Не удалось войти'); });
        }
        document.getElementById('go').addEventListener('click', submit);
        document.getElementById('code').addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
    }

    // ============================================================
    //  Кабинет
    // ============================================================
    function render() {
        var user = API.user() || {};
        var p = progress || {};
        var local = localState();
        // Показываем максимум из локального и серверного: устройство
        // может быть впереди сервера, и занижать прогресс нечестно.
        var skills = (p.skills || local.openedCourses || []);
        var level = Math.max(p.level || 1, local.level || 1);
        var xp = Math.max(p.xp || 0, local.xp || 0);
        var track = (p.profile && p.profile.track) || (local.profile && local.profile.track) || null;
        var total = C.NODES.length;
        var pct = total ? Math.round((skills.length / total) * 100) : 0;

        root.innerHTML =
            '<header class="cab-head">' +
                '<div><h1>Привет, ' + esc(user.name || 'медоед') + '</h1>' +
                '<p class="muted">' + (API.isDemo ? 'Демо-режим: данные в этом браузере' : 'Синхронизация: ' + fmt(p.syncedAt)) + '</p></div>' +
                '<button class="btn btn--ghost btn--sm" id="out">Выйти</button>' +
            '</header>' +

            '<div class="cab-cards">' +
                '<div class="card"><h3>Уровень</h3><div class="card__num">' + level + '</div></div>' +
                '<div class="card"><h3>Опыт</h3><div class="card__num">' + xp + '</div></div>' +
                '<div class="card"><h3>Ареал</h3><div class="card__num">' + pct + '%</div>' +
                    '<p class="muted small">' + skills.length + ' из ' + total + ' узлов</p></div>' +
                '<div class="card"><h3>Достижений</h3><div class="card__num">' + ((p.achievements || local.achievements || []).length) + '</div></div>' +
            '</div>' +

            '<section class="cab-sec">' +
                '<h2>Мой трек</h2>' +
                '<p class="muted">Трек — это маршрут по общей карте, а не отдельный курс. ' +
                '<b>Смена трека не отнимает освоенное</b>: меняется только порядок, в котором мы подсказываем следующий шаг.</p>' +
                '<div class="cab-tracks" id="trackList"></div>' +
            '</section>' +

            '<section class="cab-sec">' +
                '<h2>Ритм и цель</h2>' +
                '<p class="muted">Потребности меняются — настройки должны меняться вместе с ними.</p>' +
                '<div class="cab-form">' +
                    '<label class="fld"><span>Минут в день</span>' +
                        '<select id="daily">' + [10, 15, 30, 45, 60].map(function (v) {
                            var cur = (p.profile && p.profile.daily) || (local.profile && local.profile.daily) || 15;
                            return '<option value="' + v + '"' + (cur === v ? ' selected' : '') + '>' + v + '</option>';
                        }).join('') + '</select></label>' +
                    '<label class="fld"><span>Зачем вам ИИ сейчас</span>' +
                        '<select id="goal">' + [
                            ['apply-to-work', 'Применять в текущей работе'],
                            ['learn-fundamentals', 'Разобраться в основах'],
                            ['build-agents', 'Строить агентов и продукты'],
                            ['explore', 'Присматриваюсь'],
                        ].map(function (o) {
                            var cur = (p.profile && p.profile.goal) || (local.profile && local.profile.goal) || '';
                            return '<option value="' + o[0] + '"' + (cur === o[0] ? ' selected' : '') + '>' + o[1] + '</option>';
                        }).join('') + '</select></label>' +
                    '<button class="btn btn--primary" id="saveProfile">Сохранить</button>' +
                '</div>' +
            '</section>' +

            '<section class="cab-sec">' +
                '<h2>Синхронизация</h2>' +
                '<p class="muted">Прогресс с этого устройства: <b>' + (local.openedCourses || []).length + '</b> узлов. ' +
                'На сервере: <b>' + ((p.skills || []).length) + '</b>. ' +
                (API.queueSize() ? 'В очереди на отправку: <b>' + API.queueSize() + '</b>.' : '') + '</p>' +
                '<div class="formbar">' +
                    '<button class="btn" id="push">Отправить прогресс с устройства</button>' +
                    '<button class="btn btn--ghost" id="pull">Забрать прогресс с сервера</button>' +
                '</div>' +
            '</section>' +

            '<section class="cab-sec">' +
                '<h2>Мои данные</h2>' +
                '<div class="formbar">' +
                    '<button class="btn btn--ghost" id="export">Выгрузить в файл</button>' +
                    '<button class="btn btn--ghost cab-danger" id="forget">Удалить мои данные с сервера</button>' +
                '</div>' +
                '<p class="muted small">Удаление с сервера не трогает прогресс на этом устройстве — он останется у вас.</p>' +
            '</section>';

        drawTracks(track, skills);

        document.getElementById('out').addEventListener('click', function () {
            API.logout().then(function () { renderLogin(); });
        });
        document.getElementById('saveProfile').addEventListener('click', function () {
            API.setProfile({
                daily: Number(document.getElementById('daily').value),
                goal: document.getElementById('goal').value,
            }).then(function () { toast('Настройки сохранены'); refresh(); });
        });
        document.getElementById('push').addEventListener('click', function () {
            var st = localState();
            API.pushProgress({
                skills: st.openedCourses || [],
                xp: st.xp || 0,
                level: st.level || 1,
                achievements: st.achievements || [],
                profile: st.profile || {},
            }, true).then(function () { toast('Прогресс отправлен'); refresh(); })
              .catch(function () { toast('Не вышло — положили в очередь', 'err'); API.enqueue(localState()); });
        });
        document.getElementById('pull').addEventListener('click', function () {
            API.getProgress().then(function (r) {
                if (!r.progress) { toast('На сервере пока пусто'); return; }
                var st = localState();
                var merged = [...new Set([].concat(st.openedCourses || [], r.progress.skills || []))];
                st.openedCourses = merged;
                st.xp = Math.max(st.xp || 0, r.progress.xp || 0);
                st.level = Math.max(st.level || 1, r.progress.level || 1);
                if (r.progress.profile) st.profile = { ...(st.profile || {}), ...r.progress.profile };
                localStorage.setItem('medoeduz_game_state', JSON.stringify(st));
                toast('Забрали с сервера: узлов ' + merged.length);
                refresh();
            });
        });
        document.getElementById('export').addEventListener('click', function () {
            var data = { exportedAt: new Date().toISOString(), local: localState(), server: progress };
            var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'medoeduz-progress.json';
            a.click();
            URL.revokeObjectURL(a.href);
        });
        document.getElementById('forget').addEventListener('click', function () {
            if (!confirm('Удалить ваши данные с сервера? Прогресс на этом устройстве останется.')) return;
            API.forgetMe().then(function () { toast('Данные удалены с сервера'); refresh(); });
        });
    }

    /** Карточки треков: видно, сколько уже пройдено по каждому */
    function drawTracks(current, skills) {
        var box = document.getElementById('trackList');
        var done = {};
        skills.forEach(function (id) { done[id] = 1; });

        box.innerHTML = Object.keys(C.TRACKS).map(function (key) {
            var tr = C.TRACKS[key];
            var nodes = C.NODES.filter(function (n) { return (n.tracks || []).indexOf(key) !== -1; });
            var have = nodes.filter(function (n) { return done[n.id]; }).length;
            var pct = nodes.length ? Math.round((have / nodes.length) * 100) : 0;
            return '<button class="cab-track' + (key === current ? ' is-on' : '') + '" data-track="' + esc(key) + '" style="--trk:' + esc(tr.color) + '">' +
                '<span class="cab-track__e">' + tr.emoji + '</span>' +
                '<span class="cab-track__b"><b>' + esc(tr.name) + (key === current ? ' <i>ваш</i>' : '') + '</b>' +
                    '<span class="bar"><i style="width:' + pct + '%"></i></span>' +
                    '<span class="muted small">' + have + ' из ' + nodes.length + ' узлов</span></span>' +
            '</button>';
        }).join('');

        box.querySelectorAll('.cab-track').forEach(function (b) {
            b.addEventListener('click', function () {
                var key = b.dataset.track;
                API.setProfile({ track: key }).then(function () {
                    // Локальный профиль тоже: карта читает его без сети
                    var st = localState();
                    st.profile = { ...(st.profile || {}), track: key };
                    localStorage.setItem('medoeduz_game_state', JSON.stringify(st));
                    toast('Трек изменён на «' + C.TRACKS[key].name + '». Освоенное сохранено.');
                    refresh();
                });
            });
        });
    }

    function refresh() {
        return API.getProgress().then(function (r) { progress = r.progress; render(); })
            .catch(function () { progress = null; render(); });
    }

    function boot() { refresh(); }

    if (API.isAuthed()) boot();
    else renderLogin();
})();
