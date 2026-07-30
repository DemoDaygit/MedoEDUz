/**
 * ============================================================
 *  MedoEDUz — реестр нейросетей для ИИ-хаба на главной
 * ============================================================
 *
 *  ФАЙЛ ГЕНЕРИРУЕТСЯ. Хаб отвечает на вопрос ученика «а чем мне
 *  работать?»: раскладывает известные LLM и ИИ-инструменты по СЕМИ
 *  трекам обучения (те же ключи, что в CURRICULUM.TRACKS), по
 *  модальностям и по происхождению.
 *
 *  ЧЕСТНОСТЬ (правило проекта):
 *  - Каждый адрес ОТКРЫВАЛСЯ при сборке. Битая ссылка на витрине
 *    хуже отсутствующей карточки.
 *  - access определён по странице тарифов, а не на глаз:
 *    open = открытый код/веса, freemium = есть бесплатный тариф,
 *    paid = бесплатного тарифа нет.
 *  - origin говорит, КТО ДЕЛАЕТ инструмент. Это не обещание, что он
 *    доступен из вашей страны и оплачивается вашей картой.
 *  - Никаких рейтингов и «лучших»: сборщик отбраковывает такие слова.
 *  - Это не партнёрство и не реклама. Товарные знаки принадлежат их
 *    владельцам; здесь СТИЛИЗОВАННЫЕ векторные метки (GLYPHS в
 *    js/ai-hub.js), а не копии фирменных логотипов.
 *  - Мёд остаётся подписью Медоеда: жёлто-янтарные тона вендорам
 *    запрещены, сборщик их заменяет.
 *
 *  flagship — только для узнаваемых марок: они идут в бегущую ленту.
 */

'use strict';

