/**
 * ============================================================
 *  База артефактов Медоеда — соты и разблокировка
 * ============================================================
 *
 *  Прогресс читается из ДВУХ источников: игровое состояние сайта
 *  (medoeduz_game_state.openedCourses) и состояние приложения
 *  (medoeduz_app_<uid>.skills). Ученик мог осваивать узлы и на
 *  карте, и в учебной сессии — засчитываем и то и другое, иначе
 *  человек «теряет» половину пройденного при переходе между
 *  экранами.
 *
 *  Закрытые соты НЕ прячутся: видно, что тебя ждёт и на каком
 *  условии откроется. Скрытая награда не мотивирует, известная —
 *  да, а честное «осталось 2 узла» ещё и подсказывает следующий шаг.
 */

'use strict';

(function () {
    var A = window.ARTIFACTS;
    var C = window.CURRICULUM;
    if (!A || !C) return;

    var T = window.t || function (s) { return s; };
    var LANG = document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'ru';

    // ============================================================
    //  Прогресс из обоих источников
    // ============================================================
    function readJson(key) {
        try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { return null; }
    }

    function progress() {
        var mastered = {}, level = 1, syn = {}, weeks = {}, track = null;

        var site = readJson('medoeduz_game_state');
        if (site) {
            (site.openedCourses || []).forEach(function (id) { mastered[id] = 1; });
            level = Math.max(level, site.level || 1);
            if (site.profile && site.profile.track) track = site.profile.track;
        }

        // Ключ приложения зависит от Telegram user_id — перебираем все
        Object.keys(localStorage).forEach(function (k) {
            if (k.indexOf('medoeduz_app_') !== 0) return;
            var app = readJson(k);
            if (!app) return;
            (app.skills || []).forEach(function (id) { mastered[id] = 1; });
            (app.syn || []).forEach(function (id) { syn[id] = 1; });
            level = Math.max(level, app.level || 1);
            if (app.profile && app.profile.track) track = track || app.profile.track;
            if (app.week && app.week.finishedAt && app.week.track) weeks[app.week.track] = 1;
        });

        return { mastered: mastered, level: level, syn: syn, weeks: weeks, track: track };
    }

    /** Доля освоенных узлов ветки или трека, 0..1 */
    function share(p, kind, key) {
        var list = C.NODES.filter(function (n) {
            return kind === 'branch' ? n.branch === key : (n.tracks || []).indexOf(key) !== -1;
        });
        if (!list.length) return 0;
        var done = list.filter(function (n) { return p.mastered[n.id]; }).length;
        return done / list.length;
    }

    /**
     * Открыт ли артефакт + как далеко до него.
     * Возвращает { open, pct, need } — need это готовая
     * человеческая формулировка условия.
     */
    function gate(a, p) {
        var n = a.need || {};

        if (n.node) {
            var nd = C.BY_ID[n.node];
            return {
                open: !!p.mastered[n.node],
                pct: p.mastered[n.node] ? 1 : 0,
                need: T('Освойте узел ') + '«' + (nd ? nd.title : n.node) + '»',
            };
        }
        if (n.branch) {
            var sb = share(p, 'branch', n.branch);
            var needB = (n.pct || 50) / 100;
            var br = C.BRANCHES[n.branch];
            return {
                open: sb >= needB,
                pct: Math.min(1, sb / needB),
                need: T('Пройдите ') + (n.pct || 50) + T('% ветки ') + '«' + (br ? br.name : n.branch) + '»',
            };
        }
        if (n.track) {
            var st = share(p, 'track', n.track);
            var needT = (n.pct || 50) / 100;
            var tr = C.TRACKS[n.track];
            return {
                open: st >= needT,
                pct: Math.min(1, st / needT),
                need: T('Пройдите ') + (n.pct || 50) + T('% трека ') + '«' + (tr ? tr.name : n.track) + '»',
            };
        }
        if (n.week) {
            var trk = C.TRACKS[n.week];
            var wk = share(p, 'track', n.week);
            var weekNodes = (C.FIRST_WEEK && C.FIRST_WEEK[n.week]) ? C.FIRST_WEEK[n.week].days : [];
            var wdone = weekNodes.filter(function (d) { return p.mastered[d.node]; }).length;
            return {
                open: !!p.weeks[n.week] || (weekNodes.length > 0 && wdone >= weekNodes.length),
                pct: weekNodes.length ? wdone / weekNodes.length : wk,
                need: T('Пройдите первую неделю трека ') + '«' + (trk ? trk.name : n.week) + '»',
            };
        }
        if (n.level) {
            return { open: p.level >= n.level, pct: Math.min(1, p.level / n.level), need: T('Достигните уровня ') + n.level };
        }
        if (n.synergy) {
            var sy = (C.SYNERGIES || []).filter(function (x) { return x.id === n.synergy; })[0];
            return { open: !!p.syn[n.synergy], pct: p.syn[n.synergy] ? 1 : 0, need: T('Откройте синергию ') + '«' + (sy ? sy.name : n.synergy) + '»' };
        }
        if (n.skills) {
            var cnt = Object.keys(p.mastered).length;
            return { open: cnt >= n.skills, pct: Math.min(1, cnt / n.skills), need: T('Освойте ') + n.skills + T(' узлов') };
        }
        return { open: true, pct: 1, need: '' };
    }

    function titleOf(a) {
        if (a.kind === 'tool') return LANG === 'en' && a.titleEn ? a.titleEn : a.title;
        if (a.branch && C.BRANCHES[a.branch]) return T('Гайд: ') + C.BRANCHES[a.branch].name;
        if (a.track && C.TRACKS[a.track]) return T('Трек: ') + C.TRACKS[a.track].name;
        return a.id;
    }
    function summaryOf(a) {
        if (a.kind === 'tool') return LANG === 'en' && a.summaryEn ? a.summaryEn : a.summary;
        if (a.branch && C.BRANCHES[a.branch]) return T('Рабочий справочник по ветке: приёмы, чек-лист, где заваливаются.');
        if (a.track && C.TRACKS[a.track]) return T('Порядок прохождения трека, уровни зрелости и что собрать в портфолио.');
        return '';
    }
    function colorOf(a) {
        if (a.branch && C.BRANCHES[a.branch]) return C.BRANCHES[a.branch].color;
        if (a.track && C.TRACKS[a.track]) return C.TRACKS[a.track].color;
        return 'var(--border-strong)';
    }

    function esc(s) {
        return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    }

    // ============================================================
    //  Раскладка сот
    //  Осевые координаты → пиксели. Соты стыкуются кромка к кромке,
    //  сеткой это не выражается, поэтому абсолютное позиционирование.
    // ============================================================
    var HEX_W = 132;                       // ширина соты
    var HEX_H = Math.round(HEX_W * 0.885); // высота: чуть меньше ширины у плоской вершины
    var GAP = 6;

    function layout(host, list) {
        var qs = list.map(function (a) { return a.cell.q; });
        var rs = list.map(function (a) { return a.cell.r; });
        var minQ = Math.min.apply(null, qs), minR = Math.min.apply(null, rs);
        var maxQ = Math.max.apply(null, qs), maxR = Math.max.apply(null, rs);

        var stepX = (HEX_W + GAP) * 0.75;
        var stepY = HEX_H + GAP;

        list.forEach(function (a) {
            var q = a.cell.q - minQ, r = a.cell.r - minR;
            a._x = q * stepX;
            a._y = r * stepY + (q % 2 ? stepY / 2 : 0);
        });

        var w = (maxQ - minQ) * stepX + HEX_W;
        var h = (maxR - minR) * stepY + HEX_H + stepY / 2;
        host.style.width = w + 'px';
        host.style.height = h + 'px';

        // Подсказку показываем, только если поле реально не влезло
        var wrap = document.getElementById('honeycombScroll');
        var hint = document.getElementById('honeycombHint');
        if (wrap && hint) {
            var tight = w > wrap.clientWidth + 2;
            hint.classList.toggle('is-on', tight);
            // Влезло — центрируем; не влезло — начинаем с левого края
            host.style.margin = tight ? '0' : '0 auto';
        }
        return { w: w, h: h };
    }

    // ============================================================
    //  Рендер
    // ============================================================
    var filter = 'all';
    var opened = {};
    try { opened = JSON.parse(localStorage.getItem('medoeduz_artifacts_seen') || '{}'); } catch (e) { opened = {}; }

    function visible(a, p) {
        if (filter === 'all') return true;
        if (filter === 'open') return gate(a, p).open;
        if (filter === 'tool') return a.kind === 'tool';
        if (filter === 'guide') return a.kind === 'guide';
        if (filter === 'mine') {
            if (!p.track) return true;
            if (a.track) return a.track === p.track;
            if (a.branch) {
                return C.NODES.some(function (n) {
                    return n.branch === a.branch && (n.tracks || []).indexOf(p.track) !== -1;
                });
            }
            return true;
        }
        return true;
    }

    function render() {
        var p = progress();
        var host = document.getElementById('honeycomb');
        var list = A.ALL.filter(function (a) { return visible(a, p); });

        if (!list.length) {
            host.style.width = ''; host.style.height = '';
            host.innerHTML = '<p class="art-locked__p" style="padding:2rem 0">' +
                esc(T('В этом фильтре пока ничего нет.')) + '</p>';
            return;
        }

        layout(host, list);

        host.innerHTML = list.map(function (a) {
            var g = gate(a, p);
            var isNew = g.open && !opened[a.id];
            return '<button class="hex ' + (g.open ? 'is-open' : 'is-locked') + (isNew ? ' is-new' : '') + '"' +
                ' style="left:' + a._x + 'px;top:' + a._y + 'px;width:' + HEX_W + 'px;height:' + HEX_H + 'px;' +
                '--hex-edge:' + colorOf(a) + '"' +
                ' data-art="' + esc(a.id) + '"' +
                ' aria-label="' + esc(titleOf(a)) + (g.open ? '' : ' — ' + esc(T('закрыто'))) + '">' +
                '<span class="hex__edge"></span>' +
                '<span class="hex__face">' +
                    '<span class="hex__emoji">' + a.emoji + '</span>' +
                    '<span class="hex__title">' + esc(titleOf(a)) + '</span>' +
                    '<span class="hex__kind">' + esc(a.kind === 'tool' ? T('инструмент') : T('гайд')) + '</span>' +
                '</span>' +
                (g.open ? '' : '<span class="hex__lock">🔒</span>') +
            '</button>';
        }).join('');

        host.querySelectorAll('.hex').forEach(function (b) {
            b.addEventListener('click', function () { openArtifact(b.dataset.art); });
        });

        // Сводка
        var total = A.ALL.length;
        var open = A.ALL.filter(function (a) { return gate(a, p).open; }).length;
        var sum = document.getElementById('artSummary');
        if (sum) {
            sum.innerHTML =
                '<span class="art-chip art-chip--open">🔓 <b>' + open + '</b> ' + esc(T('из')) + ' <b>' + total + '</b> ' + esc(T('открыто')) + '</span>' +
                '<span class="art-chip">🧰 <b>' + A.TOOLS.length + '</b> ' + esc(T('инструментов')) + '</span>' +
                '<span class="art-chip">📄 <b>' + (A.BRANCH_GUIDES.length + A.TRACK_GUIDES.length) + '</b> ' + esc(T('гайдов')) + '</span>';
        }
    }

    // ============================================================
    //  Шторка артефакта
    // ============================================================
    function openArtifact(id) {
        var a = A.BY_ID[id];
        if (!a) return;
        var p = progress();
        var g = gate(a, p);

        var view = document.getElementById('artView');
        var body = document.getElementById('artBody');
        document.getElementById('artEmoji').textContent = a.emoji;
        document.getElementById('artTitle').textContent = titleOf(a);
        document.getElementById('artKind').textContent =
            (a.kind === 'tool' ? T('Интерактивный инструмент') : T('Справочник')) + ' · ' + summaryOf(a);

        view.classList.add('is-open');
        document.body.style.overflow = 'hidden';

        if (!g.open) {
            body.innerHTML =
                '<div class="art-locked">' +
                    '<div class="art-locked__icon">🔒</div>' +
                    '<div class="art-locked__h">' + esc(T('Артефакт ещё закрыт')) + '</div>' +
                    '<p class="art-locked__p">' + esc(g.need) + '. ' +
                        esc(T('Артефакты открываются за пройденное, а не за посещение страницы — так у них остаётся ценность.')) + '</p>' +
                    '<div class="art-progress">' +
                        '<div class="art-progress__bar"><div class="art-progress__fill" style="width:' + Math.round(g.pct * 100) + '%"></div></div>' +
                        '<div class="art-progress__t">' + Math.round(g.pct * 100) + '%</div>' +
                    '</div>' +
                '</div>';
            return;
        }

        // Помечаем как увиденный, чтобы подсветка «новое» не мигала вечно
        opened[a.id] = 1;
        try { localStorage.setItem('medoeduz_artifacts_seen', JSON.stringify(opened)); } catch (e) {}

        var base = '../';
        var href = base + a.file;

        if (a.kind === 'tool') {
            body.innerHTML =
                '<div class="art-view__actions">' +
                    '<a class="art-btn art-btn--primary" href="' + esc(href) + '" target="_blank" rel="noopener">' +
                        esc(T('Открыть инструмент')) + ' ↗</a>' +
                '</div>' +
                '<p class="md">' + esc(summaryOf(a)) + '</p>' +
                '<iframe src="' + esc(href) + '" title="' + esc(titleOf(a)) + '" ' +
                    'style="width:100%;height:640px;border:1px solid var(--border);border-radius:12px;margin-top:1rem;background:var(--bg-elevated)" ' +
                    'loading="lazy"></iframe>';
            return;
        }

        body.innerHTML = '<p class="md">' + esc(T('Загружаем…')) + '</p>';
        fetch(href)
            .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
            .then(function (md) {
                body.innerHTML =
                    '<div class="art-view__actions">' +
                        '<a class="art-btn" href="' + esc(href) + '" download>' + esc(T('Скачать .md')) + '</a>' +
                        '<button class="art-btn" id="artCopy">' + esc(T('Скопировать текст')) + '</button>' +
                    '</div>' +
                    '<div class="md">' + renderMd(md) + '</div>';
                var cp = document.getElementById('artCopy');
                if (cp) cp.addEventListener('click', function () {
                    navigator.clipboard.writeText(md).then(function () {
                        cp.textContent = T('Скопировано');
                        setTimeout(function () { cp.textContent = T('Скопировать текст'); }, 1800);
                    }).catch(function () { cp.textContent = T('Не вышло — выделите вручную'); });
                });
            })
            .catch(function () {
                body.innerHTML = '<p class="md">' + esc(T('Не удалось загрузить артефакт. Проверьте соединение.')) + '</p>';
            });
    }

    function closeView() {
        document.getElementById('artView').classList.remove('is-open');
        document.body.style.overflow = '';
        render();   // могла измениться отметка «новое»
    }

    // ============================================================
    //  Минимальный рендер Markdown
    //  Внешних библиотек в проекте нет и не будет, а содержимое
    //  наше собственное — поэтому хватает узкого подмножества.
    //  Экранирование идёт ДО разметки: иначе < в тексте съест абзац.
    // ============================================================
    function renderMd(src) {
        var lines = String(src).replace(/\r\n/g, '\n').split('\n');
        var out = [];
        var i = 0;

        function inline(s) {
            return esc(s)
                .replace(/`([^`]+)`/g, '<code>$1</code>')
                .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                .replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>')
                .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
                    '<a href="$2" target="_blank" rel="noopener">$1</a>');
        }

        while (i < lines.length) {
            var ln = lines[i];

            // блок кода
            if (/^```/.test(ln)) {
                var buf = [];
                i++;
                while (i < lines.length && !/^```/.test(lines[i])) { buf.push(lines[i]); i++; }
                i++;
                out.push('<pre><code>' + esc(buf.join('\n')) + '</code></pre>');
                continue;
            }
            // таблица
            if (/\|/.test(ln) && i + 1 < lines.length && /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(lines[i + 1])) {
                var head = ln.split('|').map(function (c) { return c.trim(); }).filter(function (c, idx, arr) { return !(c === '' && (idx === 0 || idx === arr.length - 1)); });
                i += 2;
                var rows = [];
                while (i < lines.length && /\|/.test(lines[i]) && lines[i].trim()) {
                    rows.push(lines[i].split('|').map(function (c) { return c.trim(); })
                        .filter(function (c, idx, arr) { return !(c === '' && (idx === 0 || idx === arr.length - 1)); }));
                    i++;
                }
                out.push('<div class="md__scroll"><table><thead><tr>' +
                    head.map(function (h) { return '<th>' + inline(h) + '</th>'; }).join('') +
                    '</tr></thead><tbody>' +
                    rows.map(function (r) {
                        return '<tr>' + r.map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>';
                    }).join('') + '</tbody></table></div>');
                continue;
            }
            // заголовки
            var h = ln.match(/^(#{1,4})\s+(.*)$/);
            if (h) {
                var lvl = Math.min(4, Math.max(2, h[1].length));
                out.push('<h' + lvl + '>' + inline(h[2]) + '</h' + lvl + '>');
                i++; continue;
            }
            // горизонтальная линия
            if (/^\s*(---|\*\*\*)\s*$/.test(ln)) { out.push('<hr>'); i++; continue; }
            // цитата
            if (/^>\s?/.test(ln)) {
                var q = [];
                while (i < lines.length && /^>\s?/.test(lines[i])) { q.push(lines[i].replace(/^>\s?/, '')); i++; }
                out.push('<blockquote>' + inline(q.join(' ')) + '</blockquote>');
                continue;
            }
            // списки
            if (/^\s*[-*+]\s+/.test(ln)) {
                var ul = [];
                while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
                    ul.push('<li>' + inline(lines[i].replace(/^\s*[-*+]\s+/, '')) + '</li>');
                    i++;
                }
                out.push('<ul>' + ul.join('') + '</ul>');
                continue;
            }
            if (/^\s*\d+[.)]\s+/.test(ln)) {
                var ol = [];
                while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) {
                    ol.push('<li>' + inline(lines[i].replace(/^\s*\d+[.)]\s+/, '')) + '</li>');
                    i++;
                }
                out.push('<ol>' + ol.join('') + '</ol>');
                continue;
            }
            // абзац
            if (ln.trim()) {
                var par = [];
                while (i < lines.length && lines[i].trim() &&
                       !/^(#{1,4}\s|\s*[-*+]\s|\s*\d+[.)]\s|>|```)/.test(lines[i])) {
                    par.push(lines[i]); i++;
                }
                out.push('<p>' + inline(par.join(' ')) + '</p>');
                continue;
            }
            i++;
        }
        return out.join('\n');
    }

    // ============================================================
    //  Старт
    // ============================================================
    function init() {
        render();

        var f = document.getElementById('artFilter');
        if (f) f.addEventListener('click', function (e) {
            var b = e.target.closest('button[data-f]');
            if (!b) return;
            filter = b.dataset.f;
            f.querySelectorAll('button').forEach(function (x) { x.classList.toggle('is-on', x === b); });
            render();
        });

        document.getElementById('artClose').addEventListener('click', closeView);
        document.getElementById('artView').addEventListener('click', function (e) {
            if (e.target.id === 'artView') closeView();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && document.getElementById('artView').classList.contains('is-open')) closeView();
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
