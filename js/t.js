/**
 * ============================================================
 *  MedoEDUz — глобальный t() для скриптов сайта
 * ============================================================
 *
 *  Грузится РАНЬШЕ остальных скриптов: они вызывают t() прямо при
 *  разборе (списки достижений, стадии, подписи). Ключ — сама русская
 *  строка, поэтому отсутствие перевода даёт оригинал, а не пустоту.
 *
 *  Здесь же подменяется модель курса: английская копия повторяет
 *  русскую по структуре (те же id, координаты, prereqs, индексы
 *  верных ответов), поэтому вся визуализация работает без изменений.
 */

(function () {
    'use strict';

    var lang = document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'ru';
    var dict = (lang === 'en' && window.MEDOEDUZ_SITE_I18N && window.MEDOEDUZ_SITE_I18N.en) || null;

    window.MEDOEDUZ_LANG = lang;

    window.t = function (s) {
        if (!dict) return s;
        var v = dict[s];
        return (v === undefined || v === null || v === '') ? s : v;
    };

    // Модель на выбранном языке — до того, как её прочитают
    // reco.js, onboarding.js, course-view.js и skill-tree.js.
    if (lang === 'en' && window.CURRICULUM_EN) {
        window.CURRICULUM = window.CURRICULUM_EN;
    }
})();
