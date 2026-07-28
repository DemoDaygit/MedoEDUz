/**
 * ============================================================
 *  MedoEDUz Course View — панель курса с квест-механикой
 * ============================================================
 *
 *  Зачем это существует: без неё карта знаний была кликером —
 *  клик по узлу мгновенно давал XP, и «освоено 17 из 17» ничего
 *  не значило. Теперь узел открывает программу курса, а освоение
 *  требует пройти шаги практической миссии.
 *
 *  Прогресс по шагам квеста хранится отдельно от прогресса игрока,
 *  чтобы частично начатый квест не терялся при уходе со страницы.
 */

'use strict';

const CourseView = (() => {
    const QUEST_KEY = 'medoeduz_quest_progress';

    let root, current;

    // ---------- Прогресс шагов квеста ----------
    function loadProgress() {
        try {
            return JSON.parse(localStorage.getItem(QUEST_KEY) || '{}');
        } catch (e) {
            return {};
        }
    }

    function saveProgress(p) {
        try {
            localStorage.setItem(QUEST_KEY, JSON.stringify(p));
        } catch (e) {
            /* приватный режим — молча игнорируем */
        }
    }

    function stepsDone(nodeId) {
        return loadProgress()[nodeId] || [];
    }

    function toggleStep(nodeId, idx) {
        const p = loadProgress();
        const list = p[nodeId] || [];
        const i = list.indexOf(idx);
        if (i === -1) list.push(idx);
        else list.splice(i, 1);
        p[nodeId] = list;
        saveProgress(p);
        return list;
    }

    function isMastered(nodeId) {
        if (!window.GameEngine) return false;
        return GameEngine.getState().openedCourses.indexOf(nodeId) !== -1;
    }

    // ---------- Разметка ----------
    function build() {
        root = document.createElement('aside');
        root.className = 'cv';
        root.setAttribute('role', 'dialog');
        root.setAttribute('aria-modal', 'true');
        root.setAttribute('aria-hidden', 'true');
        root.innerHTML =
            '<div class="cv__overlay"></div>' +
            '<div class="cv__sheet" tabindex="-1"></div>';
        document.body.appendChild(root);

        root.querySelector('.cv__overlay').addEventListener('click', close);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && root.classList.contains('is-open')) close();
        });
    }

    function esc(s) {
        return String(s).replace(/[&<>"]/g, (c) =>
            ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])
        );
    }

    function render() {
        const n = current;
        const branch = window.CURRICULUM.BRANCHES[n.branch];
        const done = stepsDone(n.id);
        const mastered = isMastered(n.id);
        const allDone = done.length === n.quest.steps.length;

        const sheet = root.querySelector('.cv__sheet');
        sheet.style.setProperty('--branch', branch.color);

        sheet.innerHTML =
            '<button class="cv__close" aria-label="Закрыть">&times;</button>' +

            '<div class="cv__head">' +
                '<span class="cv__emoji">' + n.emoji + '</span>' +
                '<div>' +
                    '<div class="cv__branch">' + branch.emoji + ' ' + esc(branch.name) +
                        ' · ур. ' + n.reqLevel + ' · +' + n.xp + ' XP</div>' +
                    '<h2 class="cv__title">' + esc(n.title) + '</h2>' +
                '</div>' +
            '</div>' +

            (mastered ? '<div class="cv__badge-done">✓ Навык освоен</div>' : '') +

            '<p class="cv__desc">' + esc(n.desc) + '</p>' +

            '<div class="cv__tools">' +
                n.tools.map((t) => '<span class="cv__tool">' + esc(t) + '</span>').join('') +
            '</div>' +

            '<h3 class="cv__label">Программа</h3>' +
            '<ul class="cv__list">' +
                n.learn.map((l) => '<li>' + esc(l) + '</li>').join('') +
            '</ul>' +

            '<h3 class="cv__label">Что сможете сразу</h3>' +
            '<p class="cv__apply">' + esc(n.apply.now) + '</p>' +
            '<div class="cv__case">' +
                '<span class="cv__case-tag">Пример</span>' + esc(n.apply.case) +
            '</div>' +

            '<div class="cv__trap">' +
                '<span class="cv__trap-tag">Частая ошибка</span>' + esc(n.trap) +
            '</div>' +

            '<h3 class="cv__label">Миссия · ' + esc(n.quest.title) + '</h3>' +
            '<ol class="cv__steps">' +
                n.quest.steps.map((s, i) =>
                    '<li class="cv__step' + (done.indexOf(i) !== -1 ? ' is-done' : '') + '">' +
                        '<label>' +
                            '<input type="checkbox" data-step="' + i + '"' +
                                (done.indexOf(i) !== -1 ? ' checked' : '') + '>' +
                            '<span>' + esc(s) + '</span>' +
                        '</label>' +
                    '</li>'
                ).join('') +
            '</ol>' +

            '<div class="cv__proof"><strong>Результат:</strong> ' + esc(n.quest.proof) + '</div>' +

            (mastered
                ? ''
                : '<button class="cv__complete" ' + (allDone ? '' : 'disabled') + '>' +
                    (allDone
                        ? 'Освоить навык · +' + n.xp + ' XP'
                        : 'Отметьте все шаги миссии (' + done.length + '/' + n.quest.steps.length + ')') +
                  '</button>');

        sheet.querySelector('.cv__close').addEventListener('click', close);

        // Отметка шага НЕ перерисовывает панель целиком: полный render()
        // сбрасывал бы позицию прокрутки, а миссия находится внизу длинной
        // страницы курса. Обновляем только сам шаг и состояние кнопки.
        sheet.querySelectorAll('input[data-step]').forEach((box) => {
            box.addEventListener('change', () => {
                const list = toggleStep(n.id, Number(box.dataset.step));
                box.closest('.cv__step').classList.toggle('is-done', box.checked);
                syncCompleteButton(n, list.length);
            });
        });

        const btn = sheet.querySelector('.cv__complete');
        if (btn) {
            btn.addEventListener('click', () => {
                if (window.SkillTree) SkillTree.completeNode(n);
                render();
            });
        }
    }

    /** Пересчёт состояния кнопки освоения без перерисовки панели */
    function syncCompleteButton(node, doneCount) {
        const btn = root.querySelector('.cv__complete');
        if (!btn) return;
        const total = node.quest.steps.length;
        const allDone = doneCount === total;
        btn.disabled = !allDone;
        btn.textContent = allDone
            ? 'Освоить навык · +' + node.xp + ' XP'
            : 'Отметьте все шаги миссии (' + doneCount + '/' + total + ')';
    }

    // ---------- Открытие / закрытие ----------
    function open(node) {
        if (!root) build();
        current = node;
        render();
        root.classList.add('is-open');
        root.setAttribute('aria-hidden', 'false');
        root.querySelector('.cv__sheet').focus();
    }

    function close() {
        if (!root) return;
        root.classList.remove('is-open');
        root.setAttribute('aria-hidden', 'true');
    }

    return { open, close, isMastered };
})();

window.CourseView = CourseView;
