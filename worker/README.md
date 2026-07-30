# Воркер платформы MedoEDUz

Cloudflare Worker + KV: идентификация через Telegram, прогресс учеников,
оверлей модели курса (правки администратора) и админ-API.

Почему устроено именно так — `docs/ARCHITECTURE-TRIZ.md`.

## Развёртывание одной командой

Бот авторизации: **@ogcyberbot** (id 8674094118).

```bash
bash worker/deploy.sh
```

Скрипт сам: войдёт в Cloudflare, создаст KV, спросит токен бота **скрытым
вводом**, сгенерирует секрет вебхука, задеплоит воркер и подключит вебхук.
Токен нигде не сохраняется — уходит прямо в секреты Cloudflare.

Если хочется вручную:

```bash
cd worker && npm install && npx wrangler login
npx wrangler kv namespace create DATA     # id → wrangler.toml
npx wrangler secret put BOT_TOKEN         # токен @ogcyberbot
npx wrangler secret put WEBHOOK_SECRET    # длинная случайная строка
# свой Telegram user_id → wrangler.toml → vars.ADMIN_IDS (узнать у @userinfobot)
npx wrangler deploy
```

После деплоя пропишите адрес воркера в `js/config.js`:

```js
window.MEDOEDUZ_SYNC_URL = 'https://medoeduz-platform.ВАШ.workers.dev';
```

Пока строка пуста, сайт работает в **демо-режиме**: кабинеты живут на
localStorage браузера и честно пишут об этом.

## Вебхук

`deploy.sh` подключает его сам. Вручную:

```bash
curl "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=https://<воркер>/tg/webhook?s=<WEBHOOK_SECRET>"
```

Команды бота уже зарегистрированы в @BotFather-профиле: `/login` — код входа
в кабинет, `/progress` — краткий прогресс, `/forget` — удалить свои данные,
`/help`.

**Если токен утёк** (например, был отправлен обычным сообщением): отзовите его
в @BotFather → `/mybots` → бот → API Token → Revoke, затем прогоните
`deploy.sh` заново с новым токеном. Старый вебхук перестанет работать сам.

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
