/**
 * ============================================================
 *  MedoEDUz — ориентиры: открытые первоисточники
 * ============================================================
 *
 *  Бесплатные курсы и технические документы, покрывающие те же
 *  векторы, что и наша программа. Мы не пересказываем их: здесь
 *  навык и практика на русском, там — глубина, код и детали.
 *
 *  ПРАВИЛО ЧЕСТНОСТИ: в этом файле только то, что проверено —
 *  адреса открывались, состав тем сверялся с первоисточником.
 *  Ничего «по памяти». Если факт не подтверждён, он не пишется.
 *
 *  branches — к каким веткам курса относится ориентир
 *  (ключи из CURRICULUM.BRANCHES). Блок показывается только по
 *  тем веткам, что есть в треке ученика.
 */

window.MEDOEDUZ_REFS = [
    {
        title: '5-Day Gen AI Intensive (Kaggle + Google)',
        by: 'Google и Kaggle · бесплатно, самостоятельно',
        what: 'Пять дней: базовые модели и промптинг · эмбеддинги и векторные базы · агенты · доменные LLM · MLOps для генеративного ИИ. Каждый день — технический документ и практические ноутбуки.',
        url: 'https://www.kaggle.com/learn-guide/5-day-genai',
        branches: ['core', 'memory', 'agents', 'dev', 'evals']
    },
    {
        title: '5-Day AI Agents Intensive (Kaggle + Google)',
        by: 'Google и Kaggle · бесплатно',
        what: 'Отдельный агентный курс: введение в агентов · инструменты и MCP · инженерия контекста, сессии и память · качество агентов · путь от прототипа к продакшену.',
        url: 'https://www.kaggle.com/learn-guide/5-day-agents',
        branches: ['agents', 'memory', 'evals']
    },
    {
        title: 'Prompt Engineering (технический документ)',
        by: 'Lee Boonstra, Google',
        what: 'Двенадцать приёмов подряд: zero/one/few-shot, системный и ролевой промптинг, step-back, Chain of Thought, самосогласованность, Tree of Thoughts, ReAct, автоматическая генерация промптов. Плюс настройки вывода: длина, temperature, top-K, top-P.',
        url: 'https://www.kaggle.com/whitepaper-prompt-engineering',
        branches: ['core', 'content']
    },
    {
        title: 'Agents (технический документ)',
        by: 'Wiesinger, Marlow, Vuskovic — Google',
        what: 'Из чего собран агент: модель, инструменты, слой оркестрации. Разбор ReAct, CoT и Tree of Thoughts; три типа инструментов — Extensions, Functions, Data Stores.',
        url: 'https://www.kaggle.com/whitepaper-agents',
        branches: ['agents']
    },
    {
        title: 'Embeddings & Vector Stores (технический документ)',
        by: 'Google',
        what: 'Эмбеддинги, векторные хранилища и поиск по смыслу — фундамент под RAG и долгую память агента.',
        url: 'https://www.kaggle.com/whitepaper-embeddings-and-vector-stores',
        branches: ['memory', 'analytics']
    },
    {
        title: 'Operationalizing Generative AI on Vertex AI (MLOps)',
        by: 'Google',
        what: 'Что меняется в MLOps, когда в системе появляется генеративная модель: версионирование связки «модель + промпт», подбор модели, дообучение, заземление на данных.',
        url: 'https://www.kaggle.com/whitepaper-operationalizing-generative-ai-on-vertex-ai-using-mlops',
        branches: ['dev', 'evals']
    },
    {
        title: 'Kaggle Learn — микрокурсы',
        by: 'Kaggle · бесплатно, с сертификатом',
        what: 'Короткие курсы по 5–7 уроков в ритме «урок → упражнение с автопроверкой»: введение в ML, продвинутый ML, инженерия признаков, введение в этику ИИ.',
        url: 'https://www.kaggle.com/learn',
        branches: ['analytics', 'quant']
    },
    {
        title: 'OWASP Top 10 для LLM-приложений (2025)',
        by: 'OWASP GenAI Security Project',
        what: 'Отраслевой список рисков: LLM01 инъекция промпта, LLM02 утечка чувствительных данных, LLM05 небезопасная обработка вывода, LLM06 избыточные полномочия агента и ещё шесть. Обязательное чтение для ветки безопасности.',
        url: 'https://genai.owasp.org/llm-top-10/',
        branches: ['security', 'agents']
    },
    {
        title: 'Red Teaming LLM Applications',
        by: 'DeepLearning.AI и Giskard · бесплатно, ~1,5 часа',
        what: 'Практика атак на приложения с LLM: инъекции промпта, масштабирование атак, автоматическая генерация атак моделью, полный цикл red-team-проверки.',
        url: 'https://www.deeplearning.ai/courses/red-teaming-llm-applications/',
        branches: ['security', 'evals']
    },
    {
        title: 'Prompt Engineering Interactive Tutorial',
        by: 'Anthropic · бесплатно',
        what: 'Девять глав в трёх уровнях сложности — от структуры промпта до сложных цепочек, с песочницей в конце каждого урока. Рядом в том же репозитории — курсы по эвалам промптов и по инструментам.',
        url: 'https://github.com/anthropics/prompt-eng-interactive-tutorial',
        branches: ['core', 'content', 'evals']
    },
    {
        title: 'AI Agents for Beginners',
        by: 'Microsoft · бесплатно, открытый репозиторий',
        what: 'Восемнадцать уроков с кодом: паттерны проектирования агентов, использование инструментов, Agentic RAG, планирование, мульти-агентность, метапознание агента, протоколы MCP и A2A, память, безопасность.',
        url: 'https://github.com/microsoft/ai-agents-for-beginners',
        branches: ['agents', 'memory', 'security']
    },
    {
        title: 'Generative AI for Beginners',
        by: 'Microsoft · бесплатно, открытый репозиторий',
        what: 'Двадцать один урок, каждый помечен как «изучить» или «собрать»: примеры на Python и TypeScript, от основ промптинга до RAG, векторных баз и агентов.',
        url: 'https://github.com/microsoft/generative-ai-for-beginners',
        branches: ['dev', 'content', 'memory']
    },
    {
        title: 'Google AI Essentials',
        by: 'Google · платный сертификат, материалы доступны',
        what: 'Пять модулей для входа: что такое ИИ, продуктивность с ИИ-инструментами, промпт-инжиниринг, ответственное использование, как не отстать. Меньше десяти часов.',
        url: 'https://grow.google/ai-essentials/',
        branches: ['core', 'marketing', 'design']
    }
];
