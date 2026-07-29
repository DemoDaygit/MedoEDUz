/**
 * MedoEDUz PWA Service Worker
 * Обеспечивает офлайн-работу: кэширует оболочку приложения
 * по стратегии cache-first с обновлением в фоне.
 */

'use strict';

var CACHE = 'medoeduz-app-v6';
var ASSETS = [
    './',
    './index.html',
    './learn.html',
    './learn.css',
    './learn.js',
    './refs.js',
    './i18n.js',
    './config.js',
    './manifest.webmanifest',
    './icon.svg',
    './data/curriculum.js',
    './data/curriculum.en.js',
    './fonts/fonts.css',
    './fonts/jetbrainsmono-v24-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx3cwhsk.woff2',
    './fonts/jetbrainsmono-v24-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx7cwhsk.woff2',
    './fonts/jetbrainsmono-v24-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwg.woff2',
    './fonts/jetbrainsmono-v24-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxPcwhsk.woff2',
    './fonts/jetbrainsmono-v24-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxTcwhsk.woff2',
    './fonts/jetbrainsmono-v24-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx_cwhsk.woff2',
    './fonts/manrope-v20-xn7gYHE41ni1AdIRggOxSuXd.woff2',
    './fonts/manrope-v20-xn7gYHE41ni1AdIRggSxSuXd.woff2',
    './fonts/manrope-v20-xn7gYHE41ni1AdIRggexSg.woff2',
    './fonts/manrope-v20-xn7gYHE41ni1AdIRggixSuXd.woff2',
    './fonts/manrope-v20-xn7gYHE41ni1AdIRggmxSuXd.woff2',
    './fonts/manrope-v20-xn7gYHE41ni1AdIRggqxSuXd.woff2'
];

// Установка — предзагрузка оболочки
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE).then(function (cache) {
            return cache.addAll(ASSETS);
        }).then(function () {
            return self.skipWaiting();
        })
    );
});

// Активация — удаление старых кэшей
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(
                keys.filter(function (k) { return k !== CACHE; })
                    .map(function (k) { return caches.delete(k); })
            );
        }).then(function () {
            return self.clients.claim();
        })
    );
});

// Запросы — cache-first, затем сеть (с дозаписью в кэш)
self.addEventListener('fetch', function (event) {
    var req = event.request;
    if (req.method !== 'GET') return;

    // Чужие источники не трогаем вообще. Иначе при недоступном
    // telegram.org мы отдавали бы вместо его скрипта HTML-оболочку,
    // и браузер падал бы на разборе с «Unexpected token '<'».
    var sameOrigin = false;
    try { sameOrigin = new URL(req.url).origin === self.location.origin; } catch (e) {}
    if (!sameOrigin) return;

    event.respondWith(
        caches.match(req).then(function (cached) {
            if (cached) return cached;
            return fetch(req).then(function (resp) {
                // кэшируем только успешные ответы того же origin
                if (resp && resp.status === 200 && resp.type === 'basic') {
                    var copy = resp.clone();
                    caches.open(CACHE).then(function (cache) { cache.put(req, copy); });
                }
                return resp;
            }).catch(function () {
                // Офлайн-фолбэк — только для переходов по страницам.
                // Для скриптов и стилей отдавать HTML нельзя.
                if (req.mode === 'navigate') return caches.match('./index.html');
                return Response.error();
            });
        })
    );
});
