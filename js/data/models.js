/**
 * ============================================================
 *  MedoEDUz — реестр нейросетей для ИИ-хаба на главной
 * ============================================================
 *
 *  Хаб отвечает на вопрос ученика «а чем мне работать?»: он
 *  раскладывает известные LLM и ИИ-инструменты по СЕМИ трекам
 *  обучения (те же ключи, что и в CURRICULUM.TRACKS) и по
 *  модальностям. Так выбор трека на карте знаний превращается в
 *  конкретный список инструментов, которыми ученик реально
 *  доводит задачу до результата.
 *
 *  ЧЕСТНОСТЬ (правило проекта):
 *  - Никаких выдуманных «лучших» и рейтингов. Одна строка о том,
 *    в чём инструмент силён, и ссылка на ОФИЦИАЛЬНЫЙ сайт.
 *  - Это не партнёрство и не реклама. Товарные знаки принадлежат
 *    их владельцам; здесь — СТИЛИЗОВАННЫЕ векторные метки
 *    (см. GLYPHS в js/ai-hub.js), а не копии фирменных логотипов.
 *  - Мёд (--signature) остаётся подписью Медоеда: марки вендоров
 *    берут собственные, НЕ янтарные тона, чтобы не спорить с ним.
 *
 *  Ключ — строка, английские подписи лежат рядом (`en`): страница
 *  двуязычная и берёт язык из data-lang, а не из словаря сайта,
 *  поэтому реестр самодостаточен.
 */

'use strict';

