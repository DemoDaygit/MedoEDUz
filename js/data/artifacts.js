/**
 * ============================================================
 *  База артефактов Медоеда
 * ============================================================
 *
 *  Артефакт — то, что ученик УНОСИТ с собой: рабочий справочник,
 *  чек-лист, интерактивный инструмент. Не пересказ урока, а вещь,
 *  которой пользуются после курса.
 *
 *  Артефакты открываются по мере прохождения — но открывает их не
 *  «посещение страницы», а доказанный результат: освоенный узел,
 *  доля пройденной ветки, завершённая первая неделя, открытая
 *  синергия. То же правило, что и для XP: платим за пройденную
 *  сложность, а не за присутствие.
 *
 *  Условия (need) — любое из:
 *    { node: 'id' }              узел освоен
 *    { branch: 'key', pct: 60 }  доля ветки освоена
 *    { track: 'key', pct: 50 }   доля трека освоена
 *    { level: 5 }                достигнут уровень
 *    { synergy: 'syn-id' }       синергия открыта
 *    { week: 'trackKey' }        первая неделя трека пройдена
 *    { skills: 10 }              всего освоено N узлов
 *
 *  kind: 'guide' — Markdown-справочник, 'tool' — интерактивная
 *  страница. У tool путь ведёт на самостоятельный HTML.
 *
 *  Раскладка сот: cell = { q, r } — осевые координаты honeycomb.
 *  Соты одного трека стоят рядом, чтобы путь читался глазами.
 */

'use strict';

