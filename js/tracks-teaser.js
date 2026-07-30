/**
 * ============================================================
 *  MedoEDUz — выжимка обоснования треков на главной
 * ============================================================
 *
 *  Три самых сильных факта из доказательной базы + вход на полную
 *  страницу обоснования. Смысл: на главной ученик должен увидеть,
 *  что треки стоят на данных, а не на вкусе автора, — но без
 *  простыни на пол-экрана.
 *
 *  Отбор ДЕТЕРМИНИРОВАННЫЙ: по силе природы данных (эксперимент и
 *  телеметрия весят больше опроса самооценки), по одному факту с
 *  трека, в порядке треков. Никакой случайности — иначе на каждой
 *  перезагрузке главная показывала бы разное и выглядела нестабильной.
 */

'use strict';

(function () {
    var R = window.TRACK_RESEARCH;
    var C = window.CURRICULUM;
    var mount = document.getElementById('tracksTeaser');
    if (!R || !R.tracks || !mount) return;

    var LANG = document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'ru';
    function L(ru, en) { return LANG === 'en' ? en : ru; }
    function p(pair) {
        if (!pair) return '';
        if (typeof pair === 'string') return pair;
        return (LANG === 'en' && pair.en) ? pair.en : (pair.ru || pair.en || '');
    }
    function esc(s) {
        return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    }

    var KINDS = {
        survey: { ru: 'опрос', en: 'survey' },
        jobs: { ru: 'данные вакансий', en: 'job postings' },
        telemetry: { ru: 'телеметрия', en: 'telemetry' },
        experiment: { ru: 'эксперимент', en: 'experiment' },
        vendor: { ru: 'кейс вендора', en: 'vendor case' },
        stats: { ru: 'статистика', en: 'statistics' },
        other: { ru: 'данные', en: 'data' },
    };
    // Чем ниже число, тем сильнее доказательство
    var RANK = { experiment: 0, telemetry: 1, jobs: 2, stats: 3, survey: 4, vendor: 5, other: 6 };

    var ORDER = ['generalist', 'developer', 'agent-architect', 'memory-eng', 'ai-analyst', 'quant', 'security-eng'];

    // По одному лучшему факту с каждого трека, затем три сильнейших
    var picks = [];
    ORDER.forEach(function (key) {
        var d = R.tracks[key];
        if (!d || !d.demand || !d.demand.length) return;
        var best = null;
        d.demand.forEach(function (item) {
            if (!item.figure) return;
            if (!best || (RANK[item.kind] || 9) < (RANK[best.kind] || 9)) best = item;
        });
        if (best) picks.push({ track: key, item: best });
    });
    picks.sort(function (a, b) { return (RANK[a.item.kind] || 9) - (RANK[b.item.kind] || 9); });
    picks = picks.slice(0, 3);
    if (!picks.length) return;

    function trackName(key) {
        return (C && C.TRACKS && C.TRACKS[key]) ? (C.TRACKS[key].emoji + ' ' + C.TRACKS[key].name) : key;
    }

    var cards = picks.map(function (pick) {
        var it = pick.item;
        return '<article class="tt-card">' +
            '<div class="tt-card__figure">' + esc(it.figure) + '</div>' +
            '<span class="tr-kind tr-kind--' + esc(it.kind || 'other') + '">' +
                esc((KINDS[it.kind] || KINDS.other)[LANG]) + '</span>' +
            '<p class="tt-card__claim">' + esc(p(it.claim)) + '</p>' +
            '<div class="tt-card__foot">' +
                '<span class="tt-card__track">' + esc(trackName(pick.track)) + '</span>' +
                (it.source && it.source.url
                    ? '<a href="' + esc(it.source.url) + '" target="_blank" rel="noopener noreferrer">' +
                        esc(it.source.org || it.source.title) + '</a>'
                    : '') +
            '</div>' +
        '</article>';
    }).join('');

    mount.innerHTML =
        '<div class="tt-head">' +
            '<h3>' + L('Почему именно эти треки', 'Why these tracks') + '</h3>' +
            '<p>' + L('Направления выше опираются на данные о спросе и на механики, которые уже работают в компаниях. Вот три факта — с природой данных и источником.',
                      'The tracks above rest on demand data and on mechanics already running inside companies. Three facts, each with its evidence type and source.') + '</p>' +
        '</div>' +
        '<div class="tt-cards">' + cards + '</div>' +
        '<a class="tt-cta" href="pages/tracks.html">' +
            L('Полное обоснование: 7 треков, данные рынка и первоисточники →',
              'Full rationale: 7 tracks, market data, and primary sources →') +
        '</a>';
})();