window.AI_MODELS = (function () {
    // ---------- Модальности (по чему фильтруем во вторую очередь) ----------
    const CATS = {
        chat:       { ru: 'Чат-ассистент',      en: 'Chat assistant' },
        code:       { ru: 'Код',                 en: 'Coding' },
        agent:      { ru: 'Агенты',              en: 'Agents' },
        research:   { ru: 'Поиск и ресёрч',      en: 'Search & research' },
        memory:     { ru: 'Память и RAG',        en: 'Memory & RAG' },
        eval:       { ru: 'Эвалы и наблюдаемость', en: 'Evals & observability' },
        security:   { ru: 'Безопасность',        en: 'Security' },
        automation: { ru: 'Автоматизация',       en: 'Automation' },
        image:      { ru: 'Изображения',         en: 'Images' },
        video:      { ru: 'Видео',               en: 'Video' },
        audio:      { ru: 'Аудио и голос',       en: 'Audio & voice' },
        local:      { ru: 'Локально / веса',     en: 'Local / weights' },
    };

    // ---------- Доступность (честная метка, без цен) ----------
    const ACCESS = {
        freemium: { ru: 'Есть бесплатный тариф', en: 'Free tier',        short: { ru: 'free', en: 'free' } },
        open:     { ru: 'Открытые веса / OSS',   en: 'Open weights / OSS', short: { ru: 'open', en: 'open' } },
        paid:     { ru: 'Платный доступ',        en: 'Paid',             short: { ru: 'paid', en: 'paid' } },
    };

    // ---------- Реестр ----------
    // brand — тон стилизованной метки; glyph — id формы из GLYPHS.
    const LIST = [
        {
            id: 'chatgpt', name: 'ChatGPT', vendor: 'OpenAI',
            glyph: 'ring', brand: '#10A37F', url: 'https://chatgpt.com',
            cats: ['chat', 'code', 'image', 'audio', 'research'],
            tracks: ['generalist', 'developer', 'ai-analyst', 'agent-architect'],
            access: 'freemium',
            tagline: {
                ru: 'Универсальный ассистент: текст, код, голос и картинки в одном окне.',
                en: 'All-round assistant: text, code, voice, and images in one place.',
            },
        },
        {
            id: 'claude', name: 'Claude', vendor: 'Anthropic',
            glyph: 'spark', brand: '#C86C4A', url: 'https://claude.ai',
            cats: ['chat', 'code', 'agent'],
            tracks: ['generalist', 'developer', 'agent-architect', 'memory-eng', 'security-eng', 'quant'],
            access: 'freemium',
            tagline: {
                ru: 'Длинный контекст и аккуратный код; силён в рассуждении и работе с документами.',
                en: 'Long context and careful code; strong at reasoning and working over documents.',
            },
        },
        {
            id: 'gemini', name: 'Gemini', vendor: 'Google',
            glyph: 'gem', brand: '#3E7BF6', url: 'https://gemini.google.com',
            cats: ['chat', 'code', 'image', 'research'],
            tracks: ['generalist', 'developer', 'ai-analyst'],
            access: 'freemium',
            tagline: {
                ru: 'Мультимодальность и большое контекстное окно, связка с сервисами Google.',
                en: 'Multimodal with a large context window, tied into Google services.',
            },
        },
        {
            id: 'copilot', name: 'GitHub Copilot', vendor: 'GitHub',
            glyph: 'chevrons', brand: '#4C8DFF', url: 'https://github.com/features/copilot',
            cats: ['code', 'agent'],
            tracks: ['developer'],
            access: 'freemium',
            tagline: {
                ru: 'Автодополнение и агент прямо в редакторе кода и в pull request.',
                en: 'Autocomplete and an agent right in your editor and pull requests.',
            },
        },
        {
            id: 'cursor', name: 'Cursor', vendor: 'Anysphere',
            glyph: 'caret', brand: '#6E7BFF', url: 'https://cursor.com',
            cats: ['code', 'agent'],
            tracks: ['developer', 'agent-architect'],
            access: 'freemium',
            tagline: {
                ru: 'Редактор кода, построенный вокруг ИИ-агента: правки по всей кодовой базе.',
                en: 'A code editor built around an AI agent: changes across the whole codebase.',
            },
        },
        {
            id: 'llama', name: 'Llama', vendor: 'Meta',
            glyph: 'layers', brand: '#4A6DF0', url: 'https://www.llama.com',
            cats: ['chat', 'code', 'local'],
            tracks: ['developer', 'memory-eng', 'security-eng', 'quant'],
            access: 'open',
            tagline: {
                ru: 'Открытые веса: разворачиваете у себя, дообучаете, держите данные при себе.',
                en: 'Open weights: self-host, fine-tune, and keep your data in-house.',
            },
        },
        {
            id: 'mistral', name: 'Mistral · Le Chat', vendor: 'Mistral AI',
            glyph: 'pixel', brand: '#E9642A', url: 'https://mistral.ai',
            cats: ['chat', 'code', 'local'],
            tracks: ['generalist', 'developer', 'memory-eng', 'security-eng'],
            access: 'open',
            tagline: {
                ru: 'Быстрые европейские модели, часть — с открытыми весами для локального запуска.',
                en: 'Fast European models, several with open weights for local use.',
            },
        },
        {
            id: 'deepseek', name: 'DeepSeek', vendor: 'DeepSeek',
            glyph: 'orbit', brand: '#4D6BFE', url: 'https://www.deepseek.com',
            cats: ['chat', 'code', 'local'],
            tracks: ['developer', 'memory-eng', 'quant', 'security-eng'],
            access: 'open',
            tagline: {
                ru: 'Сильные рассуждающие модели с открытыми весами и низкой ценой инференса.',
                en: 'Strong reasoning models with open weights and low inference cost.',
            },
        },
        {
            id: 'qwen', name: 'Qwen', vendor: 'Alibaba',
            glyph: 'petals', brand: '#615CED', url: 'https://chat.qwen.ai',
            cats: ['chat', 'code', 'local'],
            tracks: ['developer', 'memory-eng', 'quant'],
            access: 'open',
            tagline: {
                ru: 'Открытое многоязычное семейство моделей: чат, код и работа с длинным контекстом.',
                en: 'Open multilingual model family: chat, code, and long-context work.',
            },
        },
        {
            id: 'grok', name: 'Grok', vendor: 'xAI',
            glyph: 'comet', brand: '#7A8699', url: 'https://x.ai',
            cats: ['chat', 'research'],
            tracks: ['generalist', 'ai-analyst'],
            access: 'freemium',
            tagline: {
                ru: 'Чат с доступом к ленте X в реальном времени — полезно для свежих событий.',
                en: 'Chat with real-time access to the X feed — handy for breaking topics.',
            },
        },
        {
            id: 'perplexity', name: 'Perplexity', vendor: 'Perplexity',
            glyph: 'loop', brand: '#20B8CD', url: 'https://www.perplexity.ai',
            cats: ['research', 'chat'],
            tracks: ['generalist', 'ai-analyst', 'quant'],
            access: 'freemium',
            tagline: {
                ru: 'Поисковый движок с ответами и ссылками на первоисточники — ресёрч без выдумок.',
                en: 'An answer engine with cited sources — research without made-up facts.',
            },
        },
        {
            id: 'huggingface', name: 'Hugging Face', vendor: 'Hugging Face',
            glyph: 'hub', brand: '#FF6F43', url: 'https://huggingface.co',
            cats: ['local', 'code', 'agent'],
            tracks: ['developer', 'memory-eng', 'ai-analyst', 'agent-architect', 'security-eng'],
            access: 'open',
            tagline: {
                ru: 'Хаб открытых моделей, датасетов и демо — отсюда берут веса для своих задач.',
                en: 'A hub of open models, datasets, and demos — where you grab weights to build on.',
            },
        },
        {
            id: 'langchain', name: 'LangChain · LangGraph', vendor: 'LangChain',
            glyph: 'chain', brand: '#1F9E7A', url: 'https://www.langchain.com',
            cats: ['agent', 'code'],
            tracks: ['agent-architect', 'developer', 'memory-eng'],
            access: 'open',
            tagline: {
                ru: 'Фреймворк для агентных пайплайнов, памяти и оркестрации инструментов.',
                en: 'Framework for agent pipelines, memory, and tool orchestration.',
            },
        },
        {
            id: 'cohere', name: 'Cohere', vendor: 'Cohere',
            glyph: 'shield', brand: '#7D5CE0', url: 'https://cohere.com',
            cats: ['chat', 'code', 'research'],
            tracks: ['developer', 'ai-analyst', 'memory-eng'],
            access: 'freemium',
            tagline: {
                ru: 'Модели для бизнеса: поиск, RAG и эмбеддинги с упором на приватность.',
                en: 'Enterprise models: search, RAG, and embeddings with a privacy focus.',
            },
        },
        {
            id: 'stable-diffusion', name: 'Stable Diffusion', vendor: 'Stability AI',
            glyph: 'venn', brand: '#8A63D2', url: 'https://stability.ai',
            cats: ['image', 'local'],
            tracks: ['generalist', 'developer'],
            access: 'open',
            tagline: {
                ru: 'Открытая генерация изображений — можно запускать локально и встраивать в свой продукт.',
                en: 'Open image generation — run it locally and embed it in your own product.',
            },
        },
        {
            id: 'midjourney', name: 'Midjourney', vendor: 'Midjourney',
            glyph: 'prism', brand: '#5560D6', url: 'https://www.midjourney.com',
            cats: ['image'],
            tracks: ['generalist'],
            access: 'paid',
            tagline: {
                ru: 'Один из лидеров художественной генерации изображений по текстовому описанию.',
                en: 'A leader in artistic text-to-image generation.',
            },
        },
        {
            id: 'runway', name: 'Runway', vendor: 'Runway',
            glyph: 'film', brand: '#5A8DEE', url: 'https://runwayml.com',
            cats: ['video'],
            tracks: ['generalist'],
            access: 'paid',
            tagline: {
                ru: 'Генерация и монтаж видео по тексту и картинке — для роликов и раскадровок.',
                en: 'Text- and image-to-video generation and editing — for clips and storyboards.',
            },
        },
        {
            id: 'elevenlabs', name: 'ElevenLabs', vendor: 'ElevenLabs',
            glyph: 'waveform', brand: '#5B72E0', url: 'https://elevenlabs.io',
            cats: ['audio'],
            tracks: ['generalist'],
            access: 'freemium',
            tagline: {
                ru: 'Реалистичный синтез речи и озвучка на многих языках, включая русский.',
                en: 'Realistic speech synthesis and voice-over in many languages, including Russian.',
            },
        },
    ];

    return { CATS: CATS, ACCESS: ACCESS, LIST: LIST };
})();
