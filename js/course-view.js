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
    const CHECK_KEY = 'medoeduz_check_results';

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

    // ---------- Результаты проверки усвоения ----------
    function loadChecks() {
        try { return JSON.parse(localStorage.getItem(CHECK_KEY) || '{}'); }
        catch (e) { return {}; }
    }

    function saveChecks(c) {
        try { localStorage.setItem(CHECK_KEY, JSON.stringify(c)); } catch (e) {}
    }

    /** {answers:[], passed:bool, firstTry:bool, at:iso} по узлу */
    function checkOf(nodeId) {
        return loadChecks()[nodeId] || null;
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

            renderCheck(n) +

            (mastered
                ? ''
                : '<button class="cv__complete" ' + (canMaster(n) ? '' : 'disabled') + '>' +
                    completeLabel(n) +
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

        sheet.querySelectorAll('.cvq__opt').forEach((b) => {
            b.addEventListener('click', () => {
                answerCheck(n, Number(b.dataset.q), Number(b.dataset.o));
                const y = sheet.scrollTop;
                render();
                sheet.scrollTop = y;   // проверка длинная — не теряем позицию
            });
        });

        const retry = sheet.querySelector('.cvq__retry');
        if (retry) {
            retry.addEventListener('click', () => {
                resetCheck(n.id);
                const y = sheet.scrollTop;
                render();
                sheet.scrollTop = y;
            });
        }

        const btn = sheet.querySelector('.cv__complete');
        if (btn) {
            btn.addEventListener('click', () => {
                if (window.SkillTree) SkillTree.completeNode(n);
                render();
            });
        }
    }


    // ---------- Проверка усвоения ----------
    /**
     * Освоение требует ДВУХ вещей: пройденной миссии (практика)
     * и правильных ответов на проверку (понимание). Одни галочки —
     * это самоотчёт, а не выявление усвоения.
     */
    function canMaster(node) {
        const questOk = stepsDone(node.id).length === node.quest.steps.length;
        const r = checkOf(node.id);
        return questOk && r && r.passed;
    }

    function completeLabel(node) {
        const done = stepsDone(node.id).length;
        const total = node.quest.steps.length;
        if (done < total) return 'Отметьте все шаги миссии (' + done + '/' + total + ')';
        const r = checkOf(node.id);
        if (!r || !r.passed) return 'Пройдите проверку усвоения';
        return 'Освоить навык · +' + node.xp + ' XP';
    }

    function renderCheck(n) {
        if (!n.check || !n.check.length) return '';
        const r = checkOf(n.id);
        const html = n.check.map((c, qi) => {
            const picked = r && r.answers ? r.answers[qi] : undefined;
            const answered = picked !== undefined && picked !== null;
            return '<div class="cvq" data-q="' + qi + '">' +
                '<p class="cvq__q">' + esc(c.q) + '</p>' +
                '<div class="cvq__opts">' +
                    c.a.map((opt, oi) => {
                        let cls = 'cvq__opt';
                        if (answered) {
                            if (oi === c.ok) cls += ' is-right';
                            else if (oi === picked) cls += ' is-wrong';
                        }
                        return '<button class="' + cls + '" data-q="' + qi + '" data-o="' + oi + '"' +
                            (answered ? ' disabled' : '') + '>' + esc(opt) + '</button>';
                    }).join('') +
                '</div>' +
                (answered
                    ? '<div class="cvq__why">' +
                        (picked === c.ok ? '<b>Верно.</b> ' : '<b>Не так.</b> ') + esc(c.why) +
                      '</div>'
                    : '') +
            '</div>';
        }).join('');

        const allAnswered = r && r.answers && r.answers.length === n.check.length &&
                            r.answers.every((a) => a !== undefined && a !== null);
        const status = !allAnswered ? ''
            : (r.passed
                ? '<div class="cvq__ok">✓ Проверка пройдена' +
                    (r.firstTry ? ' с первого раза' : '') + '</div>'
                : '<div class="cvq__fail">Есть ошибки. Перечитайте программу и ' +
                    '<button class="cvq__retry">пройдите заново</button></div>');

        return '<h3 class="cv__label">Проверка усвоения</h3>' +
               '<div class="cvq-wrap">' + html + status + '</div>';
    }

    function answerCheck(n, qi, oi) {
        const all = loadChecks();
        const rec = all[n.id] || { answers: [], firstTry: true, tries: 0 };
        rec.answers[qi] = oi;

        const complete = n.check.every((c, i) => rec.answers[i] !== undefined && rec.answers[i] !== null);
        if (complete) {
            rec.passed = n.check.every((c, i) => rec.answers[i] === c.ok);
            rec.tries = (rec.tries || 0) + 1;
            if (!rec.passed) rec.firstTry = false;
            rec.at = new Date().toISOString();
        }
        all[n.id] = rec;
        saveChecks(all);
        return rec;
    }

    function resetCheck(nodeId) {
        const all = loadChecks();
        const prev = all[nodeId];
        all[nodeId] = { answers: [], firstTry: false, tries: prev ? prev.tries : 0 };
        saveChecks(all);
    }

    /** Пересчёт состояния кнопки освоения без перерисовки панели */
    function syncCompleteButton(node, doneCount) {
        const btn = root.querySelector('.cv__complete');
        if (!btn) return;
        btn.disabled = !canMaster(node);
        btn.textContent = completeLabel(node);
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

    return { open, close, isMastered, checkOf, loadChecks };
})();

window.CourseView = CourseView;
