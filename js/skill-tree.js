/**
 * ============================================================
 *  MedoEDUz Skill Tree — Движок визуализации «Карты знаний»
 * ============================================================
 *
 *  Модельно-ориентированный рендер: всё дерево строится из
 *  CURRICULUM (js/data/curriculum.js). Состояние узлов реактивно
 *  выводится из GameEngine (уровень игрока + освоенные узлы).
 *
 *  Состояния узла:
 *    mastered  — освоен игроком
 *    available — все предшественники освоены И уровень достаточен
 *    locked    — требования не выполнены
 *
 *  Возможности: SVG-граф, pan & zoom (колесо/перетаскивание/тач),
 *  подсветка путей, тултипы, церемония разблокировки, авто-фит.
 */

'use strict';

const SkillTree = (() => {
    const SVG_NS = 'http://www.w3.org/2000/svg';
    const COL_GAP = 230;
    const ROW_GAP = 165;
    const MARGIN = 130;
    const R = 38;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let host, svg, viewport, tooltip, summaryEl;
    let habitatLayer, fogMask, biomeLayer;
    let model;

    // ============================================================
    //  АРЕАЛ ОБИТАНИЯ
    //
    //  Карта знаний — не схема, а территория медоеда. Освоенный узел
    //  не «загорается», а РАСШИРЯЕТ ареал: вокруг него прирастает
    //  область, которая сливается с соседними в одно пятно.
    //
    //  Почему именно так, а не подсветка узлов:
    //  - Прирост площади виден боковым зрением и накапливается —
    //    в отличие от галочки, которая живёт секунду.
    //  - Туман войны превращает «ещё 40 узлов» в «неизведанное»:
    //    непройденное перестаёт читаться как долг и начинает
    //    читаться как место, куда можно пойти.
    //  - Слияние областей награждает за ПОСЛЕДОВАТЕЛЬНОСТЬ: два
    //    соседних узла дают связную территорию, два случайных —
    //    два острова. Это подталкивает достраивать ветку, не
    //    запрещая разбегаться.
    //  - Биом = ветка. «Открыт новый биом» — событие масштаба ветки,
    //    которого раньше на карте не было вообще.
    //
    //  Радиус подобран под сетку: ROW_GAP=165, значит соседние по
    //  вертикали узлы сливаются (110+110 > 165), а дальние остаются
    //  отдельными островами, пока между ними не освоят промежуточный.
    // ============================================================
    const TERRITORY_R = 110;   // радиус притязаний освоенного узла
    const FRONTIER_R = 62;     // разведанная кромка вокруг доступного
    const FOG_R = 150;         // радиус, на который узел раздвигает туман
    const nodeEls = new Map();   // id -> { group, circle }
    const edgeEls = [];          // { path, from, to }
    let view = { x: 0, y: 0, scale: 1 };
    let drag = null;

    // ---------- Утилиты ----------
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    function pos(node) {
        return { x: MARGIN + node.col * COL_GAP, y: MARGIN + node.row * ROW_GAP };
    }

    function el(tag, attrs = {}) {
        const e = document.createElementNS(SVG_NS, tag);
        for (const k in attrs) e.setAttribute(k, attrs[k]);
        return e;
    }

    function masteredSet() {
        if (!window.GameEngine) return new Set();
        return new Set(GameEngine.getState().openedCourses);
    }

    function playerLevel() {
        return window.GameEngine ? GameEngine.getState().level : 1;
    }

    function stateOf(node, mastered) {
        if (mastered.has(node.id)) return 'mastered';
        const prereqOk = node.prereqs.every((p) => mastered.has(p));
        const levelOk = playerLevel() >= node.reqLevel;
        return prereqOk && levelOk ? 'available' : 'locked';
    }

    // ---------- Построение SVG ----------
    function build() {
        model = window.CURRICULUM;
        if (!model) {
            host.innerHTML = t('<p class="st-error">Модель учебной программы не загружена.</p>');
            return;
        }

        // Размер «холста» дерева
        const maxCol = Math.max(...model.NODES.map((n) => n.col));
        const maxRow = Math.max(...model.NODES.map((n) => n.row));
        const contentW = MARGIN * 2 + maxCol * COL_GAP;
        const contentH = MARGIN * 2 + maxRow * ROW_GAP;

        svg = el('svg', { class: 'st-svg', xmlns: SVG_NS });
        viewport = el('g', { class: 'st-viewport' });
        svg.appendChild(viewport);

        buildHabitatDefs();

        // Порядок слоёв снизу вверх: туман → ареал → тропы → узлы.
        // Ареал лежит ПОД рёбрами намеренно: тропы должны читаться
        // поверх освоенной территории, как дороги на карте.
        const fogLayer = el('g', { class: 'st-fog' });
        habitatLayer = el('g', { class: 'st-habitat' });
        const edgeLayer = el('g', { class: 'st-edges' });
        const nodeLayer = el('g', { class: 'st-nodes' });
        viewport.appendChild(fogLayer);
        viewport.appendChild(habitatLayer);
        viewport.appendChild(edgeLayer);
        viewport.appendChild(nodeLayer);
        buildFog(fogLayer, contentW, contentH);

        // Рисуем рёбра по предшественникам
        model.NODES.forEach((node) => {
            const to = pos(node);
            node.prereqs.forEach((pid) => {
                const prev = model.BY_ID[pid];
                if (!prev) return;
                const from = pos(prev);
                const path = el('path', { class: 'st-edge', d: edgePath(from, to) });
                edgeLayer.appendChild(path);
                edgeEls.push({ path, from: pid, to: node.id });
            });
        });

        // Рисуем узлы
        model.NODES.forEach((node) => {
            const p = pos(node);
            const branch = model.BRANCHES[node.branch];
            const group = el('g', {
                class: 'st-node',
                transform: `translate(${p.x},${p.y})`,
                tabindex: '0',
                role: 'button',
                'aria-label': node.title,
            });
            group.style.setProperty('--branch', branch.color);

            // Внутренняя группа: на неё навешиваются CSS-анимации (тряска/пульс).
            // Это важно: CSS-transform переопределил бы атрибут transform самой
            // группы, поэтому позиционирование и анимации разнесены по слоям.
            const inner = el('g', { class: 'st-node__inner' });

            // ореол
            inner.appendChild(el('circle', { class: 'st-node__halo', r: R + 8 }));
            // основной круг
            const circle = el('circle', { class: 'st-node__circle', r: R });
            inner.appendChild(circle);
            // замочек/иконка
            const icon = el('text', {
                class: 'st-node__icon',
                'text-anchor': 'middle',
                'dominant-baseline': 'central',
                y: 2,
            });
            icon.textContent = node.emoji;
            inner.appendChild(icon);

            // подпись
            wrapLabel(inner, node.title, R + 22);

            // бейдж требуемого уровня
            const badge = el('g', { class: 'st-node__badge', transform: `translate(${R - 6},${-R + 6})` });
            badge.appendChild(el('circle', { r: 13 }));
            const lvl = el('text', {
                'text-anchor': 'middle', 'dominant-baseline': 'central', class: 'st-node__badge-text',
            });
            lvl.textContent = node.reqLevel;
            badge.appendChild(lvl);
            inner.appendChild(badge);

            group.appendChild(inner);

            nodeLayer.appendChild(group);
            nodeEls.set(node.id, { group, circle, icon });

            // события
            group.addEventListener('click', () => activate(node));
            group.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    activate(node);
                }
            });
            group.addEventListener('mouseenter', (e) => showTooltip(node, e));
            group.addEventListener('mousemove', moveTooltip);
            group.addEventListener('mouseleave', hideTooltip);
        });

        host.appendChild(svg);

        // ВАЖНО: viewBox намеренно НЕ задаём. Без него пользовательские единицы
        // SVG равны CSS-пикселям 1:1, и весь масштаб задаёт transform из
        // fitToView/zoom. С viewBox масштабирование было бы двойным (viewBox
        // вписывает контент, а transform сжимал бы его ещё раз).
        svg.dataset.contentW = contentW;
        svg.dataset.contentH = contentH;

        setupInteractions();
        fitToView();
        render();
    }

    /**
     * Фильтр слияния («метаболы»): размываем круги и жёстко поднимаем
     * контраст альфы — соприкасающиеся пятна сливаются в одну органичную
     * форму вместо гирлянды кружков. Это и даёт ощущение territории,
     * а не набора маркеров.
     */
    function buildHabitatDefs() {
        const defs = el('defs');

        const goo = el('filter', {
            id: 'st-goo', x: '-25%', y: '-25%', width: '150%', height: '150%',
            'color-interpolation-filters': 'sRGB',
        });
        goo.appendChild(el('feGaussianBlur', { in: 'SourceGraphic', stdDeviation: '26', result: 'b' }));
        goo.appendChild(el('feColorMatrix', {
            in: 'b', mode: 'matrix',
            values: '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8', result: 'goo',
        }));
        defs.appendChild(goo);

        // Тот же приём для маски тумана: дыры сливаются в одну поляну
        const gooSoft = el('filter', {
            id: 'st-goo-soft', x: '-25%', y: '-25%', width: '150%', height: '150%',
            'color-interpolation-filters': 'sRGB',
        });
        gooSoft.appendChild(el('feGaussianBlur', { in: 'SourceGraphic', stdDeviation: '34', result: 'b' }));
        gooSoft.appendChild(el('feColorMatrix', {
            in: 'b', mode: 'matrix',
            values: '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 14 -5',
        }));
        defs.appendChild(gooSoft);

        svg.appendChild(defs);
    }

    /**
     * Туман войны. Прямоугольник поверх всего, в маске которого
     * освоенные и доступные узлы прорезают «поляны». Непройденное
     * не исчезает — оно приглушается, поэтому карта остаётся картой,
     * а не списком заданий.
     */
    function buildFog(layer, contentW, contentH) {
        const pad = 400;
        // Область маски задаём ЯВНО в пользовательских единицах. Без x/y/
        // width/height регион считается процентами от bbox элемента, и
        // туман обрезается в прямоугольник с острыми краями — ровно это
        // и было видно на карте до правки.
        const mask = el('mask', {
            id: 'st-fog-mask',
            maskUnits: 'userSpaceOnUse',
            x: -pad, y: -pad,
            width: contentW + pad * 2,
            height: contentH + pad * 2,
        });
        // белое = туман виден, чёрное = дыра
        mask.appendChild(el('rect', {
            x: -pad, y: -pad, width: contentW + pad * 2, height: contentH + pad * 2, fill: '#fff',
        }));
        fogMask = el('g', { filter: 'url(#st-goo-soft)' });
        mask.appendChild(fogMask);

        const defs = svg.querySelector('defs');
        defs.appendChild(mask);

        layer.appendChild(el('rect', {
            class: 'st-fog__veil',
            x: -pad, y: -pad, width: contentW + pad * 2, height: contentH + pad * 2,
            mask: 'url(#st-fog-mask)',
        }));
    }

    /**
     * Пересчёт ареала. Вызывается из render(), то есть при каждом
     * изменении прогресса.
     */
    function updateHabitat(mastered) {
        if (!habitatLayer || !fogMask) return;

        habitatLayer.innerHTML = '';
        fogMask.innerHTML = '';

        const claimed = el('g', { class: 'st-habitat__claimed', filter: 'url(#st-goo)' });
        const frontier = el('g', { class: 'st-habitat__frontier' });
        habitatLayer.appendChild(claimed);
        habitatLayer.appendChild(frontier);

        const biomeCenters = {};   // branch -> { x, y, n }

        model.NODES.forEach((node) => {
            const st = stateOf(node, mastered);
            const pt = pos(node);

            if (st === 'mastered') {
                const branch = model.BRANCHES[node.branch];
                const c = el('circle', {
                    class: 'st-territory',
                    cx: pt.x, cy: pt.y, r: TERRITORY_R,
                    fill: branch.color,
                });
                claimed.appendChild(c);

                const b = biomeCenters[node.branch] || (biomeCenters[node.branch] = { x: 0, y: 0, n: 0, color: branch.color, name: branch.name });
                b.x += pt.x; b.y += pt.y; b.n += 1;

                fogMask.appendChild(el('circle', { cx: pt.x, cy: pt.y, r: FOG_R, fill: '#000' }));
            } else if (st === 'available') {
                // Разведанная кромка: видно, куда ареал может прирасти
                frontier.appendChild(el('circle', {
                    class: 'st-frontier', cx: pt.x, cy: pt.y, r: FRONTIER_R,
                }));
                fogMask.appendChild(el('circle', { cx: pt.x, cy: pt.y, r: FOG_R * 0.72, fill: '#000' }));
            }
        });

        // Подписи биомов — как на настоящей карте: по центру освоенной
        // части ветки, разрядкой, приглушённо.
        const labels = el('g', { class: 'st-biomes' });
        Object.keys(biomeCenters).forEach((key) => {
            const b = biomeCenters[key];
            // Порог намеренно ОДИН узел: сводка считает биомы по наличию
            // территории, и если подписывать только крупные, счётчик
            // «10 биомов» расходился бы с пятью подписями на карте.
            // Подпись поднята над центром масс: в самом центре она легла бы
            // на подписи узлов, а биом читается и по верхней кромке пятна.
            const txtEl = el('text', {
                class: 'st-biome__label',
                x: Math.round(b.x / b.n),
                y: Math.round(b.y / b.n - TERRITORY_R * 0.78),
                'text-anchor': 'middle',
                fill: b.color,
            });
            txtEl.textContent = b.name;
            labels.appendChild(txtEl);
        });
        habitatLayer.appendChild(labels);

        updateHabitatStats(mastered, Object.keys(biomeCenters).length);
    }

    /**
     * Сводка ареала. Показывает МЕНЬШЕЕ из «сделано/осталось» —
     * то же правило, что и в учебной сессии: два счётчика сразу
     * превращают прогресс в долг.
     */
    function updateHabitatStats(mastered, biomes) {
        const box = document.getElementById('habitatStats');
        if (!box) return;
        const total = model.NODES.length;
        const done = model.NODES.filter((n) => mastered.has(n.id)).length;
        const totalBiomes = Object.keys(model.BRANCHES).length;
        const pct = total ? Math.round((done / total) * 100) : 0;

        box.innerHTML =
            '<span class="hb-stat"><b>' + pct + '%</b> ' + t('ареала освоено') + '</span>' +
            '<span class="hb-stat"><b>' + biomes + '</b> / ' + totalBiomes + ' ' + t('биомов') + '</span>' +
            '<span class="hb-stat hb-stat--hint">' + (done === 0
                ? t('Медоед ещё не выходил из норы')
                : t('Осваивайте соседние узлы — участки сливаются в один ареал')) + '</span>';
    }

    function edgePath(from, to) {
        const x1 = from.x;
        const y1 = from.y + R;
        const x2 = to.x;
        const y2 = to.y - R;
        const dy = (y2 - y1) * 0.5;
        return `M ${x1} ${y1} C ${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}`;
    }

    function wrapLabel(group, text, yStart) {
        const words = text.split(' ');
        const lines = [];
        let line = '';
        words.forEach((w) => {
            if ((line + ' ' + w).trim().length > 14) {
                lines.push(line.trim());
                line = w;
            } else {
                line = (line + ' ' + w).trim();
            }
        });
        if (line) lines.push(line);

        lines.forEach((ln, i) => {
            const txtEl = el('text', {
                class: 'st-node__label',
                'text-anchor': 'middle',
                y: yStart + i * 16,
            });
            txtEl.textContent = ln;
            group.appendChild(txtEl);
        });
    }

    // ---------- Реактивный рендер состояний ----------
    function render() {
        const mastered = masteredSet();
        const profile = window.GameEngine ? GameEngine.getProfile() : null;
        const track = profile && profile.track;
        const reco = computeReco(mastered, profile);

        model.NODES.forEach((node) => {
            const refs = nodeEls.get(node.id);
            if (!refs) return;
            const st = stateOf(node, mastered);
            // Мягкий фильтр трека: узел вне трека приглушается, но остаётся
            // видимым и кликабельным — «расширить кругозор» доступно всегда.
            const offTrack = track && window.Reco && !Reco.inTrack(node, track);
            const isReco = reco && reco.primary === node.id;
            refs.group.setAttribute('class',
                `st-node is-${st}` +
                (offTrack ? ' is-offtrack' : '') +
                (isReco ? ' is-reco' : ''));
            refs.icon.textContent = st === 'locked' ? '🔒' : node.emoji;
        });

        edgeEls.forEach((edge) => {
            const active = mastered.has(edge.from);
            const full = mastered.has(edge.from) && mastered.has(edge.to);
            edge.path.setAttribute(
                'class',
                `st-edge ${full ? 'is-full' : active ? 'is-active' : ''}`
            );
        });

        updateHabitat(mastered);
        updateSummary(mastered);
        updateRecoBanner(reco);
    }

    /** Рекомендация «что дальше» через движок Reco */
    function computeReco(mastered, profile) {
        if (!window.Reco) return null;
        const checks = window.CourseView ? CourseView.loadChecks() : {};
        let quests = {};
        try { quests = JSON.parse(localStorage.getItem('medoeduz_quest_progress') || '{}'); }
        catch (e) { /* ignore */ }
        return Reco.next(model, {
            mastered,
            playerLevel: playerLevel(),
            profile: profile || {},
            checks,
            quests,
        });
    }

    /** Баннер рекомендации над картой (если контейнер есть на странице) */
    function updateRecoBanner(reco) {
        const el = document.getElementById('recoBanner');
        if (!el) return;
        if (!reco || !reco.primary) {
            el.innerHTML = '';
            el.classList.remove('show');
            return;
        }
        const node = model.BY_ID[reco.primary];
        const branch = model.BRANCHES[node.branch];
        el.innerHTML =
            t('<span class="reco__label">Рекомендуем дальше</span>') +
            '<button class="reco__node" data-id="' + node.id + '" style="--branch:' + branch.color + '">' +
                '<span class="reco__emoji">' + node.emoji + '</span>' +
                '<span class="reco__title">' + node.title + '</span>' +
            '</button>' +
            '<span class="reco__reason">' + reco.reason + '</span>';
        el.classList.add('show');
        const btn = el.querySelector('.reco__node');
        if (btn) btn.addEventListener('click', () => {
            const n = model.BY_ID[btn.dataset.id];
            if (n && window.CourseView) CourseView.open(n);
        });
    }

    function updateSummary(mastered) {
        if (!summaryEl) return;
        const profile = window.GameEngine ? GameEngine.getProfile() : null;
        const track = profile && profile.track;

        // Со выбранным треком считаем прогресс по узлам трека, без — по всем.
        let done, total;
        if (track && window.Reco) {
            const tp = Reco.trackProgress(model, track, mastered);
            done = tp.done; total = tp.total;
        } else {
            total = model.NODES.length;
            done = model.NODES.filter((n) => mastered.has(n.id)).length;
        }
        const pct = total ? Math.round((done / total) * 100) : 0;
        summaryEl.querySelector('[data-st-done]').textContent = done;
        summaryEl.querySelector('[data-st-total]').textContent = total;
        summaryEl.querySelector('[data-st-pct]').style.width = pct + '%';
        summaryEl.querySelector('[data-st-level]').textContent = playerLevel();

        // Плашка выбранного трека (если контейнер есть)
        const tEl = document.getElementById('trackBadge');
        if (tEl) {
            if (track && model.TRACKS[track]) {
                const tr = model.TRACKS[track];
                tEl.innerHTML = tr.emoji + ' ' + tr.name + t(' <button class="track-change">сменить</button>');
                tEl.classList.add('show');
                const ch = tEl.querySelector('.track-change');
                if (ch) ch.addEventListener('click', () => { if (window.Onboarding) Onboarding.open(true); });
            } else {
                tEl.innerHTML = t('<button class="track-change">Выбрать трек обучения</button>');
                tEl.classList.add('show');
                const ch = tEl.querySelector('.track-change');
                if (ch) ch.addEventListener('click', () => { if (window.Onboarding) Onboarding.open(true); });
            }
        }
    }

    // ---------- Активация узла ----------
    function activate(node) {
        const mastered = masteredSet();
        const st = stateOf(node, mastered);

        if (st === 'locked') {
            const prereqOk = node.prereqs.every((p) => mastered.has(p));
            const msg = !prereqOk
                ? t('Сначала освойте предыдущие навыки')
                : `Требуется уровень ${node.reqLevel} (у вас ${playerLevel()})`;
            shake(node.id);
            flashTooltip(node, msg);
            return;
        }

        // Клик открывает КУРС, а не мгновенно «осваивает» узел.
        // Освоение теперь требует пройти шаги квеста — иначе карта
        // превращается в кликер, где прогресс ничего не значит.
        hideTooltip();
        CourseView.open(node);
    }

    /**
     * Фиксация освоения узла. Вызывается из панели курса только после
     * того, как отмечены все шаги квеста.
     */
    function completeNode(node) {
        if (masteredSet().has(node.id)) return;

        if (window.GameEngine) {
            // openCourse фиксирует узел в прогрессе (+базовый XP, ачивки),
            // добиваем награду до значения из модели, чтобы тултип не врал.
            GameEngine.openCourse(node.id);
            const extra = node.xp - 25;
            if (extra > 0) GameEngine.addXP(extra, `Навык освоен: ${node.title}`);
        }
        pulse(node.id, 'success');
        render();
        checkSynergies();
        checkLearningAchievements(node);

        if (node.id === 'apex' && window.AnimationEngine) {
            AnimationEngine.confetti();
            AnimationEngine.flash(model.BRANCHES.apex.color);
        }
    }

    function pulse(id, kind) {
        const refs = nodeEls.get(id);
        if (!refs || reduceMotion) return;
        refs.group.classList.add('st-pulse', `st-pulse--${kind}`);
        setTimeout(() => refs.group.classList.remove('st-pulse', `st-pulse--${kind}`), 700);
    }

    function shake(id) {
        const refs = nodeEls.get(id);
        if (!refs || reduceMotion) return;
        refs.group.classList.add('st-shake');
        setTimeout(() => refs.group.classList.remove('st-shake'), 500);
    }

    // ---------- Тултип ----------
    function showTooltip(node, e) {
        if (!tooltip) return;
        const mastered = masteredSet();
        const st = stateOf(node, mastered);
        const branch = model.BRANCHES[node.branch];
        const stLabel = { mastered: t('Освоено ✓'), available: t('Доступно'), locked: t('Закрыто 🔒') }[st];

        tooltip.innerHTML = `
            <div class="st-tip__head" style="--branch:${branch.color}">
                <span class="st-tip__emoji">${node.emoji}</span>
                <div>
                    <div class="st-tip__title">${node.title}</div>
                    <div class="st-tip__branch">${branch.emoji} ${branch.name}</div>
                </div>
            </div>
            <p class="st-tip__desc">${node.desc}</p>
            <div class="st-tip__meta">
                <span class="st-tip__state st-tip__state--${st}">${stLabel}</span>
                <span>⚡ +${node.xp} XP</span>
                <span>🎯 ${t("ур. ")}${node.reqLevel}</span>
            </div>
        `;
        tooltip.classList.add('show');
        moveTooltip(e);
    }

    function moveTooltip(e) {
        if (!tooltip) return;
        const pad = 16;
        const tw = tooltip.offsetWidth;
        const th = tooltip.offsetHeight;
        let x = e.clientX + pad;
        let y = e.clientY + pad;
        if (x + tw > window.innerWidth) x = e.clientX - tw - pad;
        if (y + th > window.innerHeight) y = e.clientY - th - pad;
        tooltip.style.transform = `translate(${x}px, ${y}px)`;
    }

    function hideTooltip() {
        if (tooltip) tooltip.classList.remove('show');
    }

    function flashTooltip(node, msg) {
        if (!tooltip) return;
        tooltip.innerHTML = `<p class="st-tip__locked">${msg}</p>`;
        tooltip.classList.add('show');
        clearTimeout(flashTooltip._t);
        flashTooltip._t = setTimeout(hideTooltip, 1800);
    }

    // ---------- Pan & Zoom ----------
    function applyTransform() {
        viewport.setAttribute(
            'transform',
            `translate(${view.x},${view.y}) scale(${view.scale})`
        );
    }

    function fitToView() {
        const rect = host.getBoundingClientRect();
        const cw = +svg.dataset.contentW;
        const ch = +svg.dataset.contentH;
        const scale = Math.min(rect.width / cw, rect.height / ch) * 0.92;
        view.scale = clamp(scale, 0.3, 2.5);
        view.x = (rect.width - cw * view.scale) / 2;
        view.y = (rect.height - ch * view.scale) / 2;
        applyTransform();
    }

    function setupInteractions() {
        // Зум колесом — вокруг указателя
        svg.addEventListener(
            'wheel',
            (e) => {
                e.preventDefault();
                const rect = svg.getBoundingClientRect();
                const mx = e.clientX - rect.left;
                const my = e.clientY - rect.top;
                const factor = 1 - e.deltaY * 0.0012;
                const newScale = clamp(view.scale * factor, 0.3, 2.5);
                view.x = mx - (mx - view.x) * (newScale / view.scale);
                view.y = my - (my - view.y) * (newScale / view.scale);
                view.scale = newScale;
                applyTransform();
            },
            { passive: false }
        );

        // Перетаскивание фона
        svg.addEventListener('mousedown', (e) => {
            if (e.target.closest('.st-node')) return;
            drag = { x: e.clientX - view.x, y: e.clientY - view.y };
            svg.classList.add('is-grabbing');
        });
        window.addEventListener('mousemove', (e) => {
            if (!drag) return;
            view.x = e.clientX - drag.x;
            view.y = e.clientY - drag.y;
            applyTransform();
        });
        window.addEventListener('mouseup', () => {
            drag = null;
            svg.classList.remove('is-grabbing');
        });

        // Тач — одиночное перетаскивание
        svg.addEventListener(
            'touchstart',
            (e) => {
                if (e.target.closest('.st-node') || e.touches.length !== 1) return;
                const tp = e.touches[0];
                drag = { x: tp.clientX - view.x, y: tp.clientY - view.y };
            },
            { passive: true }
        );
        svg.addEventListener(
            'touchmove',
            (e) => {
                if (!drag || e.touches.length !== 1) return;
                const tp = e.touches[0];
                view.x = tp.clientX - drag.x;
                view.y = tp.clientY - drag.y;
                applyTransform();
            },
            { passive: true }
        );
        svg.addEventListener('touchend', () => (drag = null));

        window.addEventListener('resize', fitToView);
    }

    // ---------- Кнопки управления ----------
    function bindControls() {
        document.querySelectorAll('[data-st-action]').forEach((btn) => {
            btn.addEventListener('click', () => {
                const a = btn.dataset.stAction;
                if (a === 'zoom-in') zoomBy(1.2);
                if (a === 'zoom-out') zoomBy(1 / 1.2);
                if (a === 'fit') fitToView();
            });
        });
    }

    function zoomBy(factor) {
        const rect = host.getBoundingClientRect();
        const mx = rect.width / 2;
        const my = rect.height / 2;
        const newScale = clamp(view.scale * factor, 0.3, 2.5);
        view.x = mx - (mx - view.x) * (newScale / view.scale);
        view.y = my - (my - view.y) * (newScale / view.scale);
        view.scale = newScale;
        applyTransform();
    }

    // ---------- Инициализация ----------
    function init(hostId) {
        host = document.getElementById(hostId || 'skillTree');
        if (!host) return;
        tooltip = document.getElementById('stTooltip');
        summaryEl = document.getElementById('stSummary');

        build();
        bindControls();
        renderExtras();
        checkSynergies();

        // Реактивность: перерисовываем карту при изменении прогресса игрока
        if (window.GameEngine) {
            GameEngine.on('levelup', render);
            GameEngine.on('xp', render);
            GameEngine.on('ready', render);
            GameEngine.on('profile', render);
        }

        // Онбординг при первом входе + перерисовка после выбора трека
        document.addEventListener('medoeduz:onboarded', render);
        if (window.Onboarding && window.GameEngine && !GameEngine.isOnboarded()) {
            // небольшая задержка, чтобы карта успела отрисоваться под ним
            setTimeout(() => Onboarding.open(false), 700);
        }
    }


    /**
     * Достижения за РЕАЛЬНОЕ усвоение.
     * Выдаются по итогам проверок и структуре освоенного, а не по кликам:
     * «понял, а не кликнул» ценнее, чем «прокрутил страницу».
     */
    function checkLearningAchievements(node) {
        if (!window.GameEngine || !window.CourseView) return;
        const G = GameEngine, mastered = masteredSet();
        const checks = CourseView.loadChecks();
        const passed = Object.keys(checks).filter((k) => checks[k] && checks[k].passed);

        if (passed.length >= 1) G.unlock('first_check');

        // Три проверки подряд без единой ошибки
        const clean = passed.filter((k) => checks[k].firstTry);
        if (clean.length >= 3) G.unlock('clean_run');

        // Провалил, разобрал, прошёл — это ценнее безошибочного везения
        const r = checks[node.id];
        if (r && r.passed && r.tries > 1) G.unlock('learned_from_error');

        // Ветка закрыта целиком
        const byBranch = {};
        model.NODES.forEach((n) => {
            byBranch[n.branch] = byBranch[n.branch] || { all: 0, done: 0 };
            byBranch[n.branch].all++;
            if (mastered.has(n.id)) byBranch[n.branch].done++;
        });
        const full = Object.keys(byBranch).filter((b) => byBranch[b].done === byBranch[b].all);
        if (full.length >= 1) G.unlock('branch_done');

        // Узлы минимум в трёх разных ветках
        const touched = Object.keys(byBranch).filter((b) => byBranch[b].done > 0);
        if (touched.length >= 3) G.unlock('cross_branch');

        // Удержание: подтверждение знания спустя неделю после освоения
        const seenAt = loadMasteredAt();
        seenAt[node.id] = seenAt[node.id] || new Date().toISOString();
        saveMasteredAt(seenAt);
        Object.keys(seenAt).forEach((id) => {
            const c = checks[id];
            if (!c || !c.passed || !c.at) return;
            const gap = (new Date(c.at) - new Date(seenAt[id])) / 86400000;
            if (gap >= 7) G.unlock('retained');
        });
    }

    const MASTERED_AT = 'medoeduz_mastered_at';
    function loadMasteredAt() {
        try { return JSON.parse(localStorage.getItem(MASTERED_AT) || '{}'); }
        catch (e) { return {}; }
    }
    function saveMasteredAt(v) {
        try { localStorage.setItem(MASTERED_AT, JSON.stringify(v)); } catch (e) {}
    }

    /**
     * СИНЕРГИИ — комбинации навыков из разных веток.
     * Открываются автоматически, когда освоены все узлы комбинации.
     * Смысл механики: показать, что ценность не в отдельном навыке,
     * а в их сочетании.
     */
    function checkSynergies() {
        if (!model.SYNERGIES) return;
        const mastered = masteredSet();
        const wrap = document.getElementById('synergyGrid');

        model.SYNERGIES.forEach((syn) => {
            const open = syn.nodes.every((id) => mastered.has(id));
            const el = wrap && wrap.querySelector('[data-syn="' + syn.id + '"]');
            if (el) el.classList.toggle('is-open', open);

            // Первое открытие празднуем: это редкое событие,
            // и оно объясняет игроку смысл всей механики.
            if (open && !seenSynergies.has(syn.id)) {
                seenSynergies.add(syn.id);
                saveSeenSynergies();
                announceSynergy(syn);
            }
        });
    }

    const SYN_KEY = 'medoeduz_synergies_seen';
    let seenSynergies = new Set();
    try {
        seenSynergies = new Set(JSON.parse(localStorage.getItem(SYN_KEY) || '[]'));
    } catch (e) { /* приватный режим */ }

    function saveSeenSynergies() {
        try {
            localStorage.setItem(SYN_KEY, JSON.stringify([...seenSynergies]));
        } catch (e) { /* приватный режим */ }
    }

    function announceSynergy(syn) {
        const el = document.createElement('div');
        el.className = 'syn-toast';
        el.innerHTML =
            '<div class="syn-toast__icon">' + syn.emoji + '</div>' +
            '<div>' +
                t('<div class="syn-toast__label">Синергия открыта</div>') +
                '<div class="syn-toast__name">' + syn.name + '</div>' +
                '<div class="syn-toast__gives">' + syn.gives + '</div>' +
            '</div>';
        document.body.appendChild(el);
        requestAnimationFrame(() => el.classList.add('show'));
        if (window.AnimationEngine) AnimationEngine.confetti();
        setTimeout(() => {
            el.classList.remove('show');
            el.addEventListener('transitionend', () => el.remove(), { once: true });
        }, 5000);
    }

    /** Отрисовка сетки синергий и гида по стадиям (если есть контейнеры) */
    function renderExtras() {
        const grid = document.getElementById('synergyGrid');
        if (grid && model.SYNERGIES) {
            grid.innerHTML = model.SYNERGIES.map((s) => {
                const names = s.nodes.map((id) => model.BY_ID[id].title).join(' + ');
                return '<article class="syn" data-syn="' + s.id + '">' +
                    '<div class="syn__head"><span class="syn__emoji">' + s.emoji + '</span>' +
                    '<h3 class="syn__name">' + s.name + '</h3></div>' +
                    '<div class="syn__combo">' + names + '</div>' +
                    '<p class="syn__gives">' + s.gives + '</p>' +
                    '<div class="syn__case">' + s.case + '</div>' +
                    '</article>';
            }).join('');
        }

        const stages = document.getElementById('stageGuide');
        if (stages && model.STAGE_GUIDE) {
            stages.innerHTML = model.STAGE_GUIDE.map((s) =>
                '<article class="stg" data-lvl="' + s.level + '">' +
                    '<div class="stg__top">' +
                        '<span class="stg__emoji">' + s.emoji + '</span>' +
                        t('<span class="stg__lvl">ур. ') + s.level + '</span>' +
                    '</div>' +
                    '<h3 class="stg__name">' + s.name + '</h3>' +
                    '<p class="stg__can">' + s.can + '</p>' +
                    t('<div class="stg__unlocks">Открывает: ') + s.unlocks + '</div>' +
                '</article>'
            ).join('');
        }
    }

    return { init, render, completeNode, checkSynergies };
})();

window.SkillTree = SkillTree;

// Автоинициализация, если на странице есть контейнер карты.
// Загружается последним — к этому моменту GameEngine уже инициализирован.
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('skillTree')) {
        SkillTree.init('skillTree');
    }
});
