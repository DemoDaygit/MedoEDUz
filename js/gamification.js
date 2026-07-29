/**
 * ============================================================
 *  MedoEDUz Game Engine — Игровой движок экосистемы обучения
 *  Система роста и эволюции: XP, уровни, достижения, стадии
 * ============================================================
 *
 *  Концепция: пользователь — это "Медоед", который эволюционирует
 *  по мере изучения экосистемы. Каждое действие даёт опыт (XP),
 *  открывает новые стадии эволюции и достижения. Интерфейс
 *  визуально "растёт" вместе с игроком.
 */

'use strict';

const GameEngine = (() => {
    // ---------- Конфигурация стадий эволюции ----------
    // Каждая стадия меняет внешний вид маскота, акцентные цвета и "ауру" интерфейса
    const EVOLUTION_STAGES = [
        {
            id: 0,
            name: t('Медоедёнок'),
            emoji: '🦡',
            title: t('Только начал свой путь'),
            aura: '#a3a3a3',
            minLevel: 1,
        },
        {
            id: 1,
            name: t('Любопытный'),
            emoji: '⚡',
            title: t('Исследует экосистему ИИ'),
            aura: '#8B7CFF',
            minLevel: 3,
        },
        {
            id: 2,
            name: t('Ученик ИИ'),
            emoji: '🤖',
            title: t('Освоил первые инструменты'),
            aura: '#57C7FF',
            minLevel: 6,
        },
        {
            id: 3,
            name: t('Нейро-Мастер'),
            emoji: '🦾',
            title: t('Уверенно владеет ИИ'),
            aura: '#FF8FD0',
            minLevel: 10,
        },
        {
            id: 4,
            name: t('Гуру ИИ'),
            emoji: '🧠',
            title: t('Видит матрицу насквозь'),
            aura: '#FFB020',
            minLevel: 15,
        },
        {
            // Аура должна быть сплошным цветом: используется в conic-gradient() кольца FAB.
            // Градиентный "вау-эффект" этой стадии обеспечивается через html[data-evolution='5'].
            id: 5,
            name: t('Медоед ВСЁ'),
            emoji: '👑',
            title: t('Легенда экосистемы'),
            aura: '#FFB020',
            minLevel: 20,
        },
    ];

    // ---------- Каталог достижений ----------
    const ACHIEVEMENTS = [
        { id: 'first_step', icon: '👣', name: t('Первый шаг'), desc: t('Начать путешествие по платформе'), xp: 50 },
        { id: 'explorer', icon: '🧭', name: t('Исследователь'), desc: t('Посетить все секции главной страницы'), xp: 150 },
        { id: 'curious', icon: '🔍', name: t('Любознательный'), desc: t('Открыть детали 3 курсов'), xp: 120 },
        { id: 'reader', icon: '📚', name: t('Книжный червь'), desc: t('Прокрутить всю страницу до конца'), xp: 80 },
        { id: 'social', icon: '🤝', name: t('Социальный'), desc: t('Навести на блок отзывов'), xp: 60 },
        { id: 'committed', icon: '✍️', name: t('Решительный'), desc: t('Заполнить форму записи'), xp: 200 },
        { id: 'night_owl', icon: '🦉', name: t('Полуночник'), desc: t('Зайти на сайт после полуночи'), xp: 100 },
        { id: 'streak_3', icon: '🔥', name: t('В потоке'), desc: t('Заходить 3 дня подряд'), xp: 250 },
        { id: 'level_5', icon: '⭐', name: t('Восходящая звезда'), desc: t('Достичь 5 уровня'), xp: 0 },
        { id: 'evolved', icon: '🧬', name: t('Эволюция'), desc: t('Пройти первую эволюцию'), xp: 0 },
        { id: 'konami', icon: '🎮', name: t('Хакер'), desc: t('Ввести секретный код'), xp: 500 },

        // Достижения за РЕАЛЬНОЕ усвоение, а не за клики.
        // Выдаются движком карты знаний по итогам проверок и миссий.
        { id: 'first_check', icon: '🎯', name: t('Понял, а не кликнул'), desc: t('Пройти первую проверку усвоения'), xp: 120 },
        { id: 'clean_run', icon: '💎', name: t('С первого раза'), desc: t('Пройти 3 проверки без единой ошибки'), xp: 300 },
        { id: 'branch_done', icon: '🌳', name: t('Ветка закрыта'), desc: t('Освоить все узлы одного направления'), xp: 400 },
        { id: 'cross_branch', icon: '🔗', name: t('Междисциплинарный'), desc: t('Освоить узлы в трёх разных ветках'), xp: 250 },
        { id: 'learned_from_error', icon: '🔁', name: t('Работа над ошибками'), desc: t('Провалить проверку и пройти её после разбора'), xp: 200 },
        { id: 'retained', icon: '🧠', name: t('Не забыл'), desc: t('Подтвердить знание узла спустя неделю'), xp: 350 },
    ];

    // ---------- Состояние по умолчанию ----------
    const DEFAULT_STATE = {
        xp: 0,
        level: 1,
        stage: 0,
        achievements: [],     // массив id разблокированных
        visitedSections: [],
        openedCourses: [],
        lastVisit: null,
        streak: 0,
        totalActions: 0,
        firstSeen: null,
        // ---------- Профиль ученика (персонализация вектора освоения) ----------
        // Заполняется онбордингом при первом входе. Пока onboardedAt === null,
        // карта показывает все узлы; после выбора трека — подсвечивает «свой».
        profile: {
            userId: null,       // Telegram user_id или 'local'
            goal: null,         // зачем: apply-work | fundamentals | build-agents | explore
            track: null,        // ключ из CURRICULUM.TRACKS
            experience: null,   // самооценка: zero | user | builder | advanced
            startLevel: 'basic',// стартовый уровень сложности (по диагностике)
            onboardedAt: null,
        },
    };

    const STORAGE_KEY = 'medoeduz_game_state';
    const XP_PER_LEVEL_BASE = 100;   // XP для 1→2
    const XP_GROWTH = 1.35;          // экспоненциальный рост требований

    let state = { ...DEFAULT_STATE };
    const listeners = {};

    // ---------- Утилиты ----------
    function emit(event, payload) {
        (listeners[event] || []).forEach((fn) => fn(payload));
    }

    function on(event, fn) {
        (listeners[event] = listeners[event] || []).push(fn);
        return () => {
            listeners[event] = listeners[event].filter((f) => f !== fn);
        };
    }

    function xpForLevel(level) {
        // Сколько суммарно XP нужно, чтобы достичь данного уровня
        let total = 0;
        for (let l = 1; l < level; l++) {
            total += Math.round(XP_PER_LEVEL_BASE * Math.pow(XP_GROWTH, l - 1));
        }
        return total;
    }

    function levelProgress() {
        const curBase = xpForLevel(state.level);
        const nextBase = xpForLevel(state.level + 1);
        const inLevel = state.xp - curBase;
        const needed = nextBase - curBase;
        return {
            current: inLevel,
            needed,
            percent: Math.min(100, Math.round((inLevel / needed) * 100)),
        };
    }

    function stageForLevel(level) {
        let result = EVOLUTION_STAGES[0];
        for (const s of EVOLUTION_STAGES) {
            if (level >= s.minLevel) result = s;
        }
        return result;
    }

    // ---------- Персистентность ----------
    function save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            /* приватный режим — игнорируем */
        }
    }

    function load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) state = { ...DEFAULT_STATE, ...JSON.parse(raw) };
        } catch (e) {
            state = { ...DEFAULT_STATE };
        }
    }

    // ---------- Основная механика ----------
    function addXP(amount, reason = '') {
        if (amount <= 0) return;
        const prevLevel = state.level;
        const prevStage = state.stage;

        state.xp += amount;
        state.totalActions += 1;

        // Пересчёт уровня
        while (state.xp >= xpForLevel(state.level + 1)) {
            state.level += 1;
        }

        emit('xp', { amount, reason, total: state.xp, progress: levelProgress() });

        // Левел-ап
        if (state.level > prevLevel) {
            emit('levelup', { from: prevLevel, to: state.level, level: state.level });
            if (state.level >= 5) unlock('level_5');
        }

        // Эволюция
        const newStage = stageForLevel(state.level);
        if (newStage.id !== prevStage) {
            state.stage = newStage.id;
            applyStageTheme(newStage);
            emit('evolve', { from: EVOLUTION_STAGES[prevStage], to: newStage });
            unlock('evolved');
        }

        save();
    }

    function unlock(achievementId) {
        if (state.achievements.includes(achievementId)) return false;
        const ach = ACHIEVEMENTS.find((a) => a.id === achievementId);
        if (!ach) return false;

        state.achievements.push(achievementId);
        emit('achievement', ach);
        save();

        // Награда XP за достижение (без рекурсивной выдачи самих ачивок)
        if (ach.xp > 0) addXP(ach.xp, t('Достижение: ') + ach.name);
        return true;
    }

    function visitSection(sectionId) {
        if (state.visitedSections.includes(sectionId)) return;
        state.visitedSections.push(sectionId);
        addXP(15, `Открыта секция: ${sectionId}`);

        const allSections = ['home', 'about', 'benefits', 'courses', 'testimonials', 'contact'];
        if (allSections.every((s) => state.visitedSections.includes(s))) {
            unlock('explorer');
        }
        save();
    }

    function openCourse(courseId) {
        if (!state.openedCourses.includes(courseId)) {
            state.openedCourses.push(courseId);
            addXP(25, `Изучен курс: ${courseId}`);
        }
        if (state.openedCourses.length >= 3) unlock('curious');
        save();
    }

    // ---------- Стадии: тематизация интерфейса ----------
    function applyStageTheme(stage) {
        const root = document.documentElement;
        root.style.setProperty('--game-aura', stage.aura);
        root.setAttribute('data-evolution', stage.id);
    }

    // ---------- Серии посещений (streak) ----------
    function checkStreak() {
        const today = new Date().toDateString();
        if (state.lastVisit === today) return;

        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (state.lastVisit === yesterday) {
            state.streak += 1;
        } else if (state.lastVisit !== null) {
            state.streak = 1;
        } else {
            state.streak = 1;
        }

        state.lastVisit = today;
        if (state.streak >= 3) unlock('streak_3');
        save();
    }

    function checkTimeAchievements() {
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 5) unlock('night_owl');
    }

    // ---------- Публичный API ----------
    function init() {
        load();

        if (!state.firstSeen) {
            state.firstSeen = new Date().toISOString();
            save();
        }

        applyStageTheme(stageForLevel(state.level));
        checkStreak();
        checkTimeAchievements();

        // Награда за первый визит — чуть позже, чтобы UI успел отрисоваться
        setTimeout(() => unlock('first_step'), 1500);

        emit('ready', getState());
    }

    function getState() {
        return {
            ...state,
            stage: stageForLevel(state.level),
            progress: levelProgress(),
            allStages: EVOLUTION_STAGES,
            allAchievements: ACHIEVEMENTS,
        };
    }

    function reset() {
        state = { ...DEFAULT_STATE };
        save();
        location.reload();
    }

    // ---------- Профиль ученика ----------
    function getProfile() {
        // Гарантируем наличие структуры даже у старых сохранений,
        // где поля profile ещё не было.
        return { ...DEFAULT_STATE.profile, ...(state.profile || {}) };
    }

    function setProfile(patch) {
        state.profile = { ...getProfile(), ...patch };
        save();
        emit('profile', state.profile);
        return state.profile;
    }

    function isOnboarded() {
        return !!(state.profile && state.profile.onboardedAt);
    }

    return {
        init,
        on,
        addXP,
        unlock,
        visitSection,
        openCourse,
        getState,
        getProfile,
        setProfile,
        isOnboarded,
        reset,
        EVOLUTION_STAGES,
        ACHIEVEMENTS,
    };
})();

// Глобальный доступ для отладки и интеграции
window.GameEngine = GameEngine;
