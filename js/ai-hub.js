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
    //  Всё на currentColor — цвет задаётся плиткой .ai-logo.
    // ------------------------------------------------------------
    var S = 'stroke="currentColor" fill="none" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"';
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
    };

    function matches(model) {
        if (state.track !== 'all' && model.tracks.indexOf(state.track) === -1) return false;
        if (state.cat !== 'all' && model.cats.indexOf(state.cat) === -1) return false;
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
        var one = M.LIST.map(pill).join('');
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
            '<a class="ai-trackbar__link" href="pages/roadmap.html">' + L('Открыть трек на карте знаний →', 'Open this track on the map →') + '</a>' +
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
                L('Под этот трек и модальность инструментов пока нет — сбросьте один из фильтров.',
                  'No tools for this track and modality yet — clear one of the filters.') + '</p></div>';
        }
        return '<div class="ai-grid">' + list.map(card).join('') + '</div>';
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
        var shown = M.LIST.filter(matches).length;
        el.innerHTML = L('Показано ', 'Showing ') + '<b>' + shown + '</b>' + L(' из ', ' of ') + '<b>' + M.LIST.length + '</b>';
    }

    function renderDynamic() {
        // перерисовываем всё, кроме статичной ленты-россыпи
        mount.querySelector('.ai-dynamic').innerHTML = controls() + trackbar() + grid() + note();
        wireDynamic();
        paintCount();
    }

    function wireDynamic() {
        mount.querySelectorAll('.ai-chip').forEach(function (btn) {
            btn.addEventListener('click', function () {
                state.track = btn.getAttribute('data-track');
                renderDynamic();
            });
        });
        var catSel = document.getElementById('aiCat');
        if (catSel) catSel.addEventListener('change', function () { state.cat = catSel.value; renderDynamic(); });
        var sortSel = document.getElementById('aiSort');
        if (sortSel) sortSel.addEventListener('change', function () { state.sort = sortSel.value; renderDynamic(); });
    }

    mount.innerHTML = marquee() + '<div class="ai-dynamic"></div>';
    renderDynamic();
})();
