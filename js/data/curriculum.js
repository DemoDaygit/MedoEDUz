/**
 * ============================================================
 *  MedoEDUz Curriculum Model — Декларативная модель учебной
 *  программы. Единый источник истины (single source of truth),
 *  из которого строится вся визуализация «Карты знаний».
 * ============================================================
 *
 *  Модельно-ориентированный подход: данные ничего не знают о
 *  том, КАК они отрисованы. Рендер (skill-tree.js) полностью
 *  выводится из этой структуры. Чтобы изменить карту — меняют
 *  только модель, не трогая код визуализации.
 *
 *  Узел (node):
 *    id        — уникальный идентификатор
 *    title     — название навыка/курса
 *    emoji     — иконка
 *    branch    — ветка (ключ из BRANCHES)
 *    col, row  — координаты в сетке дерева (могут быть дробными)
 *    reqLevel  — минимальный уровень игрока для разблокировки
 *    xp        — награда за освоение
 *    prereqs   — массив id предшественников (рёбра графа)
 *    desc      — описание
 */

'use strict';

const CURRICULUM = (() => {
    const BRANCHES = {
        core:      { name: 'Основы',      color: '#22d3ee', emoji: '🌱' },
        content:   { name: 'Контент',     color: '#f472b6', emoji: '✍️' },
        dev:       { name: 'Разработка',  color: '#38bdf8', emoji: '💻' },
        analytics: { name: 'Аналитика',   color: '#34d399', emoji: '📊' },
        design:    { name: 'Дизайн',      color: '#f5a524', emoji: '🎨' },
        marketing: { name: 'Маркетинг',   color: '#a78bfa', emoji: '📈' },
        apex:      { name: 'Мастерство',  color: '#fb7185', emoji: '👑' },
    };

    const NODES = [
        // ---------- Ядро (фундамент) ----------
        {
            id: 'intro', title: 'Введение в ИИ', emoji: '🤖', branch: 'core',
            col: 2, row: 0, reqLevel: 1, xp: 30, prereqs: [],
            desc: 'Как устроены современные ИИ-модели и где они применяются.',
        },
        {
            id: 'prompt', title: 'Промпт-инжиниринг', emoji: '⌨️', branch: 'core',
            col: 2, row: 1, reqLevel: 2, xp: 40, prereqs: ['intro'],
            desc: 'Искусство формулировать запросы для точных результатов.',
        },

        // ---------- Ветка: Контент ----------
        {
            id: 'c-text', title: 'Тексты с ИИ', emoji: '📝', branch: 'content',
            col: 0, row: 2, reqLevel: 3, xp: 50, prereqs: ['prompt'],
            desc: 'Генерация статей, постов и сценариев через ChatGPT и Claude.',
        },
        {
            id: 'c-image', title: 'Генерация изображений', emoji: '🖼️', branch: 'content',
            col: 0, row: 3, reqLevel: 5, xp: 60, prereqs: ['c-text'],
            desc: 'Midjourney, DALL·E, Stable Diffusion для визуала.',
        },
        {
            id: 'c-video', title: 'ИИ-видео', emoji: '🎬', branch: 'content',
            col: 0, row: 4, reqLevel: 8, xp: 80, prereqs: ['c-image'],
            desc: 'Создание и монтаж видеоконтента с помощью ИИ.',
        },

        // ---------- Ветка: Разработка ----------
        {
            id: 'd-copilot', title: 'AI-ассистенты кода', emoji: '🧑‍💻', branch: 'dev',
            col: 1, row: 2, reqLevel: 4, xp: 50, prereqs: ['prompt'],
            desc: 'GitHub Copilot и ИИ-помощники в повседневной разработке.',
        },
        {
            id: 'd-test', title: 'Автотесты с ИИ', emoji: '🧪', branch: 'dev',
            col: 1, row: 3, reqLevel: 6, xp: 60, prereqs: ['d-copilot'],
            desc: 'Генерация и поддержка тестов, ревью кода через ИИ.',
        },
        {
            id: 'd-agents', title: 'ИИ-агенты', emoji: '🦾', branch: 'dev',
            col: 1, row: 4, reqLevel: 10, xp: 90, prereqs: ['d-test'],
            desc: 'Автономные агенты и оркестрация ИИ в приложениях.',
        },

        // ---------- Ветка: Аналитика ----------
        {
            id: 'a-data', title: 'Анализ данных', emoji: '🔢', branch: 'analytics',
            col: 2, row: 2.4, reqLevel: 4, xp: 50, prereqs: ['prompt'],
            desc: 'Обработка и интерпретация данных с помощью ИИ.',
        },
        {
            id: 'a-predict', title: 'Прогнозирование', emoji: '🔮', branch: 'analytics',
            col: 2, row: 3.4, reqLevel: 7, xp: 70, prereqs: ['a-data'],
            desc: 'Предиктивная аналитика и моделирование трендов.',
        },
        {
            id: 'a-viz', title: 'Визуализация', emoji: '📉', branch: 'analytics',
            col: 2, row: 4.4, reqLevel: 9, xp: 80, prereqs: ['a-predict'],
            desc: 'Превращение данных в наглядные дашборды через ИИ.',
        },

        // ---------- Ветка: Дизайн ----------
        {
            id: 'g-concept', title: 'Дизайн-концепции', emoji: '🎨', branch: 'design',
            col: 3, row: 2, reqLevel: 3, xp: 50, prereqs: ['prompt'],
            desc: 'Генерация идей, мудбордов и концептов интерфейсов.',
        },
        {
            id: 'g-proto', title: 'Прототипирование', emoji: '📐', branch: 'design',
            col: 3, row: 3, reqLevel: 6, xp: 70, prereqs: ['g-concept'],
            desc: 'Быстрые прототипы и UI-кит с помощью ИИ.',
        },

        // ---------- Ветка: Маркетинг ----------
        {
            id: 'm-target', title: 'Таргетинг', emoji: '🎯', branch: 'marketing',
            col: 4, row: 2, reqLevel: 4, xp: 50, prereqs: ['prompt'],
            desc: 'Анализ аудитории и точный таргетинг через ИИ.',
        },
        {
            id: 'm-creative', title: 'Рекламные креативы', emoji: '✨', branch: 'marketing',
            col: 4, row: 3, reqLevel: 6, xp: 60, prereqs: ['m-target'],
            desc: 'Генерация и A/B-тест рекламных материалов.',
        },
        {
            id: 'm-auto', title: 'Автоворонки', emoji: '⚙️', branch: 'marketing',
            col: 4, row: 4, reqLevel: 9, xp: 80, prereqs: ['m-creative'],
            desc: 'Автоматизация маркетинга и воронок продаж.',
        },

        // ---------- Вершина: Мастерство ----------
        {
            id: 'apex', title: 'Медоед ВСЁ', emoji: '👑', branch: 'apex',
            col: 2, row: 5.6, reqLevel: 15, xp: 200,
            prereqs: ['c-video', 'd-agents', 'a-viz', 'g-proto', 'm-auto'],
            desc: 'Мастер всех направлений ИИ. Вершина экосистемы MedoEDUz.',
        },
    ];

    // Индекс для быстрого доступа по id
    const BY_ID = NODES.reduce((acc, n) => {
        acc[n.id] = n;
        return acc;
    }, {});

    return { BRANCHES, NODES, BY_ID };
})();

window.CURRICULUM = CURRICULUM;
