/**
 * ============================================================
 *  MedoEDUz — Учебная сессия (Telegram Mini App)
 * ============================================================
 *
 *  Отдельная страница поверх той же модели курса, что и карта
 *  знаний (data/curriculum.js). Здесь не «просмотр дерева», а
 *  РАБОТА: один замкнутый цикл обучения, который человек
 *  проходит за один присест и повторяет изо дня в день.
 *
 *  Цикл сессии (порядок не случаен):
 *    План → Повтор → Изучение → Практика → Проверка → Рефлексия
 *
 *  Почему именно так:
 *   • План   — фаза «предварительного размышления» саморегуляции:
 *              ученик сам решает объём и называет намерение.
 *   • Повтор — извлечение из памяти раньше нового материала:
 *              вспоминание работает лучше перечитывания.
 *   • Проверка идёт С ОЦЕНКОЙ УВЕРЕННОСТИ. Это даёт калибровку —
 *              главный инструмент честной саморефлексии: видно не
 *              только «сколько знаю», но и «насколько верно я
 *              оцениваю свои знания».
 *   • Рефлексия закрывает цикл: что изменилось, где применю
 *              (намерение «если — то»), что осталось мутным.
 *
 *  Геймификация здесь поддерживает мотивацию, а не подменяет её:
 *  XP выдаётся только за освоение и за УДЕРЖАНИЕ (успешный
 *  повтор через интервал). Никаких кликеров и случайных наград —
 *  внешняя награда за то, что и так интересно, гасит интерес.
 *
 *  Состояние хранится в том же ключе localStorage, что и
 *  index.html, поэтому прогресс общий для обеих страниц.
 */

