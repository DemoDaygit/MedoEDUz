#!/bin/bash
# ============================================================
#  Самохостинг шрифтов MedoEDUz
# ============================================================
# Скачивает нужные семейства с Google Fonts (подмножества
# cyrillic + latin) и складывает их в fonts/ вместе с
# локальным fonts.css, где ссылки уже переписаны на локальные.
#
# Зачем: убирает внешнюю зависимость от fonts.googleapis.com
# (сайт перестаёт зависеть от доступности CDN, работает офлайн
# в PWA и не ловит ошибку в консоли при блокировке).
#
# Запуск:  bash tools/fetch-fonts.sh
# ============================================================

set -e

OUT_DIR="fonts"
CSS_OUT="$OUT_DIR/fonts.css"
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"

# Семейства. ВАЖНО: все обязаны поддерживать кириллицу — сайт на русском.
QUERY="family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"

echo "🦡 Загрузка шрифтов для MedoEDUz..."
mkdir -p "$OUT_DIR"

echo "  → получаю CSS с Google Fonts"
curl -sS --max-time 30 -A "$UA" "https://fonts.googleapis.com/css2?${QUERY}" -o "$OUT_DIR/_remote.css"

if [ ! -s "$OUT_DIR/_remote.css" ]; then
    echo "❌ Не удалось получить CSS. Проверьте сеть/прокси."
    exit 1
fi

cp "$OUT_DIR/_remote.css" "$CSS_OUT"

# Скачиваем каждый woff2 и переписываем ссылку на локальную
COUNT=0
for URL in $(grep -o 'https://fonts.gstatic.com/[^)]*\.woff2' "$OUT_DIR/_remote.css" | sort -u); do
    NAME=$(echo "$URL" | sed 's|.*/s/||; s|/|-|g')
    if [ ! -f "$OUT_DIR/$NAME" ]; then
        curl -sS --max-time 30 -o "$OUT_DIR/$NAME" "$URL"
    fi
    # экранируем слэши для sed
    ESC=$(echo "$URL" | sed 's|/|\\/|g')
    sed -i "s/$ESC/$NAME/g" "$CSS_OUT"
    COUNT=$((COUNT + 1))
done

rm -f "$OUT_DIR/_remote.css"

TOTAL=$(du -sh "$OUT_DIR" | cut -f1)
echo "✅ Готово: $COUNT файлов шрифтов, $TOTAL в $OUT_DIR/"
echo "   Подключение: <link rel=\"stylesheet\" href=\"fonts/fonts.css\">"
