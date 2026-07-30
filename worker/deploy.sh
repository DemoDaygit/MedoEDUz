#!/usr/bin/env bash
#
# Разворачивает воркер платформы MedoEDUz и подключает бота.
#
# ТОКЕН НИКУДА НЕ ЗАПИСЫВАЕТСЯ: он читается с клавиатуры (без эха),
# уходит прямо в секреты Cloudflare и в вызов setWebhook. Ни в файл,
# ни в git, ни в историю команд он не попадает.
#
# Запуск:  bash worker/deploy.sh
#
set -euo pipefail
cd "$(dirname "$0")"

BOT_USERNAME="ogcyberbot"

say()  { printf '\n\033[1m%s\033[0m\n' "$*"; }
ok()   { printf '  \033[32m✓\033[0m %s\n' "$*"; }
warn() { printf '  \033[33m!\033[0m %s\n' "$*"; }

say "1/6 · Проверяем инструменты"
command -v npx >/dev/null || { echo "нужен Node.js (npx)"; exit 1; }
ok "npx на месте"

say "2/6 · Вход в Cloudflare"
if npx wrangler whoami >/dev/null 2>&1; then
    ok "уже авторизованы"
else
    warn "откроется браузер для входа в Cloudflare"
    npx wrangler login
fi

say "3/6 · Хранилище KV"
if grep -q 'ЗАМЕНИТЬ_НА_ID_ПОСЛЕ_СОЗДАНИЯ' wrangler.toml; then
    warn "создаём namespace DATA"
    OUT=$(npx wrangler kv namespace create DATA 2>&1 || true)
    echo "$OUT"
    KV_ID=$(printf '%s' "$OUT" | grep -oE '[0-9a-f]{32}' | head -1 || true)
    if [ -z "$KV_ID" ]; then
        warn "не удалось прочитать id автоматически — впишите его в wrangler.toml вручную и запустите скрипт снова"
        exit 1
    fi
    # BSD/GNU sed различаются ключом -i, поэтому пишем через временный файл
    sed "s/ЗАМЕНИТЬ_НА_ID_ПОСЛЕ_СОЗДАНИЯ/$KV_ID/" wrangler.toml > wrangler.toml.tmp
    mv wrangler.toml.tmp wrangler.toml
    ok "namespace создан: $KV_ID"
else
    ok "id хранилища уже прописан"
fi

say "4/6 · Секреты"
echo "  Токен бота @$BOT_USERNAME (ввод скрыт; если вы отзывали токен — вводите НОВЫЙ):"
read -rs BOT_TOKEN
echo
[ -n "$BOT_TOKEN" ] || { echo "пустой токен"; exit 1; }

# Секрет вебхука генерируем сами: человеку его придумывать незачем
WEBHOOK_SECRET=$(head -c 24 /dev/urandom | od -An -tx1 | tr -d ' \n')

printf '%s' "$BOT_TOKEN"      | npx wrangler secret put BOT_TOKEN      >/dev/null
printf '%s' "$WEBHOOK_SECRET" | npx wrangler secret put WEBHOOK_SECRET >/dev/null
ok "секреты записаны в Cloudflare (в репозиторий не попадают)"

say "5/6 · Кто администратор"
ADMIN_IDS=$(grep -E '^ADMIN_IDS' wrangler.toml | sed 's/.*= *"//; s/"//' || true)
if [ -z "$ADMIN_IDS" ]; then
    echo "  Ваш Telegram user_id (узнать: напишите @userinfobot):"
    read -r ADMIN_IDS
    sed "s|^ADMIN_IDS = \"\"|ADMIN_IDS = \"$ADMIN_IDS\"|" wrangler.toml > wrangler.toml.tmp
    mv wrangler.toml.tmp wrangler.toml
fi
ok "администраторы: $ADMIN_IDS"

say "6/6 · Деплой и вебхук"
npx wrangler deploy
WORKER_URL=$(npx wrangler deployments list --json 2>/dev/null | grep -oE 'https://[a-z0-9.-]+workers\.dev' | head -1 || true)
if [ -z "$WORKER_URL" ]; then
    echo "  Адрес воркера (скопируйте из вывода выше, вида https://medoeduz-platform.ВАШ.workers.dev):"
    read -r WORKER_URL
fi

RESP=$(curl -s "https://api.telegram.org/bot$BOT_TOKEN/setWebhook" \
    -d "url=$WORKER_URL/tg/webhook?s=$WEBHOOK_SECRET" \
    -d "allowed_updates=[\"message\"]" \
    -d "drop_pending_updates=true")
echo "$RESP" | grep -q '"ok":true' && ok "вебхук подключён" || { echo "  ответ Telegram: $RESP"; exit 1; }

unset BOT_TOKEN

say "Готово"
echo "  Осталось ОДНО действие — пропишите адрес воркера в js/config.js:"
echo
echo "      window.MEDOEDUZ_SYNC_URL = '$WORKER_URL';"
echo
echo "  и закоммитьте этот файл. До этого сайт работает в демо-режиме."
echo
echo "  Проверка:  curl $WORKER_URL/v1/health"
echo "  Затем напишите боту /login — он выдаст код для входа в кабинет."
