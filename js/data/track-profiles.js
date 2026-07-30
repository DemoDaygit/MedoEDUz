/**
 * ============================================================
 *  MedoEDUz — профили треков: компетенции и бизнес-применимость
 * ============================================================
 *
 *  Отвечает на вопрос, который на самом деле задаёт человек перед
 *  покупкой: «что я СМОГУ ДЕЛАТЬ после этого и какие мои задачи это
 *  закроет?» Поэтому единица описания здесь — не тема, а КОМПЕТЕНЦИЯ
 *  с доказательством: рядом с каждой стоит артефакт, который ученик
 *  предъявляет. «Изучил промптинг» доказать нельзя, «показал два
 *  своих шаблона и сравнение ответов до/после» — можно.
 *
 *  Компетенции НЕ придуманы под маркетинг: они выведены из
 *  CURRICULUM.FIRST_WEEK[track].outcome, где для каждого трека уже
 *  описан проверяемый результат первой недели. Если правится модель
 *  курса — правится и этот файл, иначе обещание разойдётся с курсом.
 *
 *  У каждого трека обязателен `notFor` — чего трек НЕ даёт. Это не
 *  скромность, а работающий фильтр: человек, пришедший не за тем,
 *  уходит недовольным, и честная граница дешевле возврата.
 *
 *  Тексты парами {ru, en}: русский — исходник, английский —
 *  надстройка (как в реестре моделей). Словарь сайта не нужен.
 */

'use strict';

