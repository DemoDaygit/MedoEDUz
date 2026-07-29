/**
 * ============================================================
 *  MedoEDUz Theme — переключение светлой и тёмной темы
 * ============================================================
 *
 *  Тёмная тема остаётся темой по умолчанию: это язык, на котором
 *  говорят современные ИИ-агентные продукты, и он же читается как
 *  «кибер». Светлая — равноправная альтернатива для тех, кому
 *  тёмный интерфейс некомфортен, и для чтения при ярком свете.
 *
 *  Выбор хранится в localStorage и применяется ДО первой отрисовки
 *  крошечным инлайн-скриптом в <head> каждой страницы. Без него
 *  страница успевает мигнуть тёмным, прежде чем применится светлая
 *  тема — это заметно и выглядит как баг.
 *
 *  Значения: 'dark' | 'light' | 'auto' (следовать системе).
 */

'use strict';

const Theme = (() => {
    const KEY = 'medoeduz_theme';
    const META = { dark: '#07080B', light: '#F4F7FA' };

    function system() {
        try {
            return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        } catch (e) { return 'dark'; }
    }

    /** Что выбрано пользователем: dark | light | auto */
    function choice() {
        try { return localStorage.getItem(KEY) || 'dark'; } catch (e) { return 'dark'; }
    }

    /** Какая тема реально применена: dark | light */
    function current() {
        const c = choice();
        return c === 'auto' ? system() : c;
    }

    function apply(theme) {
        const t = theme === 'light' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', t);
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', META[t]);
        document.dispatchEvent(new CustomEvent('medoeduz:theme', { detail: { theme: t } }));
        return t;
    }

    function set(c) {
        try { localStorage.setItem(KEY, c); } catch (e) {}
        return apply(c === 'auto' ? system() : c);
    }

    function toggle() {
        return set(current() === 'light' ? 'dark' : 'light');
    }

    /** Кнопка-переключатель. Возвращает готовый элемент. */
    function button(labels) {
        labels = labels || { light: 'Светлая тема', dark: 'Тёмная тема' };
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'theme-toggle';
        function paint() {
            const isLight = current() === 'light';
            // Иконка показывает, КУДА переключит, а не что сейчас:
            // так пользователь понимает результат клика заранее.
            b.innerHTML = isLight ? '🌙' : '☀️';
            b.setAttribute('aria-label', isLight ? labels.dark : labels.light);
            b.title = isLight ? labels.dark : labels.light;
        }
        b.addEventListener('click', () => { toggle(); paint(); });
        document.addEventListener('medoeduz:theme', paint);
        paint();
        return b;
    }

    // Синхронизация между вкладками
    window.addEventListener('storage', (e) => {
        if (e.key === KEY) apply(current());
    });

    // Если выбран режим «как в системе» — следим за сменой
    try {
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
            if (choice() === 'auto') apply(system());
        });
    } catch (e) { /* старый браузер — просто не следим */ }

    return { get: current, choice, set, toggle, apply, button, system };
})();

window.Theme = Theme;
