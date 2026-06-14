/**
 * MedoEDUz PWA Service Worker
 * Обеспечивает офлайн-работу: кэширует оболочку приложения
 * по стратегии cache-first с обновлением в фоне.
 */

'use strict';

var CACHE = 'medoeduz-app-v1';
var ASSETS = [
    './',
    './index.html',
    './manifest.webmanifest',
    './icon.svg'
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
    if (event.request.method !== 'GET') return;
    event.respondWith(
        caches.match(event.request).then(function (cached) {
            if (cached) return cached;
            return fetch(event.request).then(function (resp) {
                // кэшируем только успешные ответы того же origin
                if (resp && resp.status === 200 && resp.type === 'basic') {
                    var copy = resp.clone();
                    caches.open(CACHE).then(function (cache) { cache.put(event.request, copy); });
                }
                return resp;
            }).catch(function () {
                // офлайн-фолбэк на оболочку
                return caches.match('./index.html');
            });
        })
    );
});