function startLearnApp() {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var $ = function (id) { return document.getElementById(id); };

    // ============================================================
    //  Язык
    //
    //  Словарь по русскому исходнику: ключ — сама русская строка.
    //  Так ничего не ломается при отсутствии перевода — показывается
    //  оригинал, а не «missing.key.42». Русский остаётся исходником,
    //  английский надстройкой.
    //
    //  Смена языка перезагружает страницу намеренно: часть строк
    //  вычисляется один раз при старте (стадии эволюции, модель
    //  курса), и подменять их на лету — верный способ получить
    //  наполовину переведённый экран.
    // ============================================================
    var LANG_KEY = 'medoeduz_lang';
    var LANG = (document.documentElement.getAttribute('data-lang') === 'en') ? 'en' : 'ru';
    var DICT = (LANG === 'en' && window.MEDOEDUZ_I18N && window.MEDOEDUZ_I18N.en) || null;

    function t(s) {
        if (!DICT) return s;
        var v = DICT[s];
        return (v === undefined || v === null || v === '') ? s : v;
    }
    function setLang(l) {
        try { localStorage.setItem(LANG_KEY, l); } catch (e) {}
        location.reload();
    }

    // ============================================================
    //  Telegram (опционально)
    // ============================================================
    var TG = { inTelegram: false, user: null, initData: null, hf: null, api: null };
    (function () {
        var tg = window.Telegram && window.Telegram.WebApp;
        if (!tg || !tg.initData) return;
        TG.inTelegram = true;
        TG.api = tg;
        TG.initData = tg.initData;
        TG.user = (tg.initDataUnsafe && tg.initDataUnsafe.user) || null;
        TG.hf = tg.HapticFeedback || null;
        try { tg.ready(); tg.expand(); } catch (e) {}
        try {
            var p = tg.themeParams || {};
            if (p.bg_color) { tg.setHeaderColor(p.bg_color); tg.setBackgroundColor(p.bg_color); }
        } catch (e) {}
        document.documentElement.setAttribute('data-tg', '1');
    })();

    function tgUserKey() { return (TG.user && TG.user.id) ? String(TG.user.id) : 'local'; }

    function haptic(kind) {
        if (TG.inTelegram && TG.hf) {
            try {
                if (kind === 'ok') TG.hf.notificationOccurred('success');
                else if (kind === 'err') TG.hf.notificationOccurred('error');
                else TG.hf.impactOccurred('light');
                return;
            } catch (e) { /* вниз, к обычной вибрации */ }
        }
        try { if (navigator.vibrate) navigator.vibrate(kind === 'ok' ? [12, 30, 12] : 8); } catch (e) {}
    }

    // ============================================================
    //  Модель курса
    // ============================================================
    // Модель курса на выбранном языке. Английская копия повторяет
    // структуру русской один в один (те же id, координаты, prereqs,
    // индексы верных ответов) — переведены только строки, поэтому
    // вся логика работает без изменений.
    var C = (LANG === 'en' && window.CURRICULUM_EN) ? window.CURRICULUM_EN : window.CURRICULUM;
    if (!C) {
        document.body.innerHTML = '<p style="padding:28px;color:#9FADC0;font-family:sans-serif">' +
            t('Не загрузилась модель курса (data/curriculum.js). Учебная сессия без неё бессмысленна.</p>');
        return;
    }
    var NODES = C.NODES, BY_ID = C.BY_ID, BRANCHES = C.BRANCHES, LEVELS = C.LEVELS, TRACKS = C.TRACKS;

    var STAGES = [
        { e: '🦡', n: t('Медоедёнок'), s: t('Только начал путь'), a: '#a3a3a3', lvl: 1 },
        { e: '⚡', n: t('Любопытный'), s: t('Исследует экосистему'), a: '#8B7CFF', lvl: 3 },
        { e: '🤖', n: t('Ученик ИИ'), s: t('Освоил первые инструменты'), a: '#57C7FF', lvl: 5 },
        { e: '🦾', n: t('Нейро-Мастер'), s: t('Уверенно владеет ИИ'), a: '#FF8FD0', lvl: 8 },
        { e: '🧠', n: t('Гуру ИИ'), s: t('Видит матрицу насквозь'), a: '#FFB020', lvl: 11 },
        { e: '👑', n: t('Медоед ВСЁ'), s: t('Легенда экосистемы'), a: '#FF7A85', lvl: 14 }
    ];

    // ============================================================
    //  Утилиты
    // ============================================================
    function esc(t) {
        return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    }
    function dayStr(d) {
        return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    }
    function addDays(d, n) { var x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }
    function today() { return dayStr(new Date()); }
    function isoWeek(d) {
        var t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        var dayNum = t.getUTCDay() || 7;
        t.setUTCDate(t.getUTCDate() + 4 - dayNum);
        var y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
        var wk = Math.ceil(((t - y0) / 86400000 + 1) / 7);
        return t.getUTCFullYear() + '-W' + String(wk).padStart(2, '0');
    }
    function fmtDate(iso) {
        try {
            var d = new Date(iso);
            return d.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' });
        } catch (e) { return ''; }
    }
    /**
     * Множественное число. Русский требует три формы, английский две —
     * поэтому для английского берём one/few, а перевод формы «дня»
     * задан как множественное «days». Так одни и те же места вызова
     * работают в обоих языках без ветвлений на каждой строке.
     */
    function plural(n, one, few, many) {
        if (LANG === 'en') return n === 1 ? one : few;
        var m10 = n % 10, m100 = n % 100;
        if (m10 === 1 && m100 !== 11) return one;
        if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
        return many;
    }

    // ============================================================
    //  Состояние. Ключ общий с index.html — прогресс единый.
    // ============================================================
    var KEY = 'medoeduz_app_' + tgUserKey();

    var EMPTY = {
        xp: 0, level: 1, skills: [], quests: {}, checks: {}, syn: [],
        achievements: [],
        profile: { userId: null, goal: null, track: null, experience: null, onboardedAt: null, minutes: 30 },
        srs: {},          // интервальные повторения по узлам
        reflect: [],      // записи рефлексии
        calib: [],        // журнал калибровки (уверенность против факта)
        confErr: [],      // уверенные ошибки — отдельный класс, см. ниже
        intents: [],      // намерения «если — то»
        gaps: [],         // «мутные места» — вопросы, на которые хочется уметь отвечать
        streak: { days: [] },
        weekly: [],       // недельные обзоры
        artifacts: [],    // витрина: что реально сделано руками
        coldJol: [],      // холодные прогнозы памяти перед повтором
        sessions: [],     // завершённые сессии
        session: null,    // текущая незавершённая сессия
        week: null        // прохождение «первой недели»: {track, startedAt, done:[], mode, finishedAt}
    };

    var S = load();

    function load() {
        var d = {};
        try {
            var raw = localStorage.getItem(KEY);
            if (!raw && tgUserKey() === 'local') {
                var legacy = localStorage.getItem('medoeduz_app_v1');
                if (legacy) raw = legacy;
            }
            d = JSON.parse(raw || '{}') || {};
        } catch (e) { d = {}; }

        // Незнакомые поля сохраняем: index.html может добавить своё.
        var out = Object.assign({}, d);
        Object.keys(EMPTY).forEach(function (k) {
            if (out[k] === undefined || out[k] === null) {
                out[k] = Array.isArray(EMPTY[k]) ? [] : (typeof EMPTY[k] === 'object' && EMPTY[k] ? JSON.parse(JSON.stringify(EMPTY[k])) : EMPTY[k]);
            }
        });
        out.profile = Object.assign({}, EMPTY.profile, out.profile || {});
        out.streak = Object.assign({ days: [] }, out.streak || {});
        return out;
    }

    // Журналы растут бесконечно, а квота localStorage — около 5 МБ.
    // При переполнении запись падает молча и теряется ВЕСЬ прогресс,
    // поэтому каждый журнал живёт как кольцевой буфер.
    var CAPS = { reflect: 300, calib: 2000, confErr: 300, intents: 300, gaps: 300, weekly: 200, sessions: 500, artifacts: 400, coldJol: 600 };

    function capLogs(hard) {
        Object.keys(CAPS).forEach(function (k) {
            var lim = hard ? Math.floor(CAPS[k] / 3) : CAPS[k];
            if (Array.isArray(S[k]) && S[k].length > lim) S[k] = S[k].slice(-lim);
        });
        if (S.streak.days && S.streak.days.length > 400) S.streak.days = S.streak.days.slice(-400);
    }

    var storageOk = true;
    function save() {
        capLogs(false);
        try {
            S.profile.userId = tgUserKey();
            localStorage.setItem(KEY, JSON.stringify(S));
            storageOk = true;
        } catch (e) {
            // Квота кончилась — режем журналы жёстче и пробуем ещё раз.
            try {
                capLogs(true);
                localStorage.setItem(KEY, JSON.stringify(S));
                storageOk = true;
            } catch (e2) { storageOk = false; }
        }
        syncPush();
    }

    // ---------- Облачная синхронизация (офлайн-first) ----------
    var SYNC_URL = (window.MEDOEDUZ_SYNC_URL || '').replace(/\/+$/, '');
    var syncOn = !!(SYNC_URL && TG.inTelegram && TG.initData);
    var syncState = syncOn ? 'idle' : (SYNC_URL ? 'no-telegram' : 'off');
    var pushTimer = null;

    function syncHeaders() {
        return { 'Content-Type': 'application/json', 'X-Telegram-Init-Data': TG.initData };
    }
    function syncPush() {
        if (!syncOn) return;
        clearTimeout(pushTimer);
        pushTimer = setTimeout(function () {
            syncState = 'sending';
            fetch(SYNC_URL + '/v1/progress', {
                method: 'PATCH', headers: syncHeaders(), body: JSON.stringify(payload())
            }).then(function (r) { syncState = r.ok ? 'ok' : 'error'; })
              .catch(function () { syncState = 'offline'; });
        }, 3000);
    }
    function payload() {
        return {
            xp: S.xp, level: S.level, skills: S.skills, quests: S.quests, checks: S.checks,
            syn: S.syn, achievements: S.achievements, profile: S.profile,
            srs: S.srs, reflect: S.reflect, calib: S.calib, intents: S.intents,
            gaps: S.gaps, streak: S.streak, weekly: S.weekly, sessions: S.sessions
        };
    }
    function syncPull(done) {
        if (!syncOn) { done(); return; }
        fetch(SYNC_URL + '/v1/progress', { headers: syncHeaders() })
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (data) {
                var p = data && data.progress;
                if (p) {
                    S.skills = uniq(S.skills.concat(p.skills || []));
                    S.syn = uniq((S.syn || []).concat(p.syn || []));
                    S.achievements = uniq((S.achievements || []).concat(p.achievements || []));
                    S.xp = Math.max(S.xp, p.xp || 0);
                    S.level = Math.max(S.level, p.level || 1);
                    S.checks = Object.assign({}, p.checks || {}, S.checks || {});
                    S.quests = Object.assign({}, p.quests || {}, S.quests || {});
                    S.srs = Object.assign({}, p.srs || {}, S.srs || {});
                    // Журналы — объединение по времени записи, без потерь
                    S.reflect = mergeLog(p.reflect, S.reflect);
                    S.calib = mergeLog(p.calib, S.calib);
                    S.intents = mergeLog(p.intents, S.intents);
                    S.gaps = mergeLog(p.gaps, S.gaps);
                    S.weekly = mergeLog(p.weekly, S.weekly);
                    S.sessions = mergeLog(p.sessions, S.sessions);
                    if (p.streak && p.streak.days) S.streak.days = uniq((S.streak.days || []).concat(p.streak.days)).sort();
                    if (p.profile && !S.profile.onboardedAt) S.profile = Object.assign({}, S.profile, p.profile);
                    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
                    syncState = 'ok';
                }
                done();
            })
            .catch(function () { syncState = 'offline'; done(); });
    }
    function uniq(a) { return a.filter(function (v, i, arr) { return arr.indexOf(v) === i; }); }
    function mergeLog(a, b) {
        var seen = {}, out = [];
        (a || []).concat(b || []).forEach(function (r) {
            if (!r) return;
            var k = (r.at || '') + '|' + (r.node || '') + '|' + (r.qi === undefined ? '' : r.qi);
            if (seen[k]) return;
            seen[k] = 1; out.push(r);
        });
        return out.sort(function (x, y) { return String(x.at).localeCompare(String(y.at)); });
    }

    // ============================================================
    //  Уровни и XP
    // ============================================================
    function need(l) { return Math.round(60 * Math.pow(1.3, l - 1)); }
    function totalFor(l) { var t = 0; for (var i = 1; i < l; i++) t += need(i); return t; }
    function xpProgress() {
        var base = totalFor(S.level), next = totalFor(S.level + 1);
        return { cur: S.xp - base, total: next - base, pct: Math.min(100, (S.xp - base) / (next - base) * 100) };
    }
    function stageOf(lvl) { var r = STAGES[0]; for (var i = 0; i < STAGES.length; i++) if (lvl >= STAGES[i].lvl) r = STAGES[i]; return r; }

    /** Начисление XP. Возвращает, поднялся ли уровень. */
    function addXP(n) {
        var prev = S.level;
        S.xp += n;
        while (S.xp >= totalFor(S.level + 1)) S.level++;
        return S.level > prev;
    }

    // ============================================================
    //  Доступность узлов
    // ============================================================
    function isDone(id) { return S.skills.indexOf(id) !== -1; }

    /**
     * Узел открыт, когда освоены его предпосылки. И только.
     *
     * Игровой reqLevel здесь НЕ замок — он остался индикатором
     * «на каком этапе пути это обычно берут». Замком он быть не может:
     * все 49 узлов дают 3885 XP, а на 18-й уровень нужно ~17 000 —
     * добрать разницу можно было только кликером, который на этой
     * странице убран намеренно (награда за клики гасит интерес к
     * самому обучению). Порядок и так задан графом предпосылок,
     * второй замок поверх него лишь упирал бы ученика в стену.
     */
    function isAvailable(n) {
        return !isDone(n.id) && (n.prereqs || []).every(isDone);
    }
    function inTrack(n) {
        var t = S.profile.track;
        if (!t) return true;
        return Array.isArray(n.tracks) && n.tracks.indexOf(t) !== -1;
    }
    function levelOrder(l) { return (LEVELS[l] && LEVELS[l].order) || 99; }

    // ============================================================
    //  Интервальные повторения (SM-2 в упрощённом виде)
    //  Смысл: знание проверяется не в момент изучения, а спустя
    //  время. Интервал растёт при успехе и обнуляется при провале.
    // ============================================================
    var MAX_INTERVAL = 180;

    function dueNodes() {
        var t = today();
        return S.skills.filter(function (id) {
            var r = S.srs[id];
            return r && r.due && r.due <= t && BY_ID[id];
        }).sort(function (a, b) { return String(S.srs[a].due).localeCompare(String(S.srs[b].due)); });
    }

    function schedule(id, grade) {
        var r = S.srs[id] || { interval: 0, ease: 2.5, reps: 0, lapses: 0 };
        if (grade <= 1) {
            r.lapses = (r.lapses || 0) + 1;
            r.reps = 0;
            r.interval = 1;
            r.ease = Math.max(1.3, (r.ease || 2.5) - 0.2);
        } else {
            r.reps = (r.reps || 0) + 1;
            if (r.reps === 1) r.interval = (grade === 3 ? 2 : 1);
            else if (r.reps === 2) r.interval = (grade === 3 ? 6 : 4);
            else r.interval = Math.round((r.interval || 1) * (r.ease || 2.5));
            r.ease = Math.min(2.9, Math.max(1.3, (r.ease || 2.5) + (grade === 3 ? 0.08 : grade === 2 ? 0 : -0.15)));
        }
        r.interval = Math.max(1, Math.min(MAX_INTERVAL, r.interval));
        r.due = dayStr(addDays(new Date(), r.interval));
        r.last = new Date().toISOString();
        S.srs[id] = r;
        return r;
    }

    /** Оценка 0..3 из результата проверки и самооценки */
    function gradeFrom(allRight, firstTry, selfRate) {
        if (!allRight) return 0;
        if (firstTry && selfRate >= 4) return 3;
        if (firstTry) return 2;
        return 1;
    }

    // ============================================================
    //  Калибровка: совпадает ли уверенность с фактом
    //  Оценка Брайера — средний квадрат ошибки прогноза.
    //  0 — идеально; 0.25 — как подбрасывание монеты.
    // ============================================================
    var CONF = [
        { v: 0.35, t: t('Наугад'), n: '35%' },
        { v: 0.60, t: t('Скорее да'), n: '60%' },
        { v: 0.80, t: t('Уверен'), n: '80%' },
        { v: 0.95, t: t('Точно'), n: '95%' }
    ];

    // «Не знаю» — это тоже прогноз, причём почти всегда верный.
    // Записывается с очень низкой уверенностью, поэтому честное
    // признание незнания калибровку почти не портит, а угадывание
    // с высокой уверенностью — портит сильно. Ровно тот стимул,
    // который нужен: признать пробел выгоднее, чем блефовать.
    var DECLINE_CONF = 0.15;

    function calibStats(log) {
        log = log || S.calib;
        if (!log.length) return null;
        var sum = 0, conf = 0, right = 0, declined = 0;
        var buckets = CONF.map(function (c) { return { v: c.v, n: c.n, total: 0, ok: 0 }; });
        log.forEach(function (r) {
            var o = r.ok ? 1 : 0;
            sum += Math.pow(r.conf - o, 2);
            conf += r.conf;
            right += o;
            if (r.declined) declined++;
            for (var i = 0; i < buckets.length; i++) {
                if (Math.abs(buckets[i].v - r.conf) < 0.02) { buckets[i].total++; buckets[i].ok += o; break; }
            }
        });
        var n = log.length;
        return {
            n: n,
            declined: declined,
            brier: sum / n,
            meanConf: conf / n,
            accuracy: right / n,
            bias: conf / n - right / n,     // > 0 — переоценка себя
            buckets: buckets
        };
    }

    // ============================================================
    //  Уверенная ошибка — отдельный класс, а не строка в общем списке
    //
    //  Неверный ответ при заявленной уверенности ≥70% исправляется
    //  прочнее любой другой ошибки (эффект гиперкоррекции), но только
    //  если расхождение показать сразу и целиком. Поэтому такие
    //  ошибки получают контраст «ваш ответ / верный», отдельный
    //  счётчик и обязательный возврат — а ошибки при низкой
    //  уверенности идут в обычные пробелы: там ученик и сам знал,
    //  что не знает.
    // ============================================================
    var CONF_ERR_MIN = 0.7;

    function noteConfError(node, qi, conf, picked) {
        S.confErr.push({
            at: new Date().toISOString(), node: node.id, qi: qi, conf: conf,
            picked: picked, ok: node.check[qi].ok, fixed: false
        });
    }
    function openConfErrors(nodeId) {
        return S.confErr.filter(function (e) {
            return !e.fixed && (!nodeId || e.node === nodeId);
        });
    }
    /** Верный ответ на тот же вопрос закрывает уверенную ошибку */
    function fixConfError(nodeId, qi) {
        S.confErr.forEach(function (e) {
            if (!e.fixed && e.node === nodeId && e.qi === qi) {
                e.fixed = true;
                e.fixedAt = new Date().toISOString();
            }
        });
    }

    function calibVerdict(st) {
        if (!st || st.n < 6) return t('Данных пока мало — калибровка появится после 6 ответов с оценкой уверенности.');
        var b = st.bias;
        if (b > 0.15) return t('Вы систематически переоцениваете себя: заявленная уверенность выше фактической точности на ') + Math.round(b * 100) + t(' п.п. Это самая дорогая ошибка в работе с ИИ — уверенно принятое неверное решение не перепроверяют.');
        if (b < -0.15) return t('Вы недооцениваете себя на ') + Math.round(-b * 100) + t(' п.п.: знаете лучше, чем думаете. Смелее принимайте решения и не переспрашивайте модель по кругу.');
        return t('Калибровка в норме: ваша уверенность соответствует фактической точности (расхождение ') + Math.round(Math.abs(b) * 100) + t(' п.п.). Это значит, что вашему «я уверен» можно верить.');
    }

    // ============================================================
    //  Серия занятий. Пропуск не карается: два дня в месяц
    //  прощаются автоматически. Цель — вернуться, а не «не сорваться».
    // ============================================================
    var GRACE = 2;
    function streakInfo() {
        var days = (S.streak.days || []).slice().sort();
        var set = {};
        days.forEach(function (d) { set[d] = 1; });
        var first = days[0];
        var cur = new Date();
        if (!set[dayStr(cur)]) cur = addDays(cur, -1);
        var n = 0, forgiven = 0, guard = 0;
        while (guard++ < 400 && first) {
            var d = dayStr(cur);
            // Дни до самого первого занятия — не пропуски, а «ещё не начинал».
            // Иначе новичок сразу видел бы, что все поблажки уже израсходованы.
            if (d < first) break;
            if (set[d]) { n++; cur = addDays(cur, -1); continue; }
            if (forgiven < GRACE) { forgiven++; cur = addDays(cur, -1); continue; }
            break;
        }
        var wk = isoWeek(new Date());
        var thisWeek = (S.streak.days || []).filter(function (d) { return isoWeek(new Date(d + 'T12:00:00')) === wk; }).length;
        return { value: n, forgiven: forgiven, left: GRACE - forgiven, thisWeek: thisWeek, weekGoal: 3, today: !!set[today()] };
    }
    function touchStreak() {
        var t = today();
        if ((S.streak.days || []).indexOf(t) === -1) {
            S.streak.days = (S.streak.days || []).concat(t).slice(-400);
        }
    }

    // ============================================================
    //  Достижения — только за доказанный навык, не за присутствие
    // ============================================================
    var ACH = [
        { id: 'first', e: '🌱', n: t('Первый навык'), d: t('Освоен первый узел карты'), has: function () { return S.skills.length >= 1; } },
        { id: 'honest', e: '🪞', n: t('Рефлексия'), d: t('5 записей в дневнике'), has: function () { return S.reflect.length >= 5; } },
        { id: 'calib', e: '🎯', n: t('Калибровка'), d: t('Брайер < 0.15 при 10+ ответах'), has: function () { var c = calibStats(); return !!c && c.n >= 10 && c.brier < 0.15; } },
        { id: 'retain', e: '🧠', n: t('Удержание'), d: t('5 успешных повторов через интервал'), has: function () { return countRetained() >= 5; } },
        { id: 'applied', e: '🛠️', n: t('Применено'), d: t('3 намерения доведены до дела'), has: function () { return S.intents.filter(function (i) { return i.done === true; }).length >= 3; } },
        { id: 'deep', e: '🔬', n: t('Глубина'), d: t('Освоен продвинутый узел'), has: function () { return S.skills.some(function (id) { return BY_ID[id] && BY_ID[id].level === 'advanced'; }); } },
        { id: 'expert', e: '🏔️', n: t('Экспертиза'), d: t('Освоен экспертный узел'), has: function () { return S.skills.some(function (id) { return BY_ID[id] && BY_ID[id].level === 'expert'; }); } },
        { id: 'syn', e: '🔗', n: t('Синергия'), d: t('Открыта первая комбинация навыков'), has: function () { return (S.syn || []).length >= 1; } },
        { id: 'week', e: '📅', n: t('Недельный обзор'), d: t('Первый разбор своей недели'), has: function () { return S.weekly.length >= 1; } },
        { id: 'half', e: '🧭', n: t('Половина трека'), d: t('50% узлов своего трека'), has: function () { var p = trackProgress(); return p.total > 0 && p.done / p.total >= 0.5; } },
        { id: 'artifacts', e: '🗂️', n: t('Витрина'), d: t('5 артефактов, сделанных руками'), has: function () { return (S.artifacts || []).length >= 5; } },
        { id: 'cold', e: '❄️', n: t('Холодная память'), d: t('5 раз вспомнили спустя интервал'), has: function () { return (S.coldJol || []).filter(function (c) { return c.got >= 2; }).length >= 5; } }
    ];

    function countRetained() {
        return Object.keys(S.srs).filter(function (id) { return (S.srs[id].reps || 0) >= 2; }).length;
    }

    function refreshAchievements() {
        var gained = [];
        ACH.forEach(function (a) {
            if (S.achievements.indexOf(a.id) !== -1) return;
            var ok = false;
            try { ok = a.has(); } catch (e) { ok = false; }
            if (ok) { S.achievements.push(a.id); gained.push(a); }
        });
        return gained;
    }

    /**
     * Показываем МЕНЬШЕЕ из двух чисел: в начале пути мотивирует
     * «сделано», ближе к концу — «осталось». Показ обоих сразу
     * гасит эффект, поэтому выводим ровно одно.
     */
    function framing(done, total) {
        if (!total) return { n: 0, label: t('узлов') };
        var left = total - done;
        return done <= left ? { n: done, label: t('освоено') } : { n: left, label: t('осталось') };
    }

    function trackProgress() {
        var list = NODES.filter(inTrack);
        var done = list.filter(function (n) { return isDone(n.id); }).length;
        return { done: done, total: list.length, pct: list.length ? Math.round(done / list.length * 100) : 0 };
    }

    // ============================================================
    //  ПЕРВАЯ НЕДЕЛЯ
    //
    //  Те 20% программы, что дают 80% практического результата за
    //  семь дней. Отбор жёсткий: узел попадает в неделю, только если
    //  даёт видимый результат в РАБОЧЕЙ задаче за один заход,
    //  применяется часто, и его отсутствие стоит дорого.
    //
    //  Это не отдельный курс, а порядок прохождения тех же узлов
    //  плюс задание дня — сформулированное так, чтобы человек делал
    //  его на своём материале, а не на учебном примере.
    //  Режим всегда можно выключить: путь остаётся его.
    // ============================================================
    var FW = C.FIRST_WEEK || {};

    function weekPlan() {
        var t = S.profile.track;
        return (t && FW[t]) ? FW[t] : null;
    }
    /** Идёт ли сейчас режим первой недели */
    function weekActive() {
        var p = weekPlan();
        if (!p || !S.week || S.week.mode !== 'week') return false;
        return (S.week.done || []).length < p.days.length;
    }
    function weekFinished() {
        var p = weekPlan();
        return !!(p && S.week && (S.week.done || []).length >= p.days.length);
    }
    /** Следующий невыполненный день плана */
    function weekNextDay() {
        var p = weekPlan();
        if (!p) return null;
        var done = (S.week && S.week.done) || [];
        for (var i = 0; i < p.days.length; i++) {
            if (done.indexOf(p.days[i].day) === -1) return p.days[i];
        }
        return null;
    }
    function weekDayByNum(num) {
        var p = weekPlan();
        if (!p) return null;
        for (var i = 0; i < p.days.length; i++) if (p.days[i].day === num) return p.days[i];
        return null;
    }
    /** Заводим неделю при выборе трека; смена трека начинает её заново */
    function ensureWeek() {
        var t = S.profile.track;
        if (!t || !FW[t]) { return; }
        if (!S.week || S.week.track !== t) {
            S.week = { track: t, startedAt: new Date().toISOString(), done: [], mode: 'week', finishedAt: null };
        }
    }

    // ============================================================
    //  Что учить дальше — персональный вектор
    // ============================================================
    function recommend() {
        // В режиме первой недели вектор задан планом: он уже отобран
        // по практической отдаче, и метаться между узлами не нужно.
        if (weekActive()) {
            var d = weekNextDay();
            if (d && BY_ID[d.node] && !isDone(d.node)) {
                return { node: BY_ID[d.node], why: t('День ') + d.day + t(' первой недели'), day: d };
            }
            if (d && BY_ID[d.node] && isDone(d.node)) {
                // Узел уже освоен раньше — день засчитываем и идём дальше
                markWeekDay(d.day, true);
                return recommend();
            }
        }
        return recommendFree();
    }

    function recommendFree() {
        // 1. Проваленная проверка на освоенном узле — вернуться.
        for (var i = 0; i < NODES.length; i++) {
            var n = NODES[i];
            if (!isDone(n.id)) continue;
            var r = S.checks[n.id];
            if (r && r.answers && r.passed === false) return { node: n, why: t('Проверка не пройдена — вернитесь к узлу') };
        }
        // 2. Начатая, но незавершённая миссия.
        for (var j = 0; j < NODES.length; j++) {
            var m = NODES[j];
            if (isDone(m.id)) continue;
            var q = S.quests[m.id] || [];
            if (q.length > 0 && q.length < m.quest.steps.length) return { node: m, why: t('Завершите начатую миссию') };
        }
        var avail = NODES.filter(isAvailable);
        if (!avail.length) return { node: null, why: t('Всё доступное освоено — поднимайте уровень практикой и повторами') };

        // 3. Узел, достраивающий синергию (виден ближайший результат).
        var boost = {};
        (C.SYNERGIES || []).forEach(function (sy) {
            var have = sy.nodes.filter(isDone).length;
            if (have === sy.nodes.length - 1) sy.nodes.forEach(function (id) { if (!isDone(id)) boost[id] = sy; });
        });

        var mine = avail.filter(inTrack).sort(function (a, b) {
            return levelOrder(a.level) - levelOrder(b.level) || a.reqLevel - b.reqLevel;
        });
        var pool = mine.length ? mine : avail.slice().sort(function (a, b) {
            return levelOrder(a.level) - levelOrder(b.level) || a.reqLevel - b.reqLevel;
        });

        for (var k = 0; k < pool.length; k++) {
            if (boost[pool[k].id]) return { node: pool[k], why: t('Откроет синергию «') + boost[pool[k].id].name + '»' };
        }
        return {
            node: pool[0],
            why: mine.length ? t('Следующий шаг вашего трека') : t('В треке пока нечего открыть — расширяем кругозор')
        };
    }

    /** Отметить день недели пройденным (silent — без сохранения, вызов внутри рендера) */
    function markWeekDay(num, silent) {
        if (!S.week) return;
        S.week.done = S.week.done || [];
        if (S.week.done.indexOf(num) !== -1) return;
        S.week.done.push(num);
        var p = weekPlan();
        if (p && S.week.done.length >= p.days.length && !S.week.finishedAt) {
            S.week.finishedAt = new Date().toISOString();
        }
        if (!silent) save();
    }

    // ============================================================
    //  Сессия: конечный автомат
    // ============================================================
    var STEPS = ['plan', 'review', 'study', 'practice', 'check', 'reflect', 'done'];
    var STEP_NAMES = { plan: t('План'), review: t('Повтор'), study: t('Изучение'), practice: t('Практика'), check: t('Проверка'), reflect: t('Рефлексия'), done: t('Итог') };

    function newSession(nodeId, opts) {
        opts = opts || {};
        var due = dueNodes().filter(function (id) { return id !== nodeId; });
        return {
            node: nodeId || null,
            mode: opts.mode || 'learn',       // learn | review-only
            day: opts.day || null,            // день плана первой недели, если идём по нему
            stage: 'plan',
            reviews: due,
            rIdx: 0,
            rGrades: {},
            predicted: null,
            gainedXP: 0,
            startedAt: new Date().toISOString()
        };
    }

    function sess() { return S.session; }
    function setStage(st) { S.session.stage = st; save(); renderSession(); window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); }

    function visibleSteps() {
        var s = sess();
        if (!s) return [];
        if (s.mode === 'review-only') return ['plan', 'review', 'done'];
        var steps = ['plan'];
        if (s.reviews.length) steps.push('review');
        return steps.concat(['study', 'practice', 'check', 'reflect', 'done']);
    }

    function nextStage() {
        var s = sess(), steps = visibleSteps();
        var i = steps.indexOf(s.stage);
        return steps[Math.min(i + 1, steps.length - 1)];
    }

    // ============================================================
    //  Рендер: общий каркас
    // ============================================================
    function renderTop() {
        var si = streakInfo();
        $('pillLevel').textContent = S.level;
        var ps = $('pillStreak');
        ps.querySelector('b').textContent = si.value;
        ps.title = si.value ? (t('Серия: ') + si.value + ' ' + plural(si.value, t('день'), t('дня'), t('дней')) + t('. Прощённых пропусков осталось: ') + si.left)
                            : t('Серия начнётся с первой завершённой сессии');
        document.documentElement.style.setProperty('--aura', stageOf(S.level).a);
        $('journalDot').hidden = !weeklyDue();
    }

    function toast(label, text) {
        var t = $('toast');
        $('toastLabel').textContent = label;
        $('toastText').textContent = text;
        t.classList.add('is-on');
        clearTimeout(toast._t);
        toast._t = setTimeout(function () { t.classList.remove('is-on'); }, 4200);
    }

    function renderStepper() {
        var s = sess();
        var host = $('stepper');
        if (!s) { host.innerHTML = ''; return; }
        var steps = visibleSteps(), cur = steps.indexOf(s.stage);
        host.innerHTML = steps.map(function (st, i) {
            var cls = i < cur ? 'is-done' : (i === cur ? 'is-now' : '');
            return '<span class="' + cls + '" title="' + STEP_NAMES[st] + '"></span>';
        }).join('');
    }

    function lvlChip(n) {
        var L = LEVELS[n.level];
        if (!L) return '';
        return '<span class="chip">' + L.emoji + ' ' + esc(L.name) + '</span>';
    }
    function branchChip(n) {
        var b = BRANCHES[n.branch];
        if (!b) return '';
        return '<span class="chip"><i class="lvl-dot" style="background:' + b.color + '"></i>' + esc(b.name) + '</span>';
    }

    function nodeHead(n, sub) {
        return '<div class="node-head">' +
            '<div class="node-emoji">' + n.emoji + '</div>' +
            '<div style="flex:1;min-width:0">' +
                '<div class="node-title">' + esc(n.title) + '</div>' +
                (sub ? '<div class="tiny" style="margin-top:2px">' + esc(sub) + '</div>' : '') +
            '</div></div>' +
            '<div class="chips" style="margin-bottom:10px">' + branchChip(n) + lvlChip(n) +
            '<span class="chip">+' + n.xp + ' XP</span></div>';
    }

    // ============================================================
    //  Вкладка СЕССИЯ
    // ============================================================
    function renderSession() {
        renderTop();
        renderStepper();
        var host = $('sessionBody');
        var s = sess();

        if (!s) { host.innerHTML = renderPlanIdle(); bindPlanIdle(); return; }

        switch (s.stage) {
            case 'plan': host.innerHTML = renderPlan(); bindPlan(); break;
            case 'review': host.innerHTML = renderReview(); bindReview(); break;
            case 'study': host.innerHTML = renderStudy(); bindStudy(); break;
            case 'practice': host.innerHTML = renderPractice(); bindPractice(); break;
            case 'check': host.innerHTML = renderCheckStage(); bindCheckStage(); break;
            case 'reflect': host.innerHTML = renderReflect(); bindReflect(); break;
            case 'done': host.innerHTML = renderDone(); bindDone(); break;
        }
        syncMainButton();
    }

    // ---------- План (сессия ещё не начата) ----------
    function renderPlanIdle() {
        var rec = recommend();
        var due = dueNodes();
        var si = streakInfo();
        var tp = trackProgress();
        var fr = framing(tp.done, tp.total);
        var tr = S.profile.track && TRACKS[S.profile.track];

        var html = '';

        // Разбор недели — самое важное на экране, поэтому первым.
        var weekReviewPending = weekFinished() && S.week && !S.week.reviewed;
        if (weekReviewPending) html += weekReviewCard();

        html += '<div class="card card--accent">' +
            t('<div class="kicker">Сегодня</div>') +
            '<div class="h2">' + (si.today ? t('Сессия на сегодня уже пройдена') : t('Учебная сессия')) + '</div>' +
            '<p class="muted">' + (si.today
                ? t('Можно пройти ещё одну — лишним не будет. Или загляните в дневник и разберите, что осталось мутным.')
                : t('Один заход: повторение → новый навык → практика → проверка → рефлексия.')) + '</p>' +
            '<div class="stats" style="margin-top:12px">' +
                '<div class="stat"><b>' + due.length + t('</b><span>к повтору</span></div>') +
                '<div class="stat stat--violet"><b>' + fr.n + '</b><span>' + fr.label + (tr ? t(' в треке') : '') + '</span></div>' +
                '<div class="stat stat--plain"><b>' + si.thisWeek + '/' + si.weekGoal + t('</b><span>сессий за неделю</span></div>') +
            '</div></div>';

        if (rec.node && rec.day) {
            // Режим первой недели: показываем день целиком — фокус,
            // задание на своей задаче и ловушку. Человек должен видеть,
            // ЧТО он сегодня сделает, а не только какой узел откроет.
            var wn = rec.node, wd = rec.day, wp = weekPlan();
            html += '<div class="card card--accent">' +
                t('<div class="kicker">Первая неделя · день ') + wd.day + t(' из ') + wp.days.length + '</div>' +
                weekDots() +
                nodeHead(wn, BY_ID[wd.node] ? BY_ID[wd.node].desc : '') +
                t('<div class="note note--violet" style="margin-bottom:9px"><b>Фокус.</b> ') + esc(wd.focus) + '</div>' +
                t('<div class="kicker">Сегодня вы сделаете</div>') +
                '<p class="task">' + esc(wd.practice) + '</p>' +
                t('<p class="tiny" style="margin-top:8px">Займёт около ') + wd.min + t(' минут. Делайте на своей рабочей задаче — на учебном примере навык не приживается.</p>') +
                '<div class="btn-row" style="margin-top:12px">' +
                    t('<button class="btn btn--primary" id="startBtn">Начать день ') + wd.day + '</button>' +
                '</div>' +
                t('<button class="btn btn--ghost btn--sm" id="freeMode" style="width:100%;margin-top:8px">Свободный режим — выбирать самому</button>') +
            '</div>';
        } else if (rec.node) {
            var n = rec.node;
            html += '<div class="card">' +
                t('<div class="kicker">Рекомендация</div>') +
                nodeHead(n, rec.why) +
                '<p class="muted">' + esc(n.desc) + '</p>' +
                '<div class="btn-row" style="margin-top:12px">' +
                    t('<button class="btn btn--primary" id="startBtn">Начать сессию</button>') +
                '</div>' +
                t('<button class="btn btn--ghost btn--sm" id="pickOther" style="width:100%;margin-top:8px">Выбрать другой навык</button>') +
                (weekPlan() && !weekActive() && !weekFinished()
                    ? t('<button class="btn btn--ghost btn--sm" id="weekMode" style="width:100%;margin-top:8px">Вернуться к плану первой недели</button>') : '') +
            '</div>';
        } else if (due.length) {
            html += '<div class="card card--violet">' +
                t('<div class="kicker">Только повторение</div>') +
                t('<p class="muted">Новых доступных узлов нет, но ') + due.length + ' ' + plural(due.length, t('навык ждёт'), t('навыка ждут'), t('навыков ждут')) + t(' повторения. Это и есть основная работа: удержать освоенное.</p>') +
                t('<button class="btn btn--violet" id="startReview" style="margin-top:12px">Повторить</button>') +
            '</div>';
        } else {
            html += '<div class="card"><div class="empty"><span class="empty__e">🌱</span>' +
                esc(rec.why) + '</div></div>';
        }

        if (due.length && rec.node) {
            html += '<div class="card card--violet">' +
                t('<div class="kicker">Повторение</div>') +
                '<p class="muted">' + due.length + ' ' + plural(due.length, t('навык'), t('навыка'), t('навыков')) +
                t(' подошли по интервалу. Их проверим в начале сессии — вспоминание работает лучше перечитывания.</p>') +
                '<div class="chips" style="margin-top:9px">' + due.slice(0, 6).map(function (id) {
                    return '<span class="chip">' + BY_ID[id].emoji + ' ' + esc(BY_ID[id].title) + '</span>';
                }).join('') + (due.length > 6 ? '<span class="chip">+' + (due.length - 6) + '</span>' : '') + '</div>' +
            '</div>';
        }

        html += weeklyCard();
        return html;
    }

    /** Точки-дни: видно, сколько пройдено и сколько осталось */
    function weekDots() {
        var p = weekPlan();
        if (!p) return '';
        var done = (S.week && S.week.done) || [];
        return '<div class="stepper" style="margin-bottom:10px">' + p.days.map(function (d) {
            var cls = done.indexOf(d.day) !== -1 ? 'is-done' : (d === weekNextDay() ? 'is-now' : '');
            return '<span class="' + cls + t('" title="День ') + d.day + '"></span>';
        }).join('') + '</div>';
    }

    /** Разбор первой недели — показывается один раз по её завершении */
    function weekReviewCard() {
        var p = weekPlan();
        if (!p) return '';
        var learned = p.days.filter(function (d) { return isDone(d.node); });
        var st = calibStats();
        var applied = S.intents.filter(function (i) { return i.done === true; }).length;
        return '<div class="card card--accent" id="weekReview">' +
            t('<div class="kicker">Первая неделя пройдена</div>') +
            t('<div class="h2">Что изменилось за эти дни</div>') +
            '<p class="task" style="margin-top:6px">' + esc(p.outcome) + '</p>' +
            t('<p class="tiny" style="margin-top:7px">Это не обещание из рекламы, а описание того, что вы сделали руками. Ниже — по фактам.</p>') +
            '<div class="stats" style="margin-top:12px">' +
                '<div class="stat"><b>' + learned.length + '/' + p.days.length + t('</b><span>узлов освоено</span></div>') +
                '<div class="stat stat--violet"><b>' + (st ? st.brier.toFixed(2) : '—') + t('</b><span>калибровка</span></div>') +
                '<div class="stat stat--plain"><b>' + applied + t('</b><span>намерений доведено</span></div>') +
            '</div>' +
            t('<div class="kicker" style="margin-top:14px">Что вы теперь умеете</div>') +
            '<ul class="list">' + learned.map(function (d) {
                return '<li>' + esc(BY_ID[d.node] ? BY_ID[d.node].apply.now : d.node) + '</li>';
            }).join('') + '</ul>' +
            (learned.length < p.days.length
                ? t('<div class="note" style="margin-top:10px"><b>Незакрытое.</b> ') +
                  esc(p.days.filter(function (d) { return !isDone(d.node); })
                        .map(function (d) { return BY_ID[d.node] ? BY_ID[d.node].title : d.node; }).join(', ')) +
                  t(' — проверка не пройдена. Это не провал недели, а точный список, куда вернуться.</div>')
                : '') +
            t('<button class="btn btn--primary" id="weekReviewOk" style="margin-top:12px">Дальше — свободный путь</button>') +
        '</div>';
    }

    function bindPlanIdle() {
        var b = $('startBtn');
        if (b) b.addEventListener('click', function () {
            var rec = recommend();
            if (!rec.node) return;
            S.session = newSession(rec.node.id, { day: rec.day || null });
            save(); haptic(); renderSession();
        });
        var fm = $('freeMode');
        if (fm) fm.addEventListener('click', function () {
            if (S.week) { S.week.mode = 'free'; save(); }
            toast(t('Свободный режим'), t('План недели остался в разделе «Путь» — вернуться можно в любой момент.'));
            renderSession();
        });
        var wm = $('weekMode');
        if (wm) wm.addEventListener('click', function () {
            if (S.week) { S.week.mode = 'week'; save(); }
            renderSession();
        });
        var wr = $('weekReviewOk');
        if (wr) wr.addEventListener('click', function () {
            if (S.week) { S.week.reviewed = true; S.week.mode = 'free'; save(); }
            renderSession();
        });
        var r = $('startReview');
        if (r) r.addEventListener('click', function () {
            S.session = newSession(null, { mode: 'review-only' });
            S.session.reviews = dueNodes();
            save(); haptic(); setStage('review');
        });
        var p = $('pickOther');
        if (p) p.addEventListener('click', function () { switchTab('path'); });
        bindWeekly();
    }

    // ---------- План (сессия начата) ----------
    function renderPlan() {
        var s = sess();
        var n = s.node ? BY_ID[s.node] : null;
        var mins = S.profile.minutes || 15;

        var html = t('<div class="stage-label">Шаг 1 · План</div>');

        html += '<div class="card">' +
            t('<div class="h2">Что берём в работу</div>') +
            (n ? nodeHead(n, n.desc) : t('<p class="muted">Только повторение освоенного.</p>')) +
            (s.reviews.length ? '<div class="note note--violet" style="margin-top:8px"><b>' + s.reviews.length + ' ' +
                plural(s.reviews.length, t('повтор'), t('повтора'), t('повторов')) + t('</b> — начнём с них</div>') : '') +
        '</div>';

        html += '<div class="card">' +
            t('<div class="kicker">Объём</div>') +
            t('<p class="muted" style="margin-bottom:9px">Сколько времени вы реально готовы дать сегодня? Честный ответ лучше амбициозного.') +
            (s.day ? t(' Задание этого дня рассчитано примерно на ') + s.day.min + t(' минут.') : '') + '</p>' +
            '<div class="seg" id="minSeg">' +
                [15, 30, 45].map(function (m) {
                    return '<button data-m="' + m + '" class="' + (mins === m ? 'is-on' : '') + '">' + m + t(' мин</button>');
                }).join('') +
            '</div>' +
        '</div>';

        // Возврат к собственному вопросу. Список «мутных мест» без
        // возврата — это список жалоб; обучение даёт попытка ответить
        // на свой же вопрос по памяти, до открытия материала.
        var openGap = (S.gaps || []).filter(function (g) { return !g.closed && g.text; }).slice(-1)[0];
        if (openGap && !s.gapAsked) {
            var gn = BY_ID[openGap.node];
            html += '<div class="card card--violet">' +
                t('<div class="kicker">Ваш вопрос с прошлой сессии</div>') +
                '<div class="rf-prompt">' + esc(openGap.text) + '</div>' +
                '<div class="rf-hint">' + (gn ? esc(gn.title) + ' · ' : '') + fmtDate(openGap.at) +
                t('. Ответьте по памяти за полминуты, до того как что-то откроется. Не выходит — так и скажите: это тоже ответ, вопрос останется открытым.</div>') +
                t('<textarea class="field" id="gapAnswer" rows="2" placeholder="Ответ своими словами"></textarea>') +
                '<div class="btn-row" style="margin-top:9px">' +
                    t('<button class="btn btn--ghost btn--sm" id="gapClose">Отвечу — закрыть пробел</button>') +
                    t('<button class="btn btn--ghost btn--sm" id="gapKeep">Всё ещё не могу</button>') +
                '</div>' +
            '</div>';
        }

        html += '<div class="card">' +
            t('<div class="kicker">Намерение</div>') +
            t('<label class="label" for="intentText">Зачем вам этот навык именно сейчас?') +
            t('<span>Одна строка. Названная причина удерживает внимание лучше, чем «надо учиться».</span></label>') +
            '<textarea class="field" id="intentText" rows="2" placeholder="' +
                (n ? esc(t('Например: ') + firstSentence(n.apply.now)) : t('Например: закрепить то, что уже освоил')) + '"></textarea>' +
        '</div>';

        html += '<button class="btn btn--primary" id="planNext">' +
            (s.reviews.length ? t('К повторению') : t('К изучению')) + '</button>' +
            t('<button class="btn btn--ghost btn--sm" id="cancelSess" style="width:100%;margin-top:8px">Отменить сессию</button>');
        return html;
    }

    // Первое предложение без lookbehind в регулярке: старые WebView
    // (в т.ч. в Telegram на iOS) падают на нём ещё при разборе файла.
    function firstSentence(t) {
        var s = String(t);
        var i = s.search(/[.!?]/);
        var m = i > 0 ? s.slice(0, i + 1) : s;
        return m.length > 70 ? m.slice(0, 67) + '…' : m;
    }

    function bindPlan() {
        var gapClose = $('gapClose'), gapKeep = $('gapKeep');
        if (gapClose) gapClose.addEventListener('click', function () {
            var ans = ($('gapAnswer').value || '').trim();
            if (!ans) { toast(t('Пробел'), t('Закрывается написанным ответом, а не галочкой. Не выходит — жмите «всё ещё не могу».')); return; }
            var g = (S.gaps || []).filter(function (x) { return !x.closed && x.text; }).slice(-1)[0];
            if (g) { g.closed = true; g.answer = ans.slice(0, 800); g.closedAt = new Date().toISOString(); }
            sess().gapAsked = true;
            save(); haptic('ok');
            toast(t('Пробел закрыт'), t('Ответ сохранён в дневнике — сможете сверить его с собой через месяц.'));
            renderSession();
        });
        if (gapKeep) gapKeep.addEventListener('click', function () {
            sess().gapAsked = true;
            save();
            toast(t('Оставили открытым'), t('Честно. Вопрос вернётся, а узел останется в приоритете.'));
            renderSession();
        });

        var seg = $('minSeg');
        if (seg) seg.addEventListener('click', function (e) {
            var b = e.target.closest('button[data-m]');
            if (!b) return;
            S.profile.minutes = +b.dataset.m;
            seg.querySelectorAll('button').forEach(function (x) { x.classList.toggle('is-on', x === b); });
            save(); haptic();
        });
        $('planNext').addEventListener('click', function () {
            var t = $('intentText');
            if (t && t.value.trim()) sess().intent = t.value.trim().slice(0, 300);
            setStage(nextStage());
        });
        $('cancelSess').addEventListener('click', function () {
            S.session = null; save(); renderSession();
        });
    }

    // ---------- Повторение ----------
    function renderReview() {
        var s = sess();
        var id = s.reviews[s.rIdx];
        if (!id || !BY_ID[id]) { setTimeout(function () { setStage(nextStage()); }, 0); return t('<div class="card"><p class="muted">Повторов нет.</p></div>'); }
        var n = BY_ID[id];
        var r = S.srs[id] || {};
        var days = r.interval || 1;

        var html = t('<div class="stage-label">Повтор · ') + (s.rIdx + 1) + t(' из ') + s.reviews.length + '</div>';

        // ХОЛОДНАЯ ПРОВЕРКА ПАМЯТИ.
        // Оценка «помню ли я это» в момент изучения завышена: материал
        // ещё в рабочей памяти, и лёгкость обработки принимают за
        // знание. Тот же вопрос, заданный спустя дни и ДО того как
        // что-либо откроется, требует достать ответ из долговременной
        // памяти — и предсказывает удержание заметно точнее.
        s.cold = s.cold || {};
        if (s.cold[id] === undefined) {
            html += '<div class="card card--violet">' +
                '<div class="kicker">' + t('Холодная проверка') + ' · ' + days + ' ' + plural(days, t('день'), t('дня'), t('дней')) + t(' спустя') + '</div>' +
                '<div class="h3">' + t('Вспомните ли вы сейчас: ') + esc(n.title) + '?</div>' +
                '<p class="tiny" style="margin:5px 0 11px">' + t('Ответьте до того, как увидите вопросы. Если сначала посмотреть материал, измеряется узнавание, а не память — а в работе вам никто не покажет материал заранее.') + '</p>' +
                '<div class="rate" id="coldRate">' +
                    [['🫥', t('Нет'), 1], ['🌫️', t('Смутно'), 2], ['🔧', t('В общих чертах'), 3], ['✅', t('Точно'), 4]]
                    .map(function (p2) { return '<button data-c="' + p2[2] + '"><b>' + p2[0] + '</b>' + p2[1] + '</button>'; }).join('') +
                '</div></div>';
            return html;
        }

        html += '<div class="card">' +
            nodeHead(n, t('Вы освоили это ') + (r.last ? fmtDate(r.last) : t('ранее')) + t('. Интервал: ') + days + ' ' + plural(days, t('день'), t('дня'), t('дней'))) +
            t('<div class="note note--violet"><b>Не подглядывайте.</b> Смысл повтора — достать ответ из памяти. Ошибка здесь полезнее правильного ответа, подсмотренного в тексте.</div>') +
        '</div>';

        html += '<div class="card">' + renderQuestions(n, 'rev') + '</div>';
        html += t('<button class="btn btn--primary" id="revNext" disabled>Дальше</button>');
        return html;
    }

    function bindReview() {
        var s = sess();
        var id = s.reviews[s.rIdx];
        if (!id) return;

        var cold = $('coldRate');
        if (cold) {
            cold.addEventListener('click', function (e) {
                var b = e.target.closest('button[data-c]');
                if (!b) return;
                s.cold = s.cold || {};
                s.cold[id] = +b.dataset.c;
                haptic(); save(); renderSession();
            });
            return;   // вопросы появятся после прогноза
        }

        bindQuestions(BY_ID[id], 'rev', function (allAnswered, allRight, firstTry) {
            var b = $('revNext');
            if (!b) return;
            b.disabled = !allAnswered;
            if (allAnswered) {
                b.textContent = (s.rIdx + 1 < s.reviews.length) ? t('Следующий повтор') : (s.mode === 'review-only' ? t('Итог') : t('К изучению'));
                s.rGrades[id] = gradeFrom(allRight, firstTry, allRight ? 4 : 2);
            }
        });
        $('revNext').addEventListener('click', function () {
            var sN = sess();
            var nodeId = sN.reviews[sN.rIdx];
            var g = sN.rGrades[nodeId];
            if (g === undefined) g = 1;
            // Холодный прогноз против факта: расхождение и есть то,
            // ради чего этот шаг сделан. Записываем оба числа.
            var coldPred = (sN.cold && sN.cold[nodeId]) || null;
            if (coldPred) {
                S.coldJol.push({
                    at: new Date().toISOString(), node: nodeId,
                    said: coldPred, got: g, days: (S.srs[nodeId] || {}).interval || 1
                });
            }

            var r = schedule(nodeId, g);
            if (g >= 2) { sN.gainedXP += 10; addXP(10); }
            // Ответы очищаем: повтор не должен «залипать» на прошлых ответах
            delete tmpAnswers['rev:' + nodeId];
            sN.rIdx++;
            if (sN.rIdx < sN.reviews.length) { save(); renderSession(); window.scrollTo({ top: 0 }); }
            else {
                var coldNote = '';
                if (coldPred) {
                    // Переоценка памяти — самый частый и самый дорогой перекос
                    if (coldPred >= 3 && g <= 1) coldNote = ' ' + t('Вы были уверены, что помните, — и не вспомнили. Этот разрыв и стоит замечать: узнавание материала мы принимаем за умение его достать.');
                    else if (coldPred <= 2 && g >= 2) coldNote = ' ' + t('Думали, что забыли, — а вспомнили. Память надёжнее, чем кажется.');
                }
                toast(t('Повторение'), (g >= 2
                    ? t('Держится. Следующая проверка через ') + r.interval + ' ' + plural(r.interval, t('день'), t('дня'), t('дней')) + '.'
                    : t('Забылось — вернём завтра. Это нормальная часть кривой забывания.')) + coldNote);
                // Сессия «только повторение» завершается здесь, минуя рефлексию,
                // поэтому серию и журнал сессий закрываем сразу.
                if (sN.mode === 'review-only') {
                    touchStreak();
                    S.sessions.push({
                        at: new Date().toISOString(), node: null,
                        reviews: sN.reviews.length, xp: sN.gainedXP, mastered: false
                    });
                    sN.gainedAch = refreshAchievements().map(function (x) { return x.id; });
                    haptic('ok');
                }
                setStage(nextStage());
            }
        });
    }

    // ---------- Изучение ----------
    function renderStudy() {
        var s = sess();
        var n = BY_ID[s.node];
        var html = t('<div class="stage-label">Шаг ') + (visibleSteps().indexOf('study') + 1) + t(' · Изучение</div>');

        // Прогноз ДО изучения — заготовка для честной обратной связи.
        if (s.predicted === null) {
            html += '<div class="card card--violet">' +
                t('<div class="kicker">Прогноз до изучения</div>') +
                t('<div class="h3">Насколько вы уже владеете этим?</div>') +
                t('<p class="tiny" style="margin-bottom:10px">Ответьте до того, как прочтёте материал. В конце сравним прогноз с результатом проверки — расхождение и есть самое полезное, что вы узнаете о себе сегодня.</p>') +
                nodeHead(n, n.desc) +
                '<div class="rate" id="predRate">' +
                    [['🫥', t('Впервые слышу'), 1], ['🌫️', t('Слышал, не применял'), 2], ['🔧', t('Применял пару раз'), 3], ['✅', t('Владею уверенно'), 4]]
                    .map(function (p) { return '<button data-p="' + p[2] + '"><b>' + p[0] + '</b>' + p[1] + '</button>'; }).join('') +
                '</div></div>';
            return html;
        }

        html += '<div class="card">' + nodeHead(n, n.desc) +
            '<div class="chips">' + n.tools.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</div>' +
        '</div>';

        // Фокус дня: из всего узла сегодня берём одну мысль — так
        // за 30 минут получается результат, а не обзорная экскурсия.
        if (s.day) {
            html += t('<div class="card card--accent"><div class="kicker">Фокус дня ') + s.day.day + '</div>' +
                '<div class="h3">' + esc(s.day.focus) + '</div></div>';
        }

        html += t('<div class="card"><div class="kicker">Что осваиваем</div>') +
            '<ul class="list">' + n.learn.map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ul></div>';

        html += '<div class="card card--accent">' +
            t('<div class="kicker">Зачем это</div>') +
            '<div class="h3">' + esc(n.apply.now) + '</div>' +
            '<p class="muted" style="margin-top:6px">' + esc(n.apply.case) + '</p>' +
        '</div>';

        html += t('<div class="card"><div class="note"><b>Типичная ошибка.</b> ') + esc(n.trap) + '</div></div>';

        html += '<div class="card card--quiet">' +
            t('<div class="kicker">Объясните себе</div>') +
            t('<p class="tiny" style="margin-bottom:8px">Попытка объяснить своими словами до проверки даёт больше, чем перечитывание. Пишите как есть — это в дневник, не на оценку.</p>') +
            t('<textarea class="field" id="selfExpl" rows="3" placeholder="Своими словами: в чём здесь суть и почему это работает именно так?"></textarea>') +
        '</div>';

        html += t('<button class="btn btn--primary" id="studyNext">К практике</button>');
        return html;
    }

    function bindStudy() {
        var pr = $('predRate');
        if (pr) {
            pr.addEventListener('click', function (e) {
                var b = e.target.closest('button[data-p]');
                if (!b) return;
                sess().predicted = +b.dataset.p;
                haptic(); save(); renderSession();
            });
            return;
        }
        $('studyNext').addEventListener('click', function () {
            var t = $('selfExpl');
            if (t && t.value.trim()) sess().selfExpl = t.value.trim().slice(0, 1200);
            setStage(nextStage());
        });
    }

    // ---------- Практика ----------
    function renderPractice() {
        var s = sess();
        var n = BY_ID[s.node];
        var done = S.quests[n.id] || [];
        var html = t('<div class="stage-label">Шаг ') + (visibleSteps().indexOf('practice') + 1) + t(' · Практика</div>');

        // Задание дня идёт ПЕРВЫМ и на своём материале. Миссия узла
        // ниже — как разбивка на шаги, а не как отдельная работа.
        if (s.day) {
            html += '<div class="card card--accent">' +
                t('<div class="kicker">Задание дня ') + s.day.day + ' · ~' + s.day.min + t(' мин</div>') +
                '<p class="task">' + esc(s.day.practice) + '</p>' +
                t('<div class="note note--accent" style="margin-top:11px"><b>Доказательство.</b> ') + esc(s.day.proof) + '</div>' +
                t('<div class="note" style="margin-top:8px"><b>Здесь заваливаются.</b> ') + esc(s.day.trap) + '</div>' +
            '</div>';
        }

        html += '<div class="card">' +
            t('<div class="kicker">Миссия</div>') +
            '<div class="h2">' + esc(n.quest.title) + '</div>' +
            t('<p class="muted" style="margin-bottom:11px">Навык появляется в руках, а не в голове. Отмечайте шаг, только когда реально его сделали.</p>') +
            n.quest.steps.map(function (st, i) {
                return '<label class="step"><input type="checkbox" data-s="' + i + '"' +
                    (done.indexOf(i) !== -1 ? ' checked' : '') + '><span>' + esc(st) + '</span></label>';
            }).join('') +
            t('<div class="note note--accent" style="margin-top:10px"><b>Доказательство.</b> ') + esc(n.quest.proof) + '</div>' +
            // ВИТРИНА. Отметка «артефакт есть» — не галочка о просмотре,
            // а утверждение о сделанной работе. Именно эти артефакты
            // потом собираются в список того, что человек может
            // показать: обучение без следа в работе не удерживается.
            '<label class="step" style="margin-top:10px"><input type="checkbox" id="artifactDone"' +
                (hasArtifact(n.id) ? ' checked' : '') + '>' +
                '<span><b>' + t('Доказательство у меня есть') + '</b><br>' +
                '<span class="tiny">' + t('Отмечайте, только если артефакт реально существует — он попадёт в витрину и в выгрузку дневника.') + '</span></span></label>' +
        '</div>';

        // Намерение спрашиваем не здесь, а в рефлексии: до проверки
        // человек ещё не знает, что именно у него получилось, и
        // формулирует применение вслепую.

        html += '<button class="btn btn--primary" id="pracNext"' + (done.length === n.quest.steps.length ? '' : ' disabled') + t('>К проверке</button>');
        html += t('<p class="tiny" style="text-align:center;margin-top:8px">Проверка откроется, когда все шаги отмечены</p>');
        return html;
    }

    /**
     * ВИТРИНА АРТЕФАКТОВ.
     *
     * Копится не «сколько узлов пройдено», а что человек может
     * показать: таблица проверки фактов, шаблон промпта, лог прогона,
     * личный регламент по данным. Это единственная метрика обучения,
     * которую нельзя накликать, и одновременно то, ради чего всё
     * затевалось — навык, оставивший след в работе.
     */
    function hasArtifact(nodeId) {
        return (S.artifacts || []).some(function (a) { return a.node === nodeId; });
    }
    function toggleArtifact(n, on) {
        S.artifacts = S.artifacts || [];
        if (on) {
            if (!hasArtifact(n.id)) {
                var day = sess() && sess().day;
                S.artifacts.push({
                    at: new Date().toISOString(), node: n.id,
                    what: (day && day.proof) || n.quest.proof
                });
            }
        } else {
            S.artifacts = S.artifacts.filter(function (a) { return a.node !== n.id; });
        }
        refreshAchievements();
        save();
    }

    function shortApply(n) {
        var t = n.apply.now;
        return t.length > 62 ? t.slice(0, 59) + '…' : t;
    }

    function bindPractice() {
        var s = sess(), n = BY_ID[s.node];
        document.querySelectorAll('input[data-s]').forEach(function (box) {
            box.addEventListener('change', function () {
                var i = +box.dataset.s;
                var list = S.quests[n.id] || [];
                if (box.checked) { if (list.indexOf(i) === -1) list.push(i); }
                else list = list.filter(function (x) { return x !== i; });
                S.quests[n.id] = list;
                save(); haptic();
                $('pracNext').disabled = list.length !== n.quest.steps.length;
                syncMainButton();
            });
        });
        var art = $('artifactDone');
        if (art) art.addEventListener('click', function () {
            toggleArtifact(n, art.checked);
            haptic(art.checked ? 'ok' : null);
        });
        $('pracNext').addEventListener('click', function () { setStage(nextStage()); });
    }

    // ---------- Проверка ----------
    function renderCheckStage() {
        var s = sess(), n = BY_ID[s.node];
        var html = t('<div class="stage-label">Шаг ') + (visibleSteps().indexOf('check') + 1) + t(' · Проверка</div>');
        html += '<div class="card card--quiet">' +
            t('<div class="kicker">Как это работает</div>') +
            t('<p class="muted">Сначала выбираете ответ, затем честно оцениваете свою уверенность — и только потом видите результат. Уверенность важна не меньше ответа: она показывает, можно ли доверять вашему «я знаю». Не знаете — так и скажите: честное «не знаю» стоит дешевле уверенной ошибки.</p>') +
        '</div>';
        html += '<div class="card">' + renderQuestions(n, 'new') + '</div>';
        html += t('<button class="btn btn--primary" id="checkNext" disabled>К рефлексии</button>');
        return html;
    }

    function bindCheckStage() {
        var n = BY_ID[sess().node];
        bindQuestions(n, 'new', function (allAnswered, allRight, firstTry) {
            var b = $('checkNext');
            if (!b) return;
            b.disabled = !allAnswered;
            if (allAnswered) {
                var rec = S.checks[n.id] || {};
                rec.passed = allRight;
                rec.firstTry = firstTry;
                S.checks[n.id] = rec;
                save();
            }
        });
        $('checkNext').addEventListener('click', function () { setStage(nextStage()); });
    }

    // ---------- Вопросы: общий рендер для проверки и повтора ----------
    // tmpAnswers — ответы текущего прохода. Хранятся в памяти, чтобы
    // повтор всегда шёл «с чистого листа», а не показывал прошлые клики.
    var tmpAnswers = {};

    function renderQuestions(n, mode) {
        var key = mode + ':' + n.id;
        var st = tmpAnswers[key] || (tmpAnswers[key] = { picked: [], conf: [], shown: [] });

        return '<div class="kicker">' + (mode === 'rev' ? t('Вспомните') : t('Проверка усвоения')) + '</div>' +
            n.check.map(function (c, qi) {
                var picked = st.picked[qi], conf = st.conf[qi], shown = st.shown[qi];
                var h = '<div class="q" data-q="' + qi + '">' +
                    t('<span class="q__n">Вопрос ') + (qi + 1) + ' / ' + n.check.length + '</span>' +
                    '<p class="q__t">' + esc(c.q) + '</p>';

                h += c.a.map(function (o, oi) {
                    var cls = 'opt';
                    if (shown) {
                        if (oi === c.ok) cls += ' is-right';
                        else if (oi === picked) cls += ' is-wrong';
                    } else if (oi === picked) cls += ' is-picked';
                    return '<button class="' + cls + '" data-q="' + qi + '" data-o="' + oi + '"' +
                        (shown ? ' disabled' : '') + '>' + esc(o) + '</button>';
                }).join('');

                if (picked === undefined && !shown) {
                    h += '<button class="btn btn--ghost btn--sm" data-decline="' + qi + t('" style="width:100%;margin-top:2px">Не знаю — покажите разбор</button>');
                }

                if (picked !== undefined && !shown) {
                    h += t('<div class="conf"><div class="conf__t">Насколько вы уверены в этом ответе?</div>') +
                        '<div class="conf__row">' + CONF.map(function (cf, ci) {
                            return '<button data-q="' + qi + '" data-c="' + ci + '"' +
                                (conf === ci ? ' class="is-on"' : '') + '><b>' + cf.n + '</b>' + cf.t + '</button>';
                        }).join('') + '</div></div>';
                }

                if (shown) {
                    var declined = picked === -1;
                    var right = !declined && picked === c.ok;
                    var cf = CONF[conf] || CONF[0];
                    var confErr = !right && !declined && cf.v >= CONF_ERR_MIN;

                    if (confErr) {
                        // Контраст показываем целиком и рядом: именно
                        // увиденная разница между «я думал» и «на самом
                        // деле» и делает такую ошибку исправимой.
                        h += '<div class="why why--err">' +
                            t('<b>Уверенная ошибка.</b> Вы были уверены на ') + Math.round(cf.v * 100) +
                            t('% — и ответ неверный. Это самое полезное, что случилось за сессию: ') +
                            t('уверенные ошибки исправляются прочнее прочих, если увидеть разницу сейчас.') +
                            '<div class="contrast">' +
                                t('<div class="contrast__row"><span>Вы ответили</span><b>') + esc(c.a[picked]) + '</b></div>' +
                                t('<div class="contrast__row is-ok"><span>Верно</span><b>') + esc(c.a[c.ok]) + '</b></div>' +
                            '</div>' +
                            '<div class="tiny" style="margin-top:8px">' + esc(c.why) + '</div>' +
                            t('<div class="tiny" style="margin-top:7px">Вопрос вернётся к вам при повторении — до тех пор он числится незакрытым.</div>') +
                        '</div>';
                    } else {
                        h += '<div class="why">' +
                            '<b>' + (declined ? t('Пропущено.') : (right ? t('Верно.') : t('Не так.'))) + '</b> ' + esc(c.why) +
                            '<div class="tiny" style="margin-top:7px">' + esc(declined
                                ? t('Признать незнание — правильный ход: калибровку это почти не портит, в отличие от уверенного угадывания. Вопрос вернётся при повторении.')
                                : calibNote(right, cf.v)) + '</div>' +
                        '</div>';
                    }
                }
                return h + '</div>';
            }).join('');
    }

    function calibNote(right, conf) {
        if (!right && conf >= 0.8) return t('Вы были уверены на ') + Math.round(conf * 100) + t('% и ошиблись. Такие ошибки запоминаются лучше всего — именно они правят картину мира.');
        if (!right && conf <= 0.6) return t('Ошибка при низкой уверенности — это честно: вы понимали, что не знаете. Отметьте пробел и вернитесь.');
        if (right && conf <= 0.6) return t('Верно, хотя вы не были уверены. Знаете лучше, чем думаете, — но проверьте, не угадали ли.');
        return t('Верно и уверенно — калибровка в порядке.');
    }

    function bindQuestions(n, mode, onChange) {
        var key = mode + ':' + n.id;
        var st = tmpAnswers[key];

        function report() {
            var allAnswered = n.check.every(function (c, i) { return st.shown[i]; });
            var allRight = n.check.every(function (c, i) { return st.picked[i] === c.ok; });
            var firstTry = allRight;
            onChange(allAnswered, allRight, firstTry);
        }

        document.querySelectorAll('.opt[data-q]').forEach(function (b) {
            b.addEventListener('click', function () {
                var qi = +b.dataset.q;
                if (st.shown[qi]) return;
                st.picked[qi] = +b.dataset.o;
                haptic();
                rerenderQuestions(n, mode, onChange);
            });
        });

        document.querySelectorAll('button[data-decline]').forEach(function (b) {
            b.addEventListener('click', function () {
                var qi = +b.dataset.decline;
                if (st.shown[qi]) return;
                st.picked[qi] = -1;
                st.conf[qi] = -1;
                st.shown[qi] = true;
                S.calib.push({
                    at: new Date().toISOString(), node: n.id, qi: qi,
                    conf: DECLINE_CONF, ok: false, declined: true, mode: mode
                });
                var recD = S.checks[n.id] || { answers: [], firstTry: true, tries: 0 };
                recD.answers = recD.answers || [];
                recD.answers[qi] = -1;
                recD.firstTry = false;
                S.checks[n.id] = recD;
                save();
                haptic();
                rerenderQuestions(n, mode, onChange);
            });
        });

        document.querySelectorAll('.conf__row button[data-c]').forEach(function (b) {
            b.addEventListener('click', function () {
                var qi = +b.dataset.q, ci = +b.dataset.c;
                st.conf[qi] = ci;
                st.shown[qi] = true;
                var c = n.check[qi];
                var right = st.picked[qi] === c.ok;
                // Журнал калибровки: заявленная уверенность против факта
                S.calib.push({
                    at: new Date().toISOString(), node: n.id, qi: qi,
                    conf: CONF[ci].v, ok: right, mode: mode
                });
                if (!right && CONF[ci].v >= CONF_ERR_MIN) noteConfError(n, qi, CONF[ci].v, st.picked[qi]);
                if (right) fixConfError(n.id, qi);   // тот же вопрос отвечен верно — ошибка закрыта
                // Ответы узла — для совместимости с index.html
                var rec = S.checks[n.id] || { answers: [], firstTry: true, tries: 0 };
                rec.answers = rec.answers || [];   // запись могла прийти из index.html
                rec.answers[qi] = st.picked[qi];
                if (!right) rec.firstTry = false;
                S.checks[n.id] = rec;
                save();
                haptic(right ? 'ok' : 'err');
                rerenderQuestions(n, mode, onChange);
            });
        });

        report();
    }

    function rerenderQuestions(n, mode, onChange) {
        var host = document.querySelector('.q') && document.querySelector('.q').parentElement;
        if (!host) return;
        host.innerHTML = renderQuestions(n, mode);
        bindQuestions(n, mode, onChange);
        syncMainButton();
    }

    // ---------- Рефлексия ----------
    var PRED_LABEL = { 1: t('впервые слышу'), 2: t('слышал, не применял'), 3: t('применял пару раз'), 4: t('владею уверенно') };

    /**
     * Форма рефлексии: короткая или полная.
     *
     * Четыре текстовых поля после каждой сессии со временем начинают
     * заполнять формально — и рефлексия превращается в налог. Поэтому
     * по умолчанию короткая форма, а полная включается сама там, где
     * разбирать действительно есть что: уверенная ошибка, первая
     * сессия, раз в неделю. Переключатель виден всегда — выбор за
     * человеком, система лишь предлагает разумное умолчание.
     */
    function reflectFull() {
        var s = sess();
        if (s.reflectMode) return s.reflectMode === 'full';
        if (S.reflect.length < 2) return true;                     // первые разы — полностью
        if (openConfErrors(s.node).length) return true;            // есть уверенная ошибка
        if (s.day) return true;                                    // день плана недели
        var wk = isoWeek(new Date());
        var thisWeekFull = S.reflect.filter(function (r) {
            try { return r.full && isoWeek(new Date(r.at)) === wk; } catch (e) { return false; }
        }).length;
        return thisWeekFull === 0;                                 // раз в неделю — полная
    }

    function renderReflect() {
        var s = sess(), n = BY_ID[s.node];
        var rec = S.checks[n.id] || {};
        var right = n.check.filter(function (c, i) { return (rec.answers || [])[i] === c.ok; }).length;
        var total = n.check.length;
        var full = reflectFull();

        var html = t('<div class="stage-label">Шаг ') + (visibleSteps().indexOf('reflect') + 1) + t(' · Рефлексия</div>');

        html += '<div class="card card--quiet" style="padding:11px 12px">' +
            '<div class="seg" id="rfMode">' +
                '<button data-m="short" class="' + (full ? '' : 'is-on') + t('">60 секунд</button>') +
                '<button data-m="full" class="' + (full ? 'is-on' : '') + t('">Полная</button>') +
            '</div>' +
            '<p class="tiny" style="margin-top:8px">' + (full
                ? t('Развёрнутая форма включена: сегодня есть что разобрать.')
                : t('Короткая форма: две строки и самооценка. Полная — когда есть что разбирать.')) + '</p>' +
        '</div>';

        // Честное сравнение прогноза и факта — ядро саморефлексии
        if (s.predicted) {
            var predPct = [0, 25, 50, 75, 95][s.predicted];
            var factPct = Math.round(right / total * 100);
            var gap = predPct - factPct;
            html += '<div class="card card--violet">' +
                t('<div class="kicker">Прогноз против факта</div>') +
                '<div class="split" style="margin-bottom:9px">' +
                    '<div class="stat stat--violet stat--text"><b>' + PRED_LABEL[s.predicted] + t('</b><span>вы сказали до изучения</span></div>') +
                    '<div class="stat"><b>' + right + '/' + total + t('</b><span>верных ответов</span></div>') +
                '</div>' +
                '<p class="muted">' + esc(gapVerdict(gap)) + '</p>' +
            '</div>';
        }

        html += '<div class="card">' +
            '<div class="kicker">' + (full ? '1 / 4' : '1 / 2') + t(' · Что изменилось</div>') +
            t('<div class="rf-prompt">Что вы теперь можете сделать, чего не могли двадцать минут назад?</div>') +
            t('<div class="rf-hint">Конкретное действие, а не «понял тему». Если сформулировать не выходит — это сигнал вернуться к материалу.</div>') +
            t('<textarea class="field" id="rfChanged" rows="3" placeholder="Например: ') + esc(shortApply(n)) + '"></textarea>' +
        '</div>';

        if (full) {
            // Намерение: событие вместо «на неделе» и свидетель.
            // Связка «конкретная ситуация → конкретное действие» даёт
            // заметно больше доведённых до дела намерений, чем решимость;
            // а из рабочей среды на применение навыка сильнее всего
            // влияют наличие подходящих задач и то, что результат
            // кто-то видит.
            html += '<div class="card">' +
                t('<div class="kicker">2 / 4 · Где применю</div>') +
                t('<div class="rf-prompt">Намерение «если — то»</div>') +
                t('<div class="rf-hint">Назовите событие, а не «на неделе»: заранее опознанный момент запускает действие почти сам.</div>') +
                '<div class="intent">' +
                    t('<div class="intent__row"><span class="intent__k">ЕСЛИ</span>') +
                        t('<input class="field" id="rfIf" placeholder="в понедельник, как только открою почту"></div>') +
                    t('<div class="intent__row"><span class="intent__k">ТО</span>') +
                        '<input class="field" id="rfThen" placeholder="' + esc(shortApply(n)) + '"></div>' +
                '</div>' +
                t('<label class="label" for="rfWitness">Кто на работе увидит результат?') +
                t('<span>Навык, который никто не видит, тихо отмирает. Это не про мотивацию: наличие подходящих задач и поддержка коллег предсказывают применение сильнее старательности.</span></label>') +
                t('<input class="field" id="rfWitness" placeholder="имя, чат или встреча — либо «некому»">') +
            '</div>';

            html += '<div class="card">' +
                t('<div class="kicker">3 / 4 · Что осталось мутным</div>') +
                t('<div class="rf-prompt">Сформулируйте это вопросом</div>') +
                t('<div class="rf-hint">Не «не понял про контекст», а «почему длинный документ ухудшает ответ». Разница в том, что на второе можно ответить — и проверить себя. Вопрос вернётся к вам в начале следующей сессии.</div>') +
                t('<textarea class="field" id="rfMuddy" rows="2" placeholder="Например: почему повтор того же вопроса не проверяет ответ?"></textarea>') +
            '</div>';
        }

        html += '<div class="card">' +
            '<div class="kicker">' + (full ? '4 / 4' : '2 / 2') + t(' · Самооценка</div>') +
            t('<div class="rf-prompt">Насколько уверенно вы примените это без подсказки?</div>') +
            t('<div class="rf-hint">От этого зависит, когда навык вернётся на повторение.</div>') +
            '<div class="rate" id="rfRate">' +
                [['😵', t('Не смогу'), 1], ['😐', t('С подсказкой'), 2], ['🙂', t('Медленно'), 3], ['😎', t('Свободно'), 4], ['🎓', t('Научу другого'), 5]]
                .map(function (p) { return '<button data-r="' + p[2] + '"><b>' + p[0] + '</b>' + p[1] + '</button>'; }).join('') +
            '</div>' +
        '</div>';

        html += t('<button class="btn btn--primary" id="rfDone" disabled>Завершить сессию</button>');
        html += t('<p class="tiny" style="text-align:center;margin-top:8px">Отметьте самооценку, чтобы завершить</p>');
        return html;
    }

    function gapVerdict(gap) {
        if (gap >= 40) return t('Разрыв большой: вы оценивали себя заметно выше результата. Это самая частая ловушка — узнавание материала принимают за умение его применять. Материал стоит вернуть в повторение.');
        if (gap >= 15) return t('Небольшая переоценка: узнать знакомое легче, чем применить. Проверка это и показала.');
        if (gap <= -25) return t('Вы недооценили себя: знали лучше, чем думали. Это тоже стоит заметить — заниженная оценка тормозит не меньше завышенной.');
        return t('Прогноз близок к факту — вы адекватно оцениваете свой уровень. Это редкость и это ценно.');
    }

    function bindReflect() {
        var chosen = null;
        var mode = $('rfMode');
        if (mode) mode.addEventListener('click', function (e) {
            var b = e.target.closest('button[data-m]');
            if (!b) return;
            sess().reflectMode = b.dataset.m;
            save(); renderSession();
        });
        var rate = $('rfRate');
        rate.addEventListener('click', function (e) {
            var b = e.target.closest('button[data-r]');
            if (!b) return;
            chosen = +b.dataset.r;
            rate.querySelectorAll('button').forEach(function (x) { x.classList.toggle('is-on', x === b); });
            $('rfDone').disabled = false;
            haptic();
            syncMainButton();
        });
        $('rfDone').addEventListener('click', function () {
            var val = function (id) { var el = $(id); return el ? (el.value || '').trim() : ''; };
            finishSession({
                changed: val('rfChanged').slice(0, 1200),
                ifPart: val('rfIf').slice(0, 200),
                thenPart: val('rfThen').slice(0, 200),
                witness: val('rfWitness').slice(0, 120),
                muddy: val('rfMuddy').slice(0, 600),
                rate: chosen,
                full: reflectFull()
            });
        });
    }

    // ---------- Завершение ----------
    function finishSession(rf) {
        var s = sess(), n = BY_ID[s.node];
        var rec = S.checks[n.id] || {};
        var allRight = n.check.every(function (c, i) { return (rec.answers || [])[i] === c.ok; });
        var firstTry = rec.firstTry !== false;

        // Запись в дневник
        var applyText = (rf.ifPart && rf.thenPart) ? (t('Если ') + rf.ifPart + t(', то ') + rf.thenPart) : '';
        S.reflect.push({
            at: new Date().toISOString(), node: n.id,
            predicted: s.predicted, right: n.check.filter(function (c, i) { return (rec.answers || [])[i] === c.ok; }).length,
            total: n.check.length,
            selfExpl: s.selfExpl || '', intent: s.intent || '',
            changed: rf.changed, apply: applyText, muddy: rf.muddy, rate: rf.rate,
            full: !!rf.full
        });
        // Намерение из рефлексии — с событием-триггером и свидетелем
        if (rf.ifPart && rf.thenPart) {
            S.intents.push({
                at: new Date().toISOString(), node: n.id,
                when: rf.ifPart, then: rf.thenPart, witness: rf.witness || '', done: null
            });
        }
        if (rf.muddy) S.gaps.push({ at: new Date().toISOString(), node: n.id, text: rf.muddy, closed: false, answer: '' });

        // Освоение узла — только если проверка пройдена
        var mastered = false;
        if (allRight && !isDone(n.id)) {
            S.skills.push(n.id);
            addXP(n.xp);
            s.gainedXP += n.xp;
            mastered = true;
        }
        // Планируем первое повторение
        schedule(n.id, gradeFrom(allRight, firstTry, rf.rate));

        // Синергии
        var newSyn = [];
        (C.SYNERGIES || []).forEach(function (sy) {
            if ((S.syn || []).indexOf(sy.id) !== -1) return;
            if (!sy.nodes.every(isDone)) return;
            S.syn.push(sy.id);
            newSyn.push(sy);
        });

        // День первой недели засчитываем за ПРОЙДЕННУЮ работу, а не за
        // безошибочность: если проверка не сдалась, узел вернётся сам
        // через повторение, а неделя не должна вставать колом.
        if (s.day) markWeekDay(s.day.day, true);

        touchStreak();
        S.sessions.push({
            at: new Date().toISOString(), node: n.id,
            reviews: s.reviews.length, xp: s.gainedXP, mastered: mastered,
            weekDay: s.day ? s.day.day : null
        });
        var gained = refreshAchievements();

        s.stage = 'done';
        s.mastered = mastered;
        s.newSyn = newSyn.map(function (x) { return x.id; });
        s.gainedAch = gained.map(function (x) { return x.id; });
        save();
        haptic('ok');
        renderSession();
        if (mastered) confetti();
    }

    function renderDone() {
        var s = sess();
        var n = s.node ? BY_ID[s.node] : null;
        var si = streakInfo();
        var p = xpProgress();
        var st = stageOf(S.level);

        var html = t('<div class="stage-label">Итог</div>');

        html += '<div class="card card--accent"><div class="result-hero">' +
            '<div class="result-hero__emoji">' + (s.mastered ? (n ? n.emoji : '🎓') : '🔁') + '</div>' +
            '<div class="result-hero__title">' + (s.mastered ? t('Навык освоен') : (s.mode === 'review-only' ? t('Повторение пройдено') : t('Сессия завершена'))) + '</div>' +
            (n && s.mastered ? '<p class="muted" style="margin-top:5px">' + esc(n.apply.now) + '</p>' : '') +
            (n && !s.mastered && s.mode !== 'review-only' ? t('<p class="muted" style="margin-top:5px">Проверка не пройдена полностью — узел вернётся к вам завтра. Это не провал, а точное указание, куда смотреть.</p>') : '') +
        '</div>' +
        '<div class="stats">' +
            '<div class="stat"><b>+' + s.gainedXP + t('</b><span>XP за сессию</span></div>') +
            '<div class="stat stat--violet"><b>' + si.value + '</b><span>' + plural(si.value, t('день подряд'), t('дня подряд'), t('дней подряд')) + '</span></div>' +
            '<div class="stat stat--plain"><b>' + S.skills.length + '/' + NODES.length + t('</b><span>навыков</span></div>') +
        '</div></div>';

        if (n) {
            var r = S.srs[n.id];
            if (r) html += t('<div class="card card--violet"><div class="kicker">Следующая проверка</div>') +
                t('<p class="muted">Этот навык вернётся ') + esc(fmtDateFull(r.due)) + t(' — через ') + r.interval + ' ' +
                plural(r.interval, t('день'), t('дня'), t('дней')) + t('. Интервал растёт, пока вы отвечаете верно: так знание закрепляется без зубрёжки.</p></div>');
        }

        (s.newSyn || []).forEach(function (id) {
            var sy = (C.SYNERGIES || []).filter(function (x) { return x.id === id; })[0];
            if (!sy) return;
            html += t('<div class="card card--accent"><div class="kicker">Синергия открыта</div>') +
                '<div class="h3">' + sy.emoji + ' ' + esc(sy.name) + '</div>' +
                '<p class="muted" style="margin-top:4px">' + esc(sy.gives) + '</p></div>';
        });

        (s.gainedAch || []).forEach(function (id) {
            var a = ACH.filter(function (x) { return x.id === id; })[0];
            if (!a) return;
            html += t('<div class="card"><div class="kicker">Достижение</div>') +
                '<div class="h3">' + a.e + ' ' + esc(a.n) + '</div><p class="tiny">' + esc(a.d) + '</p></div>';
        });

        html += t('<div class="card"><div class="kicker">Уровень</div>') +
            '<div class="h3">' + st.e + ' ' + esc(st.n) + t(' · уровень ') + S.level + '</div>' +
            '<div class="bar" style="margin-top:9px"><div class="bar__fill" style="width:' + p.pct + '%"></div></div>' +
            '<p class="tiny" style="margin-top:6px">' + Math.floor(p.cur) + ' / ' + p.total + t(' XP до следующего уровня</p></div>');

        var next = recommend();
        if (next.node) {
            html += t('<div class="card"><div class="kicker">Дальше</div>') +
                '<button class="node-row" id="nextNode"><span class="node-row__e">' + next.node.emoji + '</span>' +
                '<span class="node-row__b"><span class="node-row__t">' + esc(next.node.title) + '</span>' +
                '<span class="node-row__m">' + esc(next.why) + '</span></span>' +
                '<span class="node-row__s">→</span></button></div>';
        }

        html += t('<button class="btn btn--primary" id="finishBtn">Закрыть сессию</button>');
        html += t('<button class="btn btn--ghost btn--sm" id="toJournal" style="width:100%;margin-top:8px">Открыть дневник</button>');
        return html;
    }

    function fmtDateFull(d) {
        try {
            return new Date(d + 'T12:00:00').toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
        } catch (e) { return d; }
    }

    function bindDone() {
        $('finishBtn').addEventListener('click', function () {
            S.session = null; save(); renderSession(); renderPath(); renderJournal(); renderProfile();
        });
        var t = $('toJournal');
        if (t) t.addEventListener('click', function () { S.session = null; save(); switchTab('journal'); });
        var nn = $('nextNode');
        if (nn) nn.addEventListener('click', function () {
            var rec = recommend();
            if (!rec.node) return;
            S.session = newSession(rec.node.id);
            save(); renderSession(); window.scrollTo({ top: 0 });
        });
    }

    // ============================================================
    //  Вкладка ПУТЬ
    // ============================================================
    var pathFilter = 'now';

    function renderPath() {
        var host = $('pathBody');
        var tp = trackProgress();
        var trFr = framing(tp.done, tp.total);
        var tr = S.profile.track && TRACKS[S.profile.track];
        var due = dueNodes();

        var html = '';

        html += '<div class="card card--accent">' +
            t('<div class="kicker">Ваш трек</div>') +
            (tr ? '<div class="h2">' + tr.emoji + ' ' + esc(tr.name) + '</div><p class="muted">' + esc(tr.goal) + '</p>'
                : t('<div class="h2">Трек не выбран</div><p class="muted">Показаны все узлы. Выбор трека сузит путь до того, что нужно именно вам.</p>')) +
            '<div class="bar" style="margin-top:11px"><div class="bar__fill" style="width:' + tp.pct + '%"></div></div>' +
            '<p class="tiny" style="margin-top:6px">' + trFr.n + ' ' + trFr.label + t(' из ') + tp.total + t(' узлов') + (tr ? t(' трека') : '') + '</p>' +
            '<button class="btn btn--ghost btn--sm" id="changeTrack" style="width:100%;margin-top:10px">' +
                (tr ? t('Сменить трек') : t('Выбрать трек')) + '</button>' +
        '</div>';

        // План первой недели — тот самый отобранный минимум
        var wp = weekPlan();
        if (wp) {
            var wdone = (S.week && S.week.done) || [];
            html += t('<div class="card"><div class="kicker">Первая неделя</div>') +
                '<div class="h3">' + esc(wp.outcome) + '</div>' +
                t('<p class="tiny" style="margin:5px 0 11px">Отобрано по одному правилу: даёт видимый результат в рабочей задаче за один заход. Остальное важно, но не в первые семь дней.</p>') +
                wp.days.map(function (d) {
                    var nd = BY_ID[d.node];
                    var isDoneDay = wdone.indexOf(d.day) !== -1;
                    var isNext = weekNextDay() && weekNextDay().day === d.day;
                    return '<button class="node-row' + (isDoneDay ? ' is-done' : '') + (isNext ? ' is-due' : '') + '" data-week-day="' + d.day + '">' +
                        '<span class="node-row__e">' + (isDoneDay ? '✓' : d.day) + '</span>' +
                        '<span class="node-row__b"><span class="node-row__t">' + esc(nd ? nd.title : d.node) + '</span>' +
                        '<span class="node-row__m">' + esc(d.focus) + '</span></span>' +
                        '<span class="node-row__s">' + (isDoneDay ? '' : '→') + '</span></button>';
                }).join('') +
                (S.week && S.week.mode === 'free' && !weekFinished()
                    ? t('<button class="btn btn--ghost btn--sm" id="weekBack" style="width:100%;margin-top:9px">Вести меня по плану недели</button>')
                    : '') +
            '</div>';
        }

        // Ключевая идея каждого уровня сложности. Для своего трека они
        // свои: «главное на продвинутом» у инженера безопасности и у
        // инженера памяти — разные вещи. Без трека берём общие.
        var lvlSrc = (wp && wp.levels) || C.LEVEL_KEYS;
        if (lvlSrc) {
            html += '<div class="card card--quiet">' +
                t('<div class="kicker">Что главное на каждом уровне') + (wp && wp.levels && tr ? ' · ' + esc(tr.name) : '') + '</div>' +
                t('<p class="tiny" style="margin-bottom:11px">По одной мысли на уровень — той, без которой остальное на этом уровне не складывается.</p>') +
                Object.keys(LEVELS).map(function (lk) {
                    var K2 = lvlSrc[lk];
                    if (!K2) return '';
                    return '<div style="margin-bottom:12px">' +
                        '<div class="h3">' + LEVELS[lk].emoji + ' ' + esc(LEVELS[lk].name) + '</div>' +
                        '<p class="muted" style="font-size:.86rem;margin-top:2px">' + esc(K2.key) + '</p>' +
                        t('<p class="tiny" style="margin-top:4px">Усвоено, когда: ') + esc(K2.evidence) + '</p>' +
                    '</div>';
                }).join('') + '</div>';
        }

        // Куда идти глубже именно по этому треку — из разбора трека
        if (wp && wp.anchors && wp.anchors.length) {
            html += t('<div class="card"><div class="kicker">Первоисточники по треку</div>') +
                t('<p class="tiny" style="margin-bottom:10px">Что взять из открытых курсов именно под ваш трек — и что оттуда пригодится уже на первой неделе.</p>') +
                wp.anchors.map(function (a) {
                    return '<div style="margin-bottom:10px"><div class="h3">' + esc(a.source) + '</div>' +
                        '<p class="tiny">' + esc(a.take) + '</p></div>';
                }).join('') + '</div>';
        }

        // Прогресс по уровням сложности
        html += t('<div class="card"><div class="kicker">По сложности</div>');
        Object.keys(LEVELS).forEach(function (lk) {
            var L = LEVELS[lk];
            var all = NODES.filter(function (n) { return n.level === lk && inTrack(n); });
            var d = all.filter(function (n) { return isDone(n.id); }).length;
            var pct = all.length ? Math.round(d / all.length * 100) : 0;
            html += '<div style="margin-bottom:11px">' +
                '<div style="display:flex;justify-content:space-between;font-size:.84rem;margin-bottom:5px">' +
                    '<span>' + L.emoji + ' ' + esc(L.name) + '</span>' +
                    '<span class="mono tiny">' + d + '/' + all.length + '</span></div>' +
                '<div class="bar"><div class="bar__fill" style="width:' + pct + '%"></div></div>' +
                '<p class="tiny" style="margin-top:4px">' + esc(L.mindset) + '</p>' +
            '</div>';
        });
        html += '</div>';

        // Фильтр
        html += t('<div class="card"><div class="kicker">Навыки</div>') +
            '<div class="seg" id="pathSeg" style="margin-bottom:11px">' +
                [['now', t('Доступно')], ['due', t('К повтору') + (due.length ? ' · ' + due.length : '')], ['done', t('Освоено')], ['all', t('Всё')]]
                .map(function (f) { return '<button data-f="' + f[0] + '" class="' + (pathFilter === f[0] ? 'is-on' : '') + '">' + f[1] + '</button>'; }).join('') +
            '</div>' + renderNodeList() + '</div>';

        // Синергии с эффектом близкой цели
        var syn = (C.SYNERGIES || []).map(function (sy) {
            var have = sy.nodes.filter(isDone).length;
            return { sy: sy, have: have, total: sy.nodes.length, open: (S.syn || []).indexOf(sy.id) !== -1 };
        }).sort(function (a, b) { return (b.have / b.total) - (a.have / a.total); });

        html += t('<div class="card"><div class="kicker">Синергии</div>') +
            t('<p class="tiny" style="margin-bottom:10px">Ценность даёт не отдельный навык, а сочетание. Комбинация открывается сама, когда освоены оба узла.</p>') +
            syn.map(function (r) {
                return '<div style="margin-bottom:11px;opacity:' + (r.open ? 1 : 0.82) + '">' +
                    '<div style="display:flex;justify-content:space-between;gap:8px;font-size:.86rem">' +
                        '<span>' + r.sy.emoji + ' <b>' + esc(r.sy.name) + '</b></span>' +
                        '<span class="mono tiny" style="flex:none">' + (r.open ? t('✓ открыта') : r.have + '/' + r.total) + '</span></div>' +
                    '<div class="bar bar--violet" style="margin-top:5px"><div class="bar__fill" style="width:' + (r.have / r.total * 100) + '%"></div></div>' +
                    '<p class="tiny" style="margin-top:4px">' + esc(r.open ? r.sy.gives : t('Осталось: ') +
                        r.sy.nodes.filter(function (id) { return !isDone(id); }).map(function (id) { return BY_ID[id] ? BY_ID[id].title : id; }).join(', ')) + '</p>' +
                '</div>';
            }).join('') + '</div>';

        html += renderRefs();

        html += t('<div class="card card--quiet"><div class="kicker">Карта целиком</div>') +
            t('<p class="muted">Граф знаний со всеми связями и «туманом войны» — на отдельном экране.</p>') +
            t('<a class="btn btn--ghost btn--sm" href="index.html" style="width:100%;margin-top:9px;text-decoration:none">Открыть карту знаний</a></div>');

        host.innerHTML = html;
        bindPath();
    }

    function renderNodeList() {
        var due = dueNodes();
        var list;
        if (pathFilter === 'now') list = NODES.filter(isAvailable).filter(inTrack);
        else if (pathFilter === 'due') list = due.map(function (id) { return BY_ID[id]; });
        else if (pathFilter === 'done') list = NODES.filter(function (n) { return isDone(n.id); });
        else list = NODES.filter(inTrack);

        if (pathFilter === 'now' && !list.length) list = NODES.filter(isAvailable);

        if (!list.length) {
            return t('<div class="empty"><span class="empty__e">🗺️</span>Здесь пока пусто. Осваивайте доступные узлы — соседние откроются следом.</div>');
        }

        list = list.slice().sort(function (a, b) {
            return levelOrder(a.level) - levelOrder(b.level) || a.reqLevel - b.reqLevel;
        });

        return list.map(function (n) {
            var done = isDone(n.id);
            var avail = isAvailable(n);
            var isDue = due.indexOf(n.id) !== -1;
            var cls = 'node-row' + (isDue ? ' is-due' : (done ? ' is-done' : (avail ? '' : ' is-locked')));
            var mark = isDue ? '↻' : (done ? '✓' : (avail ? '→' : '🔒'));
            var L = LEVELS[n.level];
            var meta = (L ? L.emoji + ' ' + L.name : '') +
                (!avail && !done ? t(' · сначала предпосылки') : '') +
                (isDue ? t(' · пора повторить') : '');
            return '<button class="' + cls + '" data-node="' + n.id + '"' + (!avail && !done ? ' disabled' : '') + '>' +
                '<span class="node-row__e">' + n.emoji + '</span>' +
                '<span class="node-row__b"><span class="node-row__t">' + esc(n.title) + '</span>' +
                '<span class="node-row__m">' + esc(meta) + '</span></span>' +
                '<span class="node-row__s">' + mark + '</span></button>';
        }).join('');
    }

    function bindPath() {
        var seg = $('pathSeg');
        if (seg) seg.addEventListener('click', function (e) {
            var b = e.target.closest('button[data-f]');
            if (!b) return;
            pathFilter = b.dataset.f;
            renderPath();
        });
        document.querySelectorAll('#pathBody .node-row[data-node]').forEach(function (b) {
            b.addEventListener('click', function () {
                var id = b.dataset.node;
                if (!BY_ID[id]) return;
                startWithNode(id);
            });
        });
        var ct = $('changeTrack');
        if (ct) ct.addEventListener('click', function () { openOnboarding(true); });

        document.querySelectorAll('[data-week-day]').forEach(function (b) {
            b.addEventListener('click', function () {
                var d = weekDayByNum(+b.dataset.weekDay);
                if (!d || !BY_ID[d.node]) return;
                if (isDone(d.node)) { startWithNode(d.node); return; }
                if (!isAvailable(BY_ID[d.node])) {
                    toast(t('Ещё рано'), t('Сначала предыдущие дни: этот узел опирается на них.'));
                    return;
                }
                S.session = newSession(d.node, { day: d });
                save(); switchTab('session'); renderSession();
            });
        });
        var wb = $('weekBack');
        if (wb) wb.addEventListener('click', function () {
            if (S.week) { S.week.mode = 'week'; save(); }
            toast(t('План недели'), t('Веду по плану. Выключить можно на экране сессии.'));
            renderPath(); renderSession();
        });
    }

    function startWithNode(id) {
        var n = BY_ID[id];
        if (isDone(id)) {
            // Повтор освоенного по требованию
            S.session = newSession(null, { mode: 'review-only' });
            S.session.reviews = [id];
            delete tmpAnswers['rev:' + id];
            save(); switchTab('session'); setStage('review');
            return;
        }
        if (!isAvailable(n)) {
            var need = (n.prereqs || []).filter(function (p) { return !isDone(p); })
                .map(function (p) { return BY_ID[p] ? BY_ID[p].title : p; });
            toast(t('Ещё рано'), t('Сначала: ') + need.join(', ') + t('. Без этого узел не на что опереть.'));
            return;
        }
        S.session = newSession(id);
        save(); switchTab('session'); renderSession();
    }

    // ---------- Ориентиры: открытые курсы ----------
    // Заполняется ниже (REFS). Пустой массив — блок просто не рисуется.
    function renderRefs() {
        if (!window.MEDOEDUZ_REFS || !window.MEDOEDUZ_REFS.length) return '';
        var relevant = window.MEDOEDUZ_REFS.filter(function (r) {
            if (!r.branches) return true;
            return r.branches.some(function (b) {
                return NODES.some(function (n) { return n.branch === b && inTrack(n); });
            });
        });
        if (!relevant.length) return '';
        return t('<div class="card"><div class="kicker">Куда идти глубже</div>') +
            t('<p class="tiny" style="margin-bottom:11px">Бесплатные первоисточники по темам курса. Мы не пересказываем их — здесь навык и практика, там глубина и детали.</p>') +
            relevant.map(function (r) {
                return '<div style="margin-bottom:12px">' +
                    '<div class="h3"><a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(r.title) + '</a></div>' +
                    '<p class="tiny">' + esc(r.by) + ' · ' + esc(r.what) + '</p>' +
                '</div>';
            }).join('') + '</div>';
    }

    // ============================================================
    //  Вкладка ДНЕВНИК
    // ============================================================
    function weeklyDue() {
        var wk = isoWeek(new Date());
        if (S.weekly.some(function (w) { return w.week === wk; })) return false;
        // Обзор предлагается, если на этой неделе была хотя бы одна сессия
        return S.sessions.some(function (s) {
            try { return isoWeek(new Date(s.at)) === wk; } catch (e) { return false; }
        });
    }

    function weeklyCard() {
        if (!weeklyDue()) return '';
        return '<div class="card card--violet" id="weeklyCard">' +
            t('<div class="kicker">Недельный обзор</div>') +
            t('<div class="h3">Три вопроса о прошедшей неделе</div>') +
            t('<p class="tiny" style="margin:4px 0 10px">Обучение закрепляется не на занятии, а при разборе того, что вышло и что нет.</p>') +
            t('<label class="label" for="wkApplied">Что из намеченного вы реально применили?</label>') +
            t('<textarea class="field" id="wkApplied" rows="2" placeholder="Конкретно: где, когда, с каким результатом"></textarea>') +
            t('<label class="label" for="wkFailed">Что не сработало или не дошло до дела?</label>') +
            t('<textarea class="field" id="wkFailed" rows="2" placeholder="Без самобичевания — просто факт и причина"></textarea>') +
            t('<label class="label" for="wkChange">Что меняете на следующей неделе?</label>') +
            t('<textarea class="field" id="wkChange" rows="2" placeholder="Одно изменение, а не список из десяти"></textarea>') +
            t('<button class="btn btn--violet" id="wkSave" style="margin-top:11px">Сохранить обзор</button>') +
        '</div>';
    }

    function bindWeekly() {
        var b = $('wkSave');
        if (!b) return;
        b.addEventListener('click', function () {
            S.weekly.push({
                at: new Date().toISOString(), week: isoWeek(new Date()),
                applied: ($('wkApplied').value || '').trim().slice(0, 1000),
                failed: ($('wkFailed').value || '').trim().slice(0, 1000),
                change: ($('wkChange').value || '').trim().slice(0, 1000)
            });
            refreshAchievements();
            save(); haptic('ok');
            toast(t('Дневник'), t('Недельный обзор сохранён. Через неделю сравните — это и есть видимый рост.'));
            renderSession(); renderJournal(); renderTop();
        });
    }

    var journalTab = 'calib';

    function renderJournal() {
        var host = $('journalBody');
        var html = '';

        html += '<div class="card"><div class="seg seg--scroll" id="jSeg">' +
            [['calib', t('Калибровка')], ['shelf', t('Витрина')], ['entries', t('Записи')], ['gaps', t('Пробелы')], ['intents', t('Намерения')]]
            .map(function (t) { return '<button data-j="' + t[0] + '" class="' + (journalTab === t[0] ? 'is-on' : '') + '">' + t[1] + '</button>'; }).join('') +
        '</div></div>';

        html += weeklyCard();

        if (journalTab === 'calib') html += renderCalib();
        else if (journalTab === 'shelf') html += renderShelf();
        else if (journalTab === 'entries') html += renderEntries();
        else if (journalTab === 'gaps') html += renderGaps();
        else html += renderIntents();

        host.innerHTML = html;
        bindJournal();
    }

    function renderCalib() {
        var st = calibStats();
        var html = '<div class="card">' +
            t('<div class="kicker">Калибровка</div>') +
            t('<div class="h2">Совпадает ли ваша уверенность с фактом</div>') +
            t('<p class="muted" style="margin-top:4px">Знать — половина дела. Вторая половина — понимать, где ваше знание кончается. Здесь видно и то, и другое.</p>');

        if (!st) {
            html += t('<div class="empty"><span class="empty__e">🎯</span>Пройдите проверку хотя бы по одному узлу — и здесь появится ваша калибровка.</div></div>');
            return html;
        }

        var brierPct = Math.round(st.brier * 1000) / 1000;
        html += '<div class="stats" style="margin-top:12px">' +
            '<div class="stat"><b>' + brierPct.toFixed(3) + t('</b><span>Брайер (0 — идеал)</span></div>') +
            '<div class="stat stat--violet"><b>' + Math.round(st.meanConf * 100) + t('%</b><span>средняя уверенность</span></div>') +
            '<div class="stat stat--plain"><b>' + Math.round(st.accuracy * 100) + t('%</b><span>фактическая точность</span></div>') +
        '</div>';

        html += '<div class="note ' + (Math.abs(st.bias) > 0.15 ? '' : 'note--accent') + '" style="margin-top:12px">' +
            esc(calibVerdict(st)) + '</div>';

        // Гистограмма: заявлено против факта
        var shown = st.buckets.filter(function (b) { return b.total > 0; });
        if (shown.length) {
            html += '<div class="calib">' + shown.map(function (b) {
                var acc = b.total ? b.ok / b.total : 0;
                return '<div class="calib__col"><div class="calib__pair">' +
                    '<div class="calib__bar calib__bar--said" style="height:' + Math.max(2, b.v * 100) + '%"></div>' +
                    '<div class="calib__bar calib__bar--was" style="height:' + Math.max(2, acc * 100) + '%"></div>' +
                    '</div><span class="calib__x">' + b.n + '</span></div>';
            }).join('') + '</div>' +
            t('<div class="legend"><span><i style="background:var(--violet)"></i>заявленная уверенность</span>') +
            t('<span><i style="background:var(--accent)"></i>фактическая точность</span></div>') +
            t('<p class="tiny" style="margin-top:8px">Столбики одной высоты — идеальная калибровка. Фиолетовый выше бирюзового — переоценка себя.</p>');
        }

        html += t('<p class="tiny" style="margin-top:10px">Ответов с оценкой уверенности: ') + st.n +
            (st.declined ? t(' · из них честных «не знаю»: ') + st.declined : '') + '</p>';
        html += '</div>';

        // Разбор по зонам. Одинаковый Брайер выходит и у осторожного,
        // который всегда ставит 35%, и у самоуверенного, который врёт
        // на 95%. Действия в этих случаях противоположные, поэтому
        // одно число ничего не подсказывает — нужна разбивка.
        // Порог согласован с вердиктом выше: пока данных мало, таблица
        // не выносит суждений — иначе на одном экране «данных мало» и
        // уверенный вывод по четырём ответам.
        var zones = st.buckets.filter(function (z) { return z.total >= 3; });
        if (zones.length >= 2 && st.n >= 10) {
            var worst = null;
            zones.forEach(function (z) {
                var gap = z.v - (z.ok / z.total);
                if (!worst || gap > worst.gap) worst = { z: z, gap: gap };
            });
            html += t('<div class="card"><div class="kicker">Где именно вы себе врёте</div>') +
                t('<table class="zones"><thead><tr><th>Уверенность</th><th>Говорили</th><th>На деле</th><th>Ответов</th></tr></thead><tbody>') +
                zones.slice().reverse().map(function (z) {
                    var acc = Math.round(z.ok / z.total * 100);
                    var isWorst = worst && worst.z === z && worst.gap > 0.15;
                    return '<tr' + (isWorst ? ' class="is-bad"' : '') + '><td>' + z.n + '</td><td>' +
                        Math.round(z.v * 100) + '%</td><td>' + acc + '%</td><td>' + z.total + '</td></tr>';
                }).join('') +
                '</tbody></table>' +
                '<p class="tiny" style="margin-top:10px">' + esc(worst && worst.gap > 0.15
                    ? t('Разрыв больше всего в зоне «') + worst.z.n + t('»: там вы заявляете ') + Math.round(worst.z.v * 100) +
                      t('%, а попадаете в ') + Math.round(worst.z.ok / worst.z.total * 100) + t('%. Практический вывод: именно в этой зоне ') +
                      t('ваше «я уверен» стоит перепроверять внешним источником, а не полагаться на ощущение.')
                    : t('Заметного перекоса по зонам нет: заявленная уверенность держится близко к фактической на всём диапазоне.')) + '</p>' +
            '</div>';
        }

        // Уверенные ошибки — отдельно от общей статистики
        var ce = S.confErr || [];
        if (ce.length) {
            var fixed = ce.filter(function (e) { return e.fixed; }).length;
            var open = ce.length - fixed;
            html += t('<div class="card"><div class="kicker">Уверенные ошибки</div>') +
                t('<p class="muted">Ответы, где вы были уверены на 80% и выше — и ошиблись. Такие ошибки исправляются прочнее прочих, поэтому они вынесены отдельно и возвращаются, пока не закрыты верным ответом.</p>') +
                '<div class="stats" style="margin-top:12px">' +
                    '<div class="stat"><b>' + fixed + t('</b><span>исправлено</span></div>') +
                    '<div class="stat stat--violet"><b>' + open + t('</b><span>ещё открыты</span></div>') +
                    '<div class="stat stat--plain"><b>' + ce.length + t('</b><span>всего</span></div>') +
                '</div>' +
                (open ? '<div style="margin-top:12px">' + openConfErrors().slice(-5).reverse().map(function (e) {
                    var nn = BY_ID[e.node];
                    return '<button class="node-row" data-node="' + esc(e.node) + '">' +
                        '<span class="node-row__e">' + (nn ? nn.emoji : '•') + '</span>' +
                        '<span class="node-row__b"><span class="node-row__t">' + esc(nn ? nn.title : e.node) + '</span>' +
                        t('<span class="node-row__m">заявляли ') + Math.round(e.conf * 100) + '% · ' + fmtDate(e.at) + '</span></span>' +
                        '<span class="node-row__s">↻</span></button>';
                }).join('') + '</div>' : '') +
            '</div>';
        }

        // Подбор сложности. Ориентир ~85% верных ответов — доля, при
        // которой обучение идёт быстрее всего: слишком легко — нет
        // нового, слишком тяжело — нет опоры.
        if (st.n >= 10) {
            var acc = Math.round(st.accuracy * 100);
            var advice = acc >= 92
                ? t('Вы отвечаете почти без ошибок (') + acc + t('%). Это приятно, но означает, что материал для вас лёгкий: берите узлы уровнем выше — учиться на грани возможного эффективнее.')
                : (acc < 60
                    ? t('Верных ответов ') + acc + t('% — материал идёт тяжело. Не «дожимайте»: вернитесь на уровень ниже и закрепите основу, иначе следующий слой ляжет на пустоту.')
                    : t('Верных ответов ') + acc + t('% — вы в рабочей зоне. Примерно на этом уровне сложности обучение идёт быстрее всего: достаточно ошибок, чтобы было чему учиться, и достаточно опоры, чтобы не буксовать.'));
            html += t('<div class="card card--quiet"><div class="kicker">Сложность</div>') +
                '<p class="muted">' + esc(advice) + '</p></div>';
        }

        // Связь с курсом — тот же показатель есть в программе
        if (BY_ID['brier']) {
            html += t('<div class="card card--quiet"><div class="kicker">Это не игрушка</div>') +
                t('<p class="muted">Оценка Брайера, которую вы видите на себе, — рабочий инструмент из узла «') +
                esc(BY_ID['brier'].title) + t('». Прежде чем измерять калибровку моделей, полезно измерить свою.</p>') +
                (isDone('brier') ? '' : '<p class="tiny" style="margin-top:6px">' +
                    (isAvailable(BY_ID['brier'])
                        ? t('Узел уже открыт — можно брать в работу.')
                        : t('Узел откроется, когда будут освоены его предпосылки: ') +
                          (BY_ID['brier'].prereqs || []).filter(function (p) { return !isDone(p); })
                            .map(function (p) { return BY_ID[p] ? BY_ID[p].title : p; }).join(', ') + '.') +
                    '</p>') +
            '</div>';
        }

        // Удержание
        var ret = countRetained();
        var due = dueNodes().length;
        html += t('<div class="card"><div class="kicker">Удержание</div>') +
            '<div class="stats">' +
                '<div class="stat"><b>' + ret + t('</b><span>навыков прошли 2+ повтора</span></div>') +
                '<div class="stat stat--violet"><b>' + due + t('</b><span>ждут повтора сейчас</span></div>') +
                '<div class="stat stat--plain"><b>' + S.sessions.length + t('</b><span>сессий всего</span></div>') +
            '</div>' +
            t('<p class="tiny" style="margin-top:9px">Освоенное без повторов забывается. Интервал между проверками растёт сам, пока вы отвечаете верно.</p>') +
        '</div>';

        return html;
    }

    function renderShelf() {
        var list = (S.artifacts || []).slice().reverse();
        var cold = (S.coldJol || []);
        var html = '<div class="card">' +
            '<div class="kicker">' + t('Витрина') + '</div>' +
            '<div class="h2">' + t('Что вы можете показать') + '</div>' +
            '<p class="muted" style="margin-top:4px">' + t('Не число пройденных узлов, а артефакты: таблицы, шаблоны, логи, регламенты. Единственная метрика обучения, которую нельзя накликать.') + '</p>' +
            (list.length ? '<div class="stats" style="margin-top:12px">' +
                '<div class="stat"><b>' + list.length + '</b><span>' + t('артефактов') + '</span></div>' +
                '<div class="stat stat--violet"><b>' + Math.round(list.length / Math.max(1, S.skills.length) * 100) + '%</b><span>' + t('узлов со следом') + '</span></div>' +
                '<div class="stat stat--plain"><b>' + S.skills.length + '</b><span>' + t('навыков') + '</span></div>' +
            '</div>' : '') +
        '</div>';

        if (!list.length) {
            html += '<div class="card"><div class="empty"><span class="empty__e">🗂️</span>' +
                t('Пусто. Артефакт отмечается на шаге практики — когда доказательство реально существует, а не «примерно понял».') + '</div></div>';
        } else {
            html += '<div class="card">' + list.map(function (a) {
                var n = BY_ID[a.node];
                return '<div class="entry" style="border-left-color:var(--accent)">' +
                    '<div class="entry__h"><span class="entry__t">' + (n ? n.emoji + ' ' + esc(n.title) : esc(a.node)) + '</span>' +
                    '<span class="entry__d">' + fmtDate(a.at) + '</span></div>' +
                    '<div class="entry__a">' + esc(a.what) + '</div></div>';
            }).join('') + '</div>';
        }

        // Холодная память: прогноз против факта, накопленный по повторам
        if (cold.length) {
            var over = cold.filter(function (c) { return c.said >= 3 && c.got <= 1; }).length;
            var under = cold.filter(function (c) { return c.said <= 2 && c.got >= 2; }).length;
            var hit = cold.length - over - under;
            html += '<div class="card"><div class="kicker">' + t('Холодная память') + '</div>' +
                '<p class="muted">' + t('Насколько точно вы предсказываете, что вспомните, ещё не увидев вопросов. Это другой навык, чем помнить: он отвечает за то, когда вы полезете перепроверять, а когда доверитесь себе.') + '</p>' +
                '<div class="stats" style="margin-top:12px">' +
                    '<div class="stat"><b>' + hit + '</b><span>' + t('прогноз совпал') + '</span></div>' +
                    '<div class="stat stat--violet"><b>' + over + '</b><span>' + t('думали, что помните') + '</span></div>' +
                    '<div class="stat stat--plain"><b>' + under + '</b><span>' + t('недооценили себя') + '</span></div>' +
                '</div>' +
                '<p class="tiny" style="margin-top:9px">' + esc(over > under && over >= 2
                    ? t('Перекос в переоценку: знакомый материал вы принимаете за вспоминаемый. Практический вывод — перед важной задачей проверяйте себя вопросом, а не ощущением узнавания.')
                    : (under > over && under >= 2
                        ? t('Перекос в недооценку: помните лучше, чем думаете. Это тоже стоит денег — лишние перепроверки съедают время.')
                        : t('Прогнозы близки к факту. Своему ощущению «помню / не помню» можно доверять.'))) + '</p>' +
            '</div>';
        }
        return html;
    }

    function renderEntries() {
        if (!S.reflect.length) {
            return '<div class="card"><div class="empty"><span class="empty__e">📓</span>' +
                t('Записи появляются после рефлексии в конце сессии. Это ваш личный след обучения — не отчёт для кого-то.</div></div>');
        }
        var html = t('<div class="card"><div class="kicker">Записи · ') + S.reflect.length + '</div>' +
            t('<p class="tiny" style="margin-bottom:11px">От новых к старым. Перечитывание собственных записей через месяц показывает рост нагляднее любой шкалы.</p></div>');

        html += S.reflect.slice().reverse().slice(0, 60).map(function (r) {
            var n = BY_ID[r.node];
            var parts = '';
            if (r.changed) parts += t('<div class="entry__q">Что изменилось</div><div class="entry__a">') + esc(r.changed) + '</div>';
            if (r.apply) parts += t('<div class="entry__q">Где применю</div><div class="entry__a">') + esc(r.apply) + '</div>';
            if (r.muddy) parts += t('<div class="entry__q">Осталось мутным</div><div class="entry__a">') + esc(r.muddy) + '</div>';
            if (r.selfExpl) parts += t('<div class="entry__q">Своими словами</div><div class="entry__a">') + esc(r.selfExpl) + '</div>';
            if (!parts) parts = t('<div class="entry__a tiny">Без текстовых заметок.</div>');
            return '<div class="entry">' +
                '<div class="entry__h"><span class="entry__t">' + (n ? n.emoji + ' ' + esc(n.title) : esc(r.node)) + '</span>' +
                '<span class="entry__d">' + fmtDate(r.at) + '</span></div>' +
                '<div class="chips" style="margin-bottom:6px">' +
                    (r.right !== undefined ? t('<span class="chip">Проверка ') + r.right + '/' + r.total + '</span>' : '') +
                    (r.rate ? t('<span class="chip">Самооценка ') + r.rate + '/5</span>' : '') +
                    (r.predicted ? t('<span class="chip">Прогноз: ') + esc(PRED_LABEL[r.predicted]) + '</span>' : '') +
                '</div>' + parts +
            '</div>';
        }).join('');

        if (S.weekly.length) {
            html += t('<div class="card"><div class="kicker">Недельные обзоры</div></div>');
            html += S.weekly.slice().reverse().map(function (w) {
                return '<div class="entry">' +
                    t('<div class="entry__h"><span class="entry__t">Неделя ') + esc(w.week) + '</span>' +
                    '<span class="entry__d">' + fmtDate(w.at) + '</span></div>' +
                    (w.applied ? t('<div class="entry__q">Применил</div><div class="entry__a">') + esc(w.applied) + '</div>' : '') +
                    (w.failed ? t('<div class="entry__q">Не сработало</div><div class="entry__a">') + esc(w.failed) + '</div>' : '') +
                    (w.change ? t('<div class="entry__q">Меняю</div><div class="entry__a">') + esc(w.change) + '</div>' : '') +
                '</div>';
            }).join('');
        }
        return html;
    }

    function renderGaps() {
        var open = S.gaps.filter(function (g) { return !g.closed; });
        var closed = S.gaps.filter(function (g) { return g.closed; });
        var html = t('<div class="card"><div class="kicker">Мутные места</div>') +
            t('<div class="h2">Что осталось непонятным</div>') +
            t('<p class="muted" style="margin-top:4px">Названный пробел перестаёт быть пробелом наполовину. Закрывайте, когда разберётесь — и это будет честно, а не «вроде понял».</p></div>');

        if (!S.gaps.length) {
            return html + '<div class="card"><div class="empty"><span class="empty__e">🌫️</span>' +
                t('Пусто. Пробелы попадают сюда из третьего вопроса рефлексии.</div></div>');
        }

        html += '<div class="card">' + (open.length ? open.slice().reverse().map(function (g, i) {
            var n = BY_ID[g.node];
            var idx = S.gaps.indexOf(g);
            return '<div class="gap"><span>🌫️</span><div class="gap__b">' +
                '<div class="gap__t">' + esc(g.text) + '</div>' +
                '<div class="gap__m">' + (n ? esc(n.title) : '') + ' · ' + fmtDate(g.at) + '</div>' +
                '<div class="btn-row" style="margin-top:8px">' +
                    '<button class="btn btn--ghost btn--sm" data-gap-open="' + idx + t('">Разобрать узел</button>') +
                    '<button class="btn btn--ghost btn--sm" data-gap-close="' + idx + t('">Разобрался</button>') +
                '</div></div></div>';
        }).join('') : t('<p class="muted">Открытых пробелов нет — все разобраны.</p>')) + '</div>';

        if (closed.length) {
            html += t('<div class="card"><div class="kicker">Закрыто · ') + closed.length + '</div>' +
                closed.slice().reverse().slice(0, 20).map(function (g) {
                    var n = BY_ID[g.node];
                    return '<div class="gap is-closed"><span>✓</span><div class="gap__b">' +
                        '<div class="gap__t">' + esc(g.text) + '</div>' +
                        '<div class="gap__m">' + (n ? esc(n.title) : '') + '</div></div></div>';
                }).join('') + '</div>';
        }
        return html;
    }

    function renderIntents() {
        var pend = S.intents.filter(function (i) { return i.done === null || i.done === undefined; });
        var closed = S.intents.filter(function (i) { return i.done === true || i.done === false; });
        var okN = S.intents.filter(function (i) { return i.done === true; }).length;

        var html = t('<div class="card"><div class="kicker">Намерения</div>') +
            t('<div class="h2">«Если — то»</div>') +
            t('<p class="muted" style="margin-top:4px">Заранее названный момент применения переводит намерение в действие лучше, чем решимость. Отмечайте честно: «не вышло» здесь такой же нормальный ответ.</p>') +
            (S.intents.length ? '<div class="stats" style="margin-top:12px">' +
                '<div class="stat"><b>' + okN + t('</b><span>доведено до дела</span></div>') +
                '<div class="stat stat--violet"><b>' + pend.length + t('</b><span>в работе</span></div>') +
                '<div class="stat stat--plain"><b>' + S.intents.length + t('</b><span>всего</span></div></div>') : '') +
        '</div>';

        if (!S.intents.length) {
            return html + '<div class="card"><div class="empty"><span class="empty__e">🛠️</span>' +
                t('Намерения создаются на шаге практики. Одно намерение на сессию — этого достаточно.</div></div>');
        }

        html += '<div class="card">' + (pend.length ? pend.slice().reverse().map(function (it) {
            var idx = S.intents.indexOf(it);
            var n = BY_ID[it.node];
            return '<div class="entry" style="border-left-color:var(--accent)">' +
                '<div class="entry__h"><span class="entry__t">' + (n ? esc(n.title) : '') + '</span>' +
                '<span class="entry__d">' + fmtDate(it.at) + '</span></div>' +
                t('<div class="entry__a"><b class="mono" style="color:var(--violet-soft)">ЕСЛИ</b> ') + esc(it.when) + '<br>' +
                t('<b class="mono" style="color:var(--violet-soft)">ТО</b> ') + esc(it.then) + '</div>' +
                '<div class="btn-row" style="margin-top:9px">' +
                    '<button class="btn btn--ghost btn--sm" data-int-ok="' + idx + t('">Сделал</button>') +
                    '<button class="btn btn--ghost btn--sm" data-int-no="' + idx + t('">Не вышло</button>') +
                '</div></div>';
        }).join('') : t('<p class="muted">Активных намерений нет.</p>')) + '</div>';

        if (closed.length) {
            html += t('<div class="card"><div class="kicker">История</div>') +
                closed.slice().reverse().slice(0, 25).map(function (it) {
                    var n = BY_ID[it.node];
                    return '<div class="kv"><span>' + (it.done ? '✓ ' : '· ') + esc(it.then) +
                        (n ? ' <span class="tiny">(' + esc(n.title) + ')</span>' : '') + '</span>' +
                        '<b class="' + (it.done ? 'ok' : 'off') + '">' + (it.done ? t('сделано') : t('не вышло')) + '</b></div>';
                }).join('') + '</div>';
        }
        return html;
    }

    function bindJournal() {
        var seg = $('jSeg');
        if (seg) seg.addEventListener('click', function (e) {
            var b = e.target.closest('button[data-j]');
            if (!b) return;
            journalTab = b.dataset.j;
            renderJournal();
        });
        document.querySelectorAll('#journalBody .node-row[data-node]').forEach(function (b) {
            b.addEventListener('click', function () { startWithNode(b.dataset.node); });
        });
        document.querySelectorAll('[data-gap-close]').forEach(function (b) {
            b.addEventListener('click', function () {
                var g = S.gaps[+b.dataset.gapClose];
                if (g) { g.closed = true; g.closedAt = new Date().toISOString(); save(); haptic('ok'); renderJournal(); }
            });
        });
        document.querySelectorAll('[data-gap-open]').forEach(function (b) {
            b.addEventListener('click', function () {
                var g = S.gaps[+b.dataset.gapOpen];
                if (g && BY_ID[g.node]) startWithNode(g.node);
            });
        });
        document.querySelectorAll('[data-int-ok]').forEach(function (b) {
            b.addEventListener('click', function () {
                var it = S.intents[+b.dataset.intOk];
                if (it) { it.done = true; it.closedAt = new Date().toISOString(); refreshAchievements(); save(); haptic('ok'); renderJournal(); }
            });
        });
        document.querySelectorAll('[data-int-no]').forEach(function (b) {
            b.addEventListener('click', function () {
                var it = S.intents[+b.dataset.intNo];
                if (it) { it.done = false; it.closedAt = new Date().toISOString(); save(); renderJournal(); }
            });
        });
        bindWeekly();
    }

    // ============================================================
    //  Вкладка ПРОФИЛЬ
    // ============================================================
    function renderProfile() {
        var host = $('profileBody');
        var st = stageOf(S.level), p = xpProgress(), si = streakInfo();
        var tr = S.profile.track && TRACKS[S.profile.track];

        var html = '';

        html += '<div class="card card--accent" style="text-align:center">' +
            '<div class="mascot"><div class="mascot__glow"></div><div class="mascot__e">' + st.e + '</div></div>' +
            '<div class="h2">' + esc(st.n) + '</div>' +
            '<p class="tiny">' + esc(st.s) + '</p>' +
            '<div class="bar" style="margin-top:12px"><div class="bar__fill" style="width:' + p.pct + '%"></div></div>' +
            t('<p class="tiny" style="margin-top:6px">Уровень ') + S.level + ' · ' + Math.floor(p.cur) + ' / ' + p.total + ' XP</p>' +
            t('<p class="tiny" style="margin-top:9px;text-align:left">Уровень ничего не запирает — узлы открываются предпосылками, а не цифрой. ') +
            t('XP идёт за освоение и за удержание: одним первым проходом всех узлов последней стадии не достичь, её открывают повторения. ') +
            t('Так и должно быть — ценно не пройти, а не забыть.</p>') +
        '</div>';

        html += t('<div class="card"><div class="kicker">Ритм</div>') +
            '<div class="stats">' +
                '<div class="stat"><b>' + si.value + '</b><span>' + plural(si.value, t('день подряд'), t('дня подряд'), t('дней подряд')) + '</span></div>' +
                '<div class="stat stat--violet"><b>' + si.thisWeek + '/' + si.weekGoal + t('</b><span>сессий на неделе</span></div>') +
                '<div class="stat stat--plain"><b>' + si.left + t('</b><span>прощённых пропусков</span></div>') +
            '</div>' +
            t('<p class="tiny" style="margin-top:9px">Два пропуска подряд не обнуляют серию. Цель — вернуться, а не «не сорваться»: страх потерять счётчик учит хуже, чем интерес.</p>') +
        '</div>';

        html += t('<div class="card"><div class="kicker">Профиль</div>') +
            t('<div class="kv"><span>Трек</span><b>') + (tr ? esc(tr.emoji + ' ' + tr.name) : '—') + '</b></div>' +
            t('<div class="kv"><span>Опыт на старте</span><b>') + esc(expLabel(S.profile.experience)) + '</b></div>' +
            t('<div class="kv"><span>Освоено навыков</span><b>') + S.skills.length + ' / ' + NODES.length + '</b></div>' +
            t('<div class="kv"><span>Записей рефлексии</span><b>') + S.reflect.length + '</b></div>' +
            t('<button class="btn btn--ghost btn--sm" id="reOnb" style="width:100%;margin-top:11px">Перенастроить путь</button>') +
        '</div>';

        html += t('<div class="card"><div class="kicker">Достижения</div>') +
            t('<p class="tiny" style="margin-bottom:10px">Только за доказанный навык: за освоение, удержание, применение и честную калибровку. За присутствие наград нет.</p>') +
            '<div class="ach">' + ACH.map(function (a) {
                var on = S.achievements.indexOf(a.id) !== -1;
                return '<div class="ach__i' + (on ? ' is-on' : '') + '" title="' + esc(a.d) + '">' +
                    '<div class="ach__e">' + a.e + '</div><div class="ach__n">' + esc(a.n) + '</div></div>';
            }).join('') + '</div></div>';

        // Диагностика — чтобы владелец мог убедиться, что всё работает
        html += t('<div class="card"><div class="kicker">Диагностика</div>') +
            t('<div class="kv"><span>Модель курса</span><b class="ok">') + NODES.length + t(' узлов, ') +
                NODES.reduce(function (a, n) { return a + n.check.length; }, 0) + t(' вопросов</b></div>') +
            t('<div class="kv"><span>Локальное хранилище</span><b class="') + (storageOk ? 'ok' : 'warn') + '">' +
                (storageOk ? t('работает') : t('недоступно')) + '</b></div>' +
            '<div class="kv"><span>Telegram</span><b class="' + (TG.inTelegram ? 'ok' : 'off') + '">' +
                (TG.inTelegram ? (t('вход как ') + esc(tgName())) : t('вне Telegram (это нормально)')) + '</b></div>' +
            t('<div class="kv"><span>Синхронизация</span><b class="') + syncClass() + '">' + esc(syncLabel()) + '</b></div>' +
            t('<div class="kv"><span>Офлайн-режим</span><b class="') + (navigator.serviceWorker && navigator.serviceWorker.controller ? 'ok' : 'off') + '">' +
                (navigator.serviceWorker && navigator.serviceWorker.controller ? t('кэш активен') : t('кэшируется')) + '</b></div>' +
        '</div>';

        html += t('<div class="card"><div class="kicker">Ваши данные</div>') +
            t('<p class="muted">Прогресс и дневник хранятся у вас на устройстве') +
            (syncOn ? t(' и синхронизируются с сервером по вашему Telegram ID') : '') +
            t('. Заберите их в любой момент — это ваш материал, а не наш.</p>') +
            '<div class="btn-row" style="margin-top:11px">' +
                t('<button class="btn btn--ghost btn--sm" id="expMd">Дневник .md</button>') +
                t('<button class="btn btn--ghost btn--sm" id="expJson">Всё .json</button>') +
            '</div>' +
            t('<button class="btn btn--ghost btn--sm" id="resetAll" style="width:100%;margin-top:8px;color:var(--danger);border-color:rgba(255,107,112,.4)">Стереть весь прогресс</button>') +
        '</div>';

        html += t('<div class="card card--quiet"><div class="kicker">Другие экраны</div>') +
            t('<a class="btn btn--ghost btn--sm" href="index.html" style="width:100%;text-decoration:none">Граф знаний и эволюция</a></div>');

        host.innerHTML = html;
        bindProfile();
    }

    function expLabel(e) {
        return { zero: t('с нуля'), user: t('пользователь'), builder: t('строитель'), advanced: t('продвинутый') }[e] || '—';
    }
    function tgName() {
        var u = TG.user || {};
        return u.first_name || u.username || ('id ' + (u.id || '?'));
    }
    function syncLabel() {
        return {
            off: t('выключена (локальный режим)'),
            'no-telegram': t('настроена, ждёт запуска в Telegram'),
            idle: t('включена'), sending: t('отправка…'), ok: t('работает'), error: t('ошибка сервера'), offline: t('нет сети')
        }[syncState] || syncState;
    }
    function syncClass() {
        if (syncState === 'ok') return 'ok';
        if (syncState === 'error') return 'warn';
        return 'off';
    }

    function bindProfile() {
        $('reOnb').addEventListener('click', function () { openOnboarding(true); });
        $('expJson').addEventListener('click', function () {
            download('medoeduz-progress-' + today() + '.json', JSON.stringify(payload(), null, 2), 'application/json');
        });
        $('expMd').addEventListener('click', function () {
            download('medoeduz-dnevnik-' + today() + '.md', journalMarkdown(), 'text/markdown');
        });
        $('resetAll').addEventListener('click', function () {
            if (!confirm(t('Стереть весь прогресс, дневник и записи на этом устройстве? Отменить будет нельзя.'))) return;
            try { localStorage.removeItem(KEY); } catch (e) {}
            S = load();
            renderAll();
            toast(t('Готово'), t('Прогресс стёрт. Можно начинать заново.'));
        });
    }

    function download(name, text, mime) {
        try {
            var blob = new Blob([text], { type: mime + ';charset=utf-8' });
            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = name;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
            toast(t('Экспорт'), t('Файл ') + name + t(' сохранён.'));
        } catch (e) {
            toast(t('Экспорт'), t('Браузер не дал сохранить файл. Скопируйте данные вручную из консоли.'));
        }
    }

    function journalMarkdown() {
        var st = calibStats();
        var tr = S.profile.track && TRACKS[S.profile.track];
        var out = [t('# Дневник обучения MedoEDUz'), '', t('Выгружено: ') + new Date().toLocaleString('ru-RU'), ''];
        out.push(t('## Сводка'), '');
        out.push(t('- Уровень: ') + S.level + ' (' + stageOf(S.level).n + ')');
        out.push(t('- Трек: ') + (tr ? tr.name : t('не выбран')));
        out.push(t('- Освоено навыков: ') + S.skills.length + t(' из ') + NODES.length);
        out.push(t('- Сессий: ') + S.sessions.length + t(', записей рефлексии: ') + S.reflect.length);
        if (st) {
            out.push(t('- Калибровка (Брайер): ') + st.brier.toFixed(3) +
                t(' · средняя уверенность ') + Math.round(st.meanConf * 100) + t('% против точности ') + Math.round(st.accuracy * 100) + '%');
        }
        out.push('');

        if (S.skills.length) {
            out.push(t('## Что я теперь умею'), '');
            S.skills.forEach(function (id) {
                var n = BY_ID[id];
                if (n) out.push('- **' + n.title + '** — ' + n.apply.now);
            });
            out.push('');
        }

        if (S.reflect.length) {
            out.push(t('## Записи'), '');
            S.reflect.slice().reverse().forEach(function (r) {
                var n = BY_ID[r.node];
                out.push('### ' + (n ? n.title : r.node) + ' — ' + new Date(r.at).toLocaleDateString('ru-RU'));
                if (r.right !== undefined) out.push(t('Проверка: ') + r.right + '/' + r.total +
                    (r.rate ? t(' · самооценка ') + r.rate + '/5' : ''));
                if (r.changed) out.push('', t('**Что изменилось.** ') + r.changed);
                if (r.apply) out.push('', t('**Где применю.** ') + r.apply);
                if (r.muddy) out.push('', t('**Осталось мутным.** ') + r.muddy);
                if (r.selfExpl) out.push('', t('**Своими словами.** ') + r.selfExpl);
                out.push('');
            });
        }

        if ((S.artifacts || []).length) {
            out.push(t('## Витрина: что сделано руками'), '');
            S.artifacts.slice().reverse().forEach(function (a) {
                var n = BY_ID[a.node];
                out.push('- ' + a.what + (n ? ' _(' + n.title + ')_' : ''));
            });
            out.push('');
        }

        if (S.intents.length) {
            out.push(t('## Намерения'), '');
            S.intents.slice().reverse().forEach(function (i) {
                out.push('- ' + (i.done === true ? '[x]' : i.done === false ? '[~]' : '[ ]') +
                    t(' ЕСЛИ ') + i.when + t(', ТО ') + i.then);
            });
            out.push('');
        }

        var openGaps = S.gaps.filter(function (g) { return !g.closed; });
        if (openGaps.length) {
            out.push(t('## Открытые пробелы'), '');
            openGaps.forEach(function (g) {
                var n = BY_ID[g.node];
                out.push('- ' + g.text + (n ? ' _(' + n.title + ')_' : ''));
            });
            out.push('');
        }

        if (S.weekly.length) {
            out.push(t('## Недельные обзоры'), '');
            S.weekly.slice().reverse().forEach(function (w) {
                out.push('### ' + w.week);
                if (w.applied) out.push(t('**Применил.** ') + w.applied);
                if (w.failed) out.push(t('**Не сработало.** ') + w.failed);
                if (w.change) out.push(t('**Меняю.** ') + w.change);
                out.push('');
            });
        }
        return out.join('\n');
    }

    // ============================================================
    //  Онбординг — выбор вектора освоения
    // ============================================================
    var onbRoot = null, onbStep = 0, onbDraft = {};

    var GOALS = [
        { id: 'apply-work', e: '⚡', t: t('Применять в работе'), d: t('Ускорить текущие задачи с помощью ИИ') },
        { id: 'fundamentals', e: '📚', t: t('Разобраться в основах'), d: t('Понять, как это устроено, без спешки') },
        { id: 'build-agents', e: '🤖', t: t('Строить ИИ-системы'), d: t('Проектировать агентов и приложения') },
        { id: 'explore', e: '🧭', t: t('Осмотреться'), d: t('Пока изучаю, что здесь вообще есть') }
    ];
    var EXPS = [
        { id: 'zero', e: '🌱', t: t('С нуля'), d: t('Почти не пользовался ИИ') },
        { id: 'user', e: '💬', t: t('Пользователь'), d: t('Регулярно пишу запросы в чат-модели') },
        { id: 'builder', e: '🔧', t: t('Строитель'), d: t('Делаю что-то с ИИ: код, контент, автоматизации') },
        { id: 'advanced', e: '🚀', t: t('Продвинутый'), d: t('Работаю с агентами, памятью, эвалами') }
    ];

    function openOnboarding(force) {
        if (!force && S.profile.onboardedAt) return false;
        onbStep = 0;
        onbDraft = { goal: S.profile.goal, track: S.profile.track, experience: S.profile.experience };
        if (!onbRoot) {
            onbRoot = document.createElement('div');
            onbRoot.className = 'onb';
            onbRoot.setAttribute('role', 'dialog');
            onbRoot.setAttribute('aria-modal', 'true');
            document.body.appendChild(onbRoot);
        }
        onbRoot.style.display = 'flex';
        renderOnb();
        return true;
    }

    function closeOnboarding() {
        if (onbRoot) onbRoot.style.display = 'none';
        syncMainButton();
    }

    function renderOnb() {
        var body = '';
        if (onbStep === 0) {
            body = onbHead(t('Шаг 1 из 3'), t('Зачем вам ИИ?'), t('Это задаёт направление. Можно поменять в любой момент.')) +
                GOALS.map(function (g) {
                    return '<button class="track-card' + (onbDraft.goal === g.id ? ' is-on' : '') + '" data-goal="' + g.id + '">' +
                        '<span class="track-card__e">' + g.e + '</span><span><span class="track-card__t">' + esc(g.t) + '</span>' +
                        '<span class="track-card__d">' + esc(g.d) + '</span></span></button>';
                }).join('');
        } else if (onbStep === 1) {
            body = onbHead(t('Шаг 2 из 3'), t('Кем вы хотите стать в этом?'),
                t('Трек подсвечивает нужные узлы и убирает шум. Остальное остаётся доступным — это подсказка, а не ограничение.')) +
                Object.keys(TRACKS).map(function (id) {
                    var t = TRACKS[id];
                    var cnt = NODES.filter(function (n) { return (n.tracks || []).indexOf(id) !== -1; }).length;
                    return '<button class="track-card' + (onbDraft.track === id ? ' is-on' : '') + '" data-track="' + id + '">' +
                        '<span class="track-card__e">' + t.emoji + '</span><span><span class="track-card__t">' + esc(t.name) +
                        ' <span class="tiny mono">· ' + cnt + '</span></span>' +
                        '<span class="track-card__d">' + esc(t.goal) + '</span>' +
                        '<span class="track-card__d tiny" style="margin-top:3px;opacity:.8">' + esc(t.forWhom) + '</span></span></button>';
                }).join('') +
                t('<button class="btn btn--ghost btn--sm" data-track="" style="width:100%;margin-top:6px">Пока без трека — покажите всё</button>');
        } else {
            body = onbHead(t('Шаг 3 из 3'), t('Насколько вы уже в теме?'),
                t('Влияет на то, с чего начнём. Ошибиться не страшно: путь подстроится по результатам проверок.')) +
                EXPS.map(function (e) {
                    return '<button class="track-card' + (onbDraft.experience === e.id ? ' is-on' : '') + '" data-exp="' + e.id + '">' +
                        '<span class="track-card__e">' + e.e + '</span><span><span class="track-card__t">' + esc(e.t) + '</span>' +
                        '<span class="track-card__d">' + esc(e.d) + '</span></span></button>';
                }).join('');
        }

        var nav = '<div class="btn-row" style="margin-top:14px">' +
            (onbStep > 0 ? t('<button class="btn btn--ghost" id="onbBack">Назад</button>') : '') +
            '<button class="btn btn--primary" id="onbNext"' + (onbCanNext() ? '' : ' disabled') + '>' +
            (onbStep === 2 ? t('Начать') : t('Дальше')) + '</button></div>' +
            (S.profile.onboardedAt ? t('<button class="btn btn--ghost btn--sm" id="onbCancel" style="width:100%;margin-top:8px">Отмена</button>')
                                   : t('<button class="btn btn--ghost btn--sm" id="onbSkip" style="width:100%;margin-top:8px">Пропустить настройку</button>'));

        onbRoot.innerHTML = '<div class="onb__in">' + body + nav + '</div>';
        bindOnb();
    }

    function onbHead(step, title, sub) {
        return '<div class="onb__step">' + esc(step) + '</div>' +
            '<h1 class="onb__t">' + esc(title) + '</h1>' +
            '<p class="onb__s">' + esc(sub) + '</p>';
    }

    function onbCanNext() {
        if (onbStep === 0) return !!onbDraft.goal;
        if (onbStep === 1) return true;      // трек можно не выбирать
        return !!onbDraft.experience;
    }

    function bindOnb() {
        onbRoot.querySelectorAll('[data-goal]').forEach(function (b) {
            b.addEventListener('click', function () { onbDraft.goal = b.dataset.goal; haptic(); renderOnb(); });
        });
        onbRoot.querySelectorAll('[data-track]').forEach(function (b) {
            b.addEventListener('click', function () { onbDraft.track = b.dataset.track || null; haptic(); onbStep = 2; renderOnb(); });
        });
        onbRoot.querySelectorAll('[data-exp]').forEach(function (b) {
            b.addEventListener('click', function () { onbDraft.experience = b.dataset.exp; haptic(); renderOnb(); });
        });
        var back = $('onbBack');
        if (back) back.addEventListener('click', function () { onbStep--; renderOnb(); });
        var skip = $('onbSkip');
        if (skip) skip.addEventListener('click', function () { finishOnb(true); });
        var cancel = $('onbCancel');
        if (cancel) cancel.addEventListener('click', function () { closeOnboarding(); });
        $('onbNext').addEventListener('click', function () {
            if (onbStep < 2) { onbStep++; renderOnb(); return; }
            finishOnb(false);
        });
    }

    function finishOnb(skipped) {
        if (!skipped) {
            S.profile.goal = onbDraft.goal || null;
            S.profile.track = onbDraft.track || null;
            S.profile.experience = onbDraft.experience || null;
        }
        S.profile.onboardedAt = S.profile.onboardedAt || new Date().toISOString();
        ensureWeek();          // выбран трек — заводим план первой недели
        save();
        closeOnboarding();
        renderAll();
        if (!skipped && S.profile.track && TRACKS[S.profile.track]) {
            toast(t('Путь настроен'), TRACKS[S.profile.track].name + ': ' + TRACKS[S.profile.track].goal);
        }
    }

    // ============================================================
    //  Кнопка Telegram MainButton — системная кнопка «дальше»
    // ============================================================
    function syncMainButton() {
        if (!TG.inTelegram || !TG.api || !TG.api.MainButton) return;
        var mb = TG.api.MainButton;
        var visible = currentTab === 'session' && !!sess() && (!onbRoot || onbRoot.style.display === 'none');
        if (!visible) { try { mb.hide(); } catch (e) {} return; }
        var s = sess();
        var map = {
            plan: t('Начать'), review: t('Дальше'), study: t('К практике'),
            practice: t('К проверке'), check: t('К рефлексии'), reflect: t('Завершить'), done: t('Закрыть сессию')
        };
        var ids = { plan: 'planNext', review: 'revNext', study: 'studyNext', practice: 'pracNext', check: 'checkNext', reflect: 'rfDone', done: 'finishBtn' };
        var target = $(ids[s.stage]);
        // Нет кнопки на экране (например, шаг прогноза) — нечего дублировать
        if (!target) { try { mb.hide(); } catch (e) {} return; }
        try {
            mb.setText(map[s.stage] || t('Дальше'));
            mb.offClick(mainButtonClick);
            mb.onClick(mainButtonClick);
            // Кнопка ОС не должна обманывать: если шаг не пройден — она неактивна
            if (target && target.disabled) mb.disable(); else mb.enable();
            mb.show();
        } catch (e) {}
    }
    function mainButtonClick() {
        var ids = { plan: 'planNext', review: 'revNext', study: 'studyNext', practice: 'pracNext', check: 'checkNext', reflect: 'rfDone', done: 'finishBtn' };
        var s = sess();
        if (!s) return;
        var b = $(ids[s.stage]);
        if (b && !b.disabled) b.click();
    }

    // ============================================================
    //  Вкладки
    // ============================================================
    var currentTab = 'session';
    var VIEWS = { session: 'viewSession', path: 'viewPath', journal: 'viewJournal', profile: 'viewProfile' };

    function switchTab(tab) {
        currentTab = tab;
        Object.keys(VIEWS).forEach(function (k) {
            $(VIEWS[k]).classList.toggle('is-on', k === tab);
        });
        document.querySelectorAll('.tabbar button').forEach(function (b) {
            var on = b.dataset.tab === tab;
            b.classList.toggle('is-on', on);
            b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        if (tab === 'path') renderPath();
        if (tab === 'journal') renderJournal();
        if (tab === 'profile') renderProfile();
        if (tab === 'session') renderSession();
        window.scrollTo({ top: 0 });
        syncMainButton();
    }

    document.querySelectorAll('.tabbar button').forEach(function (b) {
        b.addEventListener('click', function () { haptic(); switchTab(b.dataset.tab); });
    });

    // ============================================================
    //  Переключатели темы и языка в шапке
    // ============================================================
    var THEME_KEY = 'medoeduz_theme';

    function themeNow() {
        return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    }
    function setTheme(th) {
        document.documentElement.setAttribute('data-theme', th);
        try { localStorage.setItem(THEME_KEY, th); } catch (e) {}
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', th === 'light' ? '#F4F7FA' : '#07080B');
        paintThemeBtn();
        // Аура маскота задана инлайном по стадии — перерисуем экран,
        // чтобы пересчитались вычисляемые цвета
        renderAll();
    }
    function paintThemeBtn() {
        var b = $('themeBtn');
        if (!b) return;
        var light = themeNow() === 'light';
        // Иконка показывает, КУДА переключит, а не что сейчас
        b.textContent = light ? '🌙' : '☀️';
        b.setAttribute('aria-label', light ? t('Тёмная тема') : t('Светлая тема'));
        b.title = light ? t('Тёмная тема') : t('Светлая тема');
    }

    (function bindTopButtons() {
        var tb = $('themeBtn');
        if (tb) {
            paintThemeBtn();
            tb.addEventListener('click', function () {
                haptic();
                setTheme(themeNow() === 'light' ? 'dark' : 'light');
            });
        }
        var lb = $('langBtn');
        if (lb) {
            lb.textContent = LANG === 'en' ? 'EN' : 'RU';
            lb.title = LANG === 'en' ? 'Switch to Russian' : 'Switch to English';
            lb.setAttribute('aria-label', lb.title);
            lb.addEventListener('click', function () { setLang(LANG === 'en' ? 'ru' : 'en'); });
        }
    })();

    // ============================================================
    //  Конфетти — только на реальное достижение
    // ============================================================
    function confetti() {
        if (reduceMotion) return;
        var c = document.createElement('canvas');
        c.style.cssText = 'position:fixed;inset:0;z-index:70;pointer-events:none';
        c.width = innerWidth; c.height = innerHeight;
        document.body.appendChild(c);
        var ctx = c.getContext('2d');
        var colors = ['#22E0C8', '#8B7CFF', '#57C7FF', '#3FD87A', '#FFB020'];
        var P = [];
        for (var i = 0; i < 90; i++) P.push({
            x: Math.random() * c.width, y: -20 - Math.random() * c.height * 0.3,
            r: Math.random() * 7 + 3, col: colors[(Math.random() * colors.length) | 0],
            vx: (Math.random() - 0.5) * 5, vy: Math.random() * 3.5 + 2.5, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3
        });
        var frames = 0;
        (function draw() {
            ctx.clearRect(0, 0, c.width, c.height);
            for (var i = 0; i < P.length; i++) {
                var p = P[i]; p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.rot += p.vr;
                ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.col;
                ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6); ctx.restore();
            }
            if (++frames < 160) requestAnimationFrame(draw); else c.remove();
        })();
    }

    // ============================================================
    //  Старт
    // ============================================================
    function renderAll() {
        renderTop();
        renderSession();
        if (currentTab === 'path') renderPath();
        if (currentTab === 'journal') renderJournal();
        if (currentTab === 'profile') renderProfile();
    }

    if ('serviceWorker' in navigator &&
        (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
        navigator.serviceWorker.register('sw.js').catch(function () {});
    }

    /** Перевод статических подписей в разметке (вкладки, заголовок) */
    function translateStatic() {
        if (LANG === 'ru') return;
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var src = (el.textContent || '').trim();
            if (src) el.textContent = t(src);
        });
        document.title = t('Учебная сессия — MedoEDUz');
        var d = document.querySelector('meta[name="description"]');
        if (d) d.setAttribute('content', t(d.getAttribute('content')));
        var ns = document.querySelector('noscript');
        if (ns) ns.textContent = t('Для учебной сессии нужен включённый JavaScript.');
    }

    var booted = false;
    function boot() {
        if (booted) return;          // защита от двойного старта: syncPull и таймер
        booted = true;
        translateStatic();
        ensureWeek();          // трек мог быть выбран раньше, чем появился план
        refreshAchievements();
        renderAll();
        if (!S.profile.onboardedAt) openOnboarding(false);
        save();
    }

    // Сначала пробуем подтянуть облачный прогресс; при недоступной сети
    // syncPull сразу вызывает boot() — приложение никогда не ждёт сеть.
    syncPull(boot);
    // Страховка: если запрос повис без ответа, стартуем локально.
    setTimeout(boot, 2500);
}