window.AI_MODELS = (function () {
    // ---------- Модальности (по чему фильтруем во вторую очередь) ----------
    const CATS = {
            "chat": {
                    "ru": "Чат-ассистент",
                    "en": "Chat assistant"
            },
            "code": {
                    "ru": "Код",
                    "en": "Coding"
            },
            "agent": {
                    "ru": "Агенты",
                    "en": "Agents"
            },
            "research": {
                    "ru": "Поиск и ресёрч",
                    "en": "Search & research"
            },
            "memory": {
                    "ru": "Память и RAG",
                    "en": "Memory & RAG"
            },
            "eval": {
                    "ru": "Эвалы и наблюдаемость",
                    "en": "Evals & observability"
            },
            "security": {
                    "ru": "Безопасность",
                    "en": "Security"
            },
            "automation": {
                    "ru": "Автоматизация",
                    "en": "Automation"
            },
            "image": {
                    "ru": "Изображения",
                    "en": "Images"
            },
            "video": {
                    "ru": "Видео",
                    "en": "Video"
            },
            "audio": {
                    "ru": "Аудио и голос",
                    "en": "Audio & voice"
            },
            "local": {
                    "ru": "Локально / веса",
                    "en": "Local / weights"
            }
    };

    // ---------- Доступность (честная метка, без цен) ----------
    const ACCESS = {
            "freemium": {
                    "ru": "Есть бесплатный тариф",
                    "en": "Free tier",
                    "short": {
                            "ru": "free",
                            "en": "free"
                    }
            },
            "open": {
                    "ru": "Открытые веса / OSS",
                    "en": "Open weights / OSS",
                    "short": {
                            "ru": "open",
                            "en": "open"
                    }
            },
            "paid": {
                    "ru": "Платный доступ",
                    "en": "Paid",
                    "short": {
                            "ru": "paid",
                            "en": "paid"
                    }
            }
    };

    // ---------- Происхождение ----------
    // Отвечает на вопрос «кто делает», а НЕ «работает ли это у вас
    // без VPN и зарубежной карты»: доступность меняется чаще, чем мы
    // успеваем её проверять, и обещать её на витрине нельзя.
    const ORIGINS = {
        ru: { ru: 'Россия', en: 'Russia' },
        cn: { ru: 'Китай', en: 'China' },
        global: { ru: 'Мировые', en: 'Global' },
    };

    // ---------- Реестр ----------
    // brand — тон стилизованной метки; glyph — id формы из GLYPHS.
    const LIST = [
        {
            id: "chatgpt", name: "ChatGPT", vendor: "OpenAI",
            glyph: "ring", brand: "#10A37F", url: "https://chatgpt.com",
            origin: "global",
            cats: ["chat","code","image","audio","research"],
            tracks: ["generalist","developer","ai-analyst","agent-architect"],
            access: "freemium",
            flagship: true,
            tagline: {
                ru: "Универсальный ассистент: текст, код, голос и картинки в одном окне.",
                en: "All-round assistant: text, code, voice, and images in one place.",
            },
        },
        {
            id: "claude", name: "Claude", vendor: "Anthropic",
            glyph: "spark", brand: "#C86C4A", url: "https://claude.ai",
            origin: "global",
            cats: ["chat","code","agent"],
            tracks: ["generalist","developer","agent-architect","memory-eng","security-eng","quant"],
            access: "freemium",
            flagship: true,
            tagline: {
                ru: "Длинный контекст и аккуратный код; силён в рассуждении и работе с документами.",
                en: "Long context and careful code; strong at reasoning and working over documents.",
            },
        },
        {
            id: "gemini", name: "Gemini", vendor: "Google",
            glyph: "gem", brand: "#3E7BF6", url: "https://gemini.google.com",
            origin: "global",
            cats: ["chat","code","image","research"],
            tracks: ["generalist","developer","ai-analyst"],
            access: "freemium",
            flagship: true,
            tagline: {
                ru: "Мультимодальность и большое контекстное окно, связка с сервисами Google.",
                en: "Multimodal with a large context window, tied into Google services.",
            },
        },
        {
            id: "copilot", name: "GitHub Copilot", vendor: "GitHub",
            glyph: "chevrons", brand: "#4C8DFF", url: "https://github.com/features/copilot",
            origin: "global",
            cats: ["code","agent"],
            tracks: ["developer"],
            access: "freemium",
            flagship: true,
            tagline: {
                ru: "Автодополнение и агент прямо в редакторе кода и в pull request.",
                en: "Autocomplete and an agent right in your editor and pull requests.",
            },
        },
        {
            id: "cursor", name: "Cursor", vendor: "Anysphere",
            glyph: "caret", brand: "#6E7BFF", url: "https://cursor.com",
            origin: "global",
            cats: ["code","agent"],
            tracks: ["developer","agent-architect"],
            access: "freemium",
            flagship: true,
            tagline: {
                ru: "Редактор кода, построенный вокруг ИИ-агента: правки по всей кодовой базе.",
                en: "A code editor built around an AI agent: changes across the whole codebase.",
            },
        },
        {
            id: "llama", name: "Llama", vendor: "Meta",
            glyph: "layers", brand: "#4A6DF0", url: "https://www.llama.com",
            origin: "global",
            cats: ["chat","code","local"],
            tracks: ["developer","memory-eng","security-eng","quant"],
            access: "open",
            flagship: true,
            tagline: {
                ru: "Открытые веса: разворачиваете у себя, дообучаете, держите данные при себе.",
                en: "Open weights: self-host, fine-tune, and keep your data in-house.",
            },
        },
        {
            id: "mistral", name: "Mistral · Le Chat", vendor: "Mistral AI",
            glyph: "pixel", brand: "#E9642A", url: "https://mistral.ai",
            origin: "global",
            cats: ["chat","code","local"],
            tracks: ["generalist","developer","memory-eng","security-eng"],
            access: "open",
            flagship: true,
            tagline: {
                ru: "Быстрые европейские модели, часть — с открытыми весами для локального запуска.",
                en: "Fast European models, several with open weights for local use.",
            },
        },
        {
            id: "deepseek", name: "DeepSeek", vendor: "DeepSeek",
            glyph: "orbit", brand: "#4D6BFE", url: "https://www.deepseek.com",
            origin: "cn",
            cats: ["chat","code","local"],
            tracks: ["developer","memory-eng","quant","security-eng"],
            access: "open",
            flagship: true,
            tagline: {
                ru: "Сильные рассуждающие модели с открытыми весами и низкой ценой инференса.",
                en: "Strong reasoning models with open weights and low inference cost.",
            },
        },
        {
            id: "qwen", name: "Qwen", vendor: "Alibaba",
            glyph: "petals", brand: "#615CED", url: "https://chat.qwen.ai",
            origin: "cn",
            cats: ["chat","code","local"],
            tracks: ["developer","memory-eng","quant"],
            access: "open",
            flagship: true,
            tagline: {
                ru: "Открытое многоязычное семейство моделей: чат, код и работа с длинным контекстом.",
                en: "Open multilingual model family: chat, code, and long-context work.",
            },
        },
        {
            id: "grok", name: "Grok", vendor: "xAI",
            glyph: "comet", brand: "#7A8699", url: "https://x.ai",
            origin: "global",
            cats: ["chat","research"],
            tracks: ["generalist","ai-analyst"],
            access: "freemium",
            flagship: true,
            tagline: {
                ru: "Чат с доступом к ленте X в реальном времени — полезно для свежих событий.",
                en: "Chat with real-time access to the X feed — handy for breaking topics.",
            },
        },
        {
            id: "perplexity", name: "Perplexity", vendor: "Perplexity",
            glyph: "loop", brand: "#20B8CD", url: "https://www.perplexity.ai",
            origin: "global",
            cats: ["research","chat"],
            tracks: ["generalist","ai-analyst","quant"],
            access: "freemium",
            flagship: true,
            tagline: {
                ru: "Поисковый движок с ответами и ссылками на первоисточники — ресёрч без выдумок.",
                en: "An answer engine with cited sources — research without made-up facts.",
            },
        },
        {
            id: "huggingface", name: "Hugging Face", vendor: "Hugging Face",
            glyph: "hub", brand: "#FF6F43", url: "https://huggingface.co",
            origin: "global",
            cats: ["local","code","agent"],
            tracks: ["developer","memory-eng","ai-analyst","agent-architect","security-eng"],
            access: "open",
            flagship: true,
            tagline: {
                ru: "Хаб открытых моделей, датасетов и демо — отсюда берут веса для своих задач.",
                en: "A hub of open models, datasets, and demos — where you grab weights to build on.",
            },
        },
        {
            id: "langchain", name: "LangChain · LangGraph", vendor: "LangChain",
            glyph: "chain", brand: "#1F9E7A", url: "https://www.langchain.com",
            origin: "global",
            cats: ["agent","code"],
            tracks: ["agent-architect","developer","memory-eng"],
            access: "open",
            tagline: {
                ru: "Фреймворк для агентных пайплайнов, памяти и оркестрации инструментов.",
                en: "Framework for agent pipelines, memory, and tool orchestration.",
            },
        },
        {
            id: "cohere", name: "Cohere", vendor: "Cohere",
            glyph: "shield", brand: "#7D5CE0", url: "https://cohere.com",
            origin: "global",
            cats: ["chat","code","research"],
            tracks: ["developer","ai-analyst","memory-eng"],
            access: "freemium",
            tagline: {
                ru: "Модели для бизнеса: поиск, RAG и эмбеддинги с упором на приватность.",
                en: "Enterprise models: search, RAG, and embeddings with a privacy focus.",
            },
        },
        {
            id: "stable-diffusion", name: "Stable Diffusion", vendor: "Stability AI",
            glyph: "venn", brand: "#8A63D2", url: "https://stability.ai",
            origin: "global",
            cats: ["image","local"],
            tracks: ["generalist","developer"],
            access: "open",
            flagship: true,
            tagline: {
                ru: "Открытая генерация изображений — можно запускать локально и встраивать в свой продукт.",
                en: "Open image generation — run it locally and embed it in your own product.",
            },
        },
        {
            id: "midjourney", name: "Midjourney", vendor: "Midjourney",
            glyph: "prism", brand: "#5560D6", url: "https://www.midjourney.com",
            origin: "global",
            cats: ["image"],
            tracks: ["generalist"],
            access: "paid",
            flagship: true,
            tagline: {
                ru: "Один из лидеров художественной генерации изображений по текстовому описанию.",
                en: "A leader in artistic text-to-image generation.",
            },
        },
        {
            id: "runway", name: "Runway", vendor: "Runway",
            glyph: "film", brand: "#5A8DEE", url: "https://runwayml.com",
            origin: "global",
            cats: ["video"],
            tracks: ["generalist"],
            access: "paid",
            tagline: {
                ru: "Генерация и монтаж видео по тексту и картинке — для роликов и раскадровок.",
                en: "Text- and image-to-video generation and editing — for clips and storyboards.",
            },
        },
        {
            id: "elevenlabs", name: "ElevenLabs", vendor: "ElevenLabs",
            glyph: "waveform", brand: "#5B72E0", url: "https://elevenlabs.io",
            origin: "global",
            cats: ["audio"],
            tracks: ["generalist"],
            access: "freemium",
            flagship: true,
            tagline: {
                ru: "Реалистичный синтез речи и озвучка на многих языках, включая русский.",
                en: "Realistic speech synthesis and voice-over in many languages, including Russian.",
            },
        },
        {
            id: "gemini-notebook", name: "Gemini Notebook", vendor: "Google",
            glyph: "notebook", brand: "#4285F4", url: "https://notebooklm.google",
            origin: "global",
            cats: ["research","audio","code"],
            tracks: ["generalist"],
            access: "freemium",
            flagship: true,
            tagline: {
                ru: "Загружаешь свои документы — получаешь ответы со ссылками на источники, аудиообзор и запуск кода.",
                en: "Upload your own documents to get sourced answers, audio overviews and in-notebook code execution.",
            },
        },
        {
            id: "notion-ai", name: "Notion AI", vendor: "Notion Labs, Inc.",
            glyph: "stack", brand: "#8F8B85", url: "https://www.notion.com/product/ai",
            origin: "global",
            cats: ["agent","automation","research"],
            tracks: ["generalist"],
            access: "freemium",
            tagline: {
                ru: "ИИ внутри рабочего пространства: агенты по расписанию, поиск по Slack и Drive, конспекты встреч.",
                en: "AI inside your workspace: scheduled agents, search across Slack and Drive, automatic meeting notes.",
            },
        },
        {
            id: "deepl", name: "DeepL", vendor: "DeepL SE",
            glyph: "prism", brand: "#1E5EFF", url: "https://www.deepl.com",
            origin: "global",
            cats: ["automation","audio"],
            tracks: ["generalist","developer"],
            access: "freemium",
            tagline: {
                ru: "Перевод текста и документов с сохранением вёрстки, 100+ языков, есть API и бесплатный уровень.",
                en: "Translates text and documents while keeping layout, 100+ languages, with an API and a free tier.",
            },
        },
        {
            id: "claude-code", name: "Claude Code", vendor: "Anthropic",
            glyph: "terminal", brand: "#D97757", url: "https://claude.com/product/claude-code",
            origin: "global",
            cats: ["code","agent","automation"],
            tracks: ["developer","agent-architect"],
            access: "paid",
            flagship: true,
            tagline: {
                ru: "Агент для кода в терминале, IDE и веб: читает репозиторий, правит файлы, гоняет тесты и коммиты.",
                en: "Coding agent in terminal, IDE and web: reads the repo, edits files, runs tests and commits.",
            },
        },
        {
            id: "openai-codex", name: "Codex", vendor: "OpenAI",
            glyph: "loop", brand: "#10A37F", url: "https://github.com/openai/codex",
            origin: "global",
            cats: ["code","agent","automation"],
            tracks: ["developer","agent-architect"],
            access: "freemium",
            tagline: {
                ru: "Агент пишет и правит код в CLI, IDE и облаке; исходники CLI открыты под Apache-2.0.",
                en: "Agent writes and edits code in the CLI, IDE and cloud; the CLI source is open under Apache-2.0.",
            },
        },
        {
            id: "replit", name: "Replit", vendor: "Replit, Inc.",
            glyph: "cube", brand: "#FF3C00", url: "https://replit.com",
            origin: "global",
            cats: ["code","agent"],
            tracks: ["generalist","developer"],
            access: "freemium",
            tagline: {
                ru: "Облачная среда с ИИ-агентом: описываешь приложение словами — он пишет код, поднимает базу и хостинг.",
                en: "Cloud IDE with an AI agent: describe an app in words, it writes code and sets up database and hosting.",
            },
        },
        {
            id: "lovable", name: "Lovable", vendor: "Lovable",
            glyph: "spark", brand: "#FF66F4", url: "https://lovable.dev",
            origin: "global",
            cats: ["code","agent"],
            tracks: ["generalist","developer"],
            access: "freemium",
            tagline: {
                ru: "Делает приложение или сайт по переписке с ИИ: правки в диалоге и публикация в один клик.",
                en: "Builds an app or site through a chat with AI: iterate in dialogue, publish in one click.",
            },
        },
        {
            id: "v0", name: "v0", vendor: "Vercel",
            glyph: "layers", brand: "#0070F3", url: "https://v0.app",
            origin: "global",
            cats: ["code","agent"],
            tracks: ["generalist","developer"],
            access: "freemium",
            tagline: {
                ru: "Генерирует интерфейс и фулстек-приложение из описания и публикует на Vercel одной кнопкой.",
                en: "Generates UI and full-stack apps from a prompt and publishes them to Vercel in one click.",
            },
        },
        {
            id: "n8n", name: "n8n", vendor: "n8n GmbH",
            glyph: "flow", brand: "#EA4B71", url: "https://n8n.io",
            origin: "global",
            cats: ["automation","agent"],
            tracks: ["generalist","developer","agent-architect"],
            access: "open",
            tagline: {
                ru: "Визуальный конструктор рабочих процессов и агентов: 1500+ интеграций, вставки на JS/Python, self-hosting.",
                en: "Visual builder for workflows and AI agents: 1500+ integrations, JS/Python steps, self-hosting.",
            },
        },
        {
            id: "model-context-protocol", name: "Model Context Protocol", vendor: "LF Projects · Anthropic",
            glyph: "plug", brand: "#6E7B91", url: "https://modelcontextprotocol.io",
            origin: "global",
            cats: ["agent","automation"],
            tracks: ["generalist","developer","agent-architect","security-eng"],
            access: "open",
            tagline: {
                ru: "Открытый стандарт подключения моделей к данным и инструментам: один сервер работает во всех клиентах.",
                en: "Open standard connecting models to data and tools: write one server, use it across MCP clients.",
            },
        },
        {
            id: "llamaindex", name: "LlamaIndex", vendor: "LlamaIndex, Inc.",
            glyph: "tree", brand: "#FF8DF2", url: "https://www.llamaindex.ai",
            origin: "global",
            cats: ["memory","agent","research"],
            tracks: ["developer","memory-eng"],
            access: "open",
            tagline: {
                ru: "Открытый фреймворк и сервис разбора документов: индексы, поиск и агенты над PDF, таблицами и схемами.",
                en: "Open-source framework plus document parsing service: indexes, retrieval and agents over PDFs and tables.",
            },
        },
        {
            id: "pinecone", name: "Pinecone", vendor: "Pinecone",
            glyph: "radar", brand: "#002BFF", url: "https://www.pinecone.io",
            origin: "global",
            cats: ["memory"],
            tracks: ["memory-eng","developer"],
            access: "freemium",
            tagline: {
                ru: "Управляемая векторная база: поиск по эмбеддингам без своей инфраструктуры, есть бесплатный тариф.",
                en: "Managed vector database for embedding search with no infrastructure to run; free Starter tier.",
            },
        },
        {
            id: "langsmith", name: "LangSmith", vendor: "LangChain, Inc.",
            glyph: "graph", brand: "#006DDD", url: "https://www.langchain.com/langsmith",
            origin: "global",
            cats: ["eval","agent"],
            tracks: ["developer","agent-architect","ai-analyst","quant"],
            access: "freemium",
            tagline: {
                ru: "Трассировка, оценка и мониторинг LLM-приложений и агентов: видно каждый шаг, его цену и задержку.",
                en: "Tracing, evaluation and monitoring for LLM apps and agents: see every step, its cost and its latency.",
            },
        },
        {
            id: "whisper", name: "Whisper", vendor: "OpenAI",
            glyph: "waveform", brand: "#10A37F", url: "https://github.com/openai/whisper",
            origin: "global",
            cats: ["audio","local"],
            tracks: ["generalist","developer"],
            access: "open",
            tagline: {
                ru: "Многоязычное распознавание речи: код и веса под MIT, работает локально и офлайн.",
                en: "Multilingual speech recognition; MIT-licensed code and weights run locally, offline.",
            },
        },
        {
            id: "suno", name: "Suno", vendor: "Suno, Inc.",
            glyph: "music", brand: "#8E8B99", url: "https://suno.com",
            origin: "global",
            cats: ["audio"],
            tracks: ["generalist"],
            access: "freemium",
            tagline: {
                ru: "Собирает песню с вокалом, текстом и аранжировкой по описанию; 10 треков в день бесплатно.",
                en: "Builds a full song with vocals, lyrics and instrumentation from a text prompt; 10 free a day.",
            },
        },
        {
            id: "flux", name: "FLUX", vendor: "Black Forest Labs",
            glyph: "gem", brand: "#E0DDFF", url: "https://bfl.ai",
            origin: "global",
            cats: ["image","local"],
            tracks: ["generalist","developer"],
            access: "open",
            tagline: {
                ru: "Генерация и правка изображений по тексту; веса FLUX.2 [klein] 4B открыты по Apache 2.0.",
                en: "Text-to-image generation and editing; FLUX.2 [klein] 4B weights are open under Apache 2.0.",
            },
        },
        {
            id: "kling-ai", name: "Kling AI", vendor: "Kuaishou Technology",
            glyph: "film", brand: "#74FF52", url: "https://kling.ai",
            origin: "cn",
            cats: ["video","image"],
            tracks: ["generalist"],
            access: "freemium",
            tagline: {
                ru: "Делает видео по тексту или по кадру-картинке: контроль движения, звук, 4K; работает в браузере.",
                en: "Generates video from text or a still image with motion control, audio and 4K, in the browser.",
            },
        },
        {
            id: "comfyui", name: "ComfyUI", vendor: "Comfy Org",
            glyph: "grid", brand: "#AEE02A", url: "https://www.comfy.org",
            origin: "global",
            cats: ["image","video","local","automation"],
            tracks: ["generalist","developer"],
            access: "open",
            tagline: {
                ru: "Узловой конструктор пайплайнов для картинок и видео; GPL-3.0, работает офлайн на своём железе.",
                en: "Node-based pipeline builder for image and video models; GPL-3.0, runs offline on your own GPU.",
            },
        },
        {
            id: "ollama", name: "Ollama", vendor: "Ollama Inc.",
            glyph: "vault", brand: "#A8ADBD", url: "https://ollama.com",
            origin: "global",
            cats: ["local","chat"],
            tracks: ["generalist","developer"],
            access: "open",
            tagline: {
                ru: "Запускает открытые модели локально одной командой; работает офлайн, есть облачный режим.",
                en: "Runs open models locally with one command; works offline, with an optional cloud mode.",
            },
        },
        {
            id: "groq", name: "Groq", vendor: "Groq, Inc.",
            glyph: "bolt", brand: "#F55036", url: "https://groq.com",
            origin: "global",
            cats: ["chat","agent"],
            tracks: ["developer","agent-architect"],
            access: "freemium",
            tagline: {
                ru: "Облачный вывод открытых моделей на собственных чипах LPU, API совместим с OpenAI.",
                en: "Cloud inference for open models on its own LPU chips, with an OpenAI-compatible API.",
            },
        },
        {
            id: "kaggle", name: "Kaggle", vendor: "Google",
            glyph: "target", brand: "#008ABC", url: "https://www.kaggle.com",
            origin: "global",
            cats: ["research","eval","code"],
            tracks: ["generalist","developer","ai-analyst","quant"],
            access: "freemium",
            tagline: {
                ru: "Площадка датасетов, ноутбуков с GPU, соревнований и открытых бенчмарков для проверки моделей.",
                en: "Datasets, GPU notebooks, competitions and open benchmarks for stress-testing models and agents.",
            },
        },
        {
            id: "google-colab", name: "Google Colab", vendor: "Google",
            glyph: "beaker", brand: "#B45309", url: "https://colab.research.google.com",
            origin: "global",
            cats: ["code","research","agent"],
            tracks: ["generalist","developer","ai-analyst","quant"],
            access: "freemium",
            tagline: {
                ru: "Jupyter-ноутбуки в браузере с бесплатным доступом к GPU и TPU и ИИ-подсказками в коде.",
                en: "Browser-based Jupyter notebooks with free GPU and TPU access plus AI code assistance.",
            },
        },
        {
            id: "gamma", name: "Gamma", vendor: "Gamma",
            glyph: "palette", brand: "#7B61FF", url: "https://gamma.app",
            origin: "global",
            cats: ["automation","image"],
            tracks: ["generalist"],
            access: "freemium",
            tagline: {
                ru: "Из промпта или заметок собирает презентацию, документ или сайт с готовым оформлением.",
                en: "Turns a prompt or rough notes into a formatted deck, document or website you can publish.",
            },
        },
        {
            id: "bolt-new", name: "Bolt.new", vendor: "StackBlitz",
            glyph: "comet", brand: "#1488FC", url: "https://bolt.new",
            origin: "global",
            cats: ["code","agent"],
            tracks: ["generalist","developer"],
            access: "freemium",
            tagline: {
                ru: "Собирает и хостит веб-приложение по описанию прямо в браузере: код, база, авторизация, деплой.",
                en: "Builds and hosts a web app from a description right in the browser: code, database, auth, deploy.",
            },
        },
        {
            id: "devin-desktop", name: "Devin Desktop", vendor: "Cognition",
            glyph: "hub", brand: "#317CFF", url: "https://devin.ai/desktop",
            origin: "global",
            cats: ["code","agent"],
            tracks: ["developer","agent-architect"],
            access: "freemium",
            tagline: {
                ru: "IDE от Cognition, где несколько кодовых агентов ведутся как задачи: план, делегирование, ревью.",
                en: "IDE from Cognition where several coding agents are run as tracked tasks: plan, delegate, review.",
            },
        },
        {
            id: "cline", name: "Cline", vendor: "Cline Bot Inc.",
            glyph: "plug", brand: "#9F58FA", url: "https://cline.bot",
            origin: "global",
            cats: ["code","agent","local"],
            tracks: ["developer","agent-architect"],
            access: "open",
            tagline: {
                ru: "Открытый агент (Apache 2.0) в VS Code и терминале: правит файлы, запускает команды, ключи свои.",
                en: "Open-source agent (Apache 2.0) in VS Code and the terminal: edits files, runs commands, your own keys.",
            },
        },
        {
            id: "aider", name: "Aider", vendor: "Aider-AI",
            glyph: "terminal", brand: "#4C6EF5", url: "https://aider.chat",
            origin: "global",
            cats: ["code","agent","local"],
            tracks: ["developer"],
            access: "open",
            tagline: {
                ru: "Терминальный парный программист с открытым кодом: правит файлы репозитория и сам делает git-коммиты.",
                en: "Open-source pair programmer in the terminal: edits repo files and makes git commits itself.",
            },
        },
        {
            id: "jetbrains-ai-assistant", name: "JetBrains AI Assistant", vendor: "JetBrains",
            glyph: "wand", brand: "#FE315D", url: "https://www.jetbrains.com/ai-ides/",
            origin: "global",
            cats: ["code","chat"],
            tracks: ["developer"],
            access: "freemium",
            tagline: {
                ru: "ИИ в IDE от JetBrains: дополнение кода, чат по проекту, объяснения и сообщения коммитов.",
                en: "AI inside JetBrains IDEs: code completion, project-aware chat, explanations, commit messages.",
            },
        },
        {
            id: "amazon-q-developer", name: "Amazon Q Developer", vendor: "Amazon Web Services (AWS)",
            glyph: "cube", brand: "#527FFF", url: "https://aws.amazon.com/q/developer/",
            origin: "global",
            cats: ["code","agent","chat"],
            tracks: ["developer"],
            access: "freemium",
            tagline: {
                ru: "Помощник AWS в IDE и CLI: генерация кода, тесты, ревью и обновление legacy-кода.",
                en: "AWS assistant in IDE and CLI: code generation, tests, code review and legacy code upgrades.",
            },
        },
        {
            id: "sourcegraph-cody", name: "Cody", vendor: "Sourcegraph",
            glyph: "graph", brand: "#A112FF", url: "https://sourcegraph.com/docs/cody",
            origin: "global",
            cats: ["code","chat"],
            tracks: ["developer"],
            access: "paid",
            tagline: {
                ru: "Ассистент по коду с контекстом индексированной кодовой базы; в IDE и веб-приложении.",
                en: "Code assistant grounded in your indexed codebase context; works in IDEs and the web app.",
            },
        },
        {
            id: "tabnine", name: "Tabnine", vendor: "Tabnine",
            glyph: "chevrons", brand: "#1A73E8", url: "https://www.tabnine.com/",
            origin: "global",
            cats: ["code","agent","local"],
            tracks: ["developer"],
            access: "paid",
            tagline: {
                ru: "Дополнение кода, чат и агенты в IDE и CLI; ставится в облаке, on-prem или в изолированной сети.",
                en: "Code completion, chat and agents in IDE and CLI; runs as SaaS, on-prem or fully air-gapped.",
            },
        },
        {
            id: "crewai", name: "CrewAI", vendor: "CrewAI, Inc.",
            glyph: "orbit", brand: "#EB6658", url: "https://www.crewai.com",
            origin: "global",
            cats: ["agent","automation"],
            tracks: ["developer","agent-architect"],
            access: "open",
            tagline: {
                ru: "Python-фреймворк с открытым кодом: собирает команды агентов и событийные потоки под рабочую задачу.",
                en: "Open-source Python framework for assembling teams of agents and event-driven flows for real tasks.",
            },
        },
        {
            id: "microsoft-agent-framework", name: "Microsoft Agent Framework", vendor: "Microsoft",
            glyph: "chain", brand: "#0078D4", url: "https://learn.microsoft.com/en-us/agent-framework/",
            origin: "global",
            cats: ["agent","automation"],
            tracks: ["developer","agent-architect"],
            access: "open",
            tagline: {
                ru: "Открытый SDK Microsoft: агенты и графовые мультиагентные сценарии на .NET, Python и Go.",
                en: "Microsoft's open-source SDK for agents and graph-based multi-agent workflows in .NET, Python and Go.",
            },
        },
        {
            id: "openai-agents-sdk", name: "OpenAI Agents SDK", vendor: "OpenAI",
            glyph: "loop", brand: "#10A37F", url: "https://openai.github.io/openai-agents-python/",
            origin: "global",
            cats: ["agent","automation"],
            tracks: ["developer","agent-architect"],
            access: "open",
            tagline: {
                ru: "Открытый Python-SDK от OpenAI: агентный цикл, передача задач между агентами, ограничители, трассировка.",
                en: "OpenAI's open-source SDK with an agent loop, handoffs, guardrails and built-in tracing.",
            },
        },
        {
            id: "qdrant", name: "Qdrant", vendor: "Qdrant",
            glyph: "gem", brand: "#8547FF", url: "https://qdrant.tech",
            origin: "global",
            cats: ["memory","local"],
            tracks: ["memory-eng","developer"],
            access: "open",
            tagline: {
                ru: "Векторная база на Rust: поиск похожих эмбеддингов с фильтрами, открытый код, можно поднять у себя.",
                en: "Rust vector database for filtered similarity search over embeddings; open source, self-hostable.",
            },
        },
        {
            id: "chroma", name: "Chroma", vendor: "Chroma",
            glyph: "prism", brand: "#1E88FF", url: "https://www.trychroma.com",
            origin: "global",
            cats: ["memory","local"],
            tracks: ["memory-eng","developer"],
            access: "open",
            tagline: {
                ru: "Открытая база для поиска по эмбеддингам, тексту и метаданным; запускается локально одной строкой.",
                en: "Open-source search engine for embeddings, full-text and metadata; runs locally.",
            },
        },
        {
            id: "weaviate", name: "Weaviate", vendor: "Weaviate",
            glyph: "venn", brand: "#43E2C5", url: "https://weaviate.io",
            origin: "global",
            cats: ["memory","agent","local"],
            tracks: ["memory-eng","developer","agent-architect"],
            access: "open",
            tagline: {
                ru: "Открытая векторная база: хранит объекты вместе с векторами, встроенные эмбеддинги для RAG.",
                en: "Open-source vector database that stores objects with their vectors, with built-in embeddings.",
            },
        },
        {
            id: "pgvector", name: "pgvector", vendor: "pgvector (Andrew Kane)",
            glyph: "plug", brand: "#336791", url: "https://github.com/pgvector/pgvector",
            origin: "global",
            cats: ["memory","local"],
            tracks: ["memory-eng","developer"],
            access: "open",
            tagline: {
                ru: "Расширение PostgreSQL: векторный поиск рядом с обычными данными, без отдельной базы.",
                en: "PostgreSQL extension for vector similarity search next to your existing data, no separate database.",
            },
        },
        {
            id: "mem0", name: "Mem0", vendor: "Mem0 (mem0ai)",
            glyph: "brain", brand: "#5C6B8A", url: "https://mem0.ai",
            origin: "global",
            cats: ["memory","agent"],
            tracks: ["memory-eng","agent-architect","developer"],
            access: "open",
            tagline: {
                ru: "Слой долговременной памяти для агентов: сохраняет факты о пользователе между сессиями.",
                en: "Long-term memory layer for AI agents: stores and recalls user facts across sessions.",
            },
        },
        {
            id: "langfuse", name: "Langfuse", vendor: "Langfuse GmbH",
            glyph: "pulse", brand: "#8A80E6", url: "https://langfuse.com",
            origin: "global",
            cats: ["eval","agent","local"],
            tracks: ["developer","agent-architect","ai-analyst"],
            access: "open",
            tagline: {
                ru: "Открытая платформа наблюдаемости LLM: трассы, версии промптов и оценки, можно развернуть у себя.",
                en: "Open-source LLM observability: traces, prompt versioning and evals, self-hostable on your own infra.",
            },
        },
        {
            id: "ragas", name: "Ragas", vendor: "Vibrant Labs AI",
            glyph: "beaker", brand: "#E2703A", url: "https://www.ragas.io",
            origin: "global",
            cats: ["eval","code"],
            tracks: ["ai-analyst","memory-eng","developer"],
            access: "open",
            tagline: {
                ru: "Библиотека метрик для оценки RAG и LLM-приложений: точность контекста, достоверность, тест-наборы.",
                en: "Metrics library for evaluating RAG and LLM apps: context precision, faithfulness, synthetic test sets.",
            },
        },
        {
            id: "wandb-weave", name: "W&B Weave", vendor: "Weights & Biases",
            glyph: "gauge", brand: "#C0700A", url: "https://wandb.ai/site/weave",
            origin: "global",
            cats: ["eval","agent"],
            tracks: ["ai-analyst","developer","agent-architect"],
            access: "freemium",
            tagline: {
                ru: "Трассировка и оценка агентов от Weights & Biases: логи вызовов, скореры, песочница промптов.",
                en: "Agent tracing and evaluation from Weights & Biases: call logs, scorers and a prompt playground.",
            },
        },
        {
            id: "arize-phoenix", name: "Arize Phoenix", vendor: "Arize AI",
            glyph: "eye", brand: "#009DD2", url: "https://arize.com/phoenix",
            origin: "global",
            cats: ["eval","agent","local"],
            tracks: ["ai-analyst","developer","agent-architect"],
            access: "open",
            tagline: {
                ru: "Открытая локальная платформа трассировки и оценки агентов на OpenTelemetry, разворачивается у себя.",
                en: "Open-source, local-first tracing and evaluation for agents, built on OpenTelemetry and self-hosted.",
            },
        },
        {
            id: "deepeval", name: "DeepEval", vendor: "Confident AI",
            glyph: "target", brand: "#6D28D9", url: "https://deepeval.com",
            origin: "global",
            cats: ["eval","code"],
            tracks: ["ai-analyst","developer"],
            access: "open",
            tagline: {
                ru: "Открытый фреймворк оценки LLM на pytest: 50+ метрик и регрессионные тесты в CI/CD.",
                en: "Open-source pytest-native LLM eval framework: 50+ metrics and regression tests in CI/CD.",
            },
        },
        {
            id: "garak", name: "garak", vendor: "NVIDIA",
            glyph: "radar", brand: "#76B900", url: "https://github.com/NVIDIA/garak",
            origin: "global",
            cats: ["security","eval","local"],
            tracks: ["security-eng","ai-analyst","developer"],
            access: "open",
            tagline: {
                ru: "Сканер уязвимостей LLM: прогоняет промпт-инъекции, джейлбрейки и утечки данных и выдаёт отчёт.",
                en: "LLM vulnerability scanner that probes for prompt injection, jailbreaks and data leakage, then reports.",
            },
        },
        {
            id: "pyrit", name: "PyRIT", vendor: "Microsoft",
            glyph: "bolt", brand: "#0078D4", url: "https://github.com/microsoft/PyRIT",
            origin: "global",
            cats: ["security","eval","local"],
            tracks: ["security-eng","ai-analyst","developer"],
            access: "open",
            tagline: {
                ru: "Фреймворк ред-тиминга генеративного ИИ: автоматизирует атаки на модель и собирает результаты.",
                en: "Red-teaming framework for generative AI that automates attacks on a model and scores the results.",
            },
        },
        {
            id: "llama-guard", name: "Llama Guard", vendor: "Meta",
            glyph: "shield", brand: "#0064E0", url: "https://developer.meta.com/ai/llama-protections/",
            origin: "global",
            cats: ["security","local"],
            tracks: ["security-eng","developer","agent-architect"],
            access: "open",
            tagline: {
                ru: "Классификатор безопасности: проверяет запросы и ответы модели по 14 категориям риска, открытые веса.",
                en: "Safety classifier that checks prompts and model replies against 14 hazard categories; open weights.",
            },
        },
        {
            id: "nemo-guardrails", name: "NeMo Guardrails", vendor: "NVIDIA",
            glyph: "flow", brand: "#76B900", url: "https://github.com/NVIDIA-NeMo/Guardrails",
            origin: "global",
            cats: ["security","agent","local"],
            tracks: ["security-eng","agent-architect","developer"],
            access: "open",
            tagline: {
                ru: "Программируемые рельсы для LLM-приложений: фильтры входа, выхода и диалога описываются на Colang.",
                en: "Programmable rails for LLM apps: input, output and dialog filters described in the Colang language.",
            },
        },
        {
            id: "guardrails-ai", name: "Guardrails AI", vendor: "Guardrails AI",
            glyph: "layers", brand: "#0E7490", url: "https://www.guardrailsai.com/",
            origin: "global",
            cats: ["security","code","local"],
            tracks: ["security-eng","developer","agent-architect"],
            access: "open",
            tagline: {
                ru: "Python-фреймворк проверок ввода и вывода LLM: готовые валидаторы из хаба и структурированный ответ.",
                en: "Python framework for LLM input/output validation with hub validators and structured output.",
            },
        },
        {
            id: "lakera", name: "Lakera", vendor: "Check Point (Lakera)",
            glyph: "lock", brand: "#C8007A", url: "https://www.lakera.ai/",
            origin: "global",
            cats: ["security","agent"],
            tracks: ["security-eng","agent-architect"],
            access: "freemium",
            tagline: {
                ru: "Защита ИИ-приложений в рантайме: ловит промпт-атаки и утечки данных, плюс ред-тиминг агентов.",
                en: "Runtime protection for AI apps that catches prompt attacks and data leaks, plus agent red teaming.",
            },
        },
        {
            id: "descript", name: "Descript", vendor: "Descript",
            glyph: "film", brand: "#5B4BF5", url: "https://www.descript.com",
            origin: "global",
            cats: ["video","audio"],
            tracks: ["generalist"],
            access: "freemium",
            tagline: {
                ru: "Редактирование видео и подкастов как текста: правишь транскрипт — меняется запись.",
                en: "Edit video and podcasts like a document: change the transcript and the recording changes.",
            },
        },
        {
            id: "ideogram", name: "Ideogram", vendor: "Ideogram AI",
            glyph: "feather", brand: "#5B5BD6", url: "https://ideogram.ai",
            origin: "global",
            cats: ["image"],
            tracks: ["generalist"],
            access: "freemium",
            tagline: {
                ru: "Генерирует изображения по тексту и аккуратно вписывает надписи — логотипы, плакаты, макеты.",
                en: "Text-to-image generation with reliable in-image typography for logos, posters and layouts.",
            },
        },
        {
            id: "heygen", name: "HeyGen", vendor: "HeyGen",
            glyph: "mic", brand: "#00C3FF", url: "https://www.heygen.com",
            origin: "global",
            cats: ["video","audio"],
            tracks: ["generalist"],
            access: "freemium",
            tagline: {
                ru: "Видео с говорящим аватаром по сценарию, клонирование голоса и перевод дорожки на 175+ языков.",
                en: "Talking-avatar video from a script, with voice cloning and track translation into 175+ languages.",
            },
        },
        {
            id: "synthesia", name: "Synthesia", vendor: "Synthesia",
            glyph: "petals", brand: "#3E57DA", url: "https://www.synthesia.io",
            origin: "global",
            cats: ["video"],
            tracks: ["generalist"],
            access: "freemium",
            tagline: {
                ru: "Превращает сценарий в видео с ИИ-ведущим: аватары, шаблоны, озвучка; 10 минут в месяц бесплатно.",
                en: "Turns a script into presenter-style video with AI avatars and templates; 10 free minutes a month.",
            },
        },
        {
            id: "lm-studio", name: "LM Studio", vendor: "Element Labs, Inc.",
            glyph: "cube", brand: "#6E56CF", url: "https://lmstudio.ai",
            origin: "global",
            cats: ["local","chat","agent","audio"],
            tracks: ["generalist","developer"],
            access: "freemium",
            tagline: {
                ru: "Настольное приложение для локальных моделей и офлайн-расшифровки голоса; данные не уходят с устройства.",
                en: "Desktop app for running local models and offline voice transcription; data stays on your device.",
            },
        },
        {
            id: "vllm", name: "vLLM", vendor: "vLLM · PyTorch Foundation",
            glyph: "hub", brand: "#2E6FD9", url: "https://vllm.ai",
            origin: "global",
            cats: ["local"],
            tracks: ["developer","agent-architect"],
            access: "open",
            tagline: {
                ru: "Сервер вывода для открытых моделей на своём железе, API совместим с OpenAI; лицензия Apache-2.0.",
                en: "Inference server for open models on your own hardware, with an OpenAI-compatible API; Apache-2.0.",
            },
        },
        {
            id: "openrouter", name: "OpenRouter", vendor: "OpenRouter, Inc.",
            glyph: "chevrons", brand: "#5B6EF5", url: "https://openrouter.ai",
            origin: "global",
            cats: ["chat","agent"],
            tracks: ["generalist","developer","agent-architect"],
            access: "freemium",
            tagline: {
                ru: "Один API к 400+ моделям от 70+ провайдеров с переключением между ними без смены кода.",
                en: "One API for 400+ models from 70+ providers, switching between them without changing code.",
            },
        },
        {
            id: "together-ai", name: "Together AI", vendor: "Together AI",
            glyph: "grid", brand: "#0F6FFF", url: "https://www.together.ai",
            origin: "global",
            cats: ["chat","agent"],
            tracks: ["developer","agent-architect"],
            access: "freemium",
            tagline: {
                ru: "Облако для открытых моделей: вывод по токенам, дообучение и аренда GPU-кластеров.",
                en: "Cloud for open models: token-based inference, fine-tuning, and rented GPU clusters.",
            },
        },
        {
            id: "openbb", name: "OpenBB", vendor: "OpenBB Inc.",
            glyph: "gauge", brand: "#0190D8", url: "https://openbb.co",
            origin: "global",
            cats: ["research","agent","code"],
            tracks: ["quant","developer"],
            access: "freemium",
            tagline: {
                ru: "Рабочее пространство для финансового анализа: свои данные, виджеты и ИИ-агенты в одном окне.",
                en: "Financial research workspace joining your own data, widgets and AI agents in one interface.",
            },
        },
        {
            id: "quantconnect", name: "QuantConnect", vendor: "QuantConnect",
            glyph: "graph", brand: "#8A5A2B", url: "https://www.quantconnect.com",
            origin: "global",
            cats: ["code","automation","research"],
            tracks: ["quant","developer"],
            access: "freemium",
            tagline: {
                ru: "Облако для алготрейдинга: данные, бэктест и живое исполнение на открытом движке LEAN.",
                en: "Algorithmic trading cloud: data, backtesting and live execution on the open-source LEAN engine.",
            },
        },
        {
            id: "nautilus-trader", name: "NautilusTrader", vendor: "Nautech Systems",
            glyph: "pulse", brand: "#00CFBE", url: "https://nautilustrader.io",
            origin: "global",
            cats: ["code","automation","local"],
            tracks: ["quant","developer"],
            access: "open",
            tagline: {
                ru: "Открытый движок алготрейдинга: ядро на Rust, стратегии на Python, один код для теста и торговли.",
                en: "Open-source trading engine with a Rust core and Python strategies: one codebase for tests and live.",
            },
        },
        {
            id: "gigachat", name: "ГигаЧат", vendor: "Сбер",
            glyph: "spark", brand: "#21A038", url: "https://giga.chat/",
            origin: "ru",
            cats: ["chat","code","image"],
            tracks: ["generalist","developer","agent-architect"],
            access: "freemium",
            flagship: true,
            tagline: {
                ru: "Российская модель Сбера: текст, код и картинки, работает без зарубежной карты и VPN.",
                en: "Sber’s Russian model: text, code, and images, usable without a foreign card or VPN.",
            },
        },
        {
            id: "yandex-ai", name: "Нейросети Яндекса", vendor: "Яндекс",
            glyph: "radar", brand: "#FC3F1D", url: "https://ya.ru/ai",
            origin: "ru",
            cats: ["chat","research","code"],
            tracks: ["generalist","developer"],
            access: "freemium",
            flagship: true,
            tagline: {
                ru: "Семейство сервисов Яндекса: поиск с ответами, работа с текстом и API в облаке.",
                en: "Yandex’s family of services: answer-style search, text work, and a cloud API.",
            },
        },
        {
            id: "alice-ai", name: "Алиса AI", vendor: "Яндекс",
            glyph: "pulse", brand: "#D9407A", url: "https://alice.yandex.ru/",
            origin: "ru",
            cats: ["chat","audio","image"],
            tracks: ["generalist"],
            access: "freemium",
            flagship: true,
            tagline: {
                ru: "Ассистент Яндекса с голосом и генерацией картинок; есть бесплатный доступ.",
                en: "Yandex’s assistant with voice and image generation; a free tier is available.",
            },
        },
        {
            id: "gigacode", name: "GigaCode", vendor: "Сбер · GitVerse",
            glyph: "bolt", brand: "#1F8A4C", url: "https://gitverse.ru/features/gigacode",
            origin: "ru",
            cats: ["code"],
            tracks: ["developer"],
            access: "freemium",
            tagline: {
                ru: "Российский ассистент разработчика: автодополнение и объяснение кода в IDE.",
                en: "A Russian developer assistant: code completion and explanation inside the IDE.",
            },
        },
        {
            id: "kandinsky", name: "Kandinsky", vendor: "Sber AI",
            glyph: "palette", brand: "#7B61FF", url: "https://huggingface.co/ai-forever",
            origin: "ru",
            cats: ["image","local"],
            tracks: ["generalist","developer"],
            access: "open",
            flagship: true,
            tagline: {
                ru: "Открытая российская модель генерации изображений: веса выложены, можно поднять у себя.",
                en: "An open Russian image-generation model: weights published, self-hosting possible.",
            },
        },
        {
            id: "salutespeech", name: "SaluteSpeech", vendor: "Сбер",
            glyph: "mic", brand: "#0E9F6E", url: "https://developers.sber.ru/portal/products/smartspeech",
            origin: "ru",
            cats: ["audio"],
            tracks: ["generalist","developer"],
            access: "freemium",
            tagline: {
                ru: "Синтез и распознавание речи на русском: озвучка, расшифровка звонков и встреч.",
                en: "Russian speech synthesis and recognition: voice-over plus call and meeting transcription.",
            },
        },
        {
            id: "cotype", name: "Cotype", vendor: "MTS AI",
            glyph: "grid", brand: "#E30611", url: "https://mts.ai/product/cotype/",
            origin: "ru",
            cats: ["chat","code","automation"],
            tracks: ["generalist","developer","agent-architect"],
            access: "paid",
            tagline: {
                ru: "Корпоративная языковая модель MTS AI: разворачивается в контуре компании.",
                en: "MTS AI’s enterprise language model: deployable inside a company’s own perimeter.",
            },
        },
        {
            id: "vikhr", name: "Vikhr", vendor: "Vikhr models",
            glyph: "feather", brand: "#5B7FD4", url: "https://huggingface.co/Vikhrmodels",
            origin: "ru",
            cats: ["chat","local"],
            tracks: ["developer","memory-eng"],
            access: "open",
            tagline: {
                ru: "Открытые русскоязычные модели: веса на Hugging Face, запуск на своём железе.",
                en: "Open Russian-language models: weights on Hugging Face, run on your own hardware.",
            },
        },
        {
            id: "kimi", name: "Kimi", vendor: "Moonshot AI",
            glyph: "target", brand: "#4D5BF5", url: "https://www.kimi.com/",
            origin: "cn",
            cats: ["chat","code","agent","research"],
            tracks: ["generalist","developer","agent-architect"],
            access: "freemium",
            flagship: true,
            tagline: {
                ru: "Ассистент с длинным контекстом и агентными сценариями; часть моделей с открытыми весами.",
                en: "Long-context assistant with agent workflows; several models ship with open weights.",
            },
        },
        {
            id: "glm-zai", name: "GLM · Z.ai", vendor: "Zhipu AI",
            glyph: "brain", brand: "#2E6BE6", url: "https://z.ai/",
            origin: "cn",
            cats: ["chat","code","agent","local"],
            tracks: ["developer","agent-architect","generalist"],
            access: "freemium",
            flagship: true,
            tagline: {
                ru: "Семейство GLM: чат, код и агенты, старшие версии выкладываются с открытыми весами.",
                en: "The GLM family: chat, code, and agents, with senior versions released as open weights.",
            },
        },
        {
            id: "doubao", name: "Doubao", vendor: "ByteDance",
            glyph: "venn", brand: "#3B7CFF", url: "https://www.doubao.com/",
            origin: "cn",
            cats: ["chat","image","audio"],
            tracks: ["generalist"],
            access: "freemium",
            flagship: true,
            tagline: {
                ru: "Массовый китайский ассистент ByteDance: текст, картинки и голос в одном приложении.",
                en: "ByteDance’s mass-market Chinese assistant: text, images, and voice in one app.",
            },
        },
        {
            id: "ernie", name: "ERNIE", vendor: "Baidu",
            glyph: "eye", brand: "#2932E1", url: "https://yiyan.baidu.com/",
            origin: "cn",
            cats: ["chat","image","research"],
            tracks: ["generalist"],
            access: "freemium",
            tagline: {
                ru: "Ассистент Baidu на моделях ERNIE: поиск, работа с текстом и генерация изображений.",
                en: "Baidu’s assistant on ERNIE models: search, text work, and image generation.",
            },
        },
        {
            id: "hunyuan", name: "Hunyuan", vendor: "Tencent",
            glyph: "gem", brand: "#0052D9", url: "https://hunyuan.tencent.com/",
            origin: "cn",
            cats: ["chat","image","video","local"],
            tracks: ["generalist","developer"],
            access: "open",
            tagline: {
                ru: "Модели Tencent для текста, картинок и видео; часть семейства выложена с открытыми весами.",
                en: "Tencent’s models for text, images, and video; part of the family is released as open weights.",
            },
        },
        {
            id: "minimax", name: "MiniMax", vendor: "MiniMax",
            glyph: "beaker", brand: "#E8452C", url: "https://www.minimax.io/",
            origin: "cn",
            cats: ["chat","audio","agent"],
            tracks: ["developer","agent-architect"],
            access: "freemium",
            tagline: {
                ru: "Платформа MiniMax: длинный контекст, синтез речи и API для агентных сценариев.",
                en: "The MiniMax platform: long context, speech synthesis, and an API for agent workflows.",
            },
        },
        {
            id: "hailuo", name: "Hailuo AI", vendor: "MiniMax",
            glyph: "film", brand: "#FF5C39", url: "https://hailuoai.video/",
            origin: "cn",
            cats: ["video","image"],
            tracks: ["generalist"],
            access: "freemium",
            flagship: true,
            tagline: {
                ru: "Генерация видео по тексту и изображению — один из заметных китайских видеосервисов.",
                en: "Text- and image-to-video generation — one of the notable Chinese video services.",
            },
        },
        {
            id: "manus", name: "Manus", vendor: "Manus AI",
            glyph: "graph", brand: "#6B5BD2", url: "https://manus.im/",
            origin: "cn",
            cats: ["agent","automation","research"],
            tracks: ["generalist","agent-architect"],
            access: "freemium",
            flagship: true,
            tagline: {
                ru: "Автономный агент: получает задачу целиком и сам доводит её до готового результата.",
                en: "An autonomous agent: takes a whole task and carries it through to a finished result.",
            },
        },
        {
            id: "vidu", name: "Vidu", vendor: "Shengshu Technology",
            glyph: "prism", brand: "#4A7CFF", url: "https://www.vidu.com/",
            origin: "cn",
            cats: ["video"],
            tracks: ["generalist"],
            access: "freemium",
            tagline: {
                ru: "Видео по тексту, картинке и референсу — с удержанием персонажа между кадрами.",
                en: "Video from text, image, or reference — keeping a character consistent across shots.",
            },
        },
        {
            id: "wan", name: "Wan", vendor: "Alibaba",
            glyph: "wand", brand: "#FF6A00", url: "https://wan.video/",
            origin: "cn",
            cats: ["video","image","local"],
            tracks: ["generalist","developer"],
            access: "open",
            tagline: {
                ru: "Открытая видеомодель Alibaba: веса доступны, можно запускать и дообучать у себя.",
                en: "Alibaba’s open video model: weights available for self-hosting and fine-tuning.",
            },
        },
        {
            id: "jimeng", name: "Jimeng AI", vendor: "ByteDance",
            glyph: "petals", brand: "#8B5CF6", url: "https://jimeng.jianying.com/",
            origin: "cn",
            cats: ["image","video"],
            tracks: ["generalist"],
            access: "freemium",
            tagline: {
                ru: "Сервис ByteDance для генерации изображений и коротких видео, связан с видеоредактором.",
                en: "ByteDance’s service for image and short-video generation, tied to its video editor.",
            },
        },
        {
            id: "stepfun", name: "StepFun", vendor: "StepFun",
            glyph: "comet", brand: "#1A73E8", url: "https://www.stepfun.com/",
            origin: "cn",
            cats: ["chat","audio","local"],
            tracks: ["developer"],
            access: "open",
            tagline: {
                ru: "Мультимодальные модели Step: текст, речь и изображение, часть — с открытыми весами.",
                en: "The Step multimodal models: text, speech, and vision, several with open weights.",
            },
        },
        {
            id: "iflytek-spark", name: "iFlytek Spark", vendor: "iFlytek",
            glyph: "spark", brand: "#0B5FD9", url: "https://xinghuo.xfyun.cn/",
            origin: "cn",
            cats: ["chat","audio"],
            tracks: ["generalist"],
            access: "freemium",
            tagline: {
                ru: "Ассистент iFlytek с сильной речевой частью: распознавание и синтез речи.",
                en: "iFlytek’s assistant with a strong speech stack: recognition and synthesis.",
            },
        },
        {
            id: "baichuan", name: "Baichuan", vendor: "Baichuan Intelligence",
            glyph: "vault", brand: "#FF6B35", url: "https://www.baichuan-ai.com/",
            origin: "cn",
            cats: ["chat","local"],
            tracks: ["developer"],
            access: "open",
            tagline: {
                ru: "Китайские открытые модели Baichuan: веса доступны для локального запуска.",
                en: "Baichuan’s open Chinese models: weights available for local deployment.",
            },
        },
        {
            id: "yi-01ai", name: "Yi", vendor: "01.AI",
            glyph: "pixel", brand: "#22A06B", url: "https://www.01.ai/",
            origin: "cn",
            cats: ["chat","local"],
            tracks: ["developer"],
            access: "open",
            tagline: {
                ru: "Открытое двуязычное семейство Yi: китайский и английский, запуск на своём железе.",
                en: "The open bilingual Yi family: Chinese and English, runnable on your own hardware.",
            },
        },
    ];

    return { CATS: CATS, ACCESS: ACCESS, ORIGINS: ORIGINS, LIST: LIST };
})();
