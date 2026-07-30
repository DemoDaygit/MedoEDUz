/**
 * ============================================================
 *  MedoEDUz — оверлей модели курса
 * ============================================================
 *
 *  Накладывает правки администратора на базовую модель
 *  (js/data/curriculum.js) ДО того, как её прочитают карта,
 *  рекомендации и панель курса.
 *
 *  Ключевые решения (см. docs/ARCHITECTURE-TRIZ.md):
 *
 *  1. БАЗА + ОВЕРЛЕЙ, а не редактируемый файл. Нет сети или нет
 *     бэкенда — ученик видит базовую модель и учится дальше. Это
 *     рабочее состояние, а не поломка.
 *
 *  2. ПРИМЕНЕНИЕ СИНХРОННОЕ, из кэша в localStorage. Ждать сеть
 *     перед первой отрисовкой карты нельзя. Свежий оверлей
 *     подтягивается в фоне и вступает в силу со следующей загрузки:
 *     подменять модель под ногами у уже отрисованной карты — верный
 *     способ получить рассинхрон состояния.
 *
 *  3. СКРЫТЫЙ УЗЕЛ УДАЛЯЕТСЯ ИЗ МОДЕЛИ, НО НЕ ИЗ ПРОГРЕССА.
 *     Прогресс — это список id в отдельном хранилище, его никто не
 *     трогает. Вместе с узлом вычищаются ссылки на него в prereqs
 *     соседей, иначе граф порвётся и зависимые узлы станут
 *     недостижимыми навсегда.
 */

'use strict';

(function () {
    var C = window.CURRICULUM;
    if (!C || !window.API) return;

    /** Глубокое слияние: патч правит только те поля, что в нём есть */
    function merge(base, patch) {
        var out = {};
        Object.keys(base || {}).forEach(function (k) { out[k] = base[k]; });
        Object.keys(patch || {}).forEach(function (k) {
            var v = patch[k];
            if (v && typeof v === 'object' && !Array.isArray(v) && base && typeof base[k] === 'object' && !Array.isArray(base[k])) {
                out[k] = merge(base[k], v);
            } else {
                out[k] = v;
            }
        });
        return out;
    }

    function apply(model, overlay) {
        if (!overlay || !overlay.patches || !overlay.patches.length) return model;

        var hiddenNodes = {};
        var report = { upserted: 0, hidden: 0, unknown: 0 };

        overlay.patches.forEach(function (p) {
            if (!p || !p.id) return;

            if (p.entity === 'node') {
                var i = model.NODES.findIndex(function (n) { return n.id === p.id; });
                if (p.op === 'hide') { hiddenNodes[p.id] = 1; report.hidden++; return; }
                if (p.op === 'show') { delete hiddenNodes[p.id]; return; }
                if (p.op === 'upsert') {
                    if (i >= 0) {
                        model.NODES[i] = merge(model.NODES[i], p.data);
                    } else {
                        // Новый узел: достраиваем обязательные поля, иначе
                        // рендер карты упадёт на первом же обращении
                        model.NODES.push(merge({
                            id: p.id, title: p.id, emoji: '🆕', branch: 'core',
                            col: 0, row: 0, reqLevel: 1, xp: 30, prereqs: [],
                            level: 'basic', tracks: [], desc: '', tools: [],
                            learn: [], apply: { now: '', case: '' }, trap: '',
                            quest: { title: '', steps: [], proof: '' }, check: [],
                        }, p.data));
                    }
                    report.upserted++;
                }
                return;
            }

            if (p.entity === 'branch' || p.entity === 'track') {
                var bag = p.entity === 'branch' ? model.BRANCHES : model.TRACKS;
                if (p.op === 'hide') { if (bag[p.id]) bag[p.id]._hidden = true; report.hidden++; return; }
                if (p.op === 'show') { if (bag[p.id]) delete bag[p.id]._hidden; return; }
                if (p.op === 'upsert') { bag[p.id] = merge(bag[p.id] || {}, p.data); report.upserted++; }
                return;
            }

            if (p.entity === 'synergy') {
                var si = (model.SYNERGIES || []).findIndex(function (s) { return s.id === p.id; });
                if (p.op === 'hide') { if (si >= 0) model.SYNERGIES.splice(si, 1); report.hidden++; return; }
                if (p.op === 'upsert') {
                    if (si >= 0) model.SYNERGIES[si] = merge(model.SYNERGIES[si], p.data);
                    else model.SYNERGIES.push(merge({ id: p.id, name: p.id, emoji: '✨', nodes: [], gives: '' }, p.data));
                    report.upserted++;
                }
                return;
            }

            report.unknown++;
        });

        // Скрытые узлы убираем из модели и ЗАЧИЩАЕМ ссылки на них.
        // Без зачистки узел-наследник ждал бы предпосылку, которой
        // больше нет, и остался бы заблокирован навсегда.
        var hiddenIds = Object.keys(hiddenNodes);
        if (hiddenIds.length) {
            model.NODES = model.NODES.filter(function (n) { return !hiddenNodes[n.id]; });
            model.NODES.forEach(function (n) {
                if (n.prereqs && n.prereqs.length) {
                    n.prereqs = n.prereqs.filter(function (id) { return !hiddenNodes[id]; });
                }
            });
            (model.SYNERGIES || []).forEach(function (s) {
                if (s.nodes) s.nodes = s.nodes.filter(function (id) { return !hiddenNodes[id]; });
            });
            model.SYNERGIES = (model.SYNERGIES || []).filter(function (s) { return (s.nodes || []).length >= 2; });
        }

        // Скрытые ветки и треки — вон из справочников
        ['BRANCHES', 'TRACKS'].forEach(function (bagName) {
            var bag = model[bagName] || {};
            Object.keys(bag).forEach(function (k) { if (bag[k] && bag[k]._hidden) delete bag[k]; });
        });

        // Пересобираем индекс: по нему ходит вся визуализация
        model.BY_ID = {};
        model.NODES.forEach(function (n) { model.BY_ID[n.id] = n; });

        model._overlay = { version: overlay.version, applied: report, at: overlay.updatedAt };
        return model;
    }

    // ---------- 1. Синхронно, до первой отрисовки ----------
    // В демо источник локальный, поэтому правка админа видна сразу.
    // По сети синхронно доступен только кэш — блокировать первую
    // отрисовку сетевым запросом нельзя.
    var cached = API.getOverlaySync ? API.getOverlaySync() : API.cachedOverlay();
    if (cached) {
        try { apply(C, cached); }
        catch (e) { /* битый кэш не должен ронять курс */ }
    }

    // ---------- 2. Асинхронно: тянем свежий ----------
    // Вступит в силу со следующей загрузки — намеренно. Менять модель
    // под уже отрисованной картой значит рассинхронить состояние.
    API.getOverlay().then(function (fresh) {
        if (!fresh) return;
        var prev = cached ? cached.version : -1;
        if (fresh.version === prev) return;
        API.cacheOverlay(fresh);
        document.dispatchEvent(new CustomEvent('medoeduz:overlay', {
            detail: { version: fresh.version, fresh: true, hadCache: !!cached },
        }));
    }).catch(function () { /* нет сети — работаем на базе, это нормально */ });

    window.ModelOverlay = { apply: apply };
})();