window.TRACK_PROFILES = (function () {
    const P = {
        // ============================================================
        generalist: {
            level: { ru: 'Старт · без технического фона', en: 'Entry · no technical background' },
            audience: [
                { ru: 'Маркетологи и SMM', en: 'Marketing and social media' },
                { ru: 'Менеджеры и руководители', en: 'Managers and team leads' },
                { ru: 'HR и рекрутинг', en: 'HR and recruiting' },
                { ru: 'Юристы, бухгалтеры, администраторы', en: 'Legal, finance, admin' },
                { ru: 'Предприниматели и фрилансеры', en: 'Founders and freelancers' },
            ],
            promise: {
                ru: 'Типовая рабочая задача — письмо, справка, разбор документа — решается за одну-две попытки по сохранённому шаблону, а не за десять переформулировок.',
                en: 'A routine work task — an email, a summary, a document review — gets done in one or two attempts from a saved template instead of ten rewordings.',
            },
            competencies: [
                {
                    name: { ru: 'Ставить задачу так, чтобы ответ приходил сразу', en: 'Brief the model so the answer lands first time' },
                    proof: { ru: 'два-три своих шаблона промпта с образцами вашего стиля', en: 'two or three prompt templates carrying samples of your own style' },
                },
                {
                    name: { ru: 'Проверять факты из ответа за минуты', en: 'Fact-check an answer in minutes' },
                    proof: { ru: 'выписанные утверждения со сверкой по первоисточнику', en: 'extracted claims checked against primary sources' },
                },
                {
                    name: { ru: 'Собирать короткий контекст вместо вставки всего документа', en: 'Assemble short context instead of pasting whole documents' },
                    proof: { ru: 'сравнение ответов до и после на одних и тех же вопросах', en: 'before/after answers on the same set of questions' },
                },
                {
                    name: { ru: 'Не отдавать лишнее в чужой сервис', en: 'Stop over-sharing with someone else’s service' },
                    proof: { ru: 'письменное правило, какие данные вы не отправляете в ИИ', en: 'a written rule listing what you never send to an AI service' },
                },
            ],
            tasks: [
                { ru: 'Переписка и деловые письма', en: 'Correspondence and business email' },
                { ru: 'Разбор договоров и длинных документов', en: 'Reviewing contracts and long documents' },
                { ru: 'Справки, отчёты, конспекты встреч', en: 'Briefs, reports, meeting notes' },
                { ru: 'Тексты для соцсетей и рассылок', en: 'Copy for social and newsletters' },
                { ru: 'Поиск по своим материалам', en: 'Search across your own materials' },
                { ru: 'Черновики презентаций и таблиц', en: 'First drafts of decks and spreadsheets' },
            ],
            notFor: {
                ru: 'Не учит программировать и не даёт инженерию агентов. Если нужна интеграция ИИ в продукт — это треки «Разработчик» и «Архитектор агентов».',
                en: 'Does not teach programming or agent engineering. For embedding AI into a product, take the Developer or Agent Architect track.',
            },
            tools: ['gigachat', 'alice', 'chatgpt', 'claude', 'gemini-notebook', 'deepseek', 'kandinsky', 'suno'],
        },

        // ============================================================
        developer: {
            level: { ru: 'Средний · нужен опыт разработки', en: 'Intermediate · development experience required' },
            audience: [
                { ru: 'Разработчики любого стека', en: 'Developers on any stack' },
                { ru: 'Тимлиды и техлиды', en: 'Team and tech leads' },
                { ru: 'QA-инженеры', en: 'QA engineers' },
                { ru: 'Инженеры поддержки и DevOps', en: 'Support engineers and DevOps' },
            ],
            promise: {
                ru: 'Ассистент кода перестаёт быть игрушкой: промпт как мини-ТЗ даёт применимый diff за одну-две итерации, а вход в незнакомый модуль занимает часы вместо дней.',
                en: 'The coding assistant stops being a toy: a prompt written as a mini-spec yields an applicable diff in one or two iterations, and entering an unfamiliar module takes hours instead of days.',
            },
            competencies: [
                {
                    name: { ru: 'Писать промпт как мини-ТЗ и получать применимый diff', en: 'Write the prompt as a mini-spec and get an applicable diff' },
                    proof: { ru: 'сравнение «до и после» на своей реальной задаче', en: 'a before/after comparison on your own real task' },
                },
                {
                    name: { ru: 'Входить в незнакомый модуль с картой, сверенной с кодом', en: 'Enter an unfamiliar module with a map checked against the code' },
                    proof: { ru: 'карта модуля, каждый пункт которой подтверждён строкой кода', en: 'a module map with every claim backed by a line of code' },
                },
                {
                    name: { ru: 'Держать правила проекта для ассистента и отбирать контекст', en: 'Maintain project rules for the assistant and curate its context' },
                    proof: { ru: 'файл правил в репозитории и осознанный список файлов в контексте', en: 'a rules file in the repo and a deliberate list of files in context' },
                },
                {
                    name: { ru: 'Закрывать коммит тестами на граничные случаи', en: 'Close a commit with edge-case tests' },
                    proof: { ru: 'тесты, найденные с ИИ и запущенные локально', en: 'tests surfaced with AI and executed locally' },
                },
                {
                    name: { ru: 'Видеть, где связка ассистент–репозиторий даёт утечку', en: 'Spot where the assistant-plus-repo setup leaks' },
                    proof: { ru: 'схема своего контура с одним отрезанным звеном', en: 'a diagram of your setup with one link deliberately cut' },
                },
                {
                    name: { ru: 'Отвечать, нужен ли задаче агент или хватит скрипта', en: 'Decide whether a task needs an agent or just a script' },
                    proof: { ru: 'письменное обоснование решения по конкретной задаче', en: 'a written rationale for one concrete task' },
                },
            ],
            tasks: [
                { ru: 'Ускорение разработки и рефакторинга', en: 'Faster development and refactoring' },
                { ru: 'Вход в чужую кодовую базу', en: 'Onboarding into someone else’s codebase' },
                { ru: 'Тесты, ревью, миграции', en: 'Tests, reviews, migrations' },
                { ru: 'Разбор инцидентов и логов', en: 'Incident and log analysis' },
                { ru: 'Внутренние инструменты и автоматизация рутины', en: 'Internal tooling and routine automation' },
            ],
            notFor: {
                ru: 'Не курс по машинному обучению: здесь не обучают моделей и не занимаются дообучением. Речь о работе с готовыми моделями в продукте.',
                en: 'Not a machine-learning course: no model training or fine-tuning. This is about working with existing models inside a product.',
            },
            tools: ['claude-code', 'cursor', 'copilot', 'openai-codex', 'replit', 'v0', 'gigacode', 'qwen'],
        },

        // ============================================================
        'agent-architect': {
            level: { ru: 'Продвинутый · нужен инженерный фон', en: 'Advanced · engineering background required' },
            audience: [
                { ru: 'Продуктовые и системные архитекторы', en: 'Product and systems architects' },
                { ru: 'Разработчики, строящие автоматизацию', en: 'Developers building automation' },
                { ru: 'Владельцы процессов поддержки и продаж', en: 'Owners of support and sales processes' },
                { ru: 'Интеграторы и подрядчики по автоматизации', en: 'Integrators and automation contractors' },
            ],
            promise: {
                ru: 'Один работающий агентный контур на своей реальной задаче: петля с бюджетом шагов, явными условиями успеха и отказа, подключённым инструментом и логом, по которому видно, где он сломался.',
                en: 'One working agent loop on your own real task: a bounded step budget, explicit success and failure conditions, one connected tool, and a trace that shows exactly where it broke.',
            },
            competencies: [
                {
                    name: { ru: 'Описать петлю с бюджетом шагов и условиями остановки', en: 'Specify a loop with a step budget and stop conditions' },
                    proof: { ru: 'схема контура с явными условиями успеха и отказа', en: 'a loop diagram with explicit success and failure conditions' },
                },
                {
                    name: { ru: 'Подключить инструмент по стандартному контракту (MCP)', en: 'Connect a tool over a standard contract (MCP)' },
                    proof: { ru: 'работающий инструмент, вызываемый агентом', en: 'a working tool the agent actually calls' },
                },
                {
                    name: { ru: 'Разметить каждый шаг: это код или это промпт', en: 'Mark every step as either code or prompt' },
                    proof: { ru: 'размеченная таблица шагов контура', en: 'an annotated table of the loop’s steps' },
                },
                {
                    name: { ru: 'Снять сквозной лог прогона, по которому виден отказ', en: 'Capture an end-to-end trace that reveals the failure' },
                    proof: { ru: 'лог реального прогона с найденной точкой отказа', en: 'a real run trace with the failure point identified' },
                },
                {
                    name: { ru: 'Обосновать, нужна ли здесь мульти-агентность вообще', en: 'Justify whether multi-agent is warranted at all' },
                    proof: { ru: 'решение с аргументами против лишних агентов', en: 'a decision with arguments against unnecessary agents' },
                },
            ],
            tasks: [
                { ru: 'Клиентская поддержка первой линии', en: 'First-line customer support' },
                { ru: 'Обработка заявок и документооборот', en: 'Ticket handling and document workflows' },
                { ru: 'Внутренний ассистент по базе знаний', en: 'Internal knowledge-base assistant' },
                { ru: 'Связка сервисов без ручного участия', en: 'Service-to-service automation without a human step' },
                { ru: 'Подготовка отчётов и выгрузок по расписанию', en: 'Scheduled reports and data pulls' },
            ],
            notFor: {
                ru: 'За неделю мульти-агентная система не собирается — и мы этого не обещаем. Трек даёт один надёжный контур и трезвый ответ, нужна ли сложность.',
                en: 'A multi-agent system does not get built in a week, and we do not pretend otherwise. The track delivers one reliable loop and a sober answer on whether complexity is needed.',
            },
            tools: ['model-context-protocol', 'n8n', 'langchain', 'crewai', 'openai-agents-sdk', 'manus', 'claude', 'gigachat'],
        },

        // ============================================================
        'memory-eng': {
            level: { ru: 'Продвинутый · нужен опыт с данными', en: 'Advanced · data experience required' },
            audience: [
                { ru: 'Дата-инженеры', en: 'Data engineers' },
                { ru: 'Разработчики поисковых и справочных систем', en: 'Search and knowledge-system developers' },
                { ru: 'Владельцы корпоративных баз знаний', en: 'Owners of corporate knowledge bases' },
                { ru: 'Аналитики, работающие с документами', en: 'Analysts working with document sets' },
            ],
            promise: {
                ru: 'Ассистент перестаёт «забывать» и выдумывать: контекст собран по правилам, память разделена по типам, а на вопрос без данных система честно отвечает «данных нет».',
                en: 'The assistant stops forgetting and inventing: context is assembled by rule, memory is split by type, and when the data is missing the system honestly says so.',
            },
            competencies: [
                {
                    name: { ru: 'Получать строгую схему вывода, а не свободный текст', en: 'Get a strict output schema instead of free text' },
                    proof: { ru: 'промпт со схемой, проверенный на десяти реальных записях', en: 'a schema-bound prompt validated on ten real records' },
                },
                {
                    name: { ru: 'Сокращать контекст с измеримым эффектом', en: 'Compress context with a measurable effect' },
                    proof: { ru: 'посчитанные размеры частей и сравнение ответов до и после', en: 'measured segment sizes plus before/after answers' },
                },
                {
                    name: { ru: 'Измерить, где в длинном контексте теряется важное', en: 'Measure where long context loses what matters' },
                    proof: { ru: 'замер позиционного эффекта на своих данных и правило размещения', en: 'a positional-effect measurement on your data and a placement rule' },
                },
                {
                    name: { ru: 'Разделить память на эпизодическую, семантическую, процедурную', en: 'Split memory into episodic, semantic, and procedural' },
                    proof: { ru: 'таблица с правилами записи и обновления каждого типа', en: 'a table with write and update rules for each type' },
                },
                {
                    name: { ru: 'Останавливать поиск и честно отвечать «данных нет»', en: 'Stop retrieval and honestly answer “no data”' },
                    proof: { ru: 'лог агентного поиска с явным критерием остановки', en: 'a retrieval trace with an explicit stop criterion' },
                },
            ],
            tasks: [
                { ru: 'Поиск по корпоративной базе знаний', en: 'Search over a corporate knowledge base' },
                { ru: 'Ассистент по документации и регламентам', en: 'Assistant over documentation and policies' },
                { ru: 'Долгая память ассистента между сессиями', en: 'Long-term assistant memory across sessions' },
                { ru: 'Разбор архивов переписки и тикетов', en: 'Mining email and ticket archives' },
                { ru: 'Подготовка данных для RAG', en: 'Preparing data for RAG' },
            ],
            notFor: {
                ru: 'Это не курс по векторным базам как таковым: инструмент вторичен. Трек про то, что и зачем класть в память, а не про установку конкретной БД.',
                en: 'Not a course about vector databases as such — the tool is secondary. This track is about what goes into memory and why, not about installing a particular store.',
            },
            tools: ['qdrant', 'chroma', 'llamaindex', 'mem0', 'pgvector', 'weaviate', 'gigachat', 'qwen'],
        },

        // ============================================================
        'ai-analyst': {
            level: { ru: 'Продвинутый · нужен опыт с метриками', en: 'Advanced · metrics experience required' },
            audience: [
                { ru: 'Аналитики качества и QA-лиды', en: 'Quality analysts and QA leads' },
                { ru: 'Продакт-менеджеры ИИ-функций', en: 'Product managers of AI features' },
                { ru: 'Инженеры, отвечающие за релизы моделей', en: 'Engineers owning model releases' },
                { ru: 'Те, кто принимает ИИ-решения от подрядчиков', en: 'Anyone accepting AI deliverables from vendors' },
            ],
            promise: {
                ru: 'После любой правки промпта или смены модели вы за десять минут говорите, стало лучше или хуже, на сколько и на каких типах ошибок — числом, а не ощущением.',
                en: 'After any prompt edit or model swap you can say within ten minutes whether it got better or worse, by how much, and on which error types — as a number, not a feeling.',
            },
            competencies: [
                {
                    name: { ru: 'Версионировать промпт с зафиксированными параметрами', en: 'Version a prompt with pinned parameters' },
                    proof: { ru: 'промпт с версией и зафиксированными настройками запуска', en: 'a versioned prompt with pinned run settings' },
                },
                {
                    name: { ru: 'Собрать набор реальных кейсов с рубрикой оценки', en: 'Build a real case set with a grading rubric' },
                    proof: { ru: 'двадцать кейсов из своей задачи и рубрика', en: 'twenty cases from your own task plus a rubric' },
                },
                {
                    name: { ru: 'Отделить детерминированные проверки от оценки моделью', en: 'Separate deterministic checks from model grading' },
                    proof: { ru: 'скрипт прогона со слоем жёстких проверок', en: 'a run script with a hard-check layer' },
                },
                {
                    name: { ru: 'Держать офлайн-число рядом со срезом живого трафика', en: 'Keep the offline number next to a live-traffic slice' },
                    proof: { ru: 'базовое число качества и первый недельный срез', en: 'a baseline quality number and the first weekly slice' },
                },
                {
                    name: { ru: 'Понимать, где оценка моделью систематически врёт', en: 'Know where model-as-judge is systematically wrong' },
                    proof: { ru: 'разбор расхождений судьи с человеческой разметкой', en: 'an analysis of judge-vs-human disagreements' },
                },
            ],
            tasks: [
                { ru: 'Приёмка ИИ-функций перед релизом', en: 'Accepting AI features before release' },
                { ru: 'Контроль качества ассистентов и ботов', en: 'Quality control for assistants and bots' },
                { ru: 'Сравнение промптов и моделей между собой', en: 'Comparing prompts and models head to head' },
                { ru: 'Регресс при смене модели или поставщика', en: 'Regression testing on model or vendor change' },
                { ru: 'Отчётность по качеству для бизнеса', en: 'Quality reporting for the business' },
            ],
            notFor: {
                ru: 'Не заменяет предметную экспертизу: рубрику всё равно пишет тот, кто понимает задачу. Трек даёт процесс измерения, а не готовые метрики под вашу область.',
                en: 'Does not replace domain expertise: someone who understands the task still writes the rubric. The track gives you the measurement process, not ready-made metrics for your field.',
            },
            tools: ['langsmith', 'langfuse', 'ragas', 'wandb-weave', 'deepeval', 'arize-phoenix', 'kaggle'],
        },

        // ============================================================
        quant: {
            level: { ru: 'Экспертный · нужен опыт в финансах', en: 'Expert · finance experience required' },
            audience: [
                { ru: 'Количественные аналитики', en: 'Quantitative analysts' },
                { ru: 'Алготрейдеры и разработчики торговых систем', en: 'Algo traders and trading-system developers' },
                { ru: 'Риск-менеджеры', en: 'Risk managers' },
                { ru: 'Финансовые аналитики, автоматизирующие ресёрч', en: 'Financial analysts automating research' },
            ],
            promise: {
                ru: 'Ни одно число от модели не принимается на слово: есть журнал проверок, воспроизводимый скрипт, карта допущений бэктеста и тесты на подглядывание в будущее.',
                en: 'No number from a model is taken on faith: you keep a verification log, a reproducible script, a map of backtest assumptions, and tests for look-ahead bias.',
            },
            competencies: [
                {
                    name: { ru: 'Не принимать число от модели на слово', en: 'Never take a model’s number on faith' },
                    proof: { ru: 'журнал проверок с зафиксированными расхождениями', en: 'a verification log with recorded discrepancies' },
                },
                {
                    name: { ru: 'Сделать ответ на вопрос воспроизводимым', en: 'Make an answer reproducible' },
                    proof: { ru: 'скрипт, дающий тот же результат на своих сделках или барах', en: 'a script returning the same result on your own trades or bars' },
                },
                {
                    name: { ru: 'Выписать допущения бэктеста и привязать к коду', en: 'Write out backtest assumptions and tie them to code' },
                    proof: { ru: 'карта: комиссия, проскальзывание, задержка, календарь — со ссылками на строки', en: 'a map of fees, slippage, latency, calendar — each linked to code lines' },
                },
                {
                    name: { ru: 'Ловить подглядывание в будущее тестами', en: 'Catch look-ahead bias with tests' },
                    proof: { ru: 'набор тестов, где хотя бы один упал на первой версии', en: 'a test set where at least one failed on the first version' },
                },
                {
                    name: { ru: 'Убрать пересечение приватных данных и канала наружу', en: 'Break the overlap of private data and an outbound channel' },
                    proof: { ru: 'схема контура с устранённым пересечением', en: 'a loop diagram with the overlap removed' },
                },
            ],
            tasks: [
                { ru: 'Проверка гипотез и ресёрч', en: 'Hypothesis testing and research' },
                { ru: 'Аудит чужого бэктеста', en: 'Auditing someone else’s backtest' },
                { ru: 'Разбор режимов рынка и отчётность', en: 'Market-regime analysis and reporting' },
                { ru: 'Контроль рисков в автоматизированных стратегиях', en: 'Risk control in automated strategies' },
                { ru: 'Разбор данных по сделкам', en: 'Trade data analysis' },
            ],
            notFor: {
                ru: 'Здесь НЕТ торговых сигналов, готовых стратегий и обещаний доходности. Трек учит проверять, а не зарабатывать: ровно наоборот — большая часть работы состоит в том, чтобы находить, почему красивый бэктест врёт.',
                en: 'There are NO trading signals, ready strategies, or return promises here. The track teaches verification, not earning: most of the work is finding out why a pretty backtest is lying.',
            },
            tools: ['quantconnect', 'openbb', 'nautilus-trader', 'kaggle', 'google-colab', 'deepseek', 'claude'],
        },

        // ============================================================
        'security-eng': {
            level: { ru: 'Экспертный · нужен опыт в безопасности', en: 'Expert · security experience required' },
            audience: [
                { ru: 'Инженеры безопасности и AppSec', en: 'Security and AppSec engineers' },
                { ru: 'SRE и владельцы интеграций', en: 'SREs and integration owners' },
                { ru: 'Архитекторы, согласующие ИИ-решения', en: 'Architects signing off on AI solutions' },
                { ru: 'Те, кто принимает ИИ-подрядчиков', en: 'Those accepting AI vendor deliverables' },
            ],
            promise: {
                ru: 'Есть карта мест, где LLM уже подключён к вашим данным и действиям, и по каждой точке отмечено, складывается ли летальная триада — а для одной интеграции написаны валидаторы и собран набор атак.',
                en: 'You hold a map of every place an LLM already touches your data and actions, each point marked for the lethal trifecta — and for one integration you have written validators and assembled an attack set.',
            },
            competencies: [
                {
                    name: { ru: 'Найти все места, где LLM подключён к данным и действиям', en: 'Find every place an LLM touches data and actions' },
                    proof: { ru: 'карта интеграций своей организации', en: 'an integration map of your organisation' },
                },
                {
                    name: { ru: 'Определить, где складывается летальная триада', en: 'Determine where the lethal trifecta assembles' },
                    proof: { ru: 'отметка по каждой точке карты', en: 'a marking against every point on the map' },
                },
                {
                    name: { ru: 'Написать входной и выходной валидаторы', en: 'Write input and output validators' },
                    proof: { ru: 'работающие валидаторы для одной реальной интеграции', en: 'working validators for one real integration' },
                },
                {
                    name: { ru: 'Урезать права до необходимого минимума', en: 'Cut permissions to the necessary minimum' },
                    proof: { ru: 'сокращённые скоупы токена и список инструментов', en: 'reduced token scopes and a trimmed tool list' },
                },
                {
                    name: { ru: 'Держать перезапускаемый набор атакующих кейсов', en: 'Maintain a re-runnable attack case set' },
                    proof: { ru: 'десять-пятнадцать кейсов с зафиксированным результатом прогона', en: 'ten to fifteen cases with recorded run results' },
                },
            ],
            tasks: [
                { ru: 'Аудит ИИ-интеграций перед запуском', en: 'Auditing AI integrations before launch' },
                { ru: 'Защита ассистентов от инъекций', en: 'Hardening assistants against injection' },
                { ru: 'Приёмка вендорских ИИ-решений', en: 'Accepting vendor AI solutions' },
                { ru: 'Регламенты доступа для ИИ-инструментов', en: 'Access policies for AI tooling' },
                { ru: 'Разбор инцидентов с ИИ-контуром', en: 'Incident analysis in AI-connected systems' },
            ],
            notFor: {
                ru: 'Промпт-инъекция на сегодня не имеет надёжного решения, и трек его не выдаёт. Он учит сокращать поверхность и ловить провалы, а не обещает защиту.',
                en: 'Prompt injection has no reliable fix today, and this track does not sell one. It teaches surface reduction and failure detection, not protection guarantees.',
            },
            tools: ['garak', 'pyrit', 'llama-guard', 'nemo-guardrails', 'guardrails-ai', 'lakera', 'model-context-protocol'],
        },
    };

    const ORDER = ['generalist', 'developer', 'agent-architect', 'memory-eng', 'ai-analyst', 'quant', 'security-eng'];

    return { PROFILES: P, ORDER: ORDER };
})();
