# Воркер платформы MedoEDUz

Cloudflare Worker + KV: идентификация через Telegram, прогресс учеников,
оверлей модели курса (правки администратора) и админ-API.

Почему устроено именно так — `docs/ARCHITECTURE-TRIZ.md`.

## Что нужно один раз

```bash
cd worker
npm install
npx wrangler login

# 1. Хранилище
npx wrangler kv namespace create DATA
# полученный id вписать в wrangler.toml → kv_namespaces.id

# 2. Секреты (в репозиторий НЕ попадают)
npx wrangler secret put BOT_TOKEN        # токен от @BotFather
npx wrangler secret put WEBHOOK_SECRET   # любая длинная случайная строка

# 3. Свой Telegram user_id — в wrangler.toml → vars.ADMIN_IDS
#    Узнать: напишите боту /start после деплоя, id будет в логах,
#    либо спросите у @userinfobot.

# 4. Деплой
npx wrangler deploy
```

После деплоя пропишите адрес воркера в `js/config.js`:

```js
window.MEDOEDUZ_SYNC_URL = 'https://medoeduz-platform.ВАШ.workers.dev';
```

Пока строка пуста, сайт работает в **демо-режиме**: кабинеты живут на
localStorage браузера и честно пишут об этом.

## Подключить вебхук бота

```bash
curl "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=https://<воркер>/tg/webhook?s=<WEBHOOK_SECRET>"
```

Команды бота: `/login` — код входа в кабинет, `/progress` — краткий прогресс,
`/forget` — удалить свои данные с сервера, `/help`.

## Проверка

```bash
node test/run.js       # 41 проверка: подписи, права, оверлей, CORS
curl https://<воркер>/v1/health
```

Тесты гоняют настоящий код воркера на поддельном KV и настоящей
криптографии — без Cloudflare и без сети.

## Что где лежит в KV

| Ключ | Что |
|------|-----|
| `user:<id>` | карточка ученика (id, имя, username, заметка админа) |
| `progress:<id>` | прогресс обучения |
| `index:users` | список идентификаторов (перебор ключей KV дорог) |
| `session:<token>` | сессия, TTL 30 дней |
| `logincode:<code>` | одноразовый код входа, TTL 10 минут |
| `overlay:curriculum` | правки курса поверх базовой модели |
| `overlay:mechanics` | правила геймификации |
| `audit` | журнал изменений, кольцевой на 500 записей |

## Безопасность

- Bot-токен живёт только в секретах воркера и никогда не попадает клиенту.
- `initData` проверяется по HMAC-SHA256 и не принимается старше суток.
- Код входа сгорает после первого использования.
- CORS ограничен списком доменов: `*` здесь недопустим, потому что запросы
  носят сессионный токен.
- **Операции удаления узла в API нет.** Только скрытие: прогресс учеников
  ссылается на узлы по id.
