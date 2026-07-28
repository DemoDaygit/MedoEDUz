/**
 * ============================================================
 *  MedoEDUz Sync — фоновая синхронизация прогресса с облаком
 * ============================================================
 *
 *  Отправляет прогресс на Sync Worker (worker/) под Telegram
 *  user_id и подтягивает его на других устройствах.
 *
 *  Ключевой принцип — офлайн-first: приложение НИКОГДА не ждёт
 *  сеть. Всё пишется в localStorage мгновенно, синхронизация —
 *  фоновая и необязательная. Нет Telegram или нет сети — просто
 *  работаем локально, как раньше.
 *
 *  Активируется только когда:
 *   - мы в Telegram (есть initData для подписи),
 *   - задан URL воркера (SYNC_URL).
 */

'use strict';

const Sync = (() => {
    // Адрес развёрнутого воркера берётся из js/config.js (единая точка
    // настройки). Пустой = синхронизация выключена, работа чисто локальная.
    const SYNC_URL = (window.MEDOEDUZ_SYNC_URL || '').replace(/\/+$/, '');

    let enabled = false;
    let initData = null;
    let debounceTimer = null;

    function headers() {
        return { 'Content-Type': 'application/json', 'X-Telegram-Init-Data': initData };
    }

    async function pull() {
        if (!enabled) return null;
        try {
            const r = await fetch(SYNC_URL + '/v1/progress', { headers: headers() });
            if (!r.ok) return null;
            const data = await r.json();
            return data.progress || null;
        } catch (e) {
            return null; // офлайн — не проблема
        }
    }

    async function push(progress) {
        if (!enabled) return;
        try {
            await fetch(SYNC_URL + '/v1/progress', {
                method: 'PATCH',
                headers: headers(),
                body: JSON.stringify(progress),
            });
        } catch (e) {
            // Не удалось — кладём в очередь, отправим при следующем событии.
            queue(progress);
        }
    }

    // Дебаунс: частые события (тап, шаг миссии) не спамят сеть.
    function schedulePush(getProgress) {
        if (!enabled) return;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => push(getProgress()), 3000);
    }

    function queue(progress) {
        try {
            localStorage.setItem('medoeduz_sync_pending', JSON.stringify(progress));
        } catch (e) { /* ignore */ }
    }

    async function flushQueue() {
        if (!enabled) return;
        let pending = null;
        try { pending = JSON.parse(localStorage.getItem('medoeduz_sync_pending') || 'null'); }
        catch (e) { /* ignore */ }
        if (pending) {
            await push(pending);
            try { localStorage.removeItem('medoeduz_sync_pending'); } catch (e) {}
        }
    }

    function init(tgInitData) {
        initData = tgInitData;
        enabled = !!(SYNC_URL && initData);
        if (enabled) {
            flushQueue();
            window.addEventListener('online', flushQueue);
        }
        return enabled;
    }

    return { init, pull, push, schedulePush, get enabled() { return enabled; } };
})();

window.Sync = Sync;
