/**
 * ============================================================
 *  MedoEDUz Telegram — интеграция с Telegram Mini App
 * ============================================================
 *
 *  Тонкая обёртка над Telegram.WebApp SDK. Главный принцип:
 *  приложение обязано полноценно работать и БЕЗ Telegram (в
 *  обычном браузере). Telegram — опциональная надстройка,
 *  которая добавляет: идентификатор пользователя (для облачной
 *  синхронизации прогресса по user_id), нативную тему, хаптику,
 *  системную главную кнопку.
 *
 *  SDK подключается тегом <script src="https://telegram.org/js/
 *  telegram-web-app.js"> ДО этого модуля. Если его нет —
 *  inTelegram остаётся false, и всё работает как раньше.
 */

'use strict';

const TG = (() => {
    let webApp = null;

    const state = {
        ready: false,
        inTelegram: false,
        user: null,      // { id, first_name, username, language_code, ... }
        initData: null,  // подписанная строка — для валидации на бэкенде
    };

    function init() {
        const tg = window.Telegram && window.Telegram.WebApp;
        // initData пустой в обычном браузере — значит, мы не в Telegram
        if (!tg || !tg.initData) {
            state.inTelegram = false;
            state.ready = true;
            return state;
        }

        webApp = tg;
        state.inTelegram = true;
        state.initData = tg.initData;
        state.user = (tg.initDataUnsafe && tg.initDataUnsafe.user) || null;

        try {
            tg.ready();
            tg.expand();
        } catch (e) { /* старые клиенты могут не иметь методов */ }

        applyTheme(tg);
        document.documentElement.setAttribute('data-tg', '1');
        state.ready = true;
        return state;
    }

    /**
     * Устойчивый ключ пользователя для хранения/синхронизации.
     * В Telegram — реальный user_id; вне — 'local' (единый локальный профиль).
     */
    function userKey() {
        return state.user && state.user.id ? String(state.user.id) : 'local';
    }

    /** Приветственное имя, если доступно */
    function displayName() {
        if (!state.user) return null;
        return state.user.first_name || state.user.username || null;
    }

    // ---------- Тема ----------
    // Telegram отдаёт цвета темы пользователя. Мы НЕ ломаем свою
    // «кибермедоед»-палитру целиком, а лишь синхронизируем фон и
    // системную кнопку, чтобы Mini App не выбивался из клиента.
    function applyTheme(tg) {
        const p = tg.themeParams || {};
        if (p.bg_color) {
            try {
                tg.setHeaderColor(p.bg_color);
                tg.setBackgroundColor(p.bg_color);
            } catch (e) { /* не критично */ }
        }
    }

    // ---------- Хаптика ----------
    function haptic(kind) {
        if (!state.inTelegram || !webApp.HapticFeedback) return;
        try {
            if (kind === 'success') webApp.HapticFeedback.notificationOccurred('success');
            else if (kind === 'error') webApp.HapticFeedback.notificationOccurred('error');
            else webApp.HapticFeedback.impactOccurred(kind || 'medium');
        } catch (e) { /* ignore */ }
    }

    // ---------- Главная кнопка ----------
    // Позволяет вынести ключевое действие (например, «Освоить навык»)
    // в системную кнопку Telegram внизу экрана.
    function mainButton(text, onClick) {
        if (!state.inTelegram || !webApp.MainButton) return null;
        const mb = webApp.MainButton;
        mb.setText(text);
        mb.show();
        // снимаем прежние обработчики через offClick недоступно надёжно —
        // поэтому храним текущий и переопределяем
        if (mainButton._handler) mb.offClick(mainButton._handler);
        mainButton._handler = onClick;
        mb.onClick(onClick);
        return mb;
    }

    function hideMainButton() {
        if (state.inTelegram && webApp.MainButton) webApp.MainButton.hide();
    }

    return {
        init, state, userKey, displayName,
        haptic, mainButton, hideMainButton,
        get inTelegram() { return state.inTelegram; },
        get user() { return state.user; },
    };
})();

window.TG = TG;
