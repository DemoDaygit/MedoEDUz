/**
 * ============================================================
 *  MedoEDUz — ИИ-хаб на главной странице
 * ============================================================
 *
 *  Раскладывает реестр из js/data/models.js по СЕМИ трекам
 *  обучения и по модальностям. Выбор трека превращает абстрактный
 *  «трек на карте» в конкретный список инструментов — так ученик
 *  видит, чем реально доводить задачу до результата.
 *
 *  Персонализация: если ученик уже выбрал трек (онбординг сайта
 *  или приложения), хаб открывается сразу на его треке и помечает
 *  этот чип. Прогресс-состояние здесь не пишется — только читается.
 *
 *  Двуязычие: язык берётся из data-lang, подписи вендоров и
 *  описания лежат в реестре парами ru/en, названия треков — из
 *  CURRICULUM.TRACKS (t.js уже подменил модель на английскую при
 *  data-lang="en"). Словарь сайта для контента хаба НЕ нужен.
 *
 *  Реестр вырос до нескольких десятков сервисов, поэтому:
 *  - в бегущей ленте только flagship — иначе она превращается в
 *    кашу и перестаёт работать как «россыпь узнаваемого»;
 *  - есть поиск и постраничный показ: 60+ карточек разом растянули
 *    бы главную и утопили секции ниже.
 *
 *  Товарные знаки принадлежат владельцам. Глифы ниже —
 *  ОРИГИНАЛЬНЫЕ абстрактные векторные метки (кольца, искры, узлы),
 *  а не воспроизведение фирменных логотипов; тон задаёт бренд.
 */

'use strict';

