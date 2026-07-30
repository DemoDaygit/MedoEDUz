/**
 * ============================================================
 *  MedoEDUz — секция «Направления» на главной
 * ============================================================
 *
 *  Раньше здесь стояли шесть маркетинговых карточек («ИИ для
 *  контент-мейкеров, 6 недель, Хит»), которых в программе не
 *  существовало: человек жал «Направления» и видел не то, чему
 *  его будут учить. Теперь секция собирается из СЕМИ реальных
 *  треков курса — тех же, что на карте знаний, в хабе нейросетей
 *  и в приложении.
 *
 *  Единица карточки — не тема, а КОМПЕТЕНЦИЯ с доказательством:
 *  что человек сможет делать и чем это предъявляется. Плюс спектр
 *  задач, которые трек закрывает, и честная граница «чего он не
 *  даёт» — она отсекает тех, кто пришёл не за тем, до оплаты,
 *  а не после.
 *
 *  Данные: CURRICULUM.TRACKS (модель курса) + TRACK_PROFILES
 *  (компетенции) + AI_MODELS (инструменты трека). Ничего не
 *  дублируется руками — иначе обещание разойдётся с курсом.
 */

'use strict';

(function () {
    var C = window.CURRICULUM;
    var TP = window.TRACK_PROFILES;
    var AM = window.AI_MODELS;
    var mount = document.getElementById('tracksGrid');
    if (!C || !TP || !mount) return;

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

    /** Трек ученика — чтобы поднять его карточку наверх и пометить */
    function myTrack() {
        function j(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } }
        var site = j('medoeduz_game_state');
        if (site && site.profile && site.profile.track) return site.profile.track;
        var found = null;
        Object.keys(localStorage).forEach(function (k) {
            if (found || k.indexOf('medoeduz_app_') !== 0) return;
            var a = j(k);
            if (a && a.profile && a.profile.track) found = a.profile.track;
        });
        return found;
    }

    /** Факты берём из модели курса, а не из головы */
    function facts(key) {
        var nodes = C.NODES.filter(function (n) { return (n.tracks || []).indexOf(key) !== -1; });
        var week = (C.FIRST_WEEK && C.FIRST_WEEK[key]) ? C.FIRST_WEEK[key] : null;
        return {
            nodes: nodes.length,
            days: week && week.days ? week.days.length : 0,
            minutes: week && week.days ? week.days.reduce(function (s, d) { return s + (d.min || 0); }, 0) : 0,
        };
    }

    function toolChips(ids) {
        if (!AM || !ids || !ids.length) return '';
        var found = ids.map(function (id) {
            return AM.LIST.filter(function (m) { return m.id === id; })[0];
        }).filter(Boolean).slice(0, 6);
        if (!found.length) return '';
        return '<div class="trk-tools">' +
            '<span class="trk-tools__label">' + L('Инструменты трека', 'Track tools') + '</span>' +
            found.map(function (m) {
                return '<span class="trk-tool" title="' + esc(m.name + ' · ' + m.vendor) + '">' + esc(m.name) + '</span>';
            }).join('') +
        '</div>';
    }

    function card(key, mine) {
        var tr = C.TRACKS[key];
        var pr = TP.PROFILES[key];
        if (!tr || !pr) return '';
        var f = facts(key);

        var comps = pr.competencies.map(function (c) {
            return '<li><b>' + esc(p(c.name)) + '</b>' +
                '<span class="trk-proof">' + L('доказательство: ', 'proof: ') + esc(p(c.proof)) + '</span></li>';
        }).join('');

        var tasks = pr.tasks.map(function (t) {
            return '<span class="trk-task">' + esc(p(t)) + '</span>';
        }).join('');

        var audience = pr.audience.map(function (a) { return esc(p(a)); }).join(' · ');

        return '<article class="trk-card' + (mine ? ' is-mine' : '') + '" style="--trk:' + esc(tr.color) + '" id="track-' + esc(key) + '">' +
            '<header class="trk-card__head">' +
                '<span class="trk-card__emoji">' + tr.emoji + '</span>' +
                '<div>' +
                    '<h3 class="trk-card__name">' + esc(tr.name) +
                        (mine ? '<span class="trk-mine">' + L('ваш трек', 'your track') + '</span>' : '') + '</h3>' +
                    '<span class="trk-card__level">' + esc(p(pr.level)) + '</span>' +
                '</div>' +
            '</header>' +

            '<p class="trk-card__promise">' + esc(p(pr.promise)) + '</p>' +

            '<div class="trk-sub">' + L('Что вы сможете делать', 'What you will be able to do') + '</div>' +
            '<ul class="trk-comps">' + comps + '</ul>' +

            '<div class="trk-sub">' + L('Какие задачи это закрывает', 'Which tasks this covers') + '</div>' +
            '<div class="trk-tasks">' + tasks + '</div>' +

            toolChips(pr.tools) +

            '<p class="trk-notfor"><b>' + L('Чего трек не даёт. ', 'What this track does not give. ') + '</b>' +
                esc(p(pr.notFor)) + '</p>' +

            '<footer class="trk-card__foot">' +
                '<span class="trk-fact"><b>' + f.nodes + '</b> ' + L('узлов', 'nodes') + '</span>' +
                (f.days ? '<span class="trk-fact"><b>' + f.days + '</b> ' + L('дней первой недели', 'days in week one') + '</span>' : '') +
                '<span class="trk-card__links">' +
                    '<a href="pages/tracks.html#' + esc(key) + '">' + L('Данные рынка', 'Market data') + '</a>' +
                    '<a class="trk-go" href="pages/roadmap.html">' + L('Начать', 'Start') + ' →</a>' +
                '</span>' +
            '</footer>' +
        '</article>';
    }

    var mine = myTrack();
    // Свой трек — первым: карточек семь, и листать до своей неудобно
    var order = TP.ORDER.slice();
    if (mine && order.indexOf(mine) > 0) {
        order.splice(order.indexOf(mine), 1);
        order.unshift(mine);
    }

    mount.innerHTML = order.map(function (k) { return card(k, k === mine); }).join('');
})();
