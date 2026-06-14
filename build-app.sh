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

mkdir -p "$OUT_DIR"
rm -f "$OUT_DIR/$ZIP_NAME"

# Архивируем содержимое app/ (без вложенной папки), чтобы index.html был в корне архива
( cd "$APP_DIR" && zip -r -q "../$OUT_DIR/$ZIP_NAME" . )

SIZE=$(du -h "$OUT_DIR/$ZIP_NAME" | cut -f1)
echo "✅ Готово: $OUT_DIR/$ZIP_NAME ($SIZE)"
echo "   Распакуйте и откройте index.html — работает офлайн на Android, iOS и ПК."