(function () {
    var M = window.AI_MODELS;
    var mount = document.getElementById('aiHub');
    if (!M || !mount) return;

    var LANG = document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'ru';
    function L(ru, en) { return LANG === 'en' ? en : ru; }

    var PAGE_SIZE = 18;   // сколько карточек показываем до «показать все»

    // ------------------------------------------------------------
    //  Треки: источник истины — CURRICULUM.TRACKS. Фолбэк на случай,
    //  если модель курса на странице не подключена.
    // ------------------------------------------------------------
    var ORDER = ['generalist', 'developer', 'agent-architect', 'memory-eng', 'ai-analyst', 'quant', 'security-eng'];
    var FALLBACK = {
        generalist: { name: L('Универсал', 'Generalist'), emoji: '🌍', color: '#22E0C8' },
        developer: { name: L('Разработчик', 'Developer'), emoji: '💻', color: '#57C7FF' },
        'agent-architect': { name: L('Архитектор агентов', 'Agent architect'), emoji: '🤖', color: '#7DD3FC' },
        'memory-eng': { name: L('Инженер памяти', 'Memory engineer'), emoji: '🧠', color: '#5EEAD4' },
        'ai-analyst': { name: L('Инженер эвалов', 'Eval engineer'), emoji: '📐', color: '#67E8B0' },
        quant: { name: L('Квант-трейдер', 'Quant trader'), emoji: '📉', color: '#93E9FF' },
        'security-eng': { name: L('Безопасник контура', 'Loop security'), emoji: '🛡️', color: '#C4B5FD' },
    };
    var TRACKS = (window.CURRICULUM && window.CURRICULUM.TRACKS) || FALLBACK;
    function track(key) { return TRACKS[key] || FALLBACK[key] || { name: key, emoji: '•', color: 'var(--accent)' }; }

    // ------------------------------------------------------------
    //  Оригинальные векторные метки (не логотипы вендоров).
    //  Всё на currentColor — цвет задаёт плитка .ai-logo.
    // ------------------------------------------------------------
    var S = 'stroke="currentColor" fill="none" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"';
    var S2 = 'stroke="currentColor" fill="none" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"';
    var F = 'fill="currentColor"';
    var GLYPHS = {
        ring: '<circle cx="24" cy="24" r="13" ' + S + ' stroke-dasharray="52 22" transform="rotate(-40 24 24)"/><circle cx="24" cy="24" r="3.4" ' + F + '/>',
        spark: '<path d="M24 5C25.4 16.8 31.2 22.6 43 24 31.2 25.4 25.4 31.2 24 43 22.6 31.2 16.8 25.4 5 24 16.8 22.6 22.6 16.8 24 5Z" ' + F + '/>',
        gem: '<path d="M24 6 39 24 24 42 9 24Z" ' + S + '/><path d="M9 24H39M24 6V42" stroke="currentColor" stroke-width="1.8" opacity="0.55"/>',
        chevrons: '<path d="M14 14 24 24 14 34M26 14 36 24 26 34" ' + S + '/>',
        caret: '<rect x="10" y="10" width="20" height="28" rx="3" ' + S + '/><path d="M36 12V36" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/><path d="M17 19H23M17 25H26" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" opacity="0.7"/>',
        layers: '<path d="M24 8 40 16 24 24 8 16Z" ' + S + '/><path d="M8 24 24 32 40 24" ' + S + ' opacity="0.75"/><path d="M8 32 24 40 40 32" ' + S + ' opacity="0.5"/>',
        pixel: '<rect x="9" y="9" width="9" height="9" rx="1.5" ' + F + '/><rect x="21" y="9" width="9" height="9" rx="1.5" ' + F + ' opacity="0.55"/><rect x="9" y="21" width="9" height="9" rx="1.5" ' + F + ' opacity="0.55"/><rect x="21" y="21" width="9" height="9" rx="1.5" ' + F + '/><rect x="30.5" y="30.5" width="8" height="8" rx="1.5" ' + F + ' opacity="0.8"/>',
        orbit: '<circle cx="24" cy="24" r="7.5" ' + F + '/><ellipse cx="24" cy="24" rx="17" ry="7" ' + S + ' transform="rotate(32 24 24)"/><circle cx="38" cy="16" r="3" ' + F + '/>',
        petals: '<g ' + F + '><path d="M24 6c5 4 5 12 0 16-5-4-5-12 0-16Z"/><path d="M42 24c-4 5-12 5-16 0 4-5 12-5 16 0Z"/><path d="M24 42c-5-4-5-12 0-16 5 4 5 12 0 16Z"/><path d="M6 24c4-5 12-5 16 0-4 5-12 5-16 0Z"/></g><circle cx="24" cy="24" r="3" ' + F + '/>',
        comet: '<circle cx="30" cy="18" r="8" ' + F + '/><path d="M25 23 8 40M22 16 10 22M31 27 20 39" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.7"/>',
        loop: '<path d="M18 16a8 8 0 1 0 0 16c6 0 8-16 12-16a8 8 0 1 1 0 16c-6 0-8-16-12-16Z" ' + S + '/>',
        hub: '<circle cx="24" cy="24" r="4.5" ' + F + '/><g stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M24 20 24 9M24 28 24 39M28 24 39 24M20 24 9 24M27 21 35 13M21 27 13 35"/></g><g ' + F + '><circle cx="24" cy="9" r="3"/><circle cx="24" cy="39" r="3"/><circle cx="39" cy="24" r="3"/><circle cx="9" cy="24" r="3"/><circle cx="36" cy="12" r="2.6"/><circle cx="12" cy="36" r="2.6"/></g>',
        chain: '<rect x="7" y="17" width="22" height="14" rx="7" ' + S + '/><rect x="19" y="17" width="22" height="14" rx="7" ' + S + '/>',
        shield: '<path d="M24 7 39 12v10c0 9-7 15-15 19-8-4-15-10-15-19V12Z" ' + S + '/><path d="M17 24 22 29 32 18" ' + S + '/>',
        venn: '<circle cx="19" cy="24" r="11" ' + S + '/><circle cx="29" cy="24" r="11" ' + S + '/>',
        prism: '<path d="M24 7 41 38H7Z" ' + S + '/><path d="M24 7 24 38M24 22 41 38M24 22 7 38" stroke="currentColor" stroke-width="1.8" opacity="0.55"/>',
        film: '<rect x="8" y="12" width="32" height="24" rx="4" ' + S + '/><path d="M8 19H14M8 29H14M34 19H40M34 29H40" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M22 19 30 24 22 29Z" ' + F + '/>',
        waveform: '<g stroke="currentColor" stroke-width="3.4" stroke-linecap="round"><path d="M11 20V28"/><path d="M18 14V34"/><path d="M25 9V39"/><path d="M32 15V33"/><path d="M39 21V27"/></g>',

        /* ---- добавлены под расширенный реестр ---- */
        notebook: '<rect x="12" y="8" width="26" height="32" rx="3.5" ' + S + '/><path d="M18 8V40" stroke="currentColor" stroke-width="2.4" opacity="0.6"/><path d="M24 17H32M24 24H32M24 31H29" ' + S2 + '/>',
        music: '<circle cx="15" cy="34" r="5.5" ' + F + '/><circle cx="33" cy="30" r="5.5" ' + F + '/><path d="M20.5 34V14L38.5 10V30" ' + S + '/>',
        cube: '<path d="M24 7 40 15.5V32.5L24 41 8 32.5V15.5Z" ' + S + '/><path d="M8 15.5 24 24 40 15.5M24 24V41" ' + S2 + ' opacity="0.6"/>',
        bolt: '<path d="M27 5 12 27h9l-2 16 17-24h-10Z" ' + S + '/>',
        terminal: '<rect x="7" y="11" width="34" height="26" rx="4" ' + S + '/><path d="M14 20 19 24 14 28M23 29H32" ' + S2 + '/>',
        graph: '<g ' + S2 + '><path d="M14 13H24a5 5 0 0 1 5 5v0a5 5 0 0 0 5 5"/><path d="M14 35H24a5 5 0 0 0 5-5v0a5 5 0 0 1 5-5"/></g><g ' + F + '><circle cx="11" cy="13" r="4"/><circle cx="11" cy="35" r="4"/><circle cx="37" cy="24" r="4.5"/></g>',
        vault: '<rect x="8" y="9" width="32" height="30" rx="4" ' + S + '/><circle cx="24" cy="24" r="8" ' + S2 + '/><path d="M24 12V16M24 32V36M12 24H16M32 24H36" ' + S2 + '/>',
        beaker: '<path d="M17 7h14v9l8 17a4 4 0 0 1-3.6 5.8H12.6A4 4 0 0 1 9 33l8-17Z" ' + S + '/><path d="M13 28h22" ' + S2 + '/>',
        gauge: '<path d="M9 32a15 15 0 1 1 30 0" ' + S + '/><path d="M24 32 33 19" ' + S + '/><circle cx="24" cy="32" r="3" ' + F + '/>',
        radar: '<path d="M24 39a15 15 0 1 1 15-15" ' + S + '/><path d="M24 33a9 9 0 0 1 9-9" ' + S2 + ' opacity="0.7"/><path d="M24 24 39 24" ' + S2 + '/><circle cx="24" cy="24" r="2.8" ' + F + '/>',
        lock: '<rect x="11" y="21" width="26" height="19" rx="4" ' + S + '/><path d="M17 21v-5a7 7 0 0 1 14 0v5" ' + S + '/><circle cx="24" cy="30" r="2.8" ' + F + '/>',
        feather: '<path d="M38 8c0 12-8 22-20 26l-6 6" ' + S + '/><path d="M38 8c-14 2-22 9-24 20l8 4c10-3 15-11 16-24Z" ' + S2 + '/>',
        grid: '<g ' + F + '><rect x="9" y="9" width="11" height="11" rx="2"/><rect x="28" y="9" width="11" height="11" rx="2" opacity="0.6"/><rect x="9" y="28" width="11" height="11" rx="2" opacity="0.6"/><rect x="28" y="28" width="11" height="11" rx="2"/></g>',
        flow: '<g ' + S2 + '><path d="M9 24h9"/><path d="M27 14h12M27 34h12"/><path d="M18 24c5 0 4-10 9-10M18 24c5 0 4 10 9 10"/></g><g ' + F + '><circle cx="9" cy="24" r="3.6"/><circle cx="40" cy="14" r="3.6"/><circle cx="40" cy="34" r="3.6"/></g>',
        eye: '<path d="M4 24s7-11 20-11 20 11 20 11-7 11-20 11S4 24 4 24Z" ' + S + '/><circle cx="24" cy="24" r="5" ' + F + '/>',
        brain: '<path d="M22 9a7 7 0 0 0-7 7 6 6 0 0 0-2 11.5A7 7 0 0 0 22 39Z" ' + S2 + '/><path d="M26 9a7 7 0 0 1 7 7 6 6 0 0 1 2 11.5A7 7 0 0 1 26 39Z" ' + S2 + '/><path d="M24 9V39" stroke="currentColor" stroke-width="2" opacity="0.45"/>',
        mic: '<rect x="18" y="7" width="12" height="20" rx="6" ' + S + '/><path d="M13 23a11 11 0 0 0 22 0M24 34v7M18 41h12" ' + S2 + '/>',
        palette: '<path d="M24 8c9 0 16 6 16 14 0 6-5 7-8 7h-3c-2 0-3 2-2 4 1 3-2 6-5 6-8 0-14-7-14-15S15 8 24 8Z" ' + S + '/><g ' + F + '><circle cx="18" cy="18" r="2.6"/><circle cx="27" cy="15" r="2.6"/><circle cx="33" cy="22" r="2.6"/></g>',
        wand: '<path d="M12 38 32 18" ' + S + '/><path d="M35 8v8M31 12h8M9 12v6M6 15h6M36 30v6M33 33h6" ' + S2 + '/>',
        tree: '<path d="M24 40V22" ' + S + '/><path d="M24 22 14 14M24 22 34 14" ' + S2 + '/><g ' + F + '><circle cx="24" cy="42" r="0.1"/><circle cx="11" cy="11" r="4"/><circle cx="37" cy="11" r="4"/><circle cx="24" cy="25" r="4"/></g>',
        plug: '<path d="M17 8v9M31 8v9" ' + S + '/><path d="M12 17h24v6a12 12 0 0 1-24 0Z" ' + S + '/><path d="M24 35v6" ' + S + '/>',
        stack: '<g ' + S2 + '><rect x="8" y="10" width="32" height="8" rx="3"/><rect x="8" y="20" width="32" height="8" rx="3"/><rect x="8" y="30" width="32" height="8" rx="3"/></g><circle cx="15" cy="14" r="1.8" ' + F + '/><circle cx="15" cy="24" r="1.8" ' + F + '/><circle cx="15" cy="34" r="1.8" ' + F + '/>',
        target: '<circle cx="24" cy="24" r="15" ' + S2 + '/><circle cx="24" cy="24" r="9" ' + S2 + ' opacity="0.7"/><circle cx="24" cy="24" r="3.6" ' + F + '/>',
        pulse: '<path d="M5 24h8l4-11 6 22 5-13 4 6h11" ' + S + '/>',
    };
    function glyph(id) {
        return '<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">' + (GLYPHS[id] || GLYPHS.ring) + '</svg>';
    }

    // ------------------------------------------------------------
    //  Что ученик уже выбрал: читаем трек из состояния сайта и
    //  приложения (пишем — нигде).
    // ------------------------------------------------------------
    function readTrack() {
        function j(key) { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { return null; } }
        var site = j('medoeduz_game_state');
        if (site && site.profile && site.profile.track) return site.profile.track;
        var found = null;
        Object.keys(localStorage).forEach(function (k) {
            if (found || k.indexOf('medoeduz_app_') !== 0) return;
            var app = j(k);
            if (app && app.profile && app.profile.track) found = app.profile.track;
        });
        return found;
    }

    function esc(s) {
        return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    }
    function cat(id) { return M.CATS[id] ? M.CATS[id][LANG] : id; }

    // ------------------------------------------------------------
    //  Состояние фильтров
    // ------------------------------------------------------------
    var myTrack = readTrack();
    var state = {
        track: (myTrack && TRACKS[myTrack]) ? myTrack : 'all',
        cat: 'all',
        sort: 'default',
        q: '',
        limit: PAGE_SIZE,
    };

    function haystack(model) {
        return [
            model.name, model.vendor, model.tagline[LANG], model.tagline.ru,
            model.cats.map(cat).join(' '),
            model.tracks.map(function (k) { return track(k).name; }).join(' '),
        ].join(' ').toLowerCase();
    }

    function matches(model) {
        if (state.track !== 'all' && model.tracks.indexOf(state.track) === -1) return false;
        if (state.cat !== 'all' && model.cats.indexOf(state.cat) === -1) return false;
        if (state.q && haystack(model).indexOf(state.q.toLowerCase().trim()) === -1) return false;
        return true;
    }
    function sortList(list) {
        var arr = list.slice();
        if (state.sort === 'az') {
            arr.sort(function (a, b) { return a.name.localeCompare(b.name); });
        } else if (state.sort === 'access') {
            var rank = { freemium: 0, open: 1, paid: 2 };
            arr.sort(function (a, b) { return (rank[a.access] - rank[b.access]) || a.name.localeCompare(b.name); });
        }
        // 'default' — курированный порядок реестра
        return arr;
    }

    // ------------------------------------------------------------
    //  Разметка кусками
    // ------------------------------------------------------------
    function pill(model) {
        return '<span class="ai-pill"><span class="ai-logo" style="--brand:' + esc(model.brand) + '">' +
            glyph(model.glyph) + '</span>' + esc(model.name) + '</span>';
    }

    function marquee() {
        // Только узнаваемые марки: полная лента из 60+ сервисов читается
        // как шум и перестаёт выполнять свою работу.
        var flags = M.LIST.filter(function (m) { return m.flagship; });
        if (flags.length < 8) flags = M.LIST.slice(0, 20);
        var one = flags.map(pill).join('');
        // дубль ряда — для бесшовной прокрутки на -50%
        return '<div class="ai-marquee" aria-hidden="true"><div class="ai-marquee__row">' + one + one + '</div></div>';
    }

    function chip(key, label, emoji, on, you) {
        // Точка — цветной эмодзи: он рисуется своими цветами и CSS color
        // игнорирует, поэтому тон трека тут не задаём (иначе проверка
        // контраста ловит ложный провал на эмодзи с variation selector).
        return '<button type="button" class="ai-chip' + (on ? ' is-on' : '') + '" data-track="' + esc(key) + '">' +
            (emoji ? '<span class="ai-chip__dot">' + emoji + '</span>' : '') +
            esc(label) +
            (you ? '<span class="ai-chip__you">' + L('ваш', 'you') + '</span>' : '') +
            '</button>';
    }

    function controls() {
        var chips = chip('all', L('Все', 'All'), '', state.track === 'all', false);
        ORDER.forEach(function (key) {
            if (!TRACKS[key] && !FALLBACK[key]) return;
            chips += chip(key, track(key).name, track(key).emoji, state.track === key, myTrack === key);
        });

        var cats = '<option value="all">' + L('Все модальности', 'All modalities') + '</option>';
        Object.keys(M.CATS).forEach(function (id) {
            cats += '<option value="' + id + '"' + (state.cat === id ? ' selected' : '') + '>' + esc(cat(id)) + '</option>';
        });

        var sorts = [
            ['default', L('по умолчанию', 'default')],
            ['az', L('А → Я', 'A → Z')],
            ['access', L('по доступу', 'by access')],
        ].map(function (o) {
            return '<option value="' + o[0] + '"' + (state.sort === o[0] ? ' selected' : '') + '>' + esc(o[1]) + '</option>';
        }).join('');

        return '<div class="ai-controls">' +
            '<div class="ai-tracks">' + chips + '</div>' +
            '<div class="ai-tools">' +
                '<label class="ai-field ai-field--search">' +
                    '<span class="ai-field__icon" aria-hidden="true">🔍</span>' +
                    '<input type="search" id="aiQ" value="' + esc(state.q) + '" ' +
                        'placeholder="' + L('Поиск: название, вендор, задача', 'Search: name, vendor, task') + '" ' +
                        'aria-label="' + L('Поиск по инструментам', 'Search tools') + '">' +
                '</label>' +
                '<label class="ai-field">' + L('Модальность', 'Modality') +
                    '<select id="aiCat">' + cats + '</select></label>' +
                '<label class="ai-field">' + L('Сортировка', 'Sort') +
                    '<select id="aiSort">' + sorts + '</select></label>' +
                '<span class="ai-count" id="aiCount"></span>' +
            '</div>' +
        '</div>';
    }

    function trackbar() {
        if (state.track === 'all') return '';
        var tr = track(state.track);
        var goal = (TRACKS[state.track] && TRACKS[state.track].goal) ? TRACKS[state.track].goal : '';
        return '<div class="ai-trackbar">' +
            '<p class="ai-trackbar__goal"><b>' + esc(tr.emoji + ' ' + tr.name) + '.</b> ' + esc(goal) + '</p>' +
            '<a class="ai-trackbar__link" href="pages/tracks.html#' + esc(state.track) + '">' +
                L('Обоснование трека и данные рынка →', 'Track rationale and market data →') + '</a>' +
        '</div>';
    }

    function card(model) {
        var dots = model.tracks.map(function (key) {
            var tr = track(key);
            var on = state.track === key;
            return '<span class="ai-dot' + (on ? ' is-match' : '') + '" title="' + esc(tr.name) + '">' + tr.emoji + '</span>';
        }).join('');

        var cats = model.cats.slice(0, 4).map(function (id) {
            return '<span class="ai-cat">' + esc(cat(id)) + '</span>';
        }).join('');

        var acc = M.ACCESS[model.access];
        var accLabel = acc ? acc.short[LANG] : model.access;
        var accTitle = acc ? acc[LANG] : '';

        return '<article class="ai-card">' +
            '<div class="ai-card__top">' +
                '<span class="ai-logo" style="--brand:' + esc(model.brand) + '">' + glyph(model.glyph) + '</span>' +
                '<div class="ai-card__id">' +
                    '<h3 class="ai-card__name">' + esc(model.name) + '</h3>' +
                    '<span class="ai-card__vendor">' + esc(model.vendor) + '</span>' +
                '</div>' +
                '<span class="ai-access ai-access--' + esc(model.access) + '" title="' + esc(accTitle) + '">' + esc(accLabel) + '</span>' +
            '</div>' +
            '<p class="ai-card__tag">' + esc(model.tagline[LANG]) + '</p>' +
            '<div class="ai-card__cats">' + cats + '</div>' +
            '<div class="ai-card__foot">' +
                '<div class="ai-card__tracks">' + dots + '</div>' +
                '<a class="ai-card__link" href="' + esc(model.url) + '" target="_blank" rel="noopener noreferrer">' +
                    L('Открыть', 'Open') + ' ↗</a>' +
            '</div>' +
        '</article>';
    }

    function grid() {
        var list = sortList(M.LIST.filter(matches));
        if (!list.length) {
            return '<div class="ai-grid"><p class="ai-empty">' +
                L('Под эти условия инструментов не нашлось — сбросьте поиск или один из фильтров.',
                  'Nothing matches these filters — clear the search or one of the filters.') +
                '<br><button type="button" class="ai-reset" id="aiReset">' +
                L('Сбросить всё', 'Clear all') + '</button></p></div>';
        }
        var shown = list.slice(0, state.limit);
        var html = '<div class="ai-grid">' + shown.map(card).join('') + '</div>';
        if (list.length > shown.length) {
            html += '<div class="ai-more"><button type="button" class="ai-more__btn" id="aiMore">' +
                L('Показать все ', 'Show all ') + list.length + '</button></div>';
        }
        return html;
    }

    function note() {
        return '<p class="ai-note">' +
            L('Товарные знаки принадлежат их владельцам. Это независимая подборка инструментов, о которых стоит знать, — не партнёрство и не реклама. Метки стилизованы; ссылки ведут на официальные сайты.',
              'Trademarks belong to their respective owners. This is an independent, non-sponsored list of tools worth knowing. Marks are stylized; links go to official sites.') +
        '</p>';
    }

    // ------------------------------------------------------------
    //  Сборка и события
    // ------------------------------------------------------------
    function paintCount() {
        var el = document.getElementById('aiCount');
        if (!el) return;
        // Именно «найдено», а не «показано»: на экране первая страница из 18,
        // и подпись «показано 79» противоречила бы кнопке «показать все 79».
        var found = M.LIST.filter(matches).length;
        el.innerHTML = L('Найдено ', 'Found ') + '<b>' + found + '</b>' + L(' из ', ' of ') + '<b>' + M.LIST.length + '</b>';
    }

    function renderDynamic(keepFocus) {
        // перерисовываем всё, кроме статичной ленты-россыпи
        mount.querySelector('.ai-dynamic').innerHTML = controls() + trackbar() + grid() + note();
        wireDynamic();
        paintCount();
        if (keepFocus) {
            var q = document.getElementById('aiQ');
            if (q) { q.focus(); q.setSelectionRange(q.value.length, q.value.length); }
        }
    }

    function wireDynamic() {
        mount.querySelectorAll('.ai-chip').forEach(function (btn) {
            btn.addEventListener('click', function () {
                state.track = btn.getAttribute('data-track');
                state.limit = PAGE_SIZE;
                renderDynamic();
            });
        });
        var catSel = document.getElementById('aiCat');
        if (catSel) catSel.addEventListener('change', function () { state.cat = catSel.value; state.limit = PAGE_SIZE; renderDynamic(); });
        var sortSel = document.getElementById('aiSort');
        if (sortSel) sortSel.addEventListener('change', function () { state.sort = sortSel.value; renderDynamic(); });

        var q = document.getElementById('aiQ');
        if (q) {
            q.addEventListener('input', function () {
                state.q = q.value;
                state.limit = PAGE_SIZE;
                renderDynamic(true);
            });
        }
        var more = document.getElementById('aiMore');
        if (more) more.addEventListener('click', function () { state.limit = Infinity; renderDynamic(); });
        var reset = document.getElementById('aiReset');
        if (reset) {
            reset.addEventListener('click', function () {
                state.track = 'all'; state.cat = 'all'; state.q = ''; state.limit = PAGE_SIZE;
                renderDynamic();
            });
        }
    }

    mount.innerHTML = marquee() + '<div class="ai-dynamic"></div>';
    renderDynamic();
})();