/**
 * Старт приложения ждёт Telegram SDK — но не дольше секунды.
 *
 * Ждать нужно: от SDK зависит user_id, а от него — ключ хранения
 * прогресса. Ждать долго нельзя: вне Telegram (или при недоступном
 * домене) SDK не придёт никогда, и учебная сессия обязана открыться
 * как обычная страница. Раньше SDK стоял обычным блокирующим
 * скриптом — при подвисшей сети разбор страницы вставал целиком и
 * пользователь видел белый экран. Проверено в браузере: ровно так и
 * происходило, поэтому теперь async + этот шлюз.
 */
(function telegramGate() {
    'use strict';
    var TG_WAIT_MS = 1200;
    var started = false;

    function go() {
        if (started) return;
        started = true;
        startLearnApp();
    }

    if (window.Telegram && window.Telegram.WebApp) { go(); return; }

    // Вне Telegram ждать нечего. Клиент Telegram всегда передаёт свои
    // параметры во фрагменте/строке запроса (tgWebApp…) и заводит
    // TelegramWebviewProxy — если их нет, это обычный браузер, и
    // задерживать первую отрисовку на секунду было бы враньём.
    var looksLikeTelegram =
        /tgWebApp/.test(location.hash || '') ||
        /tgWebApp/.test(location.search || '') ||
        !!window.TelegramWebviewProxy;
    if (!looksLikeTelegram) { go(); return; }

    var sdk = document.getElementById('tg-sdk');
    if (sdk) {
        sdk.addEventListener('load', go);
        sdk.addEventListener('error', go);   // домен заблокирован — работаем без него
    }
    setTimeout(go, TG_WAIT_MS);
})();
