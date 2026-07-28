#!/bin/bash
# Собирает автономное PWA-приложение в загружаемый архив.
# Результат: dist/MedoEDUz-app.zip — распакуй и открой index.html.

set -e

APP_DIR="app"
OUT_DIR="dist"
ZIP_NAME="MedoEDUz-app.zip"

echo "🐻 Сборка автономного приложения MedoEDUz..."

if [ ! -d "$APP_DIR" ]; then
    echo "❌ Папка $APP_DIR не найдена"
    exit 1
fi

# Модель учебной программы — единый источник истины в js/data/.
# Приложение автономно (распространяется zip-архивом и работает офлайн),
# поэтому модель копируется внутрь. Синхронизируем при каждой сборке,
# иначе копия молча разойдётся с оригиналом.
if [ -f "js/data/curriculum.js" ]; then
    mkdir -p "$APP_DIR/data"
    cp js/data/curriculum.js "$APP_DIR/data/curriculum.js"
    echo "  → модель курса синхронизирована из js/data/curriculum.js"
fi

# config.js — единая точка настройки (URL синхронизации). Копируем в app/,
# чтобы приложение и сайт использовали один и тот же адрес воркера.
if [ -f "js/config.js" ]; then
    cp js/config.js "$APP_DIR/config.js"
    echo "  → config.js синхронизирован из js/config.js"
fi

mkdir -p "$OUT_DIR"
rm -f "$OUT_DIR/$ZIP_NAME"

# Архивируем содержимое app/ (без вложенной папки), чтобы index.html был в корне архива
( cd "$APP_DIR" && zip -r -q "../$OUT_DIR/$ZIP_NAME" . )

SIZE=$(du -h "$OUT_DIR/$ZIP_NAME" | cut -f1)
echo "✅ Готово: $OUT_DIR/$ZIP_NAME ($SIZE)"
echo "   Распакуйте и откройте index.html — работает офлайн на Android, iOS и ПК."
