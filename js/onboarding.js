/**
 * ============================================================
 *  MedoEDUz Onboarding — выбор индивидуального вектора освоения
 * ============================================================
 *
 *  Показывается при первом входе на карту знаний (когда профиль
 *  не заполнен). Три быстрых шага: цель → трек → уровень опыта.
 *  Итог сохраняется в профиль (GameEngine.setProfile) и определяет,
 *  какие узлы карты будут подсвечены как «ваш путь».
 *
 *  Ничего не блокирует: онбординг можно пропустить (тогда трек
 *  не выбран и показываются все узлы), а трек — сменить позже.
 */

'use strict';

const Onboarding = (() => {
    let root, step = 0, draft = {};

    const GOALS = [
        { id: 'apply-work', emoji: '⚡', title: t('Применять в работе'), desc: t('Ускорить текущие задачи с помощью ИИ') },
        { id: 'fundamentals', emoji: '📚', title: t('Разобраться в основах'), desc: t('Понять, как это устроено, без спешки') },
        { id: 'build-agents', emoji: '🤖', title: t('Строить ИИ-системы'), desc: t('Проектировать агентов и приложения') },
        { id: 'explore', emoji: '🧭', title: t('Осмотреться'), desc: t('Пока просто изучаю, что здесь есть') },
    ];

    const EXP = [
        { id: 'zero', emoji: '🌱', title: t('С нуля'), desc: t('Почти не пользовался ИИ') },
        { id: 'user', emoji: '💬', title: t('Пользователь'), desc: t('Регулярно пишу запросы в чат-модели') },
        { id: 'builder', emoji: '🔧', title: t('Строитель'), desc: t('Делаю что-то с ИИ: код, контент, автоматизации') },
        { id: 'advanced', emoji: '🚀', title: t('Продвинутый'), desc: t('Работаю с агентами, памятью, эвалами') },
    ];

    // цель → рекомендуемый стартовый уровень
    const EXP_LEVEL = { zero: 'basic', user: 'basic', builder: 'intermediate', advanced: 'advanced' };

    function build() {
        root = document.createElement('div');
        root.className = 'onb';
        root.setAttribute('role', 'dialog');
        root.setAttribute('aria-modal', 'true');
        document.body.appendChild(root);
    }

    function esc(s) {
        return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    }

    function tracksList() {
        const T = window.CURRICULUM.TRACKS;
        return Object.keys(T).map((id) => ({ id, ...T[id] }));
    }

    function render() {
        const total = 3;
        let body = '';

        if (step === 0) {
            body =
                cardGrid(t('Зачем вам ИИ?'), t('Это задаёт направление обучения — можно сменить потом.'),
                    GOALS.map((g) => optionCard('goal', g.id, g.emoji, g.title, g.desc)).join(''));
        } else if (step === 1) {
            const hint = window.TG && window.TG.displayName && window.TG.displayName();
            body =
                cardGrid(
                    // Целая фраза, а не склейка из буквы и хвоста:
                    // ключ словаря «В» подменял бы любую одиночную «В»
                    // на странице, а перевод по кускам ломает порядок слов
                    (hint ? esc(hint) + t(', выберите роль') : t('Выберите роль')),
                    t('Карта подсветит навыки вашего трека. Остальное останется доступным.'),
                    tracksList().map((tr) =>
                        optionCard('track', tr.id, tr.emoji, tr.name, tr.forWhom)).join(''));
        } else if (step === 2) {
            body =
                cardGrid(t('Ваш опыт с ИИ?'), t('Подберём стартовую сложность — карта не завалит вас лишним.'),
                    EXP.map((e) => optionCard('experience', e.id, e.emoji, e.title, e.desc)).join(''));
        }

        root.innerHTML =
            '<div class="onb__sheet">' +
                '<div class="onb__progress">' +
                    Array.from({ length: total }, (_, i) =>
                        '<span class="onb__dot' + (i <= step ? ' is-on' : '') + '"></span>').join('') +
                '</div>' +
                body +
                '<div class="onb__actions">' +
                    (step > 0 ? t('<button class="onb__back">Назад</button>') : '') +
                    t('<button class="onb__skip">Пропустить</button>') +
                '</div>' +
            '</div>';

        root.querySelectorAll('.onb__opt').forEach((el) => {
            el.addEventListener('click', () => {
                draft[el.dataset.field] = el.dataset.value;
                advance();
            });
        });
        const back = root.querySelector('.onb__back');
        if (back) back.addEventListener('click', () => { step = Math.max(0, step - 1); render(); });
        root.querySelector('.onb__skip').addEventListener('click', finish);
    }

    function cardGrid(title, sub, cards) {
        return '<h2 class="onb__title">' + esc(title) + '</h2>' +
               '<p class="onb__sub">' + esc(sub) + '</p>' +
               '<div class="onb__grid">' + cards + '</div>';
    }

    function optionCard(field, value, emoji, title, desc) {
        return '<button class="onb__opt" data-field="' + field + '" data-value="' + value + '">' +
                    '<span class="onb__opt-emoji">' + emoji + '</span>' +
                    '<span class="onb__opt-title">' + esc(title) + '</span>' +
                    '<span class="onb__opt-desc">' + esc(desc) + '</span>' +
               '</button>';
    }

    function advance() {
        if (step < 2) { step += 1; render(); }
        else finish();
    }

    function finish() {
        const patch = {
            goal: draft.goal || null,
            track: draft.track || null,
            experience: draft.experience || null,
            startLevel: draft.experience ? (EXP_LEVEL[draft.experience] || 'basic') : 'basic',
            onboardedAt: new Date().toISOString(),
            userId: (window.TG && window.TG.userKey && window.TG.userKey()) || 'local',
        };
        if (window.GameEngine) GameEngine.setProfile(patch);

        root.classList.add('is-closing');
        setTimeout(() => { if (root) root.remove(); root = null; }, 300);

        // Сообщаем карте, что профиль готов — она перерисуется с фильтром трека.
        document.dispatchEvent(new CustomEvent('medoeduz:onboarded', { detail: patch }));
    }

    function open(force) {
        if (!window.GameEngine) return;
        if (!force && GameEngine.isOnboarded()) return;
        step = 0; draft = {};
        if (!root) build();
        render();
        requestAnimationFrame(() => root.classList.add('is-open'));
    }

    return { open };
})();

window.Onboarding = Onboarding;
