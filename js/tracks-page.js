/**
 * ============================================================
 *  MedoEDUz — страница «Треки обучения: обоснование»
 * ============================================================
 *
 *  Рисует страницу из ДВУХ источников:
 *  - js/data/track-research.js — доказательная база (собрана и
 *    проверена отдельным проходом, каждая ссылка открывалась);
 *  - window.CURRICULUM — сам курс: сколько узлов в треке, что в
 *    первой неделе, какие уровни сложности.
 *
 *  Смысл соединения: исследование объясняет, ЗАЧЕМ трек, а модель
 *  курса показывает, ЧТО в нём проходят. Порознь первое читается
 *  как реклама, второе — как оглавление.
 *
 *  Двуязычие: данные лежат парами ru/en (как в реестре моделей),
 *  язык берётся из data-lang. Словарь сайта тут не нужен.
 */

'use strict';

(function () {
    var R = window.TRACK_RESEARCH;
    var C = window.CURRICULUM;
    var mount = document.getElementById('tracksMount');
    if (!R || !mount) return;

    var LANG = document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'ru';
    function L(ru, en) { return LANG === 'en' ? en : ru; }
    /** Достаёт нужный язык из пары {ru, en} */
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

    // Природа данных: опрос самооценки и телеметрия имеют разную силу,
    // и метка на карточке обязана это показывать.
    var KINDS = {
        survey: { ru: 'опрос', en: 'survey' },
        jobs: { ru: 'данные вакансий', en: 'job postings' },
        telemetry: { ru: 'телеметрия', en: 'telemetry' },
        experiment: { ru: 'эксперимент', en: 'experiment' },
        vendor: { ru: 'кейс вендора', en: 'vendor case' },
        stats: { ru: 'статистика', en: 'statistics' },
        other: { ru: 'данные', en: 'data' },
    };
    function kindLabel(k) { return (KINDS[k] || KINDS.other)[LANG]; }

    var ORDER = ['generalist', 'developer', 'agent-architect', 'memory-eng', 'ai-analyst', 'quant', 'security-eng'];
    function trackMeta(key) {
        var t = (C && C.TRACKS && C.TRACKS[key]) || {};
        return {
            name: t.name || key,
            emoji: t.emoji || '•',
            color: t.color || 'var(--accent)',
            goal: t.goal || '',
            who: t.forWhom || '',
        };
    }

    /** Сколько узлов трека и сколько дней в его первой неделе */
    function courseFacts(key) {
        if (!C || !C.NODES) return null;
        var nodes = C.NODES.filter(function (n) { return (n.tracks || []).indexOf(key) !== -1; });
        var byLevel = {};
        nodes.forEach(function (n) { byLevel[n.level] = (byLevel[n.level] || 0) + 1; });
        var week = (C.FIRST_WEEK && C.FIRST_WEEK[key]) ? C.FIRST_WEEK[key] : null;
        return {
            nodes: nodes.length,
            xp: nodes.reduce(function (s, n) { return s + (n.xp || 0); }, 0),
            days: week && week.days ? week.days.length : 0,
            outcome: week ? week.outcome : '',
            byLevel: byLevel,
        };
    }

    function source(src) {
        if (!src || !src.url) return '';
        return '<div class="tr-src"><a href="' + esc(src.url) + '" target="_blank" rel="noopener noreferrer">' +
            esc(src.title) + '</a><br><span>' + esc(src.org || '') +
            (src.date ? ' · ' + esc(src.date) : '') + '</span></div>';
    }

    function evidenceCard(d) {
        return '<article class="tr-ev">' +
            (d.figure ? '<div class="tr-ev__figure">' + esc(d.figure) + '</div>' : '') +
            '<span class="tr-kind tr-kind--' + esc(d.kind || 'other') + '">' + esc(kindLabel(d.kind)) + '</span>' +
            '<p class="tr-ev__claim">' + esc(p(d.claim)) + '</p>' +
            (p(d.caveat) ? '<p class="tr-ev__caveat">' + esc(p(d.caveat)) + '</p>' : '') +
            source(d.source) +
        '</article>';
    }

    function mechCard(m) {
        return '<article class="tr-mech">' +
            '<div class="tr-mech__process">' + esc(p(m.process)) + '</div>' +
            '<p class="tr-mech__pattern">' + esc(p(m.pattern)) + '</p>' +
            '<p class="tr-mech__outcome">' + esc(p(m.outcome)) + '</p>' +
            '<div class="tr-mech__foot">' +
                '<span class="tr-kind tr-kind--' + esc(m.kind || 'other') + '">' + esc(kindLabel(m.kind)) + '</span>' +
                source(m.source) +
            '</div>' +
        '</article>';
    }

    function trackBlock(key) {
        var data = R.tracks[key];
        if (!data) return '';
        var meta = trackMeta(key);
        var cf = courseFacts(key);

        var html = '<section class="tr-track" id="' + esc(key) + '" style="--tr-color:' + esc(meta.color) + '">';

        // ---- шапка трека: цель, вывод из данных, что внутри курса ----
        html += '<div class="tr-track__head">' +
            '<h2 class="tr-track__title"><span class="tr-track__emoji">' + meta.emoji + '</span>' + esc(meta.name) + '</h2>' +
            (meta.goal ? '<p class="tr-track__goal">' + esc(meta.goal) + '</p>' : '') +
            (p(data.lede) ? '<p class="tr-track__lede">' + esc(p(data.lede)) + '</p>' : '');

        if (cf && cf.nodes) {
            html += '<div class="tr-facts">' +
                '<span class="tr-fact">' + L('узлов в треке: ', 'nodes in track: ') + '<b>' + cf.nodes + '</b></span>' +
                (cf.days ? '<span class="tr-fact">' + L('первая неделя: ', 'first week: ') + '<b>' + cf.days + ' ' + L('дней', 'days') + '</b></span>' : '') +
                '<span class="tr-fact">' + L('опыта: ', 'XP: ') + '<b>' + cf.xp + '</b></span>' +
                '<a href="roadmap.html">' + L('Открыть на карте знаний →', 'Open on the knowledge map →') + '</a>' +
            '</div>';
        }
        html += '</div>';

        // ---- спрос рынка ----
        if (data.demand && data.demand.length) {
            html += '<div class="tr-sub">' + L('Почему это спрашивают', 'Why the market asks for it') + '</div>';
            html += '<div class="tr-evidence">' + data.demand.map(evidenceCard).join('') + '</div>';
        }

        // ---- отработанные механики ----
        if (data.mechanics && data.mechanics.length) {
            html += '<div class="tr-sub">' + L('Как это уже работает в бизнес-процессах', 'How it already works in business processes') + '</div>';
            html += data.mechanics.map(mechCard).join('');
        }

        // ---- роли и навыки ----
        var roles = (data.roles || []).map(function (r) {
            return '<li><b>' + esc(p(r.title)) + '</b> — ' + esc(p(r.note)) + '</li>';
        }).join('');
        var skills = (data.skills || []).map(function (s) {
            return '<li><b>' + esc(p(s.name)) + '</b> — ' + esc(p(s.why)) + '</li>';
        }).join('');
        if (roles || skills) {
            html += '<div class="tr-cols">';
            if (roles) {
                html += '<div><div class="tr-sub">' + L('Куда ведёт', 'Where it leads') + '</div><ul class="tr-list">' + roles + '</ul></div>';
            }
            if (skills) {
                html += '<div><div class="tr-sub">' + L('Что спрашивают', 'Skills asked for') + '</div><ul class="tr-list">' + skills + '</ul></div>';
            }
            html += '</div>';
        }

        // ---- первоисточники ----
        if (data.anchors && data.anchors.length) {
            html += '<div class="tr-sub">' + L('Первоисточники по треку', 'Primary sources for this track') + '</div>';
            html += '<ul class="tr-anchors">' + data.anchors.map(function (a) {
                return '<li><a href="' + esc(a.url) + '" target="_blank" rel="noopener noreferrer">' + esc(a.title) + '</a> ' +
                    '<span>' + esc(a.org || '') + '</span><br>' + esc(p(a.why)) + '</li>';
            }).join('') + '</ul>';
        }

        // ---- честная оговорка ----
        if (p(data.caveat)) {
            html += '<div class="tr-caveat"><b>' + L('Чего эти данные не доказывают. ', 'What this evidence does not prove. ') + '</b>' +
                esc(p(data.caveat)) + '</div>';
        }

        html += '</section>';
        return html;
    }

    function nav() {
        var items = ORDER.filter(function (k) { return R.tracks[k]; }).map(function (k) {
            var m = trackMeta(k);
            return '<a href="#' + esc(k) + '">' + m.emoji + ' ' + esc(m.name) + '</a>';
        }).join('');
        return '<nav class="tr-nav">' + items + '</nav>';
    }

    function method() {
        return '<div class="tr-method">' +
            '<b>' + L('Как читать эту страницу.', 'How to read this page.') + '</b> ' +
            L('У каждой цифры стоит метка природы данных: <b>опрос</b> — это самооценка людей, а не измерение; <b>телеметрия</b> и <b>эксперимент</b> весят больше; <b>кейс вендора</b> — самоотчёт заинтересованной стороны. Рядом с каждым утверждением написано, чего оно НЕ доказывает. Все ссылки открывались при сборке: если источник не подтверждал цифру, пункт выбрасывался, а не переформулировался.',
              'Every figure carries a label for the kind of evidence: <b>survey</b> means people rating themselves, not a measurement; <b>telemetry</b> and <b>experiment</b> carry more weight; a <b>vendor case</b> is an interested party reporting on itself. Next to each claim you will find what it does <em>not</em> prove. Every link was opened during assembly: when a source did not support the figure, the item was dropped rather than reworded.') +
        '</div>';
    }

    function ending() {
        var html = '<div class="tr-end">';

        if (R.tensions && R.tensions.length) {
            html += '<h2>' + L('Где данные спорят друг с другом', 'Where the evidence pulls both ways') + '</h2>';
            R.tensions.forEach(function (t) { html += '<p>' + esc(p(t)) + '</p>'; });
        }

        if (p(R.gaps)) {
            html += '<h2>' + L('Чего мы не знаем', 'What we do not know') + '</h2>' +
                '<p>' + esc(p(R.gaps)) + '</p>';
        }

        if (R.shared && R.shared.length) {
            html += '<h2>' + L('Источники, общие для нескольких треков', 'Sources shared across tracks') + '</h2>' +
                '<ul class="tr-shared">' + R.shared.map(function (s) {
                    return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.title) + '</a>' +
                        '<span>' + esc(s.org || '') + '</span></li>';
                }).join('') + '</ul>';
        }

        html += '</div>';
        return html;
    }

    mount.innerHTML = method() + nav() +
        ORDER.filter(function (k) { return R.tracks[k]; }).map(trackBlock).join('') +
        ending();
})();
