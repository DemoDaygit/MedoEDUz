/**
 * ============================================================
 *  MedoEDUz i18n (сайт) — перевод по текстовым узлам
 * ============================================================
 *
 *  Ключ словаря — сам русский текст. Перевод применяется не к
 *  элементам, а к ТЕКСТОВЫМ УЗЛАМ: так разметку трогать не нужно
 *  вообще, ни один тег и ни один класс не пострадает. Обратная
 *  сторона — переводится только то, что есть в словаре; всё
 *  остальное остаётся по-русски, и это безопасное состояние,
 *  а не поломка.
 *
 *  Русский — исходник. Английский — надстройка.
 */

'use strict';

const I18N = (() => {
    const KEY = 'medoeduz_lang';

    function detect() {
        try {
            const saved = localStorage.getItem(KEY);
            if (saved === 'ru' || saved === 'en') return saved;
        } catch (e) { /* приватный режим — берём язык браузера */ }
        const nav = (navigator.language || 'ru').toLowerCase();
        return nav.indexOf('ru') === 0 ? 'ru' : 'en';
    }

    let lang = detect();
    const dict = () => (window.MEDOEDUZ_SITE_I18N && window.MEDOEDUZ_SITE_I18N[lang]) || null;

    function t(s) {
        const d = dict();
        if (!d) return s;
        const v = d[String(s).trim()];
        return (v === undefined || v === null || v === '') ? s : v;
    }

    /** Переводит текстовые узлы и переводимые атрибуты внутри root */
    function applyTo(root) {
        const d = dict();
        if (!d) return 0;
        let hits = 0;
        const SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1 };

        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const nodes = [];
        let n;
        while ((n = walker.nextNode())) nodes.push(n);

        nodes.forEach((node) => {
            if (node.parentElement && SKIP[node.parentElement.tagName]) return;
            const raw = node.nodeValue;
            const s = raw.trim();
            if (!s || !/[а-яё]/i.test(s)) return;
            const v = d[s];
            if (!v) return;
            // Сохраняем окружающие пробелы: они держат вёрстку строки
            node.nodeValue = raw.replace(s, v);
            hits++;
        });

        ['placeholder', 'title', 'aria-label', 'alt'].forEach((attr) => {
            root.querySelectorAll('[' + attr + ']').forEach((el) => {
                const v = d[(el.getAttribute(attr) || '').trim()];
                if (v) { el.setAttribute(attr, v); hits++; }
            });
        });

        return hits;
    }

    function apply() {
        document.documentElement.setAttribute('data-lang', lang);
        document.documentElement.lang = lang;
        if (lang === 'ru') return 0;

        const hits = applyTo(document.body);
        const d = dict();
        if (d && d[document.title.trim()]) document.title = d[document.title.trim()];
        const desc = document.querySelector('meta[name="description"]');
        if (desc && d && d[(desc.getAttribute('content') || '').trim()]) {
            desc.setAttribute('content', d[desc.getAttribute('content').trim()]);
        }
        document.dispatchEvent(new CustomEvent('medoeduz:lang', { detail: { lang, hits } }));
        watch();
        return hits;
    }

    /**
     * Скрипты дорисовывают в DOM тосты, достижения и карточки уже
     * после загрузки — разовый проход их не застанет. Наблюдатель
     * переводит каждое новое поддерево при появлении.
     */
    function watch() {
        if (lang === 'ru' || !window.MutationObserver) return;
        let queued = null;
        const obs = new MutationObserver((records) => {
            const roots = [];
            records.forEach((rec) => {
                rec.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) roots.push(node);
                    else if (node.nodeType === 3 && node.parentElement) roots.push(node.parentElement);
                });
            });
            if (!roots.length) return;
            // Пакетируем: перевод сам меняет DOM, и без буфера
            // наблюдатель уходит в бесконечный цикл сам с собой
            if (queued) return;
            queued = requestAnimationFrame(() => {
                queued = null;
                obs.disconnect();
                roots.forEach((r) => { try { applyTo(r); } catch (e) {} });
                obs.observe(document.body, { childList: true, subtree: true });
            });
        });
        obs.observe(document.body, { childList: true, subtree: true });
    }

    function set(l) {
        try { localStorage.setItem(KEY, l); } catch (e) {}
        // Перезагрузка намеренно: часть текста рисуется скриптами при
        // старте, и подменять её на лету — верный способ получить
        // наполовину переведённую страницу.
        location.reload();
    }

    function get() { return lang; }

    return { t, get, set, apply, applyTo };
})();

window.I18N = I18N;

/* ------------------------------------------------------------
 *  Кнопки в навигации
 * ---------------------------------------------------------- */
(function wireSwitches() {
    function paintTheme() {
        const b = document.getElementById('themeBtn');
        if (!b || !window.Theme) return;
        const light = Theme.get() === 'light';
        // Иконка показывает, куда переключит, а не что сейчас
        b.textContent = light ? '🌙' : '☀️';
        const label = light
            ? (I18N.get() === 'en' ? 'Dark theme' : 'Тёмная тема')
            : (I18N.get() === 'en' ? 'Light theme' : 'Светлая тема');
        b.title = label;
        b.setAttribute('aria-label', label);
    }

    function init() {
        const tb = document.getElementById('themeBtn');
        if (tb && window.Theme) {
            paintTheme();
            tb.addEventListener('click', () => { Theme.toggle(); paintTheme(); });
            document.addEventListener('medoeduz:theme', paintTheme);
        }
        const lb = document.getElementById('langBtn');
        if (lb) {
            lb.textContent = I18N.get() === 'en' ? 'EN' : 'RU';
            const title = I18N.get() === 'en' ? 'Переключить на русский' : 'Switch to English';
            lb.title = title;
            lb.setAttribute('aria-label', title);
            lb.addEventListener('click', () => I18N.set(I18N.get() === 'en' ? 'ru' : 'en'));
        }
        I18N.apply();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