const ARTIFACTS = (() => {
    /* ------------------------------------------------------------
     *  Интерактивные инструменты.
     *  Их немного и они дорогие в поддержке — берём только те, что
     *  экономят реальное время и не устаревают за полгода.
     * ---------------------------------------------------------- */
    const TOOLS = [
        {
            id: 'tool-prompt', kind: 'tool', emoji: '⌨️', branch: 'core',
            title: 'Конструктор промпта',
            titleEn: 'Prompt builder',
            summary: 'Собирает запрос по схеме роль → задача → контекст → формат → критерии и показывает, чего не хватает.',
            summaryEn: 'Assembles a request as role → task → context → format → criteria and shows what is missing.',
            file: 'artifacts/tool-prompt.html',
            need: { node: 'prompt' },
            cell: { q: 0, r: 0 },
        },
        {
            id: 'tool-triad', kind: 'tool', emoji: '🛡️', branch: 'security',
            title: 'Разбор летальной триады',
            titleEn: 'Lethal trifecta review',
            summary: 'Проверяет ваш сценарий на три условия утечки и подсказывает, какую ногу триады дешевле отрезать.',
            summaryEn: 'Checks your setup against the three leak conditions and shows which leg is cheapest to cut.',
            file: 'artifacts/tool-triad.html',
            need: { node: 'lethal-triad' },
            cell: { q: 2, r: 0 },
        },
        {
            id: 'tool-context', kind: 'tool', emoji: '🧠', branch: 'memory',
            title: 'Бюджет контекста',
            titleEn: 'Context budget',
            summary: 'Считает, сколько места занимает каждый кусок контекста, и показывает, что вытесняется первым.',
            summaryEn: 'Counts how much room each piece of context takes and shows what gets pushed out first.',
            file: 'artifacts/tool-context.html',
            need: { node: 'ctx-eng' },
            cell: { q: 1, r: 1 },
        },
        {
            id: 'tool-brier', kind: 'tool', emoji: '🎯', branch: 'evals',
            title: 'Калибровщик прогнозов',
            titleEn: 'Calibration tracker',
            summary: 'Считает оценку Брайера по вашим прогнозам и показывает, в какой зоне уверенности вы себе врёте.',
            summaryEn: 'Computes your Brier score and shows the confidence zone where you fool yourself.',
            file: 'artifacts/tool-brier.html',
            need: { branch: 'evals', pct: 20 },
            cell: { q: 3, r: 1 },
        },
        {
            id: 'tool-eval', kind: 'tool', emoji: '📐', branch: 'evals',
            title: 'Карточка эвала',
            titleEn: 'Eval scorecard',
            summary: 'Превращает «вроде работает» в набор кейсов с критериями и считает долю пройденных.',
            summaryEn: 'Turns “seems to work” into a case set with criteria and scores the pass rate.',
            file: 'artifacts/tool-eval.html',
            need: { node: 'evals-not-tests' },
            cell: { q: 4, r: 0 },
        },
        {
            id: 'tool-loop', kind: 'tool', emoji: '🤖', branch: 'agents',
            title: 'Разбор агентной петли',
            titleEn: 'Agent loop breakdown',
            summary: 'Раскладывает вашу задачу на петлю «модель — инструменты — цикл» и показывает, где нужен агент, а где хватит запроса.',
            summaryEn: 'Breaks your task into model–tools–loop and shows where an agent is warranted and where a single request is enough.',
            file: 'artifacts/tool-loop.html',
            need: { node: 'agent-loop' },
            cell: { q: 2, r: 2 },
        },
    ];

    /* ------------------------------------------------------------
     *  Гайды по веткам. Открываются, когда ветка пройдена наполовину:
     *  раньше справочник не с чем сопоставить, позже он уже не нужен.
     * ---------------------------------------------------------- */
    const BRANCH_GUIDES = [
        { key: 'core',      emoji: '🌱', cell: { q: 0, r: 1 } },
        { key: 'content',   emoji: '✍️', cell: { q: -1, r: 2 } },
        { key: 'dev',       emoji: '💻', cell: { q: 1, r: 2 } },
        { key: 'analytics', emoji: '📊', cell: { q: 3, r: 2 } },
        { key: 'design',    emoji: '🎨', cell: { q: -2, r: 3 } },
        { key: 'marketing', emoji: '📈', cell: { q: -1, r: 3 } },
        { key: 'memory',    emoji: '🧠', cell: { q: 0, r: 3 } },
        { key: 'agents',    emoji: '🤖', cell: { q: 1, r: 3 } },
        { key: 'security',  emoji: '🛡️', cell: { q: 2, r: 3 } },
        { key: 'evals',     emoji: '📐', cell: { q: 3, r: 3 } },
        { key: 'quant',     emoji: '📉', cell: { q: 4, r: 3 } },
        { key: 'apex',      emoji: '👑', cell: { q: 2, r: 5 } },
    ].map((b) => ({
        id: 'guide-' + b.key,
        kind: 'guide',
        emoji: b.emoji,
        branch: b.key,
        file: 'artifacts/guide-' + b.key + '.md',
        need: { branch: b.key, pct: 50 },
        cell: b.cell,
    }));

    /* ------------------------------------------------------------
     *  Дорожные карты треков. Открываются за пройденную первую
     *  неделю: к этому моменту у человека уже есть чем сверяться.
     * ---------------------------------------------------------- */
    const TRACK_GUIDES = [
        { key: 'generalist',      emoji: '🌍', cell: { q: -2, r: 4 } },
        { key: 'developer',       emoji: '💻', cell: { q: -1, r: 4 } },
        { key: 'agent-architect', emoji: '🤖', cell: { q: 0, r: 4 } },
        { key: 'memory-eng',      emoji: '🧠', cell: { q: 1, r: 4 } },
        { key: 'ai-analyst',      emoji: '📐', cell: { q: 2, r: 4 } },
        { key: 'quant',           emoji: '📉', cell: { q: 3, r: 4 } },
        { key: 'security-eng',    emoji: '🛡️', cell: { q: 4, r: 4 } },
    ].map((t) => ({
        id: 'track-' + t.key,
        kind: 'guide',
        emoji: t.emoji,
        track: t.key,
        file: 'artifacts/track-' + t.key + '.md',
        need: { week: t.key },
        cell: t.cell,
    }));

    const ALL = TOOLS.concat(BRANCH_GUIDES).concat(TRACK_GUIDES);

    const BY_ID = ALL.reduce((acc, a) => { acc[a.id] = a; return acc; }, {});

    return { ALL, BY_ID, TOOLS, BRANCH_GUIDES, TRACK_GUIDES };
})();

window.ARTIFACTS = ARTIFACTS;
