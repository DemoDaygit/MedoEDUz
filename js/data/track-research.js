/**
 * ============================================================
 *  MedoEDUz — доказательная база треков обучения
 * ============================================================
 *
 *  ФАЙЛ ГЕНЕРИРУЕТСЯ. Собран проходом с проверкой: каждая ссылка
 *  открывалась, каждая цифра сверялась с первоисточником. Пункты,
 *  которые подтвердить не удалось, ВЫБРОШЕНЫ, а не переформулированы
 *  помягче — иначе витрина честности сама становится выдумкой.
 *
 *  У каждого факта есть kind — природа данных:
 *    experiment · telemetry · jobs · stats · survey · vendor
 *  Порядок не случаен: опрос самооценки и телеметрия не равны по
 *  весу, и страница обязана показывать разницу ДО вывода.
 *
 *  Тексты лежат парами {ru, en}: русский — исходник, английский —
 *  надстройка (как в реестре моделей). Словарь сайта тут не нужен.
 *
 *  Разделы gaps и tensions — намеренно на виду: платформа заявляет
 *  честность, и признание пробелов её подтверждает.
 */

window.TRACK_RESEARCH = {
 "tracks": {
  "generalist": {
   "lede": {
    "ru": "Данные не разрешают сказать «ИИ ускоряет офисную работу»: в одной и той же таблице DBT черновик документа экономит 1,3 часа, а составление расписания занимает на 0,6 часа ДОЛЬШЕ, и заранее эта граница не видна — у BCG на задаче вне возможностей модели верный ответ получался на 19 процентных пунктов реже. Трек существует ради умения различать эти два случая, и он почти никогда не даёт новую должность: 51% вакансий с ИИ-навыками уже вне ИТ, то есть он переписывает ту работу, которая у вас есть.",
    "en": "The data does not license the claim that AI speeds up office work: in DBT's own table, drafting a document saves 1.3 hours while scheduling takes 0.6 hours LONGER — and the boundary is invisible in advance, since in the BCG experiment a task outside the model's range made correct answers 19 percentage points rarer. This track exists for the skill of telling those two cases apart, and it almost never hands you a new job title: 51% of AI-skill postings already sit outside IT, so it rewrites the work you already have."
   },
   "demand": [
    {
     "claim": {
      "ru": "Официальная статистика ЕС: в 2025 году ИИ использовали 20,0% предприятий с 10+ сотрудниками — против 13,5% годом раньше и 8,1% в 2023-м. Самое частое применение — разбор написанного текста (11,8%); генерация текста идёт лишь третьей (8,8%), уступая генерации картинок, видео и звука (9,5%).",
      "en": "Official EU statistics: in 2025, 20.0% of enterprises with 10+ employees used AI, up from 13.5% a year earlier and 8.1% in 2023. The single most common use is analysing written language (11.8%); generating written or spoken language ranks only third (8.8%), behind generating images, video and audio (9.5%)."
     },
     "figure": "20,0% предприятий ЕС (2025) против 13,5% (2024) и 8,1% (2023); разбор написанного текста 11,8%, генерация картинок/видео/звука 9,5%, генерация текста 8,8%, речь-в-текст 7,2%",
     "kind": "stats",
     "caveat": {
      "ru": "«Предприятие использует ИИ» не значит, что им пользуется рядовой сотрудник: достаточно одного отдела на всю компанию. И это ЕС, а не мир: разброс по странам от 5,2% (Румыния) до 42,0% (Дания). Порядок применений тоже правят аккуратно: текстовые сценарии не «самые частые» вместе — между ними стоит генерация картинок.",
      "en": "\"The enterprise uses AI\" does not mean an ordinary employee uses it — one department is enough to count. And this is the EU, not the world: country figures run from 5.2% (Romania) to 42.0% (Denmark). The ranking also needs care: the two text use cases are not the top two together — image generation sits between them."
     },
     "source": {
      "title": "20% of EU enterprises use AI technologies",
      "url": "https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20251211-2",
      "org": "Eurostat (Статистическая служба ЕС)",
      "date": "11 декабря 2025"
     }
    },
    {
     "claim": {
      "ru": "Больше половины вакансий, где спрашивают навыки ИИ, лежат вне ИТ: 51% в 2024 году. Надбавка к заявленной зарплате — 28% (около $18 тыс./год), а при двух и более ИИ-навыках доходит до 43%. Три сферы с самой большой надбавкой — поддержка клиентов, продажи и производство.",
      "en": "More than half of postings that ask for AI skills sit outside IT: 51% in 2024. The advertised salary premium is 28% (roughly $18,000 a year), rising to 43% for postings naming two or more AI skills. The three fields with the largest premium are Customer and Client Support, Sales, and Manufacturing and Production."
     },
     "figure": "51% вакансий с требованием ИИ-навыков — вне ИТ и computer science (2024, было 49%); +28% к заявленной зарплате (~$18 тыс./год), +43% при двух и более навыках; свыше 1,3 млрд объявлений",
     "kind": "jobs",
     "caveat": {
      "ru": "Вакансия — заявка работодателя, а не найм: сколько таких людей реально взяли, отсюда не видно. И 28% — корреляция по тексту объявления: вакансии с ИИ в среднем старше по грейду и сложнее, из этого не следует, что навык сам добавляет денег. Речь о ЗАЯВЛЕННОЙ в объявлении зарплате, а не о фактически выплаченной.",
      "en": "A posting is an employer's wish, not a hire — it says nothing about who actually got hired. And the 28% is a correlation drawn from posting text: AI-mentioning postings skew more senior and more complex to begin with, so it does not follow that the skill itself adds pay. This is the ADVERTISED salary, not what was actually paid."
     },
     "source": {
      "title": "Beyond the Buzz: Developing the AI Skills Employers Actually Need",
      "url": "https://lightcast.io/resources/blog/beyond-the-buzz-press-release-2025-07-23",
      "org": "Lightcast",
      "date": "23 июля 2025"
     }
    },
    {
     "claim": {
      "ru": "По национально репрезентативному опросу США в мае 2026 года 45,2% работающих применяли генИИ для работы. Но по оценке самих респондентов ИИ занимает 6,3% рабочих часов и сэкономил 2,2%.",
      "en": "A nationally representative US survey found 45.2% of employed respondents using genAI for work as of May 2026. Yet by respondents' own estimates, AI occupies 6.3% of total work hours and saved 2.2%."
     },
     "figure": "45,2% работающих используют генИИ для работы; 6,3% рабочих часов с генИИ; 2,2% сэкономленных часов (май 2026)",
     "kind": "survey",
     "caveat": {
      "ru": "«Использовал» — очень низкая планка: туда попадает и один раз за месяц. Все три цифры, включая экономию времени, получены со слов респондентов, а не замером: снаружи их никто не проверял. Трекер идёт при поддержке Walmart — не порок, но знать стоит.",
      "en": "\"Used\" is a very low bar — once in a month counts. All three numbers, the time saving included, come from what respondents said rather than from measurement: nobody verified them from outside. The tracker runs with support from Walmart — not a flaw, but worth knowing."
     },
     "source": {
      "title": "GenAI Adoption Tracker",
      "url": "https://genaiadoptiontracker.com/",
      "org": "Harvard Project on Workforce; авторы — Bick (Федеральный резервный банк Сент-Луиса), Blandin (Vanderbilt), Deming (Harvard Kennedy School)",
      "date": "май 2026 (волна опроса)"
     }
    },
    {
     "claim": {
      "ru": "В опросе работодателей WEF «ИИ и большие данные» — навык с самым быстрым ожидаемым ростом спроса, впереди сетей с кибербезопасностью и технологической грамотности. 86% работодателей ждут, что их бизнес к 2030 году преобразят ИИ и обработка информации. В среднем 39% нынешних навыков работника, по их оценке, преобразуются или устареют за 2025–2030 годы.",
      "en": "In the WEF employer survey, \"AI and big data\" is the fastest-growing skill in expected demand, ahead of networks and cybersecurity and technological literacy. 86% of employers expect AI and information processing technologies to transform their business by 2030. On average, they expect 39% of a worker's existing skill set to be transformed or become outdated over 2025-2030."
     },
     "figure": "«ИИ и большие данные» — навык №1 по ожидаемому росту спроса; 86% работодателей называют преобразующими ИИ и обработку информации; 39% нынешних навыков преобразуются или устареют к 2030",
     "kind": "survey",
     "caveat": {
      "ru": "Это ожидания, а не факты: компании отвечают, что думают про будущее. Две частые подмены при пересказе: 86% относятся к «ИИ И обработке информации», а не к одному ИИ, а 39% — это «преобразуются ИЛИ устареют», что гораздо слабее, чем «устареют». Такие прогнозы систематически оптимистичны по срокам.",
      "en": "These are expectations, not outcomes: firms report what they think will happen. Two substitutions creep in when this is retold: the 86% covers \"AI AND information processing\", not AI alone, and the 39% is \"transformed OR outdated\", which is much weaker than \"outdated\". Such forecasts run systematically optimistic on timing."
     },
     "source": {
      "title": "The Future of Jobs Report 2025",
      "url": "https://www.weforum.org/publications/the-future-of-jobs-report-2025/digest/",
      "org": "Всемирный экономический форум (WEF)",
      "date": "7 января 2025"
     }
    },
    {
     "claim": {
      "ru": "Indeed разобрал текст вокруг каждого упоминания ИИ в вакансиях. 52% — про создание или прямое применение ИИ, но около четверти упоминаний не несут внятного смысла вообще, а 14% — просто про ИИ-инструменты в найме. В творческих профессиях, маркетинге и менеджменте больше 60% упоминаний — именно применение.",
      "en": "Indeed parsed the text around every AI mention in job postings. 52% concern building or directly using AI, but about a quarter carry no discernible use case at all, and 14% are merely about AI tools used in recruiting. In arts and entertainment, marketing and management, over 60% of mentions are about applying AI."
     },
     "figure": "52% упоминаний ИИ — создание/прямое применение; ~25% без внятного смысла; 14% — ИИ в рекрутинге; 74% пишут просто «ИИ», лишь 2% называют ChatGPT (591 ключевое слово, июль 2024 – июнь 2025)",
     "kind": "jobs",
     "caveat": {
      "ru": "Упоминание ИИ в вакансии часто не требование, а фон — HR вписал модное слово. Считать «долю вакансий с ИИ» мерой спроса на навык значит завышать её примерно вдвое. Это данные Indeed, то есть одна площадка, а не весь рынок.",
      "en": "An AI mention in a posting is often background noise rather than a requirement — HR added a fashionable word. Treating \"share of postings mentioning AI\" as demand for the skill roughly doubles the real figure. And this is Indeed data — one platform, not the whole market."
     },
     "source": {
      "title": "How Employers Are Talking About AI in Job Postings",
      "url": "https://www.hiringlab.org/2025/10/28/how-employers-are-talking-about-ai-in-job-postings/",
      "org": "Indeed Hiring Lab",
      "date": "28 октября 2025"
     }
    }
   ],
   "mechanics": [
    {
     "process": {
      "ru": "Офисная работа целого министерства: черновики документов и брифингов, конспекты встреч и исследований, поиск по внутренним файлам, письма, слайды, таблицы.",
      "en": "The everyday office work of a whole government department: drafting documents and briefings, summarising meetings and research, searching internal files, email, slides, spreadsheets."
     },
     "pattern": {
      "ru": "M365 Copilot встроен прямо в Word, Outlook, Teams и Excel: черновик и конспект делает он, отправляет и подписывается человек. Проверку вывода никто не отменял, и она сама стоит времени: по письмам проверка чаще выходила быстрее, чем без ИИ (51% случаев), по слайдам в 30% случаев ДОЛЬШЕ. Сотрудники сами сообщали о галлюцинациях, а отчёт прямо констатирует несогласованность проверки вывода между людьми и типами задач.",
      "en": "M365 Copilot is embedded in Word, Outlook, Teams and Excel: it produces the draft or the summary, the human sends and signs off. Checking the output is still on the human and costs time of its own: for email, quality assurance was more often faster than without AI (51% of reported cases), while for slides it took LONGER in 30% of cases. Staff themselves reported hallucinations, and the report explicitly records inconsistency in quality-assuring output across people and task types."
     },
     "outcome": {
      "ru": "Экономия на задачу после поправок на неиспользованные ответы и на работу, возникшую только из-за инструмента (дневник самоотчётов, N=1411): черновик документа −1,3 ч, конспект исследования −0,8 ч, конспект встречи и поиск информации −0,7 ч, письмо всего −0,2 ч. Составление расписания и генерация картинок вышли в минус (в терминах отчёта −0,6 и −0,5 «сэкономленного» часа), то есть заняли ДОЛЬШЕ, чем без ИИ. Слепая оценка наблюдаемых задач разошлась по видам работы: конспект отчёта и быстрее (12:37 против 41:34), и лучше (качество 4 против 3, точность 4 против 2,5); слайды быстрее (10:47 против 18:30), но хуже (точность 1,5 против 5); анализ в Excel — и медленнее, и хуже (25:01 против 20:33, точность 1,5 против 2,7). Ключевая оговорка: наблюдаемых сессий было всего 11 участников (3 против 3 на Excel и слайдах, 3 против 2 на конспекте и письме), и отчёт сам называет их лишь дополнением к основным данным. Про производительность отчёт пишет: «не нашли надёжных доказательств», добавляя, что это не было целью оценки и данных для такого вывода собирали мало; при этом коллеги из контрольной группы улучшений у участников пилота не заметили.",
      "en": "Time saved per task after adjusting for unused outputs and for work that existed only because the tool did (self-report diary, N=1,411): drafting a document −1.3 h, summarising research −0.8 h, summarising a meeting and searching for information −0.7 h each, writing an email only −0.2 h. Scheduling and image generation came out negative (−0.6 and −0.5 \"hours saved\" in the report's own terms), i.e. they took LONGER than without AI. Blind-assessed observed tasks split by work type: report summaries were both faster (12:37 vs 41:34) and better (quality 4 vs 3, accuracy 4 vs 2.5); slides were faster (10:47 vs 18:30) but worse (accuracy 1.5 vs 5); Excel analysis was both slower and worse (25:01 vs 20:33, accuracy 1.5 vs 2.7). The load-bearing caveat: the observed sessions involved just 11 participants (3 vs 3 on Excel and slides, 3 vs 2 on summarising and email), and the report itself calls them merely supplementary. On productivity it says it found \"no robust evidence\", adding that this was not an aim of the evaluation and little data was collected for such a conclusion; control-group colleagues had not observed improvements in pilot participants."
     },
     "kind": "vendor",
     "source": {
      "title": "The Evaluation of the M365 Copilot Pilot in the Department for Business and Trade",
      "url": "https://assets.publishing.service.gov.uk/media/68adbe409e1cebdd2c96a19d/dbt-microsoft-365-copilot-evaluation.pdf",
      "org": "Департамент бизнеса и торговли Великобритании (DBT)",
      "date": "август 2025 (пилот: октябрь — декабрь 2024, 1000 лицензий)"
     }
    },
    {
     "process": {
      "ru": "Повседневные задачи 3549 сотрудников министерства труда и пенсий: поиск информации, письма, конспекты, вычитка своего текста, расшифровка встреч.",
      "en": "The daily tasks of 3,549 staff at the UK work and pensions ministry: finding information, writing email, summarising, checking their own writing, transcribing meetings."
     },
     "pattern": {
      "ru": "Тот же встроенный ассистент, но эффект оценивали эконометрически по восьми рутинным задачам, а не только опросом. Место человека сотрудники описали сами: вывод — «полезная отправная точка, а не готовый продукт». Ясность и тон он улучшает, но редактировать надо всё равно; отчёт подчёркивает, что пользователи последовательно проверяли и правили вывод перед использованием, а часть отметила, что двойная работа выигрыш съедала: «пришлось возвращаться и проверять, что это вообще по теме… если бы я сделал вручную с самого начала, вышло бы лучше».",
      "en": "The same embedded assistant, but the effect was estimated econometrically across eight routine tasks rather than by survey alone. Staff described the human's place themselves: the output is \"a useful starting point, rather than a finished product\". It improves clarity and tone, but editing is still required; the report stresses that users consistently reviewed and edited outputs before using them, and some noted that double-handling ate the gain: \"I had to go back and look and make sure that they were relevant […] I just felt if I had done it manually from the beginning, it would have been better.\""
     },
     "outcome": {
      "ru": "19 минут в день на пользователя — эконометрическая оценка (регрессия с контролем на демографию, род занятий и изначальный энтузиазм к ИИ), а не самооценка. По задачам, тоже в минутах в день: поиск информации 26, письма 25, конспекты 24; меньше всего — расшифровка и конспекты встреч, 9. Удовлетворённость работой выросла на 0,56 по 7-балльной шкале (средний размер эффекта). 89% осваивали инструмент самостоятельным исследованием — но это не «только сами»: 77% пользовались материалами DWP, 61% учились у коллег, и одно другого не исключает. 85% оценили точность конспектов встреч как хорошую или очень хорошую, при этом поиск иногда выдавал нерелевантное, а Excel и PowerPoint отмечены как проблемные.",
      "en": "19 minutes per user per day — an econometric estimate (regression controlling for demographics, occupation and prior AI keenness), not self-assessment. By task, also in minutes per day: searching for information 26, writing emails 25, summarising 24; the smallest was transcribing and summarising meetings at 9. Job satisfaction rose 0.56 points on a 7-point scale (a medium effect size). 89% learned the tool through self-directed exploration — but that is not \"unaided\": 77% also used DWP-provided resources and 61% learned from peers, and these overlap. 85% rated meeting-note accuracy good or very good, while search sometimes returned irrelevant results, and Excel and PowerPoint were flagged as problem areas."
     },
     "kind": "survey",
     "source": {
      "title": "An Evaluation of DWP's Microsoft 365 Copilot Trial",
      "url": "https://www.gov.uk/government/publications/an-evaluation-of-dwps-microsoft-copilot-365-trial/an-evaluation-of-dwps-microsoft-365-copilot-trial",
      "org": "Департамент труда и пенсий Великобритании (DWP)",
      "date": "29 января 2026 (пилот: октябрь 2024 — март 2025)"
     }
    },
    {
     "process": {
      "ru": "Почта, документы и встречи у более 6000 сотрудников 56 компаний разных отраслей и уровней.",
      "en": "Email, documents and meetings across more than 6,000 workers at 56 firms spanning industries and seniority levels."
     },
     "pattern": {
      "ru": "Доступ к Copilot раздали случайным образом внутри пула подходящих сотрудников, распределение держали не меньше шести месяцев, а замеряли не опросом, а обезличенной телеметрией Outlook, Teams и Office до и после — редкий случай, когда офисный эффект видно в поведении, а не в ответах анкеты. Содержимое работы авторы не видели вообще, только распределение времени, поэтому про КАЧЕСТВО этот замер не говорит ничего. Человек остаётся автором: ассистент сжимает входящее и отдаёт черновик.",
      "en": "Copilot access was randomised within a pool of suitable workers, the assignment was held for at least six months, and the outcome was measured not by survey but by anonymised Outlook, Teams and Office telemetry before and after — a rare case where the office effect shows up in behaviour rather than questionnaire answers. The authors never saw the content of the work, only how time was allocated, so this measurement says nothing about QUALITY. The human stays the author: the assistant compresses the inbound material and hands over a draft."
     },
     "outcome": {
      "ru": "Чтение почты: контрольная группа тратила 2,8 ч в неделю, получившие доступ — на 12 минут меньше (−7%); у тех, кто пользовался хотя бы раз в неделю, — более чем на полчаса меньше (−18%). Документ, где сотрудник главный редактор, закрывается в среднем на полдня быстрее (+6%), у регулярных пользователей — почти на день (12%); обычный документ идёт 7 дней. Время на встречах НЕ сократилось, хотя конспект встречи — самый частый сценарий: изменения статистически незначимы, а по фирмам столько же случаев значимого падения, сколько роста. Число писем, на которые ответили, не изменилось — экономию получили не тем, что стали игнорировать работу. Регулярно пользовались около 40% получивших доступ.",
      "en": "Email reading: the control group spent 2.8 hours a week; those given access spent 12 minutes less (−7%), and those who used it at least weekly spent more than half an hour less (−18%). Documents where the worker is the primary editor close half a day faster on average (+6%), and nearly a full day faster for regular users (12%); an average document takes 7 days. Meeting time did NOT fall, even though summarising meetings was the most common use: the changes are statistically insignificant, and across firms there were as many significant decreases as increases. The number of email conversations replied to was unchanged — the savings did not come from ignoring work. About 40% of those given access used it regularly."
     },
     "kind": "experiment",
     "source": {
      "title": "Early Impacts of M365 Copilot (arXiv:2504.11443)",
      "url": "https://arxiv.org/abs/2504.11443",
      "org": "Microsoft (Dillon, Jaffe, Peng, Cambon)",
      "date": "6 января 2025 (дата в статье; выложено на arXiv 15 апреля 2025)"
     }
    },
    {
     "process": {
      "ru": "Поддержка клиентов в чате: 5179 операторов в реальной компании, а не в лаборатории.",
      "en": "Chat-based customer support: 5,179 agents in a real company, not a lab."
     },
     "pattern": {
      "ru": "Ассистент подсказывает формулировку ответа в реальном времени, а отправляет её оператор — человек остаётся тем, кто говорит с клиентом и решает, что уйдёт. Механика эффекта важнее самой цифры: авторы объясняют его тем, что модель разносит приёмы сильных операторов на слабых, то есть работает как встроенное наставничество, и отмечают признаки того, что операторы при этом учатся.",
      "en": "The assistant suggests wording in real time and the agent sends it — the human remains the one talking to the customer and deciding what goes out. The mechanism matters more than the headline number: the authors attribute it to the model spreading the practices of strong agents to weak ones, effectively embedded coaching, and note signs that agents themselves learn in the process."
     },
     "outcome": {
      "ru": "+14% решённых обращений в час в среднем. Но среднее обманчиво: у новичков и малоквалифицированных +34%, у опытных и сильных — минимальный эффект. Дополнительно улучшились оценки клиентов и выросла удерживаемость сотрудников.",
      "en": "+14% issues resolved per hour on average. But the average is misleading: novice and low-skilled agents gained 34%, while experienced and highly skilled agents saw minimal impact. Customer sentiment improved and employee retention rose."
     },
     "kind": "telemetry",
     "source": {
      "title": "Generative AI at Work (NBER Working Paper 31161)",
      "url": "https://www.nber.org/papers/w31161",
      "org": "NBER (Brynjolfsson, Li, Raymond)",
      "date": "апрель 2023, ред. ноябрь 2023"
     }
    },
    {
     "process": {
      "ru": "Консалтинговая работа: 758 консультантов BCG (около 7% консультантов компании уровня индивидуального исполнителя) на 18 реалистичных рабочих задачах.",
      "en": "Consulting work: 758 BCG consultants (about 7% of the firm's individual-contributor-level consultants) on 18 realistic work tasks."
     },
     "pattern": {
      "ru": "Предрегистрированный эксперимент со случайным распределением по трём условиям: без ИИ, с GPT-4, с GPT-4 плюс краткий обзор промпт-инжиниринга. Место человека оказалось решающим и распалось на два рабочих рисунка: «кентавры» делят работу с моделью по кускам и делегируют осознанно, «киборги» непрерывно переплетают свои шаги с её. Проигравшие делали третье: авторы отмечают, что у тех, чей результат С ИИ был отрицательным, была склонность слепо принимать вывод и меньше его допрашивать.",
      "en": "A pre-registered experiment randomising consultants into three conditions: no AI, GPT-4, and GPT-4 plus a prompt-engineering overview. The human's role turned out to be decisive and split into two working patterns: \"centaurs\" divide the work and delegate deliberately, \"cyborgs\" continuously interleave their own steps with the model's. Those who did worst did a third thing: the authors note that consultants whose performance WITH AI was negative tended to blindly adopt its output and interrogate it less."
     },
     "outcome": {
      "ru": "На задачах внутри возможностей модели: выполнено на 12,2% больше задач, на 25,1% быстрее, качество выше более чем на 40% относительно контрольной группы. Те, кто был ниже среднего порога, прибавили 43%, те, кто выше, — 17%, каждый к своим же прежним результатам. А на задаче, специально выбранной ВНЕ возможностей модели, консультанты с ИИ давали верное решение на 19 процентных пунктов реже, чем те, у кого ИИ не было. Отсюда «зубчатая граница»: задачи по обе стороны от неё выглядят одинаково сложными, и заранее не видно, где она проходит.",
      "en": "On tasks inside the model's capability: 12.2% more tasks completed, 25.1% faster, and more than 40% higher quality relative to the control group. Those below the average performance threshold gained 43% and those above it 17%, each against their own prior scores. But on a task deliberately chosen to sit OUTSIDE the model's capability, consultants using AI were 19 percentage points less likely to reach the correct solution than those without it. Hence the \"jagged frontier\": tasks on either side of it look equally hard, and there is no way to see in advance where it runs."
     },
     "kind": "experiment",
     "source": {
      "title": "Navigating the Jagged Technological Frontier: Field Experimental Evidence of the Effects of AI on Knowledge Worker Productivity and Quality",
      "url": "https://mitsloan.mit.edu/sites/default/files/2023-10/SSRN-id4573321.pdf",
      "org": "Harvard Business School, BCG Henderson Institute, MIT, Wharton (Dell'Acqua, McFowland, Mollick и др.)",
      "date": "сентябрь 2023"
     }
    }
   ],
   "roles": [
    {
     "title": {
      "ru": "Специалист своей области, усиленный ИИ (аналитик, маркетолог, HR, юрист, закупщик, администратор)",
      "en": "A specialist in their own field, amplified by AI (analyst, marketer, HR, lawyer, procurement, administrator)"
     },
     "note": {
      "ru": "Главная честная роль трека: он почти никогда не даёт новую должность, он переписывает старую. По данным Lightcast 51% вакансий с ИИ-навыками уже вне ИТ, а самая большая надбавка в объявлениях — в поддержке клиентов, продажах и производстве, то есть в профессиях, которые техническими не считают. Трек ведёт сюда, потому что учит применять инструмент к своим задачам, а не строить его.",
      "en": "The honest headline role: this track almost never hands you a new job title, it rewrites the one you have. Lightcast finds 51% of AI-skill postings already sit outside IT, and the largest advertised premium is in Customer and Client Support, Sales, and Manufacturing — occupations nobody calls technical. The track leads here because it teaches applying the tool to your own work, not building it."
     }
    },
    {
     "title": {
      "ru": "Внутренний проводник внедрения (AI champion)",
      "en": "Internal adoption champion (AI champion)"
     },
     "note": {
      "ru": "Обе британские оценки указывают на дыру, которую закрывает эта роль. В DBT пользователи, по наблюдению отчёта, были менее склонны браться за инструмент, если их коллеги и руководитель относились к нему настороженно (отчёт помечает это как анекдотическое наблюдение, не как измеренный эффект), а сотрудники без лицензий говорили, что решение о внедрении у себя примут по увиденным успешным примерам из пилота. В DWP 89% осваивали инструмент самостоятельным исследованием, и пользователи просили короткие занятия и шпаргалки под свою роль. Вендор этого не даёт — даёт коллега за соседним столом.",
      "en": "Both UK evaluations point at the gap this role fills. At DBT, users were observed to be less likely to reach for the tool when colleagues and line managers were hesitant about it (the report flags this as an anecdotal observation, not a measured effect), and staff without licences said their own adoption decision would turn on seeing successful use cases from the pilot. At DWP, 89% learned the tool through self-directed exploration, and users asked for short, role-specific sessions and cheat sheets. No vendor supplies that — the colleague at the next desk does."
     }
    },
    {
     "title": {
      "ru": "Автор регламентов проверки ИИ-вывода",
      "en": "Owner of output-verification standards"
     },
     "note": {
      "ru": "DBT прямо пишет про несогласованность проверки вывода между людьми и типами задач и про галлюцинации, о которых сообщали сами сотрудники. Цифры показывают, что проверка — не бесплатная добавка, а часть стоимости: по слайдам она в 30% случаев занимала БОЛЬШЕ времени, чем без ИИ, а расписание оказалось сценарием с самой высокой долей случаев (36%), где вывод не проверяли или проверку не с чем было сравнить. Кто-то должен решить, что проверяется обязательно, кем и по какому признаку — иначе экономия времени уходит в риск. Трек ведёт сюда через навык проверки.",
      "en": "DBT explicitly reports inconsistent quality assurance across people and task types, plus hallucinations reported by staff themselves. The numbers show verification is not a free add-on but part of the cost: for slides it took LONGER than without AI in 30% of cases, and scheduling was the use case with the highest share of cases (36%) where the output was not quality-assured or the check was not comparable. Someone has to decide what must be verified, by whom, and against what — otherwise time saved converts into risk. The track leads here through the verification skill."
     }
    },
    {
     "title": {
      "ru": "Специалист по обучению сотрудников работе с ИИ (L&D)",
      "en": "Learning-and-development specialist for AI at work"
     },
     "note": {
      "ru": "Спрос есть, а работающего формата почти нет — и это видно в данных. DWP: 89% осваивали инструмент самостоятельным исследованием, посещение формального обучения было неровным, люди просили короткие занятия под роль. DBT нашёл вещь ещё неприятнее: самостоятельное обучение поднимало удовлетворённость статистически значимо, а посещение департаментских сессий — нет. WEF при этом оценивает, что в среднем 39% нынешних навыков работника преобразуются или устареют к 2030 году. Учить надо, но иначе, чем сейчас.",
      "en": "The demand is real and the working format mostly isn't — and the data shows it. DWP: 89% learned through self-directed exploration, formal training attendance was patchy, and users asked for short role-specific sessions. DBT found something less comfortable still: self-led training raised satisfaction significantly while attendance at departmental sessions did not. Meanwhile WEF estimates that on average 39% of a worker's current skills will be transformed or outdated by 2030. Training is needed — but not the training that exists."
     }
    }
   ],
   "skills": [
    {
     "name": {
      "ru": "Сформулировать задачу: контекст, роль, формат ответа, признак готовности",
      "en": "State the task properly: context, role, output format, and what \"done\" looks like"
     },
     "why": {
      "ru": "Базовый путь Microsoft для рядового сотрудника (роль «бизнес-пользователь») строит первый же модуль вокруг рамки из четырёх элементов промпта — это то, чему учат в первую очередь тех, кто уже сидит в Word и Outlook. Документация Anthropic начинается с того же требования с другой стороны: сперва определи критерий успеха и способ его проверить. У Indeed в творческих профессиях, маркетинге и менеджменте больше 60% упоминаний ИИ в вакансиях — именно применение, а не разработка.",
      "en": "Microsoft's entry path for ordinary staff (the \"business user\" role) builds its very first module around a four-element prompting framework — the first thing taught to people who already live in Word and Outlook. Anthropic's documentation opens with the same demand from the other side: first define your success criteria and a way to test against them. In Indeed's data, over 60% of AI mentions in arts, marketing and management postings are about applying AI, not building it."
     }
    },
    {
     "name": {
      "ru": "Проверять вывод до того, как он ушёл дальше",
      "en": "Verify output before it leaves your hands"
     },
     "why": {
      "ru": "В DBT сотрудники сами сообщали о галлюцинациях, а отчёт констатирует несогласованность проверки: по слайдам проверка в 30% случаев занимала БОЛЬШЕ времени, чем без ИИ, а расписание стало сценарием с самой высокой долей случаев (36%), где вывод не проверяли или сравнивать проверку было не с чем. В опыте BCG отрицательный результат от ИИ был связан именно со склонностью принимать вывод не оспаривая и меньше его допрашивать.",
      "en": "At DBT, staff themselves reported hallucinations and the report records inconsistent quality assurance: for slides, checking took LONGER than without AI in 30% of cases, and scheduling became the use case with the highest share (36%) where output was not checked or the check had nothing to compare against. In the BCG experiment, negative performance with AI went together with a tendency to accept output without challenge and interrogate it less."
     }
    },
    {
     "name": {
      "ru": "Отличать задачи, где ИИ помогает, от тех, где он мешает",
      "en": "Tell the tasks AI helps from the tasks it hurts"
     },
     "why": {
      "ru": "У DBT в одной таблице рядом стоят черновик документа (−1,3 ч) и составление расписания, которое с ИИ заняло на 0,6 ч ДОЛЬШЕ. У BCG на задаче, специально выбранной вне возможностей модели, верный ответ получался на 19 процентных пунктов реже. Границу заранее не видно — задачи по обе стороны выглядят одинаково простыми. Это самый дорогой навык трека и самый редко преподаваемый.",
      "en": "DBT's own table puts drafting a document (−1.3 h) next to scheduling, which took 0.6 h LONGER with AI. In the BCG experiment, a task deliberately chosen outside the model's range made correct answers 19 percentage points rarer. The boundary is invisible in advance — tasks on both sides look equally easy. This is the most valuable skill on the track and the least often taught."
     }
    },
    {
     "name": {
      "ru": "Сжимать длинное: отчёты, переписку, встречи",
      "en": "Compress the long stuff: reports, threads, meetings"
     },
     "why": {
      "ru": "Три независимых замера сходятся именно здесь. У DBT при слепой оценке конспект отчёта вышел втрое быстрее (12:37 против 41:34) и качественнее — правда, на выборке из пяти участников. У DWP конспекты дали 24 минуты в день, поиск информации — 26. У Microsoft на телеметрии чтение почты у регулярных пользователей упало на 18%. Это лучше всего подтверждённая польза во всём треке — при том что встречи выбиваются: время на них не сократилось ни у Microsoft, ни заметно у DWP (9 минут, меньше всех задач).",
      "en": "Three independent measurements converge here. In DBT's blind assessment, report summaries came out three times faster (12:37 vs 41:34) and better — though on a sample of five participants. At DWP, summarising yielded 24 minutes a day and finding information 26. In Microsoft's telemetry, regular users cut email reading time by 18%. This is the best-evidenced benefit on the whole track — with meetings the exception: meeting time did not fall for Microsoft and barely moved at DWP (9 minutes, the lowest of all tasks)."
     }
    },
    {
     "name": {
      "ru": "Понимать, куда уходят данные и что нельзя вводить",
      "en": "Know where your data goes and what must never be typed in"
     },
     "why": {
      "ru": "В DBT интервью зафиксировали значительный разброс знания политик допустимого использования, путаницу между M365 Copilot и Copilot Chat и то, что неуверенные в правилах вели себя излишне осторожно, ограничивая собственное использование: «я, наверное, был осторожнее, чем стоило». Незнание границ бьёт с двух сторон — и утечкой, и параличом. Путь Microsoft отдельно разбирает разницу между рабочими и веб-данными.",
      "en": "DBT's interviews recorded significant variance in knowledge of acceptable-use policies, confusion between M365 Copilot and Copilot Chat, and users unsure of the rules being overly cautious in ways that limited their own use: \"I was probably more hesitant to use it than I should have been.\" Not knowing the boundaries hurts both ways — leaks and paralysis. Microsoft's path covers work-grounded versus web-grounded data explicitly."
     }
    },
    {
     "name": {
      "ru": "Доводить черновик до своего голоса и стандартов организации",
      "en": "Bring a draft up to your own voice and your organisation's standards"
     },
     "why": {
      "ru": "В DWP пользователи описали вывод одной фразой: «полезная отправная точка, а не готовый продукт». Ясность и тон он улучшает, но редактировать всё равно надо — отчёт отмечает, что пользователи последовательно проверяли и правили вывод перед использованием, а часть прямо говорила, что двойная работа и перепроверка выигрыш съедали. Навык здесь не в генерации, а в правке.",
      "en": "DWP users summed the output up in one phrase: \"a useful starting point, rather than a finished product\". It improves clarity and tone, but editing is still required — the report notes users consistently reviewed and edited outputs before use, and some said outright that double-handling and re-checking ate the gain. The skill here is editing, not generating."
     }
    }
   ],
   "anchors": [
    {
     "title": "Elements of AI — Introduction to AI",
     "url": "https://www.elementsofai.com/",
     "org": "Университет Хельсинки и MinnaLearn",
     "why": {
      "ru": "Бесплатный курс без сложной математики и программирования, переведён на 40+ языков, больше 2 млн зарегистрированных студентов. Даёт то, чего не хватало обеим британским оценкам: базовое понимание, что модель делает и чего не делает. Именно оно снимает две ошибки, зафиксированные в исследованиях, — слепое доверие (BCG) и излишнюю осторожность из-за незнания правил (DBT).",
      "en": "A free course with no complicated maths and no programming, translated into 40+ languages, over 2 million enrolled students. It supplies what both UK evaluations found missing: a working picture of what a model does and does not do. That is what defuses the two failure modes the research recorded — blind trust (BCG) and excessive caution born of not knowing the rules (DBT)."
     }
    },
    {
     "title": "Generative AI for Everyone",
     "url": "https://www.deeplearning.ai/courses/generative-ai-for-everyone/",
     "org": "DeepLearning.AI (Andrew Ng)",
     "why": {
      "ru": "Около 5 часов видео, три недели по 1–2 часа, без требования знать код или ИИ. Три части: что такое генИИ и его применения; проекты на генИИ (включая то, что лежит за пределами промптинга); генИИ в бизнесе и обществе. Полезен ровно тем, что ставит вопрос «что эта штука может и чего не может» до вопроса «как ей пользоваться» — а различать это и есть навык, отделивший выигравших от проигравших в опыте BCG.",
      "en": "About five hours of video, three weeks at 1-2 hours, with no coding or AI prerequisite. Three parts: what genAI is and its applications; genAI projects (including what lies beyond prompting); genAI in business and society. Its value is putting \"what can this thing do and not do\" before \"how do I use it\" — and telling those apart is the very skill that separated winners from losers in the BCG experiment."
     }
    },
    {
     "title": "Draft, analyze, and present with Microsoft 365 Copilot (MS-4018)",
     "url": "https://learn.microsoft.com/en-us/training/paths/draft-analyze-present-microsoft-365-copilot/",
     "org": "Microsoft Learn",
     "why": {
      "ru": "Бесплатный путь из 7 модулей уровня «начинающий», среди целевых роль «бизнес-пользователь». Это буквально тот инструмент, который замеряли DBT, DWP и рандомизированный эксперимент Microsoft, так что учебник и доказательная база сходятся на одном предмете. Внутри: рамка промпта из четырёх элементов, PowerPoint, Word, Excel, Teams, Outlook и отдельно разница между рабочими и веб-данными. Помнить, что это документация вендора, а не независимая оценка, и что по Excel и PowerPoint обе британские оценки зафиксировали худшие результаты.",
      "en": "A free seven-module beginner path listing \"business user\" among its target roles. This is literally the tool measured by DBT, DWP and Microsoft's randomised experiment, so the course and the evidence base point at the same object. It covers a four-element prompting framework, PowerPoint, Word, Excel, Teams, Outlook, and the work-grounded versus web-grounded data distinction. Bear in mind it is vendor documentation, not an independent assessment — and that Excel and PowerPoint are exactly where both UK evaluations recorded the worst results."
     }
    },
    {
     "title": "Prompt engineering overview + интерактивные туториалы",
     "url": "https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/overview",
     "org": "Anthropic",
     "why": {
      "ru": "Открытая документация первоисточника: приёмы от ясности формулировки и примеров до структурирования тегами, роли, рассуждения и цепочек промптов. К ней приложены интерактивный туториал на GitHub и облегчённая версия в виде таблицы Google Sheets — то есть можно тренироваться, а не только читать. Важная деталь для трека: страница прямо начинается с того, что до правки промптов нужны критерий успеха и способ проверить результат против него.",
      "en": "Open first-party documentation: techniques from clarity and examples through tag structuring, role prompting, thinking and prompt chaining. It comes with an interactive tutorial on GitHub and a lighter-weight Google Sheets version, so you can practise rather than just read. A detail that matters for this track: the page opens by stating that before you tune prompts you need success criteria and a way to test against them."
     }
    },
    {
     "title": "AI Risk Management Framework 1.0 + Generative AI Profile (NIST-AI-600-1)",
     "url": "https://www.nist.gov/itl/ai-risk-management-framework",
     "org": "NIST (Национальный институт стандартов и технологий США)",
     "why": {
      "ru": "Бесплатный и добровольный, даёт словарь для самой слабой части повседневного внедрения: кто и что проверяет. Четыре функции — Govern, Map, Measure, Manage — превращают «надо перепроверять» в проверяемый порядок. Профиль по генеративному ИИ (26 июля 2024) перечисляет риски именно генИИ и предлагает действия по их управлению. Это ровно та дыра, которую DBT назвал несогласованностью проверки вывода. Оговорка: рамка организационная, а не учебник для рядового сотрудника.",
      "en": "Free and voluntary, it supplies vocabulary for the weakest part of everyday adoption: who checks what. The four functions — Govern, Map, Measure, Manage — turn \"we should double-check\" into an auditable practice. The Generative AI Profile (26 July 2024) enumerates genAI-specific risks and proposes management actions. This is precisely the gap DBT described as inconsistent quality assurance of output. Caveat: it is an organisational framework, not a course for an individual employee."
     }
    }
   ],
   "caveat": {
    "ru": "Самое важное, чего не видно за громкими цифрами: измеренный эффект мал в абсолюте. По национально репрезентативному опросу США (май 2026) генИИ занимает 6,3% рабочих часов, а сэкономил, по оценке самих работающих, 2,2%. Британский DBT пишет, что не нашёл НАДЁЖНЫХ доказательств превращения сэкономленного времени в производительность, и коллеги из контрольной группы улучшений у участников пилота не заметили, — но тут же оговаривает, что это не было целью оценки и данных для такого вывода собирали мало. Так что честная формулировка не «доказано, что связи нет», а «связь никто не показал»: между «сэкономил 19 минут на задачах» и «отдел стал работать лучше» лежит пропасть, которую пока не перешли ни в одну сторону.\n\nПочти все крупные цифры экономии — самоотчёт. Там, где работы оценивали слепо, картина разъехалась по видам задач: конспект отчёта вышел и быстрее, и лучше; слайды быстрее, но хуже; анализ в Excel медленнее И хуже. Но у этой самой интересной таблицы во всём треке всего 11 участников, и отчёт сам называет её дополнением к основным данным — точность вида «1,5 против 5» тут иллюзорна. Утверждение «ИИ ускоряет офисную работу» всё равно слишком общее, чтобы быть верным: он ускоряет одни задачи, портит другие, а заранее это не очевидно — у BCG на задаче вне возможностей модели верный ответ получался на 19 процентных пунктов реже.\n\nОценки внедрения расходятся в разы в зависимости от того, кто считает. Официальная статистика Евростата — 20% предприятий ЕС; Stanford AI Index 2026 сообщает про 88% организаций, использующих ИИ хотя бы в одной бизнес-функции. Это не спор о фактах, а разные определения и выборки. Причём тот же AI Index добавляет: меньше 10% организаций довели ИИ до полного масштаба хоть в одной функции. «Внедрили» и «работает» — разные вещи.\n\nС вакансиями та же беда: у четверти упоминаний ИИ нет внятного смысла вообще, 14% — просто про ИИ-инструменты в найме, а конкретный инструмент называют лишь в 2% случаев. Доля вакансий «с ИИ» переоценивает реальный спрос на навык примерно вдвое.\n\nСильнейшие причинные доказательства получены в узких условиях — операторы поддержки в чате одной компании, консультанты на учебных задачах, где «вне границы» была ОДНА специально сконструированная задача. Про «офисную работу в целом» база тоньше, чем кажется: обе британские оценки — без рандомизации и с самоотбором добровольцев (DWP прямо признаёт, что это могло завысить пользу), а единственный рандомизированный эксперимент с телеметрией офисных приложений спроектировал, провёл и опубликовал сам вендор, замеряя собственный продукт, и качество работы в нём не оценивалось вообще — только распределение времени. Даже в универсальном ассистенте использование смещено к технической работе: по Anthropic Economic Index на задачи «компьютерных и математических» профессий приходится 35% разговоров Claude.ai (данные февраля 2026), тогда как личные, нерабочие запросы — 42%. Про рядовую офисную работу данных просто меньше, чем про код.\n\nИ честно про карьеру: трек редко даёт новую должность. Он переписывает ту, что уже есть.",
    "en": "The thing the loud numbers hide: the measured effect is small in absolute terms. In a nationally representative US survey (May 2026), genAI occupies 6.3% of total work hours and saved, by respondents' own estimate, 2.2%. The UK's DBT states it found no ROBUST evidence that time saved turned into productivity, and control-group colleagues had noticed no improvement in pilot participants — but it immediately qualifies that this was not an aim of the evaluation and little data was gathered for such a conclusion. So the honest formulation is not \"the link is disproven\" but \"nobody has shown the link\": between \"saved 19 minutes across tasks\" and \"the department works better\" lies a gap not yet crossed in either direction.\n\nAlmost every large savings figure is self-reported. Where work was assessed blind, the picture split by task type: report summaries came out faster and better; slides faster but worse; Excel analysis slower AND worse. But the most interesting table on the whole track rests on just 11 participants, and the report itself calls it supplementary — precision like \"1.5 vs 5\" is illusory here. \"AI speeds up office work\" remains too broad to be true regardless: it speeds up some tasks, degrades others, and you cannot tell which in advance — in the BCG experiment, a task outside the model's range made correct answers 19 percentage points rarer.\n\nAdoption estimates differ several-fold depending on who is counting. Official Eurostat statistics say 20% of EU enterprises; the Stanford AI Index 2026 reports 88% of organisations using AI in at least one business function. This is not a dispute about facts but a difference of definition and sample. And the same AI Index adds that fewer than 10% of organisations have fully scaled AI in any single function. \"Adopted\" and \"working\" are different things.\n\nJob postings carry the same problem: a quarter of AI mentions have no discernible use case, 14% are merely about AI tools in recruiting, and only 2% name a specific tool. The share of postings \"with AI\" overstates real demand for the skill by roughly double.\n\nThe strongest causal evidence comes from narrow settings — chat support agents at a single firm, consultants on exercise tasks where \"outside the frontier\" meant ONE deliberately constructed task. The base for \"office work in general\" is thinner than it looks: both UK evaluations lacked randomisation and drew on self-selected volunteers (DWP openly concedes this may have overstated the benefit), and the one randomised experiment using office-application telemetry was designed, run and published by the vendor measuring its own product — and assessed no work quality at all, only how time was allocated. Even in a general-purpose assistant, usage skews technical: the Anthropic Economic Index puts tasks from Computer and Mathematical occupations at 35% of Claude.ai conversations (February 2026 data), while personal, non-work queries account for 42%. There is simply less data about ordinary office work than about code.\n\nAnd honestly, about careers: this track rarely produces a new job title. It rewrites the one you already have."
   }
  },
  "developer": {
   "lede": {
    "ru": "Про внедрение данные сходятся (84% используют ИИ-инструменты или собираются, 51% профессионалов — ежедневно), про пользу расходятся в разные стороны: +26,08% pull request'ов в трёх полевых экспериментах, примерно 21% ускорения в РКИ Google и 19% ЗАМЕДЛЕНИЯ у опытных мейнтейнеров в РКИ METR. Устойчиво повторяется одно: у Google, у DORA и в опросе Stack Overflow поток упирается в человека на ревью — писать стало быстрее, читать чужое нет, и трек ведёт именно в этот дефицит.",
    "en": "Adoption data agrees (84% use AI tools or plan to, 51% of professionals daily); benefit data points in opposite directions: +26.08% pull requests across three field experiments, roughly 21% faster in Google's RCT, and 19% SLOWER for experienced maintainers in METR's RCT. One thing recurs everywhere: at Google, in DORA and in the Stack Overflow survey the flow jams at the human reviewer — writing got faster, reading someone else's code did not — and that scarcity is where this track leads."
   },
   "demand": [
    {
     "claim": {
      "ru": "Ассистенты кода перестали быть нишей: 84% участников опроса Stack Overflow используют ИИ-инструменты в разработке или собираются, а 51% профессиональных разработчиков — ежедневно. При этом доверие отстаёт от использования: 46% скорее не доверяют точности (26,1% «скорее не доверяю» + 19,6% «совсем не доверяю»), высоко доверяют лишь 3,1%. Главная жалоба — решения «почти верные, но не совсем»: её называют 66%.",
      "en": "Code assistants are no longer a niche: 84% of Stack Overflow respondents use AI tools in their development process or plan to, and 51% of professional developers use them daily. Trust lags adoption: 46% distrust the accuracy (26.1% somewhat + 19.6% highly), while only 3.1% highly trust it. The top complaint is \"almost right, but not quite\" solutions, cited by 66%."
     },
     "figure": "84% используют или планируют использовать ИИ-инструменты (76% в 2024); 51% профессиональных разработчиков — ежедневно; 46% не доверяют точности; 66% сталкиваются с «почти верными» ответами; позитивное отношение упало с 70%+ (2023–2024) до 60%",
     "kind": "survey",
     "caveat": {
      "ru": "Это самоотчёт добровольной выборки: отвечают те, кто заходит на Stack Overflow и готов заполнять анкету. «Использую» здесь не означает «получаю пользу» — опрос не измерял ни скорость, ни качество кода. Формулировка «84%» склеивает уже использующих и только планирующих: это показатель намерения, а не внедрения.",
      "en": "A self-selected, self-reported sample: people who visit Stack Overflow and choose to answer. \"I use it\" is not \"it helps me\" — the survey measured neither speed nor code quality. The 84% figure merges current users with people who merely plan to adopt: it measures intent, not deployment."
     },
     "source": {
      "title": "2025 Stack Overflow Developer Survey — AI section",
      "url": "https://survey.stackoverflow.co/2025/ai",
      "org": "Stack Overflow",
      "date": "2025"
     }
    },
    {
     "claim": {
      "ru": "У DORA цифра выше: 90% специалистов по разработке ПО сообщают, что применяют ИИ в работе (+14 п.п. к 2024), медианно проводя с ним около двух часов в день. Больше 80% считают, что ИИ повысил их продуктивность, 59% — что он положительно влияет на качество кода. При этом 30% почти или совсем не доверяют сгенерированному коду (23% «немного», 7% «совсем нет»).",
      "en": "DORA's number is higher: 90% of software development professionals say they use AI at work (+14 pp vs 2024), with a median of about two hours a day spent working with it. Over 80% believe AI increased their productivity and 59% that it improved code quality. Yet 30% have little or no trust in AI-generated code (23% \"a little\", 7% \"not at all\")."
     },
     "figure": "90% применяют ИИ в работе (+14 п.п. к 2024); медиана — 2 часа в день; >80% считают, что продуктивность выросла; 59% — что качество кода улучшилось; 30% почти не доверяют коду от ИИ; выборка — почти 5000 человек",
     "kind": "survey",
     "caveat": {
      "ru": "«Считают, что стали продуктивнее» — это ощущение, а не измерение: в отчёте нет замера ни скорости, ни качества. В том же исследовании более высокое внедрение связано не только с ростом пропускной способности доставки, но и с ростом её нестабильности. Выборка — почти 5000 человек, самоотбор. Цифры +14 п.п. и «2 часа в день» есть в изложении на blog.google (указано источником), но не в анонсе на cloud.google.com, куда обычно ссылаются пересказы.",
      "en": "\"Believe they are more productive\" is a perception, not a measurement: the report measures neither speed nor quality. The same research links higher adoption to both higher delivery throughput and higher delivery instability. Sample: nearly 5,000 self-selected respondents. The +14 pp and \"two hours a day\" figures appear in the blog.google write-up (cited here), not in the cloud.google.com announcement that summaries usually link."
     },
     "source": {
      "title": "How are developers using AI? Inside Google's 2025 DORA report",
      "url": "https://blog.google/innovation-and-ai/technology/developers-tools/dora-report-2025/",
      "org": "DORA / Google Cloud",
      "date": "2025-09"
     }
    },
    {
     "claim": {
      "ru": "Рынок вакансий разработчиков разошёлся с рынком в целом: в США вакансии в разработке ПО выросли почти на 15% с конца февраля 2025 года, тогда как вакансии вообще упали на 7%. Из прироста за год (май 2025 → май 2026) 71% пришёлся на старшие роли, 37% — на вакансии, где ИИ упомянут прямо в названии. Абсолютный уровень при этом всё ещё примерно на 27,5% ниже февраля 2020 года.",
      "en": "Developer hiring has decoupled from the rest of the market: US software development postings rose almost 15% since late February 2025, while postings overall fell 7%. Of the year's increase (May 2025 → May 2026), 71% came from senior roles and 37% from jobs mentioning AI in their title. In absolute terms postings remain about 27.5% below February 2020."
     },
     "figure": "+почти 15% вакансий в разработке ПО с конца февраля 2025 при −7% по всем вакансиям; 71% прироста — старшие роли; 37% — вакансии с ИИ в названии; уровень всё ещё ~27,5% ниже февраля 2020",
     "kind": "jobs",
     "caveat": {
      "ru": "Считаются объявления, а не найм и не зарплаты: вакансия может висеть месяцами или закрыться внутренним кандидатом. База низкая — рынок всё ещё сильно ниже допандемийного, так что «рост» частично отскок. И прирост идёт преимущественно в старшие роли: входному уровню эти данные не обещают ничего. Точка отсчёта «конец февраля 2025» выбрана в источнике как дата выхода Claude Code — это привязка к событию, а не к экономическому циклу.",
      "en": "These are postings, not hires or wages: a listing can sit open for months or be filled internally. The baseline is low — the market is still far below pre-pandemic, so part of the \"growth\" is a rebound. And the growth sits mostly in senior roles, promising entry-level nothing. The \"late February 2025\" start date is chosen in the source as Claude Code's launch — an event anchor, not an economic one."
     },
     "source": {
      "title": "AI and Job Postings: From Destruction to Creation?",
      "url": "https://www.hiringlab.org/2026/07/08/ai-and-job-postings-from-destruction-to-creation/",
      "org": "Indeed Hiring Lab",
      "date": "2026-07-08"
     }
    },
    {
     "claim": {
      "ru": "Работа с моделями стала обычной частью кодовой базы, а не отдельным ремеслом: примерно 1,13 млн публичных репозиториев зависят от SDK генеративного ИИ — на 178% больше, чем годом ранее. И агенты уже пишут в общий поток: кодовый агент Copilot создал больше миллиона pull request'ов с мая по сентябрь 2025 года.",
      "en": "Working with models has become an ordinary part of codebases rather than a separate craft: roughly 1.13 million public repositories depend on generative-AI SDKs, up 178% year over year. And agents already write into the shared stream: the Copilot coding agent created over a million pull requests between May and September 2025."
     },
     "figure": "~1,13 млн публичных репозиториев зависят от SDK генеративного ИИ (+178% год к году); >4,3 млн репозиториев, связанных с ИИ; >1 млн PR от кодового агента Copilot за май–сентябрь 2025; 81,5% вкладов — в приватных репозиториях",
     "kind": "telemetry",
     "caveat": {
      "ru": "Это платформенная телеметрия GitHub, и часть метрик касается собственного продукта — считать её независимой нельзя. Открытый PR не значит принятый и работающий: сколько из миллиона влилось и как их ревьюили, отчёт не показывает. 81,5% вкладов идёт в приватные репозитории, куда эта статистика не заглядывает. «Зависит от SDK» — это факт наличия зависимости в манифесте, а не доказательство работающей функции.",
      "en": "This is GitHub's own platform telemetry, and some metrics cover its own product — not an independent count. An opened PR is not a merged, working one: the report does not say how many of the million landed or how they were reviewed. And 81.5% of contributions happen in private repositories this data cannot see. \"Depends on an SDK\" means a manifest entry, not a working feature."
     },
     "source": {
      "title": "Octoverse 2025: A new developer joins GitHub every second as AI leads TypeScript to #1",
      "url": "https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/",
      "org": "GitHub",
      "date": "2025-10-28"
     }
    },
    {
     "claim": {
      "ru": "За ИИ-навыки в объявлениях платят больше: по базе Lightcast вакансии, где такие навыки указаны, обещают на 28% выше зарплату — почти на 18 тысяч долларов в год больше. И 51% таких вакансий (данные 2024 года) уже вне ИТ и информатики.",
      "en": "Postings that ask for AI skills advertise more money: in Lightcast's data they offer 28% higher salaries — nearly $18,000 more per year. And 51% of those postings (2024 data) are already outside IT and computer science."
     },
     "figure": "+28% к заявленной зарплате (почти $18 000/год) в вакансиях с ИИ-навыками; 51% таких вакансий — вне ИТ и информатики (2024); проанализировано свыше 1,3 млрд объявлений",
     "kind": "jobs",
     "caveat": {
      "ru": "Это надбавка по всем профессиям, а не именно у разработчиков, и она посчитана по заявленной в объявлении вилке, а не по фактическим выплатам. Корреляция, не причина: ИИ-навыки чаще пишут в вакансиях, которые и так дороже — старшие, в богатых отраслях и регионах. Ни один разработчик по этим данным не может ожидать +28% лично себе.",
      "en": "This is a premium across all occupations, not developers specifically, and it is computed from advertised ranges, not actual pay. Correlation, not cause: AI skills tend to appear in postings that were already expensive — senior roles, richer industries and regions. No individual developer can read +28% off this as their own raise."
     },
     "source": {
      "title": "Beyond the Buzz: AI Skills Command 28% Salary Premium as Demand Shifts Beyond Tech Industry",
      "url": "https://lightcast.io/resources/blog/beyond-the-buzz-press-release-2025-07-23",
      "org": "Lightcast",
      "date": "2025-07-23"
     }
    }
   ],
   "mechanics": [
    {
     "process": {
      "ru": "Код-ревью: закрытие замечаний рецензента",
      "en": "Code review: resolving reviewer comments"
     },
     "pattern": {
      "ru": "В Google модель предлагает готовую правку прямо к комментарию рецензента. Человек в контуре дважды: рецензент видит предложенную правку и решает, прикреплять ли её к своему комментарию, а потом автор изменения открывает предпросмотр и сам решает, применять. Модель ничего не вливает сама. Порог уверенности задан явно: минимальная точность 50% (в первой версии было 70%, для второй её опустили до 40% — именно потому, что рецензент отсеивает явно неверные предложения до автора).",
      "en": "At Google the model drafts the actual edit that answers a reviewer's comment. Humans sit in the loop twice: the reviewer sees the suggested edit and decides whether to attach it to their comment, then the change author previews it and decides whether to apply it. The model never lands anything on its own. The confidence threshold is explicit: 50% minimum precision (70% in V1, lowered to 40% in V2 — precisely because the reviewer filters out obviously wrong suggestions before the author sees them)."
     },
     "outcome": {
      "ru": "В работающей системе авторы закрывают 7,5% всех замечаний рецензентов, применив предложенную моделью правку. Воронка второй версии: 49,0% замечаний получают уверенное предсказание → 33,1% принимает рецензент → 10,7% открывает автор → 7,5% применяет. Первая версия, где рецензент правку не просматривал и её надо было раскрыть кликом, давала 4,9%. Для контекста: автор тратит в среднем около 60 минут активной работы на проведение изменения через ревью, и это время растёт почти линейно с числом замечаний.",
      "en": "In production, authors resolve 7.5% of all reviewer comments by applying an ML-suggested edit. The V2 funnel: 49.0% of comments get a confident prediction → 33.1% accepted by the reviewer → 10.7% previewed by the author → 7.5% applied. V1, where the reviewer did not pre-approve the edit and it took a click to view, reached 4.9%. For context: an author spends an average of about 60 minutes of active shepherding time per change, and that time grows almost linearly with the number of comments."
     },
     "kind": "telemetry",
     "source": {
      "title": "Resolving Code Review Comments with Machine Learning (ICSE-SEIP '24)",
      "url": "https://research.google/pubs/resolving-code-review-comments-with-machine-learning/",
      "org": "Google",
      "date": "2024-04"
     }
    },
    {
     "process": {
      "ru": "Массовые миграции и рефакторинг в большой кодовой базе",
      "en": "Large-scale migrations and refactoring in a big codebase"
     },
     "pattern": {
      "ru": "Google гоняет миграции конвейером: детерминированные инструменты находят места правки, дообученная модель пишет само изменение, автоматика крутит цикл тестов и проверок, пока результат не признан годным. Затем инженер вручную проверяет изменение и правит файлы, где модель ошиблась, после чего оно шардируется и уходит владельцам затронутого кода. Дословно: «люди ревьюят сгенерированный моделью код так же, как любой другой, и дописывают недостающие тесты». Одним промптом это не делается — в статье прямо сказано, что простых промптов хватает только на самые примитивные миграции, а работает связка AST-инструментов, эвристик и модели.",
      "en": "Google runs migrations as a pipeline: deterministic tooling finds the places to change, a fine-tuned model writes the change, automation loops over tests and validations until the result is deemed good. An engineer then manually checks it and fixes files the model got wrong, after which the change is sharded out to the owners of the affected code. Verbatim: \"Humans review the LLM-generated code the same way as any other code and they add any missing tests to cover the changed lines.\" Prompting alone does not do it — the paper states plainly that simple prompting suffices only for the simplest migrations, and what works is AST techniques plus heuristics plus the model."
     },
     "outcome": {
      "ru": "В залитых изменениях миграции int32 → int64 80% правок были полностью написаны ИИ, остальные написаны или доправлены людьми. Суммарное время именно этой миграции сократилось, по оценке самих инженеров, примерно на 50% — это самоотчёт с учётом времени на ревью и раскатку, а не замер. Переход JUnit3 → JUnit4: 5359 файлов и более 149 000 строк за три месяца, ~87% сгенерированного кода ушло в коммит без изменений. Узким местом стала не генерация, а способность людей ревьюить: «мы намеренно ограничивали число изменений, которые генерируем каждую неделю, чтобы не завалить рецензентов». Авторы отдельно отмечают, что долгосрочное влияние на качество ещё предстоит увидеть.",
      "en": "In the landed changes of the int32 → int64 migration, 80% of the code modifications were fully AI-authored, the rest human-written or edited. Total time for that specific migration fell by an estimated 50% \"as reported by the engineers doing the migration\" — a self-report including review and rollout time, not a measurement. The JUnit3 → JUnit4 move touched 5,359 files and over 149,000 lines in three months, with ~87% of generated code committed unchanged. The bottleneck was human review capacity, not generation: \"We purposefully limited the number of changes we generate every week to avoid overwhelming reviewers.\" The authors note that long-term quality impact remains to be seen."
     },
     "kind": "vendor",
     "source": {
      "title": "How is Google using AI for internal code migrations?",
      "url": "https://arxiv.org/html/2501.06972v1",
      "org": "Google",
      "date": "2025-01-12"
     }
    },
    {
     "process": {
      "ru": "Повседневная разработка в компании: выдача ассистента команде",
      "en": "Everyday enterprise development: rolling an assistant out to teams"
     },
     "pattern": {
      "ru": "Три компании — Microsoft, Accenture и анонимная из Fortune 100 — раздавали ассистента (GitHub Copilot) случайной части разработчиков, чтобы решить, внедрять ли его. Это были рабочие пилоты в обычном ходе дел, не лаборатория: 4867 человек, от 2 до 8 месяцев, после чего доступ открыли всем. Ассистент подсказывает дополнения кода; всё, что уходит дальше, по-прежнему проходит обычный pull request и ревью коллег.",
      "en": "Three companies — Microsoft, Accenture and an anonymous Fortune 100 firm — gave an assistant (GitHub Copilot) to a random subset of developers to decide whether to adopt it. These were pilots run in the ordinary course of business, not a lab: 4,867 developers, 2 to 8 months, after which all groups got access. The assistant suggests completions; whatever moves forward still goes through the normal pull request and peer review."
     },
     "outcome": {
      "ru": "Число pull request'ов в неделю выросло на 26,08% (стандартная ошибка 10,3), коммитов — на 13,55% (10,0), сборок — на 38,38% (12,55). Из трёх только эффект на pull request'ы значим на обычных уровнях. Мерили активность, а не ценность: «выполненная задача» в работе равна pull request'у, и авторы сами пишут, что коммиты и сборки не соответствуют напрямую поставленному результату. Единственный показатель качества — доля успешных сборок — не вырос: −5,53% (3,64) в среднем; авторы трактуют это как отсутствие негативного эффекта, поскольку оценка незначима. Но в Accenture просадка −17,40% (7,12) значима на 5%. Менее опытные разработчики чаще брали инструмент и получали больший прирост.",
      "en": "Weekly pull requests rose 26.08% (SE 10.3), commits 13.55% (SE 10.0), builds 38.38% (SE 12.55). Of the three, only the pull request effect is significant at conventional levels. What was measured is activity, not value: a \"completed task\" here is a pull request, and the authors themselves note commits and builds do not directly correspond to a deliverable. The one quality proxy — build success rate — did not improve: −5.53% (SE 3.64) pooled; the authors read this as no negative effect, since the estimate is not significant. But Accenture's −17.40% (SE 7.12) is significant at 5%. Less experienced developers adopted more and gained more."
     },
     "kind": "experiment",
     "source": {
      "title": "The Effects of Generative AI on High-Skilled Work: Evidence from Three Field Experiments with Software Developers",
      "url": "https://pubsonline.informs.org/doi/10.1287/mnsc.2025.00535",
      "org": "Cui, Demirer, Jaffe, Musolff, Peng, Salz — Management Science",
      "date": "2026-02-27"
     }
    },
    {
     "process": {
      "ru": "Поиск уязвимостей: непрерывный фаззинг открытого кода",
      "en": "Vulnerability discovery: continuous fuzzing of open source"
     },
     "pattern": {
      "ru": "В OSS-Fuzz модель взяла на себя первые четыре шага рутины, которую раньше делал инженер: написать черновик фаззера, починить ошибки компиляции, коротко прогнать и убрать явные ошибки времени выполнения, прогнать дольше и разобрать падения до корневой причины. Пятый шаг — исправление уязвимости — на момент публикации не автоматизирован: 26 находок переданы мейнтейнерам проектов, патчи пишут и проверяют они. Ключом оказался не «умный промпт», а инфраструктура: Google построил индексацию проектов OSS-Fuzz, чтобы автоматически подкладывать в промпт сигнатуры, определения типов, перекрёстные ссылки и существующие юнит-тесты — чем полнее контекст, тем меньше модель выдумывает.",
      "en": "In OSS-Fuzz the model took over the first four steps of what used to be an engineer's routine: draft the fuzz target, fix compilation errors, run it briefly to catch obvious runtime mistakes, then run it longer and triage crashes to a root cause. Step five — fixing the vulnerability — was not automated as of publication: the 26 findings went to project maintainers, who write and validate the patches. The key was not a clever prompt but infrastructure: Google built indexing across OSS-Fuzz projects to feed prompts function signatures, type definitions, cross-references and existing unit tests — the fuller the context, the less the model hallucinates."
     },
     "outcome": {
      "ru": "26 новых уязвимостей, сообщённых мейнтейнерам, в проектах, которые до этого уже отфаззили сотнями тысяч часов. Среди находок CVE-2024-9143 в OpenSSL: по осторожной формулировке Google, «насколько мы можем судить», она вероятно пролежала в коде два десятилетия и не была бы найдена существующими фаззерами, написанными людьми. Покрытие удалось поднять на 272 проектах C/C++ (было 160), добавилось более 370 000 строк нового покрытия; лучший результат в одном проекте — с 77 до 5434 строк.",
      "en": "26 new vulnerabilities reported to maintainers, in projects that had already had hundreds of thousands of hours of fuzzing. Among them CVE-2024-9143 in OpenSSL: in Google's own hedged wording, \"as far as we can tell\", it had likely been present for two decades and would not have been discoverable with existing human-written fuzz targets. Coverage improved across 272 C/C++ projects (up from 160), adding over 370,000 lines of new coverage; the best single project went from 77 to 5,434 lines."
     },
     "kind": "vendor",
     "source": {
      "title": "Leveling Up Fuzzing: Finding more vulnerabilities with AI",
      "url": "https://security.googleblog.com/2024/11/leveling-up-fuzzing-finding-more.html",
      "org": "Google Open Source Security Team",
      "date": "2024-11-20"
     }
    },
    {
     "process": {
      "ru": "Конвейер доставки: от коммита до продакшена",
      "en": "The delivery pipeline: from commit to production"
     },
     "pattern": {
      "ru": "Здесь ИИ стоит не в одной точке, а размазан по потоку — подсказки при написании, чат, генерация тестов. Человек остаётся тем, кто пропускает изменение дальше, и именно на нём поток и упирается: писать код стало быстрее, читать чужой — нет. Инженер из выборки DORA: «Ревьюить чужой код гораздо тяжелее, чем писать свой. ИИ-инструменты увеличивают скорость, с которой люди выдают код, требующий ревью». Вывод отчёта — асинхронное код-ревью в прежнем виде перестаёт быть оптимальным.",
      "en": "Here AI is not at one point but spread across the flow — inline suggestions, chat, test generation. The human is still the gate a change must pass, and that is exactly where the flow jams: writing code got faster, reading someone else's did not. An engineer in DORA's sample: \"Reviewing [another's] code is so much harder than writing it. AI tools are increasing the rate at which people can churn out code that needs to be reviewed.\" The report's conclusion: asynchronous code review in its traditional form stops being optimal."
     },
     "outcome": {
      "ru": "Более высокое внедрение ИИ связано одновременно с ростом пропускной способности доставки и с ростом её нестабильности. Это связь, а не причинность, и обе величины взяты из самоотчётов респондентов. То есть ускорение реально, но оно вытаскивает наружу слабые места ниже по потоку. Что рекомендуют как противовес: работа мелкими батчами (крупное сгенерированное изменение принудительно разбивается на проверяемые куски), сильная автоматика тестов и быстрые петли обратной связи, и подача замечаний автору ещё в момент написания, а не рецензенту потом.",
      "en": "Higher AI adoption is associated with both higher software delivery throughput and higher delivery instability. This is an association, not causation, and both quantities come from respondent self-reports. The speed-up is real, but it surfaces whatever is weak downstream. The recommended counterweights: working in small batches (forcing large AI-generated changes into reviewable units), strong test automation with fast feedback, and delivering feedback to the author while writing rather than to a reviewer later."
     },
     "kind": "survey",
     "source": {
      "title": "Balancing AI tensions: Moving from AI adoption to effective SDLC use",
      "url": "https://dora.dev/insights/balancing-ai-tensions/",
      "org": "DORA / Google Cloud",
      "date": "2026-03-10"
     }
    }
   ],
   "roles": [
    {
     "title": {
      "ru": "Инженер приложений с ИИ",
      "en": "AI application engineer"
     },
     "note": {
      "ru": "Строит продукт, внутри которого работает модель: промпты и их версии, вызов инструментов, обработка вывода, поведение при отказе модели. Трек ведёт сюда напрямую — это обычная разработка плюс умение обращаться с недетерминированным компонентом.",
      "en": "Builds products with a model inside: prompts and their versions, tool calls, output handling, what happens when the model fails. The track leads here directly — it is ordinary engineering plus the habits for a non-deterministic component."
     }
    },
    {
     "title": {
      "ru": "Инженер агентов и интеграций",
      "en": "Agent and integrations engineer"
     },
     "note": {
      "ru": "Даёт агенту инструменты и границы: серверы по протоколу MCP, права, лимиты, журналирование действий. Косвенный признак спроса — телеметрия GitHub: за год число публичных репозиториев, зависящих от SDK генеративного ИИ, выросло на 178%, до ~1,13 млн. Это зависимости в манифестах, а не вакансии, так что признак именно косвенный.",
      "en": "Gives agents their tools and their limits: MCP servers, permissions, quotas, action logs. An indirect demand signal from GitHub telemetry: public repositories depending on generative-AI SDKs grew 178% in a year, to ~1.13 million. Those are manifest dependencies, not job postings, so the signal is indirect."
     }
    },
    {
     "title": {
      "ru": "Инженер платформы разработки (DevEx)",
      "en": "Developer platform / DevEx engineer"
     },
     "note": {
      "ru": "Встраивает ассистентов в конвейер команды и достраивает то, без чего они вредят: тесты, шлюзы качества, обратная связь автору до ревью. Отчёт DORA 2025 сводится к тому, что ИИ работает усилителем уже имеющихся сильных и слабых сторон организации — то есть отдача приходит от платформы и процессов, а не от самого инструмента.",
      "en": "Wires assistants into the team's pipeline and builds the parts without which they do harm: tests, quality gates, feedback to the author before review. The 2025 DORA report's core claim is that AI acts as an amplifier of an organization's existing strengths and weaknesses — the return comes from the platform and workflow, not the tool."
     }
    },
    {
     "title": {
      "ru": "Ведущий разработчик, отвечающий за ревью",
      "en": "Tech lead owning review"
     },
     "note": {
      "ru": "Держит поток изменений читаемым: размер батчей, что уходит в автоматику, что смотрит человек. Это выделилось в отдельную работу потому, что узким местом в реальных внедрениях оказалась именно способность людей ревьюить: в миграциях Google поток генерации приходилось намеренно придерживать, а DORA рекомендует мелкие батчи и обратную связь автору до ревью.",
      "en": "Keeps the change flow readable: batch sizes, what automation handles, what a human looks at. It became a distinct job because human review capacity is what actually jams in real rollouts: Google had to deliberately throttle generation during migrations, and DORA recommends small batches and feedback to the author before review."
     }
    }
   ],
   "skills": [
    {
     "name": {
      "ru": "Ревью кода, который написал не ты",
      "en": "Reviewing code you did not write"
     },
     "why": {
      "ru": "Самый дефицитный навык по данным: ускоряется написание, а не чтение, и поток встаёт на ревью. В экспериментах Microsoft/Accenture сборок стало на 38,38% больше, а доля успешных сборок не выросла (−5,53%, незначимо в среднем, но −17,40% и значимо в Accenture). Плюс 66% участников опроса Stack Overflow жалуются на «почти верные» решения — именно их и надо уметь ловить.",
      "en": "The scarcest skill in the data: writing speeds up, reading does not, and the flow jams at review. In the Microsoft/Accenture experiments builds rose 38.38% while build success rate did not improve (−5.53%, not significant pooled, but −17.40% and significant at Accenture). And 66% of Stack Overflow respondents complain about \"almost right\" solutions — those are exactly what you must catch."
     }
    },
    {
     "name": {
      "ru": "Тестовая автоматизация и быстрые петли обратной связи",
      "en": "Test automation and fast feedback loops"
     },
     "why": {
      "ru": "DORA связывает высокое внедрение ИИ с ростом нестабильности доставки и называет автотесты, быстрый фидбек и мелкие батчи тем, что удерживает систему при выросшем объёме изменений. Без них ускорение оборачивается откатами.",
      "en": "DORA links high AI adoption to rising delivery instability and names automated testing, fast feedback and small batches as what holds the system together at higher change volume. Without them the speed-up turns into rollbacks."
     }
    },
    {
     "name": {
      "ru": "Проектирование инструментов для агента",
      "en": "Designing tools for agents"
     },
     "why": {
      "ru": "Агент полезен ровно настолько, насколько аккуратно описаны его инструменты и права. MCP — открытый протокол, ставший общим способом это делать; его поддерживают и редакторы кода (VS Code, Cursor), и клиенты моделей, так что навык не привязан к одному вендору.",
      "en": "An agent is only as useful as its tools and permissions are carefully described. MCP is the open protocol that became the common way to do this, supported by code editors (VS Code, Cursor) and model clients alike, so the skill is not locked to one vendor."
     }
    },
    {
     "name": {
      "ru": "Детерминированный каркас вокруг модели",
      "en": "A deterministic scaffold around the model"
     },
     "why": {
      "ru": "Прямая цитата из отчёта Google о миграциях: одних промптов не хватает ни на что, кроме самых простых случаев, — работает связка AST-инструментов, эвристик и модели. Умение сузить задачу до проверяемой — половина дела.",
      "en": "A direct claim in Google's migration report: prompting alone is not sufficient for anything but the simplest migrations — what works is AST techniques plus heuristics plus the model. Narrowing a task until it is checkable is half the job."
     }
    },
    {
     "name": {
      "ru": "Оценки и приёмочные критерии для функций на модели",
      "en": "Evals and acceptance criteria for model-backed features"
     },
     "why": {
      "ru": "Недетерминированную функцию нельзя закрыть одним ручным прогоном. Нужен набор проверок, который ловит регрессию при смене модели или промпта — иначе «работает» держится на удаче. Это вывод по аналогии, а не отдельная измеренная цифра: прямого исследования эффективности evals в проверенных источниках нет.",
      "en": "You cannot sign off a non-deterministic feature with one manual run. You need a check suite that catches regressions when the model or prompt changes — otherwise \"it works\" rests on luck. This is reasoning by analogy, not a measured figure: none of the verified sources studies eval effectiveness directly."
     }
    },
    {
     "name": {
      "ru": "Безопасность сгенерированного кода",
      "en": "Security of generated code"
     },
     "why": {
      "ru": "Модели стали лучше писать синтаксически верный код, но не безопасный: в тесте Veracode на 100+ моделях 45% сгенерированных образцов не прошли проверки и внесли уязвимости из OWASP Top 10, причём «показатель безопасности остался ровным вне зависимости от размера модели». В обновлении весны 2026 картина не улучшилась. Это бенчмарк вендора на подготовленных задачах, а не замер на живом продакшене. Плюс отдельный класс рисков у агентных приложений — OWASP Top 10 для LLM.",
      "en": "Models got better at syntactically correct code, not at secure code: in Veracode's test across 100+ models, 45% of generated samples failed security checks and introduced OWASP Top 10 vulnerabilities, and \"security performance remained flat, regardless of model size\". The spring 2026 update showed no improvement. This is a vendor benchmark on prepared tasks, not a measurement on live production. Agentic applications add their own risk class — the OWASP Top 10 for LLMs."
     }
    }
   ],
   "anchors": [
    {
     "title": "State of AI-assisted Software Development 2025 (DORA)",
     "url": "https://dora.dev/dora-report-2025/",
     "org": "DORA / Google Cloud",
     "why": {
      "ru": "Самый содержательный открытый отчёт именно про ИИ в конвейере разработки, а не про модели: связь внедрения с пропускной способностью и нестабильностью, роль платформы, где ломается ревью. Страница живая, с ссылками на полный отчёт и сокращённые версии на семи языках. Читать сам отчёт, а не пересказы — ключевые цифры в анонсах разнятся.",
      "en": "The most substantive open report about AI inside the delivery pipeline rather than about models: how adoption relates to throughput and instability, the role of the platform, where review breaks. The page is live, with links to the full report and abridged versions in seven languages. Read the report, not the summaries — the announcements quote different numbers."
     }
    },
    {
     "title": "Large Language Model Agents (MOOC, Berkeley CS294/194-196, осень 2024)",
     "url": "https://llmagents-learning.org/f24",
     "org": "UC Berkeley RDI",
     "why": {
      "ru": "Открытый университетский курс: основы моделей, рассуждение и планирование, вызов инструментов, инфраструктура агентов, RAG, генерация кода, мультимодальные агенты, безопасность. Курс завершён, но все видеолекции и слайды остаются в программе на странице. Лекции читают исследователи из Google DeepMind, OpenAI, NVIDIA, Meta AI, Anthropic, Stanford. Есть продолжение — Advanced LLM Agents MOOC, весна 2025 (llmagents-learning.org/sp25), тоже завершённое и тоже с записями.",
      "en": "An open university course: model foundations, reasoning and planning, tool use, agent infrastructure, RAG, code generation, multimodal agents, safety. The course has concluded, but all video lectures and slides remain in the syllabus on the page. Lecturers come from Google DeepMind, OpenAI, NVIDIA, Meta AI, Anthropic and Stanford. A follow-on exists — Advanced LLM Agents MOOC, spring 2025 (llmagents-learning.org/sp25) — also concluded, also with recordings."
     }
    },
    {
     "title": "Model Context Protocol — документация",
     "url": "https://modelcontextprotocol.io/docs/getting-started/intro",
     "org": "MCP (открытый стандарт)",
     "why": {
      "ru": "Спецификация и руководства по тому, как подключать модель к данным и инструментам: сборка серверов, клиентов, SDK. Протокол открытый и поддерживается широким кругом клиентов — Claude, ChatGPT, VS Code, Cursor, — так что навык не привязан к одному вендору.",
      "en": "The spec and guides for connecting a model to data and tools: building servers, clients, SDKs. The protocol is open and supported across a wide range of clients — Claude, ChatGPT, VS Code, Cursor — so the skill is not locked to one vendor."
     }
    },
    {
     "title": "OWASP Top 10 for LLM Applications (2025)",
     "url": "https://genai.owasp.org/llm-top-10/",
     "org": "OWASP Foundation",
     "why": {
      "ru": "Свободный разбор рисков, которых нет в обычном чеклисте безопасности. Проверено на странице: LLM01 инъекция промпта, LLM05 небезопасная обработка вывода, LLM06 избыточные полномочия агента, LLM07 утечка системного промпта, а также отравление данных, слабости векторных представлений и неограниченное потребление. Нужен любому, кто выпускает агентную функцию в продакшен.",
      "en": "A free breakdown of risks absent from the usual security checklist. Verified on the page: LLM01 prompt injection, LLM05 improper output handling, LLM06 excessive agency, LLM07 system prompt leakage, plus data poisoning, vector and embedding weaknesses, and unbounded consumption. Required reading before shipping an agentic feature."
     }
    },
    {
     "title": "2025 GenAI Code Security Report",
     "url": "https://www.veracode.com/blog/genai-code-security-report/",
     "org": "Veracode",
     "why": {
      "ru": "Первоисточник цифры о безопасности сгенерированного кода: 45% образцов не прошли проверки и внесли уязвимости из OWASP Top 10, на 100+ моделях и языках Java, Python, C#, JavaScript. Ценен не столько числом, сколько выводом: рост размера и изощрённости обучения модели безопасность не улучшает. Держать в голове, что это бенчмарк вендора статического анализа на подготовленных задачах.",
      "en": "The primary source for the figure on generated-code security: 45% of samples failed security checks and introduced OWASP Top 10 vulnerabilities, across 100+ models and Java, Python, C#, JavaScript. Valuable less for the number than for the conclusion: bigger models and more sophisticated training do not improve security. Keep in mind it is a static-analysis vendor's benchmark on prepared tasks."
     }
    },
    {
     "title": "AI Agents for Beginners — 18 уроков",
     "url": "https://github.com/microsoft/ai-agents-for-beginners",
     "org": "Microsoft",
     "why": {
      "ru": "Бесплатный курс под лицензией MIT: вызов инструментов, агентный RAG, мультиагентные схемы, управление памятью агента, защита агентов, контекстная инженерия. Код можно запустить и переделать под себя. Важная оговорка: примеры написаны под Microsoft Agent Framework и Microsoft Foundry, для их прогона рекомендуется аккаунт Azure — то есть безвендорным этот каркас не назовёшь, читать можно без всего.",
      "en": "A free MIT-licensed course: tool use, agentic RAG, multi-agent patterns, managing agentic memory, securing agents, context engineering. The code can be run and reworked. Important caveat: samples target Microsoft Agent Framework and Microsoft Foundry, and an Azure account is recommended to run them — so the scaffold is not vendor-neutral, though reading it costs nothing."
     }
    }
   ],
   "caveat": {
    "ru": "Про внедрение данные хорошие, про пользу — противоречивые, и трек честнее строить на этом, чем на цифре «+X% продуктивности».\n\nТри качественных исследования дают три разных ответа, потому что мерили разное. РКИ Google (96 инженеров, arXiv 2410.12944) — примерно 21% быстрее (96 минут против 114), но на одной подготовленной задаче и с очень широкими доверительными интервалами. Три полевых эксперимента в Microsoft, Accenture и компании из Fortune 100 (4867 разработчиков) — +26,08% при стандартной ошибке 10,3, но «выполненная задача» там равна pull request'у: это активность, а не доставленная ценность, и единственный показатель качества (доля успешных сборок) не вырос, а в Accenture значимо просел на 17,40%. Разбивку по метрикам в опубликованной версии за пейволлом не видно — она есть в открытом рабочем варианте: economics.mit.edu/sites/default/files/inline-files/draft_copilot_experiments.pdf. А в РКИ METR (июль 2025) 16 опытных мейнтейнеров на 246 задачах в собственных репозиториях с ИИ работали на 19% МЕДЛЕННЕЕ — при том что до исследования ожидали ускорения на 24%, а после, уже проработав, всё равно считали, что ускорились на 20%.\n\nОтдельно про METR, потому что этот сюжет массово перевран в пересказах. METR сама помечает результат 2025 года как устаревший. Но продолжение не дало чистой замены: в феврале 2026 METR опубликовала, что данные нового эксперимента дают ненадёжный сигнал, и меняет саму схему исследования. Причины — отказ разработчиков участвовать, потому что они не хотят работать без ИИ, отбор задач (30–50% участников сознательно не сдавали задачи, которые не хотели делать без ИИ) и снижение оплаты со 150 до 50 долларов в час. METR считает вероятным, что сейчас разработчики ускоряются сильнее, чем в начале 2025 года, но называет свои же данные «очень слабым свидетельством» размера этого изменения. Никаких «+18% ускорения» и «разворота на 37 пунктов», которые ходят по блогам, METR не утверждала — численные оценки там даны со знаком «минус» в её собственной системе отсчёта и с интервалами, накрывающими ноль. Вывод: эффект зависит от задачи, кодовой базы и опыта, интуиция разработчика о собственной скорости ненадёжна, а измерить это стало труднее, чем год назад.\n\nДальше — что вообще не измерено. Почти все крупные цифры про продуктивность и качество — самоотчёт: и «больше 80% стали продуктивнее» у DORA, и 50% экономии времени в миграциях Google. Кейсы Google (ревью, миграции, фаззинг) — это отчёты вендора о самом себе, на монорепозитории с дообученной моделью и культурой обязательного ревью; в среднем проекте так не будет, и авторы миграций прямо пишут, что долгосрочное влияние на качество ещё предстоит увидеть. Долгосрочных данных о сопровождаемости кода, написанного моделями, попросту нет. Про безопасность цифра есть (45% образцов не прошли проверки), но это бенчмарк вендора статического анализа на подготовленных задачах, а не замер на реальных продакшен-кодовых базах. Данные вакансий считают слова в объявлениях: «упомянут ИИ» не равно «нужен навык», надбавка в 28% посчитана по заявленной вилке и по всем профессиям сразу, а прирост в разработке идёт преимущественно в старшие роли — входному уровню эти числа обещают меньше, чем кажется.\n\nИ одна вещь, которую данные показывают устойчиво со всех сторон: и DORA, и опрос Stack Overflow, и отчёт о миграциях Google упираются в человека на ревью. Google приходилось намеренно придерживать поток генерации, чтобы не завалить рецензентов. Скорость генерации выросла, скорость чтения — нет. Кто идёт этим треком ради «писать быстрее», получит не тот навык, который дефицитен.",
    "en": "The adoption data is solid. The benefit data is contradictory, and this track is more honest built on that than on a \"+X% productivity\" headline.\n\nThree good studies give three different answers because they measured different things. Google's RCT (96 engineers, arXiv 2410.12944) found roughly 21% faster (96 minutes vs 114) — on one prepared task, with very wide confidence intervals. The three field experiments at Microsoft, Accenture and a Fortune 100 firm (4,867 developers) found +26.08% (SE 10.3), but a \"completed task\" there is a pull request: activity, not delivered value, and the one quality proxy (build success rate) did not improve and dropped a significant 17.40% at Accenture. The per-metric breakdown is behind the journal paywall; it is in the open working paper: economics.mit.edu/sites/default/files/inline-files/draft_copilot_experiments.pdf. Meanwhile METR's RCT (July 2025) had 16 experienced maintainers work 246 issues in their own repositories and found them 19% SLOWER with AI — while they expected a 24% speed-up beforehand and, having lived through it, still believed they had been 20% faster.\n\nA separate note on METR, because this story is widely garbled in secondary coverage. METR does label the 2025 result out of date. But the follow-up did not produce a clean replacement: in February 2026 METR published that its new experiment gives an unreliable signal and that it is changing the study design. The reasons: developers refusing to participate because they do not want to work without AI, task selection (30–50% of participants deliberately withheld tasks they did not want to do unaided), and pay dropping from $150 to $50 an hour. METR thinks it likely that developers are more sped up now than in early 2025, but calls its own data \"very weak evidence\" for the size of that change. METR never claimed the \"+18% speedup\" or \"37-point swing\" circulating in blogs — its numeric estimates are negative in its own sign convention and their intervals span zero. The takeaway: the effect depends on the task, the codebase and experience, a developer's intuition about their own speed is unreliable, and measuring this has gotten harder than it was a year ago.\n\nThen there is what nobody measured. Almost every large productivity and quality figure is self-reported: DORA's \"over 80% more productive\", Google's 50% time saving on migrations. The Google cases (review, migrations, fuzzing) are a vendor reporting on itself, in a monorepo, with a fine-tuned model and a culture of mandatory review — the average project will not reproduce that, and the migration authors state outright that long-term quality impact remains to be seen. There is simply no long-run data on the maintainability of model-written code. On security there is a number (45% of samples failed checks), but it comes from a static-analysis vendor's benchmark on prepared tasks, not from live production codebases. And job-posting data counts words in listings: \"mentions AI\" is not \"needs the skill\", the 28% premium is computed from advertised ranges across all occupations at once, and the growth in software development sits mostly in senior roles — promising entry-level less than the headline suggests.\n\nOne thing the data shows consistently from every direction: DORA, the Stack Overflow survey and Google's migration report all hit the same wall — the human reviewer. Google had to deliberately throttle generation to avoid overwhelming reviewers. Generation got faster; reading did not. Anyone taking this track to \"write code faster\" is training the skill that is not scarce."
   }
  },
  "agent-architect": {
   "lede": {
    "ru": "Измеренной пользы агентов в продакшене нет ни в одном проверенном источнике — зато измерены режимы отказа (повтор шага 15,7%, расхождение рассуждения и действия 13,2%, незнание условий остановки 12,4%) и стоимость (многоагентная схема тратит примерно в 15 раз больше токенов, чем чат). Трек строится на том, что действительно измерено: где агенты ломаются, сколько это стоит и когда честный ответ — «здесь хватит одного вызова модели».",
    "en": "Not one verified source measures the benefit of agents in production — but the failure modes are measured (step repetition 15.7%, reasoning-action mismatch 13.2%, unaware of stopping conditions 12.4%), and so is the cost (a multi-agent design burns roughly 15× the tokens of a chat interaction). The track is built on what was actually measured: where agents break, what they cost, and when the honest answer is \"one model call is enough here\"."
   },
   "demand": [
    {
     "claim": {
      "ru": "Агентные системы вышли из демо, но до эксплуатации их довели немногие: 23% респондентов говорят, что их организации масштабируют агентную систему где-то в бизнесе, ещё 39% только начали экспериментировать с ИИ-агентами. Внутри отдельно взятой бизнес-функции масштабируют не более 10%.",
      "en": "Agent systems have left the demo stage, but few have them running for real: 23% of respondents say their organizations are scaling an agentic AI system somewhere in the enterprise, and another 39% say they have only begun experimenting with AI agents. Within any single business function, no more than 10% report scaling."
     },
     "figure": "23% масштабируют где-то в организации, 39% начали экспериментировать; в любой отдельной функции ≤10%",
     "kind": "survey",
     "caveat": {
      "ru": "Это самоотчёт респондентов, и слово «масштабируем» каждый понимает по-своему — никто не проверял. В том же отчёте хоть какой-то эффект на EBIT от ИИ вообще приписывают 39%, причём большинство из них говорит о менее 5% EBIT; связь именно с агентами не показана.",
      "en": "This is respondents self-reporting, and each defines \"scaling\" for themselves — nothing was verified. In the same report 39% attribute any level of EBIT impact to AI at all, and most of those say it is under 5% of EBIT; no link to agents specifically is demonstrated."
     },
     "source": {
      "title": "The State of AI: Global Survey 2025",
      "url": "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
      "org": "McKinsey (QuantumBlack), 1993 участника из 105 стран, поле 25.06–29.07.2025",
      "date": "2025-11-05"
     }
    },
    {
     "claim": {
      "ru": "Навык «агентный ИИ» появился в вакансиях практически с нуля и за год вырос более чем на 280%: с 0,06% всех вакансий США в 2024-м до 0,23% в 2025-м, это примерно 90 тысяч вакансий.",
      "en": "\"Agentic AI\" as a posted skill came out of nowhere and grew over 280% in one year: from 0.06% of all US job postings in 2024 to 0.23% in 2025 — roughly 90,000 postings."
     },
     "figure": "0,06% → 0,23% всех вакансий США, ~90 000 вакансий, рост более 280% за год",
     "kind": "jobs",
     "caveat": {
      "ru": "База крошечная: около четверти процента вакансий — это край рынка труда, а не рынок. Вакансия не равна найму. И кластер «Agentic AI» Lightcast добавила в классификацию именно в этом году (десятый кластер, 300+ отслеживаемых навыков) — то есть отчасти это то, что начали считать.",
      "en": "The base is tiny: about a quarter of one percent of postings is the edge of the labor market, not the market. A posting is not a hire. And Lightcast added the \"Agentic AI\" cluster to its taxonomy this very year (its tenth cluster, 300+ tracked skills) — so part of what we see is the start of counting."
     },
     "source": {
      "title": "Lightcast and Stanford University: Annual AI Index 2026",
      "url": "https://lightcast.io/resources/research/stanford-ai-index-2026",
      "org": "Lightcast, анализ массива вакансий США для Stanford AI Index 2026",
      "date": "2026 (сопутствующий разбор Lightcast — 13.04.2026)"
     }
    },
    {
     "claim": {
      "ru": "Кодовые агенты уже пишут работу в живых репозиториях: с мая по сентябрь 2025 создано более миллиона pull request'ов кодовыми агентами. И активность концентрируется в зрелых проектах — со звёздами, большим размером и возрастом, а не в песочницах.",
      "en": "Coding agents are already producing work in live repositories: over a million pull requests were created by coding agents between May and September 2025. And the activity concentrates in mature projects — more stars, larger size, greater age — not in throwaway sandboxes."
     },
     "figure": "1+ млн PR от кодовых агентов, май–сентябрь 2025; 1,13 млн+ публичных репозиториев импортируют LLM SDK (+178% за год)",
     "kind": "telemetry",
     "caveat": {
      "ru": "GitHub не публикует долю смерженных PR — а созданный PR это заявка, а не принятая работа. Сам отчёт называет наблюдаемое «первым проблеском» и прямо говорит о сильных эффектах отбора: агентов запускают в репозиториях, которые старше, крупнее и популярнее среднего, и призывает к экспериментам сообщества, чтобы получить нормальную базовую линию.",
      "en": "GitHub publishes no merge rate — and a created PR is a submission, not accepted work. The report itself calls this \"a first glimpse\" and states outright that there are strong selection effects: agents are pointed at repos that are older, larger and more popular than average, and it calls for community-led experiments to establish a proper baseline."
     },
     "source": {
      "title": "Octoverse: A new developer joins GitHub every second as AI leads TypeScript to #1",
      "url": "https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/",
      "org": "GitHub, платформенная телеметрия",
      "date": "2025-10-28 (обновлено 28.02.2026)"
     }
    },
    {
     "claim": {
      "ru": "Агенты резко прибавили на задачах «поработай за компьютером»: на OSWorld успешность выросла с 12% до примерно 66%. И там же видно, зачем нужна архитектура: на структурированных бенчмарках агенты всё ещё проваливают примерно 1 попытку из 3.",
      "en": "Agents jumped sharply on \"operate a computer\" tasks: OSWorld task success went from 12% to about 66%. The same passage shows why architecture matters: on structured benchmarks agents still fail roughly 1 in 3 attempts."
     },
     "figure": "OSWorld: с 12% до ~66% успешности задач; провал примерно в 1 попытке из 3",
     "kind": "stats",
     "caveat": {
      "ru": "Бенчмарк — не прод. Задачи OSWorld короткие и изолированные, без чужих людей, чужих систем и последствий. Цифра приведена в разделе про «зубчатый фронтир»: рядом с золотом математической олимпиады стоит неумение прочитать аналоговые часы. Треть провалов — это не тот показатель, с которым процесс оставляют без человека.",
      "en": "A benchmark is not production. OSWorld tasks are short and isolated — no other people, no other systems, no consequences. The figure sits in the report's \"jagged frontier\" section: a math-olympiad gold medal next to an inability to read an analog clock. A one-in-three failure rate is not a rate you leave a process running unattended on."
     },
     "source": {
      "title": "The 2026 AI Index Report",
      "url": "https://hai.stanford.edu/ai-index/2026-ai-index-report",
      "org": "Stanford HAI",
      "date": "2026 (дата на странице не указана; сопутствующий разбор Lightcast — 13.04.2026)"
     }
    },
    {
     "claim": {
      "ru": "Сдвиг к делегированию видно в телеметрии, а не только в опросах: медианная сессия Claude Code, в которой готовится пост или статья, содержит один промпт человека, тогда как медианный разговор в чате на ту же работу занимает 13 кругов обмена.",
      "en": "The shift toward delegation shows up in telemetry, not just surveys: the median Claude Code session producing a blog post or article contains a single human prompt, while the median chat conversation doing the same work involves 13 rounds of back-and-forth."
     },
     "figure": "медиана: 1 промпт человека (Claude Code) против 13 кругов обмена (чат); средняя разница автономности 0,37 пункта",
     "kind": "telemetry",
     "caveat": {
      "ru": "Это телеметрия одного вендора по его же продуктам, и сравниваются не «агент против человека», а два интерфейса одного вендора. Измерено число вмешательств человека и размеченная по разговору автономность, а НЕ качество результата: меньше вмешательств не значит лучше сделано. Связанная опросная часть (~9700 респондентов) — обычный самоотчёт.",
      "en": "This is one vendor's telemetry on its own products, and the comparison is not \"agent vs human\" but two interfaces from the same vendor. What is measured is the number of human interventions and an autonomy score read off the conversation — NOT the quality of the output: fewer interventions does not mean better work. The linked survey (~9,700 respondents) is ordinary self-report."
     },
     "source": {
      "title": "Anthropic Economic Index report: Cadences",
      "url": "https://www.anthropic.com/research/economic-index-june-2026-report",
      "org": "Anthropic, телеметрия использования собственных продуктов + связанный опрос ~9700 респондентов",
      "date": "2026-06-26"
     }
    }
   ],
   "mechanics": [
    {
     "process": {
      "ru": "Миграция легаси-кода в большой кодовой базе Google: смена типа идентификатора int32→int64 в Ads, перевод тестов JUnit3→JUnit4, Joda Time→java.time",
      "en": "Legacy code migration in Google's large codebase: int32→int64 ID type change in Ads, JUnit3→JUnit4 test migration, Joda Time→java.time"
     },
     "pattern": {
      "ru": "Конвейер: инструмент находит места, требующие правки, LLM генерирует изменение, сборка и тесты отсеивают мусор. Дальше правку принимает человек: «тот же инженер вручную проверяет изменение и при необходимости правит файлы, где модель ошиблась», после чего изменение шардируется и уходит нескольким ревьюерам, владеющим затронутыми частями кодовой базы.",
      "en": "A pipeline: tooling locates the places needing change, an LLM generates the edit, build and tests filter out the garbage. Then a human takes over: \"the same engineer then manually checks the change and potentially updates files where the model failed or made a mistake\", after which the change is sharded and sent to multiple reviewers who own the affected parts of the codebase."
     },
     "outcome": {
      "ru": "В миграции int32→int64 (раздел IV) 80% правок в залетевших CL написаны ИИ полностью, остальные — человеком или доправлены из подсказок ИИ; общее время миграции сократилось на оценочно 50% — и это оценка САМИХ инженеров, делавших миграцию, в сравнении с похожим упражнением без LLM. JUnit3→JUnit4: 5359 файлов и более 149 000 строк за 3 месяца, около 87% сгенерированного кода закоммичено без изменений. Joda→java.time: экономия около 89% времени, которое ушло бы у людей. Человек в контуре — узкое место по прямому заявлению авторов: «бутылочным горлышком процесса была скорость, с которой инженеры могли проверять изменения».",
      "en": "In the int32→int64 migration (Section IV), 80% of the modifications in landed CLs were fully AI-authored, the rest human-authored or edited from AI suggestions; total migration time fell by an estimated 50% — and that estimate comes from THE ENGINEERS doing the migration, compared against a similar exercise without LLM assistance. JUnit3→JUnit4: 5,359 files and over 149,000 lines in 3 months, with ~87% of AI-generated code committed without any change. Joda→java.time: around 89% of the time humans would have spent was saved. The human in the loop is the bottleneck, by the authors' own words: \"the bottleneck in the process was the speed at which engineers could review the changes\"."
     },
     "kind": "vendor",
     "source": {
      "title": "How is Google using AI for internal code migrations?",
      "url": "https://arxiv.org/abs/2501.06972",
      "org": "Google (Stoyan Nikolov, Daniele Codecasa, Anna Sjovall, Maxim Tabachnyk, Satish Chandra, Siddharth Taneja, Celal Ziftci)",
      "date": "2025-01-12"
     }
    },
    {
     "process": {
      "ru": "Исследовательский поиск: сбор и сведение информации по широкому запросу пользователя",
      "en": "Research search: gathering and synthesizing information for a broad user query"
     },
     "pattern": {
      "ru": "Оркестратор-исполнители: ведущий агент на более сильной модели планирует и раздаёт подзадачи параллельным субагентам на модели подешевле, у каждого своё контекстное окно; ведущий сводит результаты.",
      "en": "Orchestrator-workers: a lead agent on the stronger model plans and hands out subtasks to parallel subagents on a cheaper model, each with its own context window; the lead synthesizes the results."
     },
     "outcome": {
      "ru": "На внутренней оценке связка «ведущий Opus 4 + субагенты Sonnet 4» обошла одиночного Opus 4 на 90,2%. Плата за это: агенты расходуют примерно в 4 раза больше токенов, чем чат, а многоагентные системы — примерно в 15 раз больше. На BrowseComp три фактора объясняют 95% разброса результата, и один расход токенов даёт 80% (остальное — число вызовов инструментов и выбор модели). Авторы честно ограничивают применимость: выигрыш там, где задача сильно распараллеливается, информация не влезает в одно контекстное окно и нужно много сложных инструментов; там, где всем агентам нужен общий контекст или между ними много зависимостей, схема НЕ подходит, и «в большинстве задач по коду по-настоящему параллельного меньше, чем в исследовании». Человек в контуре: ручное тестирование названо обязательным даже в мире автоматических оценок — живые тестировщики находят краевые случаи, которых оценки не видят, и именно они выявили перекос в сторону SEO-оптимизированных контент-фарм против авторитетных, но хуже ранжированных источников.",
      "en": "On an internal evaluation, a lead Opus 4 with Sonnet 4 subagents outperformed single-agent Opus 4 by 90.2%. The price: agents use about 4× the tokens of a chat interaction, and multi-agent systems about 15×. On BrowseComp three factors explain 95% of the performance variance, and token usage alone explains 80% (the rest being tool-call count and model choice). The authors bound applicability honestly: the gain is in tasks with heavy parallelization, information exceeding a single context window, and many complex tools; domains where all agents need the same context or have many inter-agent dependencies are NOT a good fit, and \"most coding tasks involve fewer truly parallelizable tasks than research\". Human in the loop: manual testing is called essential even in a world of automated evals — human testers find edge cases evals miss, and it was they who surfaced the bias toward SEO-optimized content farms over authoritative but lower-ranked sources."
     },
     "kind": "vendor",
     "source": {
      "title": "How we built our multi-agent research system",
      "url": "https://www.anthropic.com/engineering/multi-agent-research-system",
      "org": "Anthropic",
      "date": "2025-06-13"
     }
    },
    {
     "process": {
      "ru": "Правка багов, доработка фич и рефакторинг в зрелых open-source репозиториях (в среднем 22k+ звёзд и 1M+ строк)",
      "en": "Bug fixes, feature work and refactoring in mature open-source repositories (averaging 22k+ stars and 1M+ lines)"
     },
     "pattern": {
      "ru": "Разработчик работает в агентном редакторе (преимущественно Cursor Pro с Claude 3.5/3.7 Sonnet — на тот момент передовые модели). Каждая задача СЛУЧАЙНО отнесена к «ИИ разрешён» или «ИИ запрещён» — это настоящий рандомизированный эксперимент, а не опрос.",
      "en": "A developer works in an agentic editor (primarily Cursor Pro with Claude 3.5/3.7 Sonnet — frontier models at the time). Each issue is RANDOMLY assigned to AI-allowed or AI-disallowed — an actual randomized experiment, not a survey."
     },
     "outcome": {
      "ru": "16 опытных разработчиков, 246 задач в среднем по два часа: с доступом к ИИ задачи занимали на 19% БОЛЬШЕ времени (доверительный интервал от +2% до +39%). При этом до эксперимента разработчики ожидали ускорения на 24%, а после, уже замедлившись, считали, что ускорились на 20%. Это и есть главный факт для архитектора: собственное ощущение скорости разошлось с фактом на сорок пунктов. Оговорка от самих авторов (24.02.2026): выборка страдает эффектами отбора — систематически теряются и самые оптимистичные разработчики, и задачи с высоким ожидаемым выигрышем от ИИ, поэтому −19% они называют НИЖНЕЙ границей истинного эффекта. В новом прогоне точечные оценки — −18% и −4% «ускорения» (то есть по-прежнему замедление, но меньше), интервалы пересекают ноль, и METR сам называет этот сигнал ненадёжным. Человек в контуре: он здесь единственный исполнитель, и время уходило именно на чтение и доведение агентного вывода.",
      "en": "16 experienced developers, 246 issues averaging two hours each: with AI access, tasks took 19% LONGER (confidence interval +2% to +39%). Before the study developers expected a 24% speedup; afterwards, having actually slowed down, they believed they had sped up by 20%. That is the load-bearing fact for an architect: the felt sense of speed diverged from the measurement by forty points. Caveat from the authors themselves (2026-02-24): the sample suffers from selection effects — they systematically miss both the most AI-optimistic developers and the tasks with the highest expected AI uplift — so they call −19% a LOWER BOUND on the true effect. In the newer run the point estimates are −18% and −4% \"speedup\" (i.e. still slowdown, but smaller), the intervals cross zero, and METR itself calls the signal unreliable. Human in the loop: the human is the sole operator here, and the time went precisely into reading and finishing the agent's output."
     },
     "kind": "experiment",
     "source": {
      "title": "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity",
      "url": "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/",
      "org": "METR",
      "date": "2025-07-10 (оговорка о методике — «We are Changing our Developer Productivity Experiment Design», 24.02.2026, https://metr.org/blog/2026-02-24-uplift-update/)"
     }
    },
    {
     "process": {
      "ru": "Многоагентные пайплайны разработки ПО и решения задач: ChatDev, MetaGPT, HyperAgent, AppWorld, AG2 (MathChat), Magentic-One, OpenManus",
      "en": "Multi-agent software-development and task-solving pipelines: ChatDev, MetaGPT, HyperAgent, AppWorld, AG2 (MathChat), Magentic-One, OpenManus"
     },
     "pattern": {
      "ru": "Разбор 1642 размеченных трасс исполнения семи систем: почему они падают. Сбои сведены в таксономию из 14 уникальных режимов и трёх категорий — проектирование системы, рассогласование между агентами, проверка задачи.",
      "en": "An analysis of 1,642 annotated execution traces across seven systems: why they fail. Failures are organized into a taxonomy of 14 unique modes in three categories — system design, inter-agent misalignment, and task verification."
     },
     "outcome": {
      "ru": "Самые частые режимы отказа: повтор шага 15,7%, расхождение между рассуждением и действием 13,2%, незнание условий остановки 12,4%. То есть агенты чаще ходят по кругу и не понимают, когда закончить, чем ошибаются в предметной части. Целевые правки архитектуры дали измеримое на бенчмарке ProgramDev с ChatDev: простая перестройка потока так, чтобы последнее слово оставалось за агентом-CEO (до этого агент-CPO мог оборвать разговор без его согласия), дала +9,4% к успешности задач, а добавление шага проверки высокоуровневой цели задачи — +15,6%. И тут же честный итог авторов: нужны более существенные改 улучшения, доля выполненных задач остаётся низкой. Человек в контуре: людской слой здесь — шесть экспертов, разбиравших трассы, и три эксперта-разметчика в исследовании согласия (κ=0,88); а внутри самих систем отсутствие проверяющего звена и есть третья категория сбоев.",
      "en": "The most frequent failure modes: step repetition 15.7%, reasoning-action mismatch 13.2%, unaware of stopping conditions 12.4%. Agents go in circles and fail to know when to stop more often than they get the domain wrong. Targeted architectural fixes produced measurable gains on the ProgramDev benchmark with ChatDev: a straightforward workflow adjustment ensuring the CEO agent had the final say (previously the CPO agent could terminate the conversation without its consensus) added +9.4% to task success rate, and adding a high-level task-objective verification step added +15.6%. The authors' own honest bottom line follows: more substantial improvements are needed and task completion rates still remain low. Human in the loop: the human layer here is six experts who analyzed the traces plus three expert annotators in the agreement study (κ=0.88); inside the systems themselves, the missing verifier is exactly the third failure category."
     },
     "kind": "other",
     "source": {
      "title": "Why Do Multi-Agent LLM Systems Fail?",
      "url": "https://arxiv.org/abs/2503.13657",
      "org": "UC Berkeley и соавторы (Cemri, Pan, Yang, Agrawal, Chopra, Tiwari, Keutzer, Parameswaran, Klein, Ramchandran, Zaharia, Gonzalez, Stoica)",
      "date": "2025-03-17 (последняя версия v3 — 2025-10-26)"
     }
    },
    {
     "process": {
      "ru": "Повседневная работа со знаниями: подготовка текстов и постов",
      "en": "Everyday knowledge work: drafting text and blog posts"
     },
     "pattern": {
      "ru": "Один и тот же тип задачи выполняется двумя способами — в чате, где человек участвует в каждом шаге, и в агентном инструменте (Claude Code), где человек ставит задачу и принимает результат. Разницу считают не по ощущениям, а по числу вмешательств человека внутри задачи и по размеченной автономности разговора.",
      "en": "The same kind of task done two ways — in chat, where the human is in every step, and in an agentic tool (Claude Code), where the human sets the task and accepts the result. The difference is measured by counting human interventions inside the task and by a scored autonomy level of the conversation, not by asking how it felt."
     },
     "outcome": {
      "ru": "Медианный разговор в чате, из которого выходит пост или статья, содержит 13 кругов обмена; медианная сессия Claude Code, дающая тот же результат, — один промпт человека. Средняя разница автономности по всем разговорам — 0,37 пункта, и примерно две трети этой разницы объясняются тем, что ОДНИ И ТЕ ЖЕ задачи выполняются с большей делегацией в Claude Code, а не другим набором задач. Человек в контуре: он остаётся на постановке и на приёмке; измеренное — именно падение числа его вмешательств внутри задачи, а НЕ рост качества результата.",
      "en": "The median chat conversation producing a blog post or article involves 13 rounds of back-and-forth; the median Claude Code session producing the same thing contains a single human prompt. Across all conversations the average autonomy difference is 0.37 points, and roughly two-thirds of it is explained by THE SAME tasks being executed with more delegation on Claude Code, not by a different mix of tasks. Human in the loop: the human stays at task definition and at acceptance; what was measured is the drop in their interventions inside the task, NOT a rise in output quality."
     },
     "kind": "telemetry",
     "source": {
      "title": "Anthropic Economic Index report: Cadences",
      "url": "https://www.anthropic.com/research/economic-index-june-2026-report",
      "org": "Anthropic",
      "date": "2026-06-26"
     }
    }
   ],
   "roles": [
    {
     "title": {
      "ru": "Агентный инженер (AI / agent engineer)",
      "en": "AI / agent engineer"
     },
     "note": {
      "ru": "Собирает работающий агент под конкретный процесс: инструменты, контекст, условия остановки, обработка отказов. Именно этот навык рынок сейчас называет «Agentic AI» в вакансиях — около 90 тысяч постингов в США за 2025 год (0,23% всех вакансий). Трек ведёт сюда напрямую: паттерны оркестрации плюс разбор режимов отказа.",
      "en": "Builds a working agent for a specific process: tools, context, termination conditions, failure handling. This is the skill the market currently labels \"Agentic AI\" in postings — roughly 90,000 US postings in 2025 (0.23% of all postings). The track leads here directly: orchestration patterns plus failure-mode analysis."
     }
    },
    {
     "title": {
      "ru": "Архитектор ИИ-решений",
      "en": "AI solutions architect"
     },
     "note": {
      "ru": "Решает не «как сделать агента», а «нужен ли он тут вообще и где в контуре остаётся человек». Самая ценная часть работы — сказать «одного вызова модели достаточно»: по данным Anthropic многоагентная схема расходует примерно в 15 раз больше токенов, чем чат, а сами авторы паттерна прямо перечисляют случаи, где он НЕ подходит. Трек даёт для этого разговора цифры и границы применимости, а не мнение.",
      "en": "Decides not \"how do we build an agent\" but \"is one warranted here, and where does the human stay in the loop\". The most valuable part of the job is saying \"a single model call is enough\": per Anthropic a multi-agent design uses roughly 15× the tokens of a chat interaction, and the pattern's own authors spell out where it does NOT fit. The track supplies numbers and applicability limits for that conversation instead of opinions."
     }
    },
    {
     "title": {
      "ru": "Инженер платформы для агентов (LLMOps)",
      "en": "Agent platform engineer (LLMOps)"
     },
     "note": {
      "ru": "Делает не один агент, а то, на чём их строят все остальные: реестр инструментов, память, версии промптов, трассировка, бюджеты. Спрос виден в данных вакансий: по Lightcast самый быстрый долгосрочный рост дают «развёрточные» навыки — AWS, масштабируемость, управление рабочими потоками. Косвенное подтверждение из телеметрии GitHub: LLM SDK импортируют уже 1,13 млн+ публичных репозиториев.",
      "en": "Builds not one agent but the substrate everyone else builds on: tool registry, memory, prompt versioning, tracing, budgets. Job-posting data shows the demand: per Lightcast the fastest long-term growth comes from deployment-oriented capabilities — AWS, scalability, workflow management. Indirect corroboration from GitHub telemetry: 1.13M+ public repositories already import an LLM SDK."
     }
    },
    {
     "title": {
      "ru": "Инженер по оценке и надёжности агентов",
      "en": "Agent evaluation and reliability engineer"
     },
     "note": {
      "ru": "Строит проверки для системы, которая на одном и том же промпте ведёт себя по-разному. Без этой роли агент нельзя ни отладить, ни допустить в процесс: на структурированных бенчмарках вроде OSWorld агенты проваливают примерно каждую третью попытку, а живые тестировщики находят краевые случаи, которых автоматические оценки не показывают.",
      "en": "Builds evaluation for a system that behaves differently on identical prompts. Without this role an agent can neither be debugged nor admitted into a process: on structured benchmarks like OSWorld agents still fail roughly one attempt in three, and human testers find edge cases that automated evals never surface."
     }
    }
   ],
   "skills": [
    {
     "name": {
      "ru": "Паттерны оркестрации и умение выбрать самый простой из работающих",
      "en": "Orchestration patterns, and picking the simplest one that works"
     },
     "why": {
      "ru": "Набор устоявшийся и небольшой: цепочка промптов, маршрутизация, распараллеливание, оркестратор-исполнители, оценщик-оптимизатор. Ценность не в знании названий, а в решении «здесь хватит одного вызова»: авторы каталога прямо советуют начинать с простых промптов и добавлять агентность, только когда простое решение не справляется.",
      "en": "The catalogue is settled and short: prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer. The value is not knowing the names but making the call \"one model call is enough here\": the catalogue's authors explicitly advise starting with simple prompts and adding agentic steps only when simpler solutions fall short."
     }
    },
    {
     "name": {
      "ru": "Проектирование остановки и проверки результата",
      "en": "Designing termination and verification"
     },
     "why": {
      "ru": "По разбору 1642 трасс это буквально самые частые поломки: повтор шага 15,7%, незнание условий остановки 12,4%. И это лечится архитектурой: на ProgramDev с ChatDev добавление шага проверки высокоуровневой цели дало +15,6% к успешности задач, а перестройка потока так, чтобы последнее слово было за одним агентом, — +9,4%.",
      "en": "Across 1,642 annotated traces these are literally the most common breakages: step repetition 15.7%, unaware of stopping conditions 12.4%. And architecture fixes them: on ProgramDev with ChatDev, adding a high-level objective verification step gained +15.6% task success, and reworking the flow so one agent has the final say gained +9.4%."
     }
    },
    {
     "name": {
      "ru": "Оценки и сквозная трассировка недетерминированной системы",
      "en": "Evals and end-to-end tracing for a non-deterministic system"
     },
     "why": {
      "ru": "Агент на одинаковом промпте ведёт себя по-разному, поэтому обычная отладка не работает — нужна полная трассировка прогонов. И оценки не заменяют человека: Anthropic пишет, что ручное тестирование остаётся обязательным даже при автоматических оценках, и именно живые тестировщики нашли перекос в сторону SEO-контент-фарм против авторитетных источников.",
      "en": "An agent behaves differently on identical prompts, so ordinary debugging fails — you need full tracing of runs. And evals do not replace people: Anthropic states that manual testing remains essential even with automated evals, and it was human testers who found the bias toward SEO content farms over authoritative sources."
     }
    },
    {
     "name": {
      "ru": "Бюджет токенов и стоимости как проектное решение",
      "en": "Token and cost budgeting as a design decision"
     },
     "why": {
      "ru": "Многоагентная схема расходует примерно в 15 раз больше токенов, чем чат (одиночный агент — в 4 раза). Причём на BrowseComp расход токенов сам по себе объясняет 80% разброса результата — значит бюджет это не бухгалтерия, а прямая ручка качества, и её надо крутить осознанно.",
      "en": "A multi-agent design burns roughly 15× the tokens of a chat interaction (a single agent about 4×). And on BrowseComp token spend alone explains 80% of the variance in outcomes — so budget is not accounting, it is a direct quality dial, and it has to be set deliberately."
     }
    },
    {
     "name": {
      "ru": "Проектирование передачи человеку: где ревью, где приёмка, где стоп",
      "en": "Designing the handoff to a human: review, acceptance, hard stop"
     },
     "why": {
      "ru": "В самом сильном публичном кейсе — миграциях кода в Google, где 80% правок в залетевших CL написал ИИ — ревью и раскатка остались человеческими, и авторы прямо называют бутылочным горлышком скорость, с которой инженеры успевали проверять изменения. Кто не спроектировал этот стык, получит очередь вместо ускорения.",
      "en": "In the strongest public case — Google's code migrations, where AI authored 80% of the modifications in landed CLs — review and rollout stayed human, and the authors name the bottleneck outright: the speed at which engineers could review the changes. Skip designing that seam and you get a queue instead of a speedup."
     }
    },
    {
     "name": {
      "ru": "Интеграции и безопасность агентного контура",
      "en": "Integrations and agentic-system security"
     },
     "why": {
      "ru": "Подключение к внешним системам стандартизуется (в открытой документации Google ADK есть протокол agent-to-agent), и вместе с доступом приходит новый класс угроз: агент действует от чьего-то имени и ходит по чужим данным. Именно поэтому у OWASP GenAI Security Project существует отдельный threat-model по агентам, а курс Berkeley закрывается лекцией про разделение привилегий, детекцию prompt injection и отравление памяти агента.",
      "en": "Connecting to external systems is standardizing (Google's open ADK docs include an agent-to-agent protocol), and with access comes a new threat class: an agent acts on someone's behalf and touches other people's data. That is exactly why the OWASP GenAI Security Project maintains a separate agentic threat model, and why the Berkeley course closes with a lecture on privilege separation, prompt-injection detection and agent-memory poisoning."
     }
    }
   ],
   "anchors": [
    {
     "title": "Building effective agents",
     "url": "https://www.anthropic.com/engineering/building-effective-agents",
     "org": "Anthropic (инженерный блог), 19.12.2024",
     "why": {
      "ru": "Короткий каталог всех пяти базовых паттернов — цепочка промптов, маршрутизация, распараллеливание, оркестратор-исполнители, оценщик-оптимизатор. Главная ценность в том, что он же учит НЕ строить агента: «начинайте с простых промптов, оптимизируйте их полноценными оценками и добавляйте многошаговые агентные системы только тогда, когда простые решения не справляются», и добавляйте сложность лишь когда она измеримо улучшает результат.",
      "en": "A short catalogue of all five base patterns — prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer. Its real value is that it also teaches you NOT to build an agent: \"start with simple prompts, optimize them with comprehensive evaluation, and add multi-step agentic systems only when simpler solutions fall short\", adding complexity only when it demonstrably improves outcomes."
     }
    },
    {
     "title": "Agent Development Kit (ADK) — документация",
     "url": "https://adk.dev/",
     "org": "Google (открытая документация, без регистрации)",
     "why": {
      "ru": "Оркестрация в виде кода, а не слайдов: шаблонные потоки sequential / loop / parallel, графовые потоки (маршруты, работа с данными, ввод человека, динамические потоки), протокол A2A с быстрыми старта́ми на «выставить» и «потребить» агента, и отдельный раздел оценки — критерии, симуляция пользователя, симуляция среды, свои метрики. Здесь паттерны из теории превращаются в то, что запускается.",
      "en": "Orchestration as code rather than slides: sequential / loop / parallel template workflows, graph workflows (routes, data handling, human input, dynamic workflows), the A2A protocol with quickstarts for exposing and consuming agents, and a dedicated evaluation section — criteria, user simulation, environment simulation, custom metrics. This is where the patterns become something you can actually run."
     }
    },
    {
     "title": "Agentic AI (курс)",
     "url": "https://www.deeplearning.ai/courses/agentic-ai/",
     "org": "DeepLearning.AI, преподаёт Andrew Ng",
     "why": {
      "ru": "Пять модулей, ~10 часов, 31 видеоурок: агентные паттерны проектирования (рефлексия, использование инструментов, планирование, многоагентные потоки), отдельный модуль про оценки и разбор ошибок с расстановкой приоритетов, отдельный — про многоагентные потоки и способы связи между агентами. Видео доступны бесплатно по аудиту, форум сообщества тоже; квизы, 8 оценочных заданий, лабы и сертификат — по подписке Pro (25 долларов в месяц при годовой оплате, 30 при месячной).",
      "en": "Five modules, ~10 hours, 31 video lessons: agentic design patterns (reflection, tool use, planning, multi-agent workflows), a module devoted to evals and error analysis with prioritization, and another to multi-agent workflows and inter-agent communication patterns. Videos are free to audit, as is the community forum; quizzes, 8 graded assignments, labs and the certificate need the Pro membership ($25/mo billed annually, $30/mo monthly)."
     }
    },
    {
     "title": "Advanced Large Language Model Agents (MOOC, весна 2025)",
     "url": "https://llmagents-learning.org/sp25",
     "org": "UC Berkeley, Dawn Song, со-преподаватели Xinyun Chen (Google DeepMind) и Kaiyu Yang (Meta FAIR)",
     "why": {
      "ru": "Университетский взгляд под низ паттернов: рассуждение на этапе вывода, методы пост-обучения для рассуждения, генерация и верификация кода, математика и доказательство теорем, мультимодальные автономные агенты, автоформализация; девять приглашённых докладчиков из DeepMind, Meta, CMU, OSU, UW и UT Austin. Финальная лекция (28 апреля, Dawn Song) — про построение безопасных агентных систем: разделение привилегий, детекция prompt injection, отравление памяти и баз знаний агента. Курс закончился, записи и слайды остаются открытыми.",
      "en": "The university view underneath the patterns: inference-time reasoning, post-training methods for reasoning, code generation and verification, mathematics and theorem proving, multimodal autonomous agents, autoformalization; nine guest speakers from DeepMind, Meta, CMU, OSU, UW and UT Austin. The closing lecture (April 28, Dawn Song) covers building safe and secure agentic AI — privilege separation, prompt-injection detection, poisoning of agent memory and knowledge bases. The course has ended; recordings and slides stay open."
     }
    },
    {
     "title": "Agentic AI – Threats and Mitigations",
     "url": "https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/",
     "org": "OWASP GenAI Security Project (Agentic Security Initiative), 17.02.2025",
     "why": {
      "ru": "Threat-model именно по агентным системам, а не по разговорным LLM-приложениям, — и первое, что спросят, когда агента понесут в реальный процесс с доступом к чужим данным. Скачивается свободно; конкретные категории угроз перечислены в самом PDF, а не на странице (это проверено — на лендинге их нет).",
      "en": "A threat model aimed at agentic systems rather than conversational LLM applications — and the first thing you will be asked for when an agent goes into a real process with access to real data. Free to download; the specific threat categories live in the PDF, not on the landing page (verified — the landing page does not enumerate them)."
     }
    }
   ],
   "caveat": {
    "ru": "Это трек с самой слабой доказательной базой из всех прикладных: строить агентов учат много, а независимо мерить их в продакшене почти никто не умеет.\n\nПервое и главное: честного числа про долю провалившихся агентных пилотов в этом наборе нет. Гуляющие по статьям «40% агентных проектов свернут к 2027-му» и «60% не доехали до прода» — это прогнозы аналитиков и пресс-релизы вендоров, а не измерения; они выброшены целиком, хотя запрос на них был. Так что на вопрос «какова доля провалов» ответа здесь не будет.\n\nВторое: почти вся механика внедрения — самоотчёт. Миграции кода в Google, оркестратор-исполнители в Anthropic — это отчёты компаний о самих себе. У Google сокращение времени на 50% прямо в тексте помечено как оценка САМИХ инженеров, делавших миграцию; у Anthropic +90,2% — внутренняя, неопубликованная оценка. Проверить это снаружи нельзя, и пометка «самоотчёт» не превращает самоотчёт в измерение.\n\nТретье: единственный настоящий рандомизированный эксперимент по треку — METR — во-первых, не про многоагентность вообще (это один разработчик с агентным редактором), во-вторых, сами авторы в феврале 2026 сообщили, что выборка страдает эффектами отбора: систематически теряются и самые оптимистичные разработчики, и задачи с высоким ожидаемым выигрышем от ИИ. Поэтому −19% METR называет НИЖНЕЙ границей истинного эффекта, а новые точечные оценки (−18% и −4% «ускорения», то есть по-прежнему замедление, но меньше) сам же считает ненадёжным сигналом с интервалами через ноль. Держите этот кейс как урок про разрыв между ощущением и фактом (сорок пунктов!), а не как оценку пользы агентов, и не пересказывайте его как «METR теперь видит ускорение» — так в источнике не написано.\n\nЧетвёртое: то, что мерят, и то, что важно, — разные вещи. Публичные цифры почти всегда про скорость, стоимость и долю сгенерированного, и почти никогда про качество решения, накопленный техдолг и остаточный риск. «80% правок написал ИИ» — не то же самое, что «стало лучше». Та же ловушка в телеметрии Anthropic: измерено падение числа вмешательств человека, а не рост качества результата.\n\nПятое: опросные проценты про масштабирование никто не верифицирует. 23% McKinsey — это доля тех, кто САМ СЧИТАЕТ, что масштабирует; в том же отчёте хоть какой-то эффект на EBIT от ИИ вообще приписывают 39%, причём большинство из них — менее 5% EBIT, и с агентами это не связано.\n\nШестое, про бенчмарки: 66% на OSWorld получены на коротких изолированных задачах, и в том же разделе отчёта AI Index этот результат стоит рядом с неумением прочитать аналоговые часы. Из бенчмарка нельзя вывести готовность к процессу с людьми, чужими системами и последствиями.\n\nИ седьмое, про рынок: профессия «архитектор агентов» под таким названием почти не встречается в вакансиях. Спрос реальный, но идёт под вывесками AI engineer, platform engineer, solutions architect, и составляет пока 0,23% вакансий США — причём Lightcast добавила сам кластер «Agentic AI» только в этом году, так что часть роста это то, что начали считать. Трек готовит к работе, которая существует; названия, которое красиво впишется в резюме, он не гарантирует.",
    "en": "This is the weakest evidence base of any applied track: plenty of people teach agent building, and almost nobody measures agents in production independently.\n\nFirst and foremost: this set contains no honest figure for the share of failed agentic pilots. The numbers circulating in articles — \"40% of agentic projects will be scrapped by 2027\", \"60% never reached production\" — are analyst forecasts and vendor press releases, not measurements; they were discarded entirely, even though they were explicitly asked for. So there is no answer here to \"what fraction fails\".\n\nSecond: nearly all the deployment mechanics are self-report. Google's code migrations, Anthropic's orchestrator-workers — these are companies reporting on themselves. Google's 50% time reduction is flagged in the text itself as an estimate by THE ENGINEERS who did the migration; Anthropic's +90.2% is an internal, unpublished evaluation. Neither can be checked from outside, and a \"self-report\" label does not turn a self-report into a measurement.\n\nThird: the one genuine randomized experiment on this track — METR — is, firstly, not about multi-agent systems at all (it is one developer with an agentic editor), and secondly, in February 2026 the authors themselves reported that the sample suffers from selection effects: they systematically miss both the most AI-optimistic developers and the tasks with the highest expected AI uplift. So METR calls −19% a LOWER BOUND on the true effect, while describing its newer point estimates (−18% and −4% \"speedup\" — still slowdown, just smaller) as an unreliable signal with intervals crossing zero. Keep this case as a lesson about the gap between felt and measured performance (forty points!), not as an estimate of what agents are worth — and do not retell it as \"METR now finds a speedup\", because that is not what the source says.\n\nFourth: what gets measured and what matters are different things. The public numbers are almost always speed, cost and share-of-output, and almost never decision quality, accumulated technical debt, or residual risk. \"AI authored 80% of the modifications\" is not the same claim as \"the result got better\". The same trap sits in Anthropic's telemetry: what was measured is the drop in human interventions, not a rise in output quality.\n\nFifth: survey percentages about scaling are never verified. McKinsey's 23% is the share of people who BELIEVE THEMSELVES to be scaling; in the same report 39% attribute any level of EBIT impact to AI at all, most of them under 5% of EBIT, and none of it tied to agents.\n\nSixth, on benchmarks: the 66% on OSWorld comes from short isolated tasks, and in the same section of the AI Index that result sits next to an inability to read an analog clock. You cannot infer readiness for a process involving people, other people's systems and consequences from a benchmark.\n\nSeventh, on the market: the job title \"agent architect\" barely appears in postings. The demand is real but arrives labeled AI engineer, platform engineer, or solutions architect, and still amounts to 0.23% of US postings — and Lightcast only added the \"Agentic AI\" cluster itself this year, so part of the growth is the start of counting. The track prepares you for work that exists; it does not guarantee a title that will look tidy on a résumé."
   }
  },
  "memory-eng": {
   "lede": {
    "ru": "Единственная независимая предрегистрированная проверка коммерческих юридических систем, продававшихся как «без галлюцинаций», дала 17–33% галлюцинаций, а частая причина ошибки — извлечение текстуально похожего, но юридически неприменимого документа. При этом сам поиск чинится отдельно и это видно в цифрах: доля промахов на top-20 падает с 5,7% до 1,9% через контекст чанков, гибридный поиск и реранкинг — поэтому трек про то, чтобы мерить извлечение отдельно от генерации, иначе непонятно, что именно сломалось.",
    "en": "The one independent, preregistered audit of commercial legal systems marketed as \"hallucination-free\" found 17-33% hallucination rates, with a frequent cause being retrieval of a textually similar but legally inapplicable document. Retrieval itself, though, is fixable on its own and the numbers show it: the top-20 miss rate falls from 5.7% to 1.9% through chunk context, hybrid search and reranking — which is why this track is about measuring retrieval separately from generation, or you cannot tell what broke."
   },
   "demand": [
    {
     "claim": {
      "ru": "В британских объявлениях о постоянной работе RAG за два года прошёл путь от 4 упоминаний за полугодие до 439: за 6 месяцев до 30 июля 2026 это 0,43% всех постоянных вакансий страны, медиана заявленной зарплаты — £80 000.",
      "en": "In UK permanent job ads, RAG went from 4 mentions in a half-year to 439: in the six months to 30 July 2026 it appears in 0.43% of all permanent postings, with a median advertised salary of £80,000."
     },
     "figure": "439 вакансий за 6 мес. до 30.07.2026 против 40 годом ранее и 4 двумя годами ранее; 0,43% всех постоянных вакансий против 0,081% годом ранее; медиана £80 000 (+14,29% г/г, с £70 000). Лондон — 271 вакансия при медиане £87 500, вне Лондона — 145 при £55 000 (−21,43% г/г)",
     "kind": "jobs",
     "caveat": {
      "ru": "База крошечная. 0,43% — это узкая ниша, а рост с 4 до 439 частично про то, что термин просто начали писать в объявлениях, а не про то, что работы стало в сто раз больше. Это заявленные зарплаты в объявлениях, а не полученные. Данные только по Великобритании и только по постоянным позициям; вне Лондона медиана за год УПАЛА на 21,43% — то есть «рост спроса» распределён неравномерно и в регионах цена навыка снижается.",
      "en": "The base is tiny. 0.43% is a narrow niche, and going from 4 to 439 partly reflects employers starting to name the term rather than a hundredfold increase in actual work. These are advertised, not realised, salaries. UK-only, permanent roles only — and outside London the median FELL 21.43% year on year, so the \"rising demand\" is unevenly distributed and the skill is getting cheaper in the regions."
     },
     "source": {
      "title": "Retrieval-Augmented Generation Job Trends, Salaries & Related Skills (UK)",
      "url": "https://www.itjobswatch.co.uk/jobs/uk/retrieval-augmented%20generation.do",
      "org": "IT Jobs Watch",
      "date": "2026-07-30 (окно: 6 месяцев до этой даты)"
     }
    },
    {
     "claim": {
      "ru": "Среди разработчиков, которые сами разрабатывают ИИ-агентов или работают с ними, инструменты памяти и хранения данных для агентов за год трогали так: Redis 42,9%, GitHub MCP Server 42,8%, Supabase 20,9%, ChromaDB 19,7%, pgvector 17,9%, Neo4j 12,3%, Pinecone 11,2%, Qdrant 8,2%. То есть универсальная инфраструктура и специализированные векторные хранилища используются рядом, а не вместо друг друга.",
      "en": "Among developers who build or work with AI agents, the tools touched for agent memory and data management over the past year break down as: Redis 42.9%, GitHub MCP Server 42.8%, Supabase 20.9%, ChromaDB 19.7%, pgvector 17.9%, Neo4j 12.3%, Pinecone 11.2%, Qdrant 8.2%. General-purpose infrastructure and dedicated vector stores are used alongside each other, not instead of each other."
     },
     "figure": "Redis 42,9% · GitHub MCP Server 42,8% · Supabase 20,9% · ChromaDB 19,7% · pgvector 17,9% · Neo4j 12,3% · Pinecone 11,2% · Qdrant 8,2% · Milvus 5,2% · LangMem 4,8% · Weaviate 4,5% · mem0 4,0% · Zep 2,8% · Letta 2,5% (n=3398, 6,9% ответивших)",
     "kind": "survey",
     "caveat": {
      "ru": "Точная формулировка вопроса: «Have you used any of the following tools for AI agent memory or data management in the past year?» — то есть мерили факт касания за год, без масштаба, без качества и без того, работает ли оно в проде. Это подвыборка n=3398 (6,9% ответивших), и список смешанный: GitHub MCP Server — вообще не хранилище, поэтому читать эти проценты как «доли рынка векторных БД» нельзя. Опрос добровольный, выборка смещена в сторону активных пользователей Stack Overflow.",
      "en": "The exact question wording: \"Have you used any of the following tools for AI agent memory or data management in the past year?\" — so what was measured is having touched a tool within a year, with no scale, no quality and no evidence it runs in production. This is a sub-sample of n=3,398 (6.9% of respondents), and the list is mixed: GitHub MCP Server is not a store at all, so these percentages cannot be read as vector-database market shares. Voluntary survey, skewed toward active Stack Overflow users."
     },
     "source": {
      "title": "2025 Stack Overflow Developer Survey — AI section",
      "url": "https://survey.stackoverflow.co/2025/ai",
      "org": "Stack Overflow",
      "date": "2025-07"
     }
    },
    {
     "claim": {
      "ru": "Главное, что раздражает разработчиков в ИИ-инструментах, — не отказ и не явная ошибка, а «почти правильно, но не совсем»: это назвали 66%. Второе по частоте — «отладка ИИ-кода занимает больше времени» (45,2%). При этом точности вывода полностью доверяют 3,1%, скорее доверяют — 29,6%; не доверяют в той или иной степени — 45,7%.",
      "en": "What most frustrates developers about AI tools is not refusal or outright error but \"almost right, but not quite\" — named by 66%. Second most common: \"debugging AI-generated code is more time-consuming\" (45.2%). Meanwhile only 3.1% highly trust output accuracy and 29.6% somewhat trust it, while 45.7% distrust it to some degree."
     },
     "figure": "66% — «AI solutions that are almost right, but not quite» (n=31 476); 45,2% — отладка ИИ-кода дольше; доверие к точности (n=33 244): полностью 3,1%, скорее 29,6%, скорее не доверяют 26,1%, совсем не доверяют 19,6%",
     "kind": "survey",
     "caveat": {
      "ru": "Опрос мерил раздражение и доверие, а не частоту ошибок. Из «66% раздражаются» не следует, что 66% ответов неверны, и уж точно не следует, что виновата именно память или поиск — причина в источнике не разбирается вообще. Это самоотчёт добровольной выборки.",
      "en": "The survey measured irritation and trust, not error rates. \"66% are frustrated\" does not mean 66% of answers are wrong, and certainly does not pin the blame on memory or retrieval — the source does not analyse causes at all. Self-reported, voluntary sample."
     },
     "source": {
      "title": "2025 Stack Overflow Developer Survey — AI section",
      "url": "https://survey.stackoverflow.co/2025/ai",
      "org": "Stack Overflow",
      "date": "2025-07"
     }
    },
    {
     "claim": {
      "ru": "Неточность — тот риск ИИ, который организации, по словам своих же руководителей, чаще всего испытывали на себе и чаще всего пытаются гасить. Среди респондентов из организаций, УЖЕ применяющих ИИ, 51% говорят как минимум об одном негативном последствии; почти треть всех респондентов сообщают о последствиях именно от неточности.",
      "en": "Inaccuracy is the AI risk organisations most often say they have experienced and are working to mitigate. Among respondents from organisations already using AI, 51% report at least one instance of a negative consequence; nearly a third of all respondents report consequences stemming specifically from inaccuracy."
     },
     "figure": "«51 percent of respondents from organizations using AI say their organizations have seen at least one instance of a negative consequence»; «nearly one-third of all respondents reporting consequences stemming from AI inaccuracy»; 88% регулярно используют ИИ хотя бы в одной бизнес-функции (против 78% годом ранее)",
     "kind": "survey",
     "caveat": {
      "ru": "Это самооценка руководителей, а не измерение систем. Знаменатель у 51% — не все респонденты, а только те, чьи организации уже применяют ИИ. «Работаем над снижением неточности» может означать и полноценный контур оценки поиска, и одну строчку в промпте: опрос этого не различает. Отбор респондентов — по панели McKinsey, не случайная выборка компаний.",
      "en": "This is executive self-assessment, not system measurement. The denominator for the 51% is not all respondents but only those whose organisations already use AI. \"We are mitigating inaccuracy\" can mean a real retrieval-evaluation harness or one line added to a prompt — the survey does not distinguish. Respondents come from McKinsey's panel, not a random sample of firms."
     },
     "source": {
      "title": "The state of AI in 2025: Agents, innovation, and transformation",
      "url": "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
      "org": "McKinsey / QuantumBlack",
      "date": "опрос 25.06–29.07.2025, 1993 респондента из 105 стран"
     }
    },
    {
     "claim": {
      "ru": "В версии 2025 года OWASP Top 10 для LLM-приложений у векторов и эмбеддингов появилась своя категория рисков — LLM08:2025 Vector and Embedding Weaknesses. В ней перечислены именно те угрозы, которые живут в слое извлечения: утечка контекста между пользователями в мультитенантной векторной базе, инверсия эмбеддингов с восстановлением исходного текста, отравление базы знаний. Меры — права доступа с логическим разделением данных, валидация источников и неизменяемые логи извлечений.",
      "en": "The 2025 OWASP Top 10 for LLM Applications gives vectors and embeddings their own risk category: LLM08:2025 Vector and Embedding Weaknesses. It names exactly the threats that live in the retrieval layer: context leakage between users in a multi-tenant vector database, embedding inversion recovering source text, and knowledge-base poisoning. The mitigations are permission and access control with logical dataset partitioning, source validation, and immutable retrieval logs."
     },
     "figure": "LLM08:2025 Vector and Embedding Weaknesses — отдельная запись в OWASP Top 10 for LLM Applications 2025; четыре группы мер: permission and access control; data validation & source authentication; data review for combination & classification; monitoring and logging",
     "kind": "stats",
     "caveat": {
      "ru": "Это консенсус экспертной группы, а не измерение. Ни частоты инцидентов, ни ущерба OWASP не приводит; включение в список говорит о запросе сообщества на руководство, а не о доказанном масштабе проблемы. И отдельно: из существования категории в стандарте НЕ следует, что требование появилось в вакансиях — данных о том, как часто работодатели это спрашивают, у меня нет. Мелочь для проверяющего: адрес страницы содержит устаревший слаг llm08-excessive-agency (в списке 2023–2024 под номером LLM08 шла Excessive Agency, теперь это LLM06), но открывается именно LLM08:2025 Vector and Embedding Weaknesses.",
      "en": "This is expert-group consensus, not measurement. OWASP gives no incident frequency and no damage figures; inclusion signals community demand for guidance, not a proven scale of harm. Separately: the existence of a category in a standard does NOT establish that the requirement has reached job descriptions — I have no data on how often employers ask for it. A note for the checker: the page URL carries the stale slug llm08-excessive-agency (in the 2023–2024 list LLM08 was Excessive Agency, now LLM06), but it does serve LLM08:2025 Vector and Embedding Weaknesses."
     },
     "source": {
      "title": "LLM08:2025 Vector and Embedding Weaknesses",
      "url": "https://genai.owasp.org/llmrisk/llm08-excessive-agency/",
      "org": "OWASP Gen AI Security Project",
      "date": "2025"
     }
    }
   ],
   "mechanics": [
    {
     "process": {
      "ru": "Поддержка клиентов: разбор входящего тикета оператором первой линии",
      "en": "Customer support: front-line agent working an incoming ticket"
     },
     "pattern": {
      "ru": "Исторические тикеты не рубятся на текстовые куски, а разбираются в граф знаний (проблема — симптом — причина — решение), и поиск идёт по графу, а не по плоским чанкам. Система подтягивает похожие прошлые случаи и черновик решения. Решает тикет по-прежнему оператор — измеряли именно его время на тикет.",
      "en": "Past tickets are parsed into a knowledge graph (issue — symptom — cause — resolution) instead of being chopped into flat text chunks, and retrieval runs over the graph. The system surfaces similar past cases and a draft resolution. The human agent still resolves the ticket — what was measured is that agent's time per ticket."
     },
     "outcome": {
      "ru": "Дословно из абстракта: «Our method outperforms the baseline by 77.6% in MRR and by 0.32 in BLEU» и «has been deployed within LinkedIn's customer service team for approximately six months and has reduced the median per-issue resolution time by 28.6%». То есть 77,6% — это относительный прирост MRR над их собственным бейзлайном, а не абсолютная точность поиска.",
      "en": "Verbatim from the abstract: \"Our method outperforms the baseline by 77.6% in MRR and by 0.32 in BLEU\" and \"has been deployed within LinkedIn's customer service team for approximately six months and has reduced the median per-issue resolution time by 28.6%\". So 77.6% is a relative gain in MRR over their own baseline, not an absolute retrieval accuracy."
     },
     "kind": "vendor",
     "source": {
      "title": "Retrieval-Augmented Generation with Knowledge Graphs for Customer Service Question Answering",
      "url": "https://arxiv.org/abs/2404.17723",
      "org": "LinkedIn (arXiv:2404.17723)",
      "date": "2024-04-26"
     }
    },
    {
     "process": {
      "ru": "Дежурство по вопросам безопасности и приватности: ответы инженерам во внутренних каналах",
      "en": "Security and privacy on-call: answering engineers' questions in internal channels"
     },
     "pattern": {
      "ru": "Поверх обычного RAG навешены три агента: Query Optimizer переписывает неоднозначные запросы и разбивает сложные, Source Identifier сужает подмножество документов по саммари и FAQ, Post-Processor чистит и структурирует подтянутый контекст. Отдельно переделана подготовка документов: штатные PDF-загрузчики теряли структуру («often fail to correctly capture structured text and formatting (such as bullet points and tables)»), поэтому написали свой загрузчик, рекурсивно вытаскивающий абзацы, таблицы и оглавление, а таблицы отдельно переводят в markdown моделью. В метаданные добавили саммари документа, набор FAQ и ключевые слова. Бот стоит первой линией в Slack, за ним — живые дежурные и профильные эксперты; они же собрали золотой набор и эталонные ответы.",
      "en": "Plain RAG is wrapped in three agents: a Query Optimizer rewrites ambiguous queries and decomposes complex ones, a Source Identifier narrows the document subset using summaries and FAQs, a Post-Processor de-duplicates and structures the retrieved context. Document preparation was rebuilt separately: off-the-shelf PDF loaders lost structure (\"often fail to correctly capture structured text and formatting (such as bullet points and tables)\"), so they wrote a custom loader that recursively extracts paragraphs, tables and the table of contents, with an LLM converting extracted tables into markdown. Metadata gained document summaries, a set of FAQs and keywords. The bot sits as first line in Slack with human on-call engineers and subject-matter experts behind it; those same experts built the golden set and the reference answers."
     },
     "outcome": {
      "ru": "Дословно: «increasing the percentage of acceptable answers by a relative 27% and reducing incorrect advice by a relative 60%». Оба числа ОТНОСИТЕЛЬНЫЕ — абсолютных уровней «до» и «после» в блоге нет. Мерили на золотом наборе из 100+ запросов, собранном самими экспертами; эталонные ответы дали они же, оценку по шкале 0–5 ставила модель-судья.",
      "en": "Verbatim: \"increasing the percentage of acceptable answers by a relative 27% and reducing incorrect advice by a relative 60%\". Both numbers are RELATIVE — the blog gives no absolute before-and-after levels. Measured on a golden set of 100+ queries curated by the experts themselves; those same experts supplied the reference answers, and an LLM judge scored 0–5."
     },
     "kind": "vendor",
     "source": {
      "title": "Enhanced Agentic-RAG: What If Chatbots Could Deliver Near-Human Precision?",
      "url": "https://www.uber.com/blog/enhanced-agentic-rag/",
      "org": "Uber Engineering",
      "date": "2025-05-29"
     }
    },
    {
     "process": {
      "ru": "Юридический ресёрч: поиск нормы и практики под конкретный вопрос клиента",
      "en": "Legal research: finding the controlling authority for a specific client question"
     },
     "pattern": {
      "ru": "Коммерческие юридические системы (Lexis+ AI, Westlaw AI-AR, Ask Practical Law AI) строят ответ поверх собственных корпусов права и своего извлечения. Из цифр следует, что юристу приходится открывать каждую ссылку и проверять авторитетность источника, юрисдикцию, действующую редакцию — и совпадает ли норма с тем, что ей приписала модель. Сами авторы аккуратнее: они пишут, что дают «evidence to inform the responsibilities of legal professionals in supervising and verifying AI outputs», и прямо называют вопрос об этих обязанностях открытым, а не решённым. Отдельно замечают, что более длинные ответы дороже проверять: «every proposition and citation has to be independently evaluated».",
      "en": "Commercial legal systems (Lexis+ AI, Westlaw AI-AR, Ask Practical Law AI) generate answers on top of their own legal corpora and their own retrieval. The numbers imply the lawyer has to open every citation and check source authority, jurisdiction, current version — and whether the cited authority actually says what the model claims. The authors themselves are more careful: they say they provide \"evidence to inform the responsibilities of legal professionals in supervising and verifying AI outputs\" and explicitly call that question open rather than settled. They also note longer answers cost more to check: \"every proposition and citation has to be independently evaluated\"."
     },
     "outcome": {
      "ru": "Предрегистрированное исследование на 202 запросах (набор предрегистрирован 22.03.2024). Галлюцинации: Lexis+ AI 17%, Westlaw AI-AR 33%, Ask Practical Law AI 17%, GPT-4 — 43% (таблица B1: 0.43; без отредактированных вопросов 0.39). Точные, то есть верные И обоснованные ссылками, ответы: 65% / 41% / 19%. Неполные (отказ либо ответ без ссылок): 18% / 25% / 62%. Согласие кодировщиков — Cohen's kappa 0,77 при совпадении 85,4%. Частая причина ошибки — извлечение текстуально похожего, но юридически неприменимого документа: «document relevance in the legal context is not based on text alone». Авторы сами называют 202 запроса небольшой выборкой.",
      "en": "Preregistered study on 202 queries (dataset preregistered 22 March 2024). Hallucination rates: Lexis+ AI 17%, Westlaw AI-AR 33%, Ask Practical Law AI 17%, GPT-4 43% (Table B1: 0.43; 0.39 excluding edited questions). Accurate answers — meaning both correct AND grounded in citations: 65% / 41% / 19%. Incomplete (refusal or ungrounded): 18% / 25% / 62%. Inter-rater agreement: Cohen's kappa 0.77 with 85.4% agreement. A frequent cause of error is retrieving a textually similar but legally inapplicable document: \"document relevance in the legal context is not based on text alone\". The authors themselves call 202 queries a small sample."
     },
     "kind": "experiment",
     "source": {
      "title": "Hallucination-Free? Assessing the Reliability of Leading AI Legal Research Tools",
      "url": "https://arxiv.org/abs/2405.20362",
      "org": "Stanford RegLab / HAI; Journal of Empirical Legal Studies (doi 10.1111/jels.12413)",
      "date": "набор предрегистрирован 22.03.2024; прогоны март–апрель 2024, Westlaw 23–27.05.2024; принято к печати 14.03.2025, JELS 2025"
     }
    },
    {
     "process": {
      "ru": "Клиническое решение у постели больного: сверка с гайдлайном по конкретному вопросу",
      "en": "Point-of-care clinical decisions: checking a specific question against guidelines"
     },
     "pattern": {
      "ru": "Модель отвечает только по подобранному корпусу клинических руководств и обязана приложить ссылки на источник. Оценивали не модель в вакууме, а её ответы глазами практиков: панель из 8 сертифицированных врачей и 2 медработников со средним стажем 10,5 года ранжировала ответы вслепую по фактичности, полноте и предпочтению.",
      "en": "The model answers only from a curated corpus of clinical guidelines and must attach source citations. Evaluation was not model-in-a-vacuum: a panel of 8 board-certified clinicians and 2 healthcare practitioners, averaging 10.5 years of experience, blind-ranked answers on factuality, completeness and preference."
     },
     "outcome": {
      "ru": "314 клинических вопросов по девяти специальностям. Средний РАНГ по фактичности: 1,96±0,06 против 2,34±0,06 у ChatGPT-4 (меньше — лучше; это ранг в сравнении, а не доля верных ответов). Корректность ссылок 91,11% против 21,27%. Под состязательными подсказками — на подвыборке всего 25 вопросов — 100% верных против 7%. Авторы прямо пишут, что внедрять такие системы надо осторожно, «accompanied by strategies to mitigate potential errors», и что метрики субъективны: «evaluation metrics are subjective and rely on human graders, posing challenges for scalability».",
      "en": "314 clinical questions across nine specialties. Mean factuality RANK 1.96±0.06 vs 2.34±0.06 for ChatGPT-4 (lower is better; this is a comparative rank, not a share of correct answers). Citation accuracy 91.11% vs 21.27%. Under adversarial prompting — on a sub-sample of just 25 questions — 100% correct vs 7%. The authors state plainly that such systems should be approached with caution, \"accompanied by strategies to mitigate potential errors\", and that the metrics are subjective: \"evaluation metrics are subjective and rely on human graders, posing challenges for scalability\"."
     },
     "kind": "other",
     "source": {
      "title": "Almanac — Retrieval-Augmented Language Models for Clinical Medicine",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10857783/",
      "org": "NEJM AI",
      "date": "2024-01-25"
     }
    },
    {
     "process": {
      "ru": "Поиск по внутренней документации и кодовой базе",
      "en": "Search over internal documentation and codebases"
     },
     "pattern": {
      "ru": "Перед векторизацией каждому чанку дописывают контекст — «usually 50-100 tokens» — о том, чем он является и где стоит в документе. Дальше гибридный поиск: контекстные эмбеддинги плюс контекстный BM25, затем реранкинг топ-150 в топ-20. Человек остаётся там, где решают, что вообще попадает в корпус и какая доля промахов считается приемлемой.",
      "en": "Before embedding, each chunk gets context — \"usually 50-100 tokens\" — explaining what it is and where it sits in the document. Then hybrid search: contextual embeddings plus contextual BM25, followed by reranking of the top 150 down to 20. The human stays where someone decides what enters the corpus at all and what miss rate counts as acceptable."
     },
     "outcome": {
      "ru": "Мерили ровно одно: долю промахов поиска, то есть top-20-chunk retrieval failure rate. С 5,7% до 3,7% на контекстных эмбеддингах (−35% относительно), до 2,9% с добавлением контекстного BM25 (−49%), до 1,9% с реранкингом (−67%). Корпуса — код, проза, arXiv, научные статьи. Качество итогового ответа этот замер не трогает вовсе.",
      "en": "Exactly one thing was measured: the top-20-chunk retrieval failure rate. From 5.7% to 3.7% with contextual embeddings (a 35% relative reduction), to 2.9% adding contextual BM25 (49%), to 1.9% with reranking (67%). Corpora: codebases, fiction, arXiv papers, science papers. Final answer quality is not touched by this measurement at all."
     },
     "kind": "vendor",
     "source": {
      "title": "Introducing Contextual Retrieval",
      "url": "https://www.anthropic.com/news/contextual-retrieval",
      "org": "Anthropic",
      "date": "2024-09-19"
     }
    }
   ],
   "roles": [
    {
     "title": {
      "ru": "Инженер поиска (RAG engineer)",
      "en": "Retrieval / RAG engineer"
     },
     "note": {
      "ru": "Отвечает за то, доедет ли до модели нужный кусок: чанкинг, эмбеддинги, гибридный поиск, реранкинг, золотой набор запросов и порог, ниже которого релиз не выходит. В британских объявлениях за полугодие до 30.07.2026 навык RAG назван в 439 постоянных вакансиях против 40 годом ранее — название роли ещё плавает, а работа уже есть. Трек ведёт сюда напрямую: это его ядро.",
      "en": "Owns whether the right passage reaches the model at all: chunking, embeddings, hybrid search, reranking, a golden query set, and the threshold below which a release does not ship. UK permanent postings in the half-year to 30 July 2026 named RAG 439 times versus 40 a year earlier — the job title is still unsettled, the work is not. This is the track's core."
     }
    },
    {
     "title": {
      "ru": "Дата-инженер ИИ-платформы",
      "en": "AI platform data engineer"
     },
     "note": {
      "ru": "Тянет конвейер от источника до индекса: приём документов, разбор PDF и таблиц, метаданные, свежесть индекса, права доступа, которые обязаны доехать до извлечения. У Uber это не абстракция: штатные PDF-загрузчики теряли таблицы и списки, пришлось писать свой загрузчик и переводить таблицы в markdown, а в метаданные добавлять саммари, FAQ и ключевые слова. В OWASP LLM08:2025 логическое разделение данных в векторной базе и права доступа — прямо прописанная мера. Трек добавляет к обычному ETL то, чего в нём не было: оценку качества поиска.",
      "en": "Runs the pipeline from source to index: ingestion, PDF and table parsing, metadata, index freshness, and access rights that must survive all the way into retrieval. At Uber this was concrete: off-the-shelf PDF loaders lost tables and bullet lists, so they wrote their own loader, had an LLM convert tables to markdown, and added summaries, FAQs and keywords to metadata. In OWASP LLM08:2025, logical partitioning of datasets in the vector database and access control are explicitly listed mitigations. The track adds to ordinary ETL what ETL never had: retrieval quality evaluation."
     }
    },
    {
     "title": {
      "ru": "Инженер памяти агентов",
      "en": "Agent memory engineer"
     },
     "note": {
      "ru": "Решает, что агент помнит между сессиями и в каком виде: факты о пользователе, прошлые эпизоды, выученные инструкции. Разделение на семантическую, эпизодическую и процедурную память — не метафора, а разные хранилища и разные политики записи, и в документации LangGraph это зафиксировано именно как инженерная классификация. Название роли на рынке пока редкое — чаще это часть работы платформенного или дата-инженера, и отдельной строкой в вакансиях почти не встречается.",
      "en": "Decides what an agent keeps between sessions and in what shape: facts about the user, past episodes, learned instructions. Splitting memory into semantic, episodic and procedural is not a metaphor but different stores with different write policies, and LangGraph's docs codify it precisely as an engineering taxonomy. The title is still rare on the market — usually it is part of a platform or data engineer's job and barely appears as a line item in postings."
     }
    },
    {
     "title": {
      "ru": "Инженер оценки ИИ-систем",
      "en": "AI evaluation engineer"
     },
     "note": {
      "ru": "Строит контур измерения: золотые наборы, метрики поиска отдельно от метрик генерации, модель-судья и обязательная человеческая сверка на выборке. Все внедрения, где есть хоть какие-то проверяемые цифры, начинались именно с этого: у LinkedIn — MRR, у Uber — 100+ экспертных эталонов и судья по шкале 0–5, у Anthropic — доля промахов на top-20. Руководство Microsoft по RAG прямо требует оценивать каждый этап отдельно и фиксировать гиперпараметры. Без этой роли «стало лучше» остаётся ощущением — а как показывает единственная независимая проверка на рынке, ощущение может расходиться с замером на десятки процентов.",
      "en": "Builds the measurement loop: golden sets, retrieval metrics kept separate from generation metrics, an LLM judge, and mandatory human review on a sample. Every deployment with any checkable figures started here: MRR at LinkedIn, 100+ expert references plus a 0–5 judge at Uber, top-20 miss rate at Anthropic. Microsoft's RAG guide explicitly requires evaluating each phase independently and documenting hyperparameters. Without this role \"it got better\" stays a feeling — and as the market's one independent audit shows, that feeling can diverge from the measurement by tens of percentage points."
     }
    }
   ],
   "skills": [
    {
     "name": {
      "ru": "Мерить поиск отдельно от генерации",
      "en": "Measure retrieval separately from generation"
     },
     "why": {
      "ru": "Пока поиск и ответ мерят одним числом, непонятно, что ломается. Все внедрения с проверяемыми цифрами разводят это явно: LinkedIn отчитался по MRR, Anthropic — по доле промахов на top-20, и заметьте, что у Anthropic замер сознательно НЕ трогает качество итогового ответа. Руководство Microsoft по проектированию RAG требует того же дословно: «You should evaluate each step independently for optimization» и «Document the hyperparameters and the evaluation results».",
      "en": "As long as retrieval and answer share one number, you cannot tell what is broken. Every deployment with verifiable figures separates them: LinkedIn reported MRR, Anthropic reported the top-20 miss rate — and note that Anthropic's measurement deliberately does NOT touch final answer quality. Microsoft's RAG design guide asks for the same in as many words: \"You should evaluate each step independently for optimization\" and \"Document the hyperparameters and the evaluation results\"."
     }
    },
    {
     "name": {
      "ru": "Чанкинг и обогащение чанков метаданными",
      "en": "Chunking and metadata enrichment of chunks"
     },
     "why": {
      "ru": "Чанк без контекста — это фраза без документа, и поиск по нему промахивается. Дописывание 50–100 токенов контекста перед векторизацией снизило долю промахов на top-20 с 5,7% до 3,7% в собственных замерах Anthropic. У Uber узкое место было ещё раньше, на приёме: штатные PDF-загрузчики «often fail to correctly capture structured text and formatting (such as bullet points and tables)», поэтому таблицы вытаскивали своим загрузчиком и переводили в markdown, а в метаданные добавляли саммари документа, FAQ и ключевые слова.",
      "en": "A chunk without context is a sentence without its document, and retrieval misses it. Adding 50–100 tokens of context before embedding cut the top-20 miss rate from 5.7% to 3.7% in Anthropic's own measurements. At Uber the bottleneck sat even earlier, at ingestion: off-the-shelf PDF loaders \"often fail to correctly capture structured text and formatting (such as bullet points and tables)\", so tables were extracted with a custom loader and converted to markdown, and metadata gained document summaries, FAQs and keywords."
     }
    },
    {
     "name": {
      "ru": "Гибридный поиск и реранкинг",
      "en": "Hybrid search and reranking"
     },
     "why": {
      "ru": "Одна векторная близость не находит редкие термины, коды ошибок и имена — для этого нужен лексический поиск рядом. В замерах Anthropic добавление контекстного BM25 к контекстным эмбеддингам снизило долю промахов с 3,7% до 2,9%, а реранкинг топ-150 в топ-20 — до 1,9%; относительно бейзлайна это −67%. Важная оговорка: это внутренний бенчмарк Anthropic на их корпусах (код, проза, arXiv, научные статьи), а не независимая проверка, и на вашем корпусе выигрыш может быть другим.",
      "en": "Vector similarity alone misses rare terms, error codes and proper names — lexical search has to sit beside it. In Anthropic's measurements, adding contextual BM25 to contextual embeddings cut the miss rate from 3.7% to 2.9%, and reranking top-150 into top-20 brought it to 1.9% — a 67% relative reduction against baseline. Important caveat: this is Anthropic's internal benchmark on their own corpora (code, fiction, arXiv, science papers), not an independent audit, and the gain on your corpus may differ."
     }
    },
    {
     "name": {
      "ru": "Различать типы памяти и решать, когда писать",
      "en": "Distinguish memory types and decide when to write"
     },
     "why": {
      "ru": "Семантическая (факты и концепты), эпизодическая (прошлые события и действия) и процедурная (правила выполнения задач) память — это разные хранилища и разные политики. Отдельное решение: писать в горячем пути или фоном. Документация LangGraph честно перечисляет минусы обоих вариантов: в горячем пути «the process of reasoning about what to save to memory can impact agent latency» и агенту приходится совмещать это с основной задачей, а в фоне «Determining the frequency of memory writing becomes crucial» — то есть проблема не исчезает, а превращается в вопрос «когда запускать». Управляемые сервисы вроде Vertex AI Memory Bank идут по фоновому пути и извлекают память из истории диалога асинхронно.",
      "en": "Semantic (facts and concepts), episodic (past events and actions) and procedural (rules for performing tasks) memory are different stores with different policies. A separate decision: write in the hot path or in the background. LangGraph's docs list the downsides of both honestly: in the hot path \"the process of reasoning about what to save to memory can impact agent latency\" and the agent must multitask against its real job, while in the background \"Determining the frequency of memory writing becomes crucial\" — the problem does not vanish, it turns into \"when do we trigger this\". Managed services such as Vertex AI Memory Bank take the background route, extracting memories from conversation history asynchronously."
     }
    },
    {
     "name": {
      "ru": "Права доступа на уровне извлечения",
      "en": "Permission-aware retrieval"
     },
     "why": {
      "ru": "Векторное хранилище на всех — это утечка по построению. OWASP LLM08:2025 называет вещи прямо: в мультитенантной базе «there's a risk of context leakage between users or queries», а инверсия эмбеддингов позволяет «recover significant amounts of source information, compromising data confidentiality». Требуемые меры тоже конкретные: права доступа с логическим разделением данных, «robust data validation pipelines for knowledge sources», приём данных только из доверенных источников и «detailed immutable logs of retrieval activities». Оговорка: это консенсус экспертов о рисках, а не статистика инцидентов — частоту и ущерб OWASP не приводит.",
      "en": "One shared vector store is a leak by construction. OWASP LLM08:2025 says it plainly: in a multi-tenant database \"there's a risk of context leakage between users or queries\", and embedding inversion lets attackers \"recover significant amounts of source information, compromising data confidentiality\". The prescribed mitigations are equally concrete: access control with logical dataset partitioning, \"robust data validation pipelines for knowledge sources\", accepting data only from trusted sources, and \"detailed immutable logs of retrieval activities\". Caveat: this is expert consensus on risk, not incident statistics — OWASP gives no frequency or damage figures."
     }
    },
    {
     "name": {
      "ru": "Дисциплина бюджета контекста",
      "en": "Context budget discipline"
     },
     "why": {
      "ru": "«Заявленное окно» и «работает на этом окне» — разные утверждения. RULER прогнали на 17 моделях с 13 задачами: «only half of them can maintain satisfactory performance at the length of 32K». NoLiMa (ICML 2025) убирает буквальные совпадения слов между вопросом и ответом, и тогда из 13 моделей, заявляющих не менее 128K, «11 models drop below 50% of their strong short-length baselines» на 32K; GPT-4o падает с почти идеальных 99,3% до 69,7%. Оба бенчмарка синтетические, поэтому переносить их разрыв на свой корпус нельзя — проверять надо на своих данных, и оба дают для этого открытый код или метод.",
      "en": "\"Advertised window\" and \"works at that window\" are different claims. RULER ran 17 models across 13 tasks: \"only half of them can maintain satisfactory performance at the length of 32K\". NoLiMa (ICML 2025) removes literal lexical overlap between question and answer, and then, of 13 models claiming at least 128K, \"11 models drop below 50% of their strong short-length baselines\" at 32K; GPT-4o falls from an almost-perfect 99.3% to 69.7%. Both benchmarks are synthetic, so their gap cannot be transferred to your corpus — verify on your own data, which both make possible via open code or method."
     }
    }
   ],
   "anchors": [
    {
     "title": "Lost in the Middle: How Language Models Use Long Contexts",
     "url": "https://arxiv.org/abs/2307.03172",
     "org": "Stanford / Berkeley / Samaya AI; TACL 2023",
     "why": {
      "ru": "Классика, задавшая метод: положение нужного фрагмента в контексте меняют системно и смотрят, как падает точность. Абстракт проверен дословно: «performance is often highest when relevant information occurs at the beginning or end of the input context, and significantly degrades when models must access relevant information in the middle of long contexts, even for explicitly long-context models». Мерили ровно две задачи: QA по нескольким документам и поиск по ключ-значению — за их пределы вывод сам собой не переносится.",
      "en": "The classic that established the method: systematically vary where the needed passage sits and watch accuracy fall. Abstract verified verbatim: \"performance is often highest when relevant information occurs at the beginning or end of the input context, and significantly degrades when models must access relevant information in the middle of long contexts, even for explicitly long-context models.\" Exactly two tasks were measured — multi-document QA and key-value retrieval — and the finding does not automatically generalise beyond them."
     }
    },
    {
     "title": "RULER: What's the Real Context Size of Your Long-Context Language Models?",
     "url": "https://arxiv.org/abs/2404.06654",
     "org": "NVIDIA",
     "why": {
      "ru": "Инструмент, чтобы самому проверить заявленный размер окна: синтетические задачи с разным числом «иголок», плюс многошаговая трассировка и агрегация, а не только поиск одной строки. Проверено дословно: «17 long-context LMs with 13 representative tasks», «only half of them can maintain satisfactory performance at the length of 32K». Код открыт (github.com/hsiehjackson/RULER) — можно прогнать на своей модели.",
      "en": "A tool for checking an advertised window yourself: synthetic tasks with varying numbers of needles, plus multi-hop tracing and aggregation rather than single-string lookup. Verified verbatim: \"17 long-context LMs with 13 representative tasks\", \"only half of them can maintain satisfactory performance at the length of 32K\". The code is open (github.com/hsiehjackson/RULER), so you can run it on your own model."
     }
    },
    {
     "title": "NoLiMa: Long-Context Evaluation Beyond Literal Matching",
     "url": "https://arxiv.org/abs/2502.05167",
     "org": "LMU Munich / Adobe Research; ICML 2025",
     "why": {
      "ru": "Убирает главную поддавку обычных тестов «иголка в стоге»: вопрос и ответ намеренно не пересекаются словами, поиск по буквальному совпадению не работает. Проверено дословно: 13 моделей, заявляющих не менее 128K, и «At 32K, for instance, 11 models drop below 50% of their strong short-length baselines». Лучший аргумент против «просто закинем всё в большое окно».",
      "en": "Removes the main free pass in ordinary needle-in-a-haystack tests: question and answer deliberately share no wording, so literal matching is useless. Verified verbatim: 13 models claiming at least 128K, and \"At 32K, for instance, 11 models drop below 50% of their strong short-length baselines.\" The strongest argument against \"just dump everything into a big window\"."
     }
    },
    {
     "title": "Design and Develop a RAG Solution on Azure",
     "url": "https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-solution-design-and-evaluation-guide",
     "org": "Microsoft Learn / Azure Architecture Center",
     "why": {
      "ru": "Самое подробное открытое руководство по этапам, и это подтверждённое оглавление серии, а не пересказ: сбор тестовых запросов, экономика чанкинга, обогащение чанков, выбор и оценка модели эмбеддингов, настройка индекса, выбор между векторным / полнотекстовым / гибридным поиском, оценка каждого шага, когда переходить к агентному RAG. Прямая цитата про дисциплину: «You should evaluate each step independently for optimization» и «Document the hyperparameters and the evaluation results». Бесплатно, страница живая, поле updated_at — 02.07.2026.",
      "en": "The most detailed open guide to the phases, and this is the series' verified table of contents rather than a paraphrase: gathering test queries, chunking economics, chunk enrichment, choosing and evaluating an embedding model, index configuration, choosing between vector / full-text / hybrid search, evaluating each step, and when to move to agentic RAG. Direct quotes on discipline: \"You should evaluate each step independently for optimization\" and \"Document the hyperparameters and the evaluation results.\" Free, page live, updated_at field reads 2 July 2026."
     }
    },
    {
     "title": "LangGraph: долгосрочная память агента (semantic / episodic / procedural)",
     "url": "https://docs.langchain.com/oss/python/langgraph/memory",
     "org": "LangChain",
     "why": {
      "ru": "Здесь три типа памяти определены как рабочая инженерная классификация, а не как аналогия с психологией: семантическая — факты и концепты, эпизодическая — «recalling past events or actions», процедурная — «remembering the rules used to perform tasks», причём для агента это «a combination of model weights, agent code, and agent's prompt». Отдельно разобран выбор «писать в горячем пути или фоном» с честным перечислением минусов каждого варианта: в горячем пути «the process of reasoning about what to save to memory can impact agent latency», фоном — «Determining the frequency of memory writing becomes crucial». Все формулировки сверены с живой страницей.",
      "en": "Here the three memory types are defined as a working engineering taxonomy rather than a psychology analogy: semantic for facts and concepts, episodic as \"recalling past events or actions\", procedural as \"remembering the rules used to perform tasks\" — which for an agent is \"a combination of model weights, agent code, and agent's prompt\". It also lays out the hot-path-versus-background write decision with an honest list of downsides: in the hot path \"the process of reasoning about what to save to memory can impact agent latency\", in the background \"Determining the frequency of memory writing becomes crucial\". All wording checked against the live page."
     }
    },
    {
     "title": "Knowledge Graphs for RAG (бесплатный курс)",
     "url": "https://www.deeplearning.ai/courses/knowledge-graphs-rag/",
     "org": "DeepLearning.AI + Neo4j",
     "why": {
      "ru": "Практика с кодом, 2 ч 4 мин, 9 уроков, ведёт Andreas Kollegger из Neo4j: построить граф знаний из текстов (на примере отчётности SEC), добавить векторный индекс внутрь графа, писать Cypher и искать по графу и векторам вместе. Это то же семейство приёмов, что у LinkedIn в поддержке, но НЕ та же система — курс не воспроизводит их результат и не даёт их цифр. Страница живая; доступ бесплатный на время беты платформы («free for a limited time during the DeepLearning.AI learning platform beta») — оговорку стоит держать в голове.",
      "en": "Hands-on with code, 2 h 4 min, 9 lessons, taught by Andreas Kollegger of Neo4j: build a knowledge graph from documents (SEC filings as the example), add a vector index inside the graph, write Cypher, and search graph and vectors together. This is the same family of techniques LinkedIn used in support, but NOT the same system — the course does not reproduce their result or report their numbers. Page live; access is free during the platform beta (\"free for a limited time during the DeepLearning.AI learning platform beta\") — worth keeping that caveat in mind."
     }
    }
   ],
   "caveat": {
    "ru": "По этому треку почти нет независимых измерений — и это главное, что нужно знать, прежде чем верить цифрам.\n\nЕдинственное найденное независимое предрегистрированное исследование внедрений (юридический ресёрч, Stanford RegLab, опубликовано в Journal of Empirical Legal Studies в 2025) показывает худшую картину из всех: 17–33% галлюцинаций у коммерческих RAG-систем, которые продавались как «hallucination-free». Все остальные цифры «до и после» — LinkedIn, Uber, Anthropic — это компании, которые сами придумали метрику, сами собрали золотой набор и сами объявили результат. Не значит, что врут; значит, что проверить это со стороны нельзя, а сравнивать между собой — тем более.\n\nНи одного РКИ по RAG или памяти в бизнес-процессе я не нашёл. Прирост в 27% относительно или падение медианного времени тикета на 28,6% измерены без контрольной группы, так что отделить эффект поиска от эффекта «люди стали внимательнее к новому инструменту» нечем.\n\nБенчмарки долгого контекста — синтетика: и RULER, и NoLiMa строят задачи искусственно. Разрыв, который они показывают, реален для их задач; насколько он переносится на ваш корпус, из этих работ не следует. Про архитектуры памяти (Mem0, Zep, LOCOMO и родственники) я в этот раз не проверял ни одной работы построчно, поэтому ничего о них не утверждаю — но общее правило действует: если статью про продукт написали авторы продукта, её числа это самоотчёт, а не независимая проверка.\n\nРынка как отдельной профессии пока нет. RAG — 0,43% британских постоянных вакансий, роль «инженер памяти» в объявлениях почти не встречается; чаще это часть работы дата-инженера или платформенного инженера.\n\nОтдельно про инструменты: опрос Stack Overflow показывает только, ЧТО разработчики трогали за год, и ничего больше. Redis назвали чаще всех (42,9%), но специализированные векторные хранилища там же и рядом — ChromaDB 19,7%, Pinecone 11,2%, Qdrant 8,2%. Вывода «векторную БД никто не ставит» из этих данных не выводится, и я его снял.\n\nИ самое неприятное: про долгую жизнь памяти публичных цифр нет вовсе. Устаревший индекс, разъехавшиеся права доступа, чанки от прошлой версии документа, память агента, которая помнит неверное — все жалуются, никто не измерил. Сколько стоит поддерживать это через год, вам придётся выяснить на себе.",
    "en": "This track has almost no independent measurement — and that is the first thing to know before trusting any number here.\n\nThe only independent, preregistered study of real deployments I found (legal research, Stanford RegLab, published in the Journal of Empirical Legal Studies in 2025) paints the worst picture of all: 17–33% hallucination rates in commercial RAG systems marketed as \"hallucination-free\". Every other before-and-after figure — LinkedIn, Uber, Anthropic — comes from a company that invented its own metric, built its own golden set and announced its own result. That does not mean they are lying; it means no outsider can check it, and cross-comparison is worse still.\n\nI found no randomised controlled trial of RAG or memory inside a business process. A relative 27% gain or a 28.6% drop in median ticket time was measured without a control group, so there is no way to separate the retrieval effect from people simply paying more attention to a new tool.\n\nLong-context benchmarks are synthetic: both RULER and NoLiMa construct their tasks artificially. The gap they show is real for those tasks; how far it transfers to your corpus does not follow from these papers. On memory architectures (Mem0, Zep, LOCOMO and relatives) I verified nothing line by line this round, so I assert nothing about them — but the general rule holds: when a paper about a product is written by the product's authors, its numbers are self-reports, not independent verification.\n\nThere is no market for this as a standalone profession yet. RAG appears in 0.43% of UK permanent postings, and \"memory engineer\" barely exists as a title — it is usually part of a data or platform engineer's job.\n\nOn tooling specifically: the Stack Overflow survey shows only WHAT developers touched over a year, and nothing more. Redis was named most often (42.9%), but dedicated vector stores sit right there alongside it — ChromaDB 19.7%, Pinecone 11.2%, Qdrant 8.2%. The conclusion \"nobody stands up a vector database\" does not follow from this data, and I removed it.\n\nAnd the worst gap: on the long life of memory there are no public numbers whatsoever. Stale indexes, permissions drifting out of sync, chunks from a previous document version, an agent that faithfully remembers something wrong — everyone complains, nobody has measured it. What it costs to maintain a year in, you will have to find out on yourself."
   }
  },
  "ai-analyst": {
   "lede": {
    "ru": "В рандомизированном эксперименте опытные разработчики с ИИ работали на 19% медленнее и после этого всё равно считали, что ускорились на 20%: спрашивать людей об эффекте бесполезно, его надо мерить. Но и мерилки шатаются — автогрейдер GDPval совпадает с экспертами примерно в 66% случаев при том, что эксперты между собой согласны примерно в 71%, — поэтому предмет трека не «цифра», а калибровка судьи и проверка самого инструмента измерения.",
    "en": "In a randomized trial, experienced developers were 19% slower with AI and still believed afterwards that they had been 20% faster: asking people about the effect is useless, it has to be measured. But the rulers wobble too — GDPval's automated grader agrees with experts about 66% of the time while experts agree with each other about 71% — so the subject of this track is not the number but calibrating the judge and auditing the measuring instrument itself."
   },
   "demand": [
    {
     "claim": {
      "ru": "Роль существует как отдельная штатная позиция во фронтир-лаборатории, и в вакансии прямо перечислен инструментарий эвал-инженера: разработка надёжных метрик оценки для языковых моделей, статистика и планирование экспериментов, наблюдаемость и системы отслеживания экспериментов, распределённая платформа прогона эвалов.",
      "en": "The role exists as a distinct staffed position at a frontier lab, and the posting spells out the eval engineer's toolkit: developing robust evaluation metrics for language models, statistics and experimental design, observability and experiment-tracking systems, and a distributed eval execution platform."
     },
     "figure": "$500 000 – $850 000 в год (одна вакансия «Research Engineer, Model Evaluations», Anthropic)",
     "kind": "jobs",
     "caveat": {
      "ru": "Это одна вакансия одной фронтир-лаборатории, а не медиана рынка. Ни о числе таких мест, ни о зарплатах в обычных продуктовых компаниях эта цифра не говорит ничего. Часть перечисленного (метрики, статистика, наблюдаемость) стоит в разделе «желательно», а не «обязательно».",
      "en": "This is one posting at one frontier lab, not a market median. It says nothing about how many such jobs exist or what ordinary product companies pay. Several of the listed items (metrics, statistics, observability) sit under \"preferred,\" not \"required.\""
     },
     "source": {
      "title": "Research Engineer, Model Evaluations",
      "url": "https://job-boards.greenhouse.io/anthropic/jobs/5198255008",
      "org": "Anthropic (объявление о вакансии)",
      "date": "открыто и проверено 2026-07"
     }
    },
    {
     "claim": {
      "ru": "Инцидентов с ИИ фиксируют всё больше, а публичная отчётность по метрикам безопасности за этим не поспевает: разработчики фронтир-моделей стабильно публикуют бенчмарки возможностей, а отчётность по responsible-AI бенчмаркам, по формулировке отчёта, «остаётся скудной».",
      "en": "Documented AI incidents keep climbing while public reporting on safety metrics lags: frontier developers consistently report capability benchmarks, while reporting on responsible-AI benchmarks, in the report's own words, \"remains sparse.\""
     },
     "figure": "362 инцидента в 2025 против 233 в 2024 (по AI Incident Database)",
     "kind": "other",
     "caveat": {
      "ru": "База инцидентов пополняется вручную из публикаций, поэтому рост числа записей частично отражает рост внимания и самой базы, а не только рост числа реальных сбоев.",
      "en": "The incident database is curated by hand from public reports, so growth partly reflects growing attention and a growing database, not only more real failures."
     },
     "source": {
      "title": "The 2026 AI Index Report, Responsible AI",
      "url": "https://hai.stanford.edu/ai-index/2026-ai-index-report/responsible-ai",
      "org": "Stanford HAI",
      "date": "2026"
     }
    },
    {
     "claim": {
      "ru": "Компании ЗАЯВЛЯЮТ, что заводят под ИИ отдельные роли и политики — то есть по их собственным ответам появляется, кому и по какому регламенту заказывать измерения.",
      "en": "Companies REPORT that they are creating dedicated AI roles and policies — so by their own account there is now someone whose job it is to commission measurement, and a rulebook for doing it."
     },
     "figure": "Роли, связанные с управлением ИИ, выросли на 17% за 2025; доля компаний без политик ответственного ИИ упала с 24% до 11%",
     "kind": "survey",
     "caveat": {
      "ru": "Это ответы компаний о себе, а не подсчёт по вакансиям или аудит. «Политика есть» и «роль открыта» не означает, что кто-то реально мерит качество моделей: наличие регламента и наличие измерений — разные вещи. Методику опроса сама веб-страница AI Index не раскрывает, атрибуция к опросу McKinsey взята из вторичных пересказов отчёта.",
      "en": "These are companies reporting on themselves, not a postings count or an audit. \"We have a policy\" and \"we opened a role\" do not mean anyone actually measures model quality. The AI Index web page itself does not disclose the survey methodology; the attribution to a McKinsey survey comes from secondary coverage of the report."
     },
     "source": {
      "title": "The 2026 AI Index Report, Responsible AI",
      "url": "https://hai.stanford.edu/ai-index/2026-ai-index-report/responsible-ai",
      "org": "Stanford HAI",
      "date": "2026"
     }
    },
    {
     "claim": {
      "ru": "Самое сильное доказательство, что мерить надо, а не спрашивать: в рандомизированном эксперименте опытные разработчики с ИИ-инструментами делали задачи ДОЛЬШЕ — и после этого всё равно были уверены, что стали быстрее.",
      "en": "The strongest argument for measuring rather than asking: in a randomized trial, experienced developers took LONGER on tasks with AI tools — and afterwards still believed the tools had sped them up."
     },
     "figure": "19% медленнее по факту; до эксперимента ожидали ускорения на 24%; после эксперимента считали, что ускорились на 20%",
     "kind": "experiment",
     "caveat": {
      "ru": "16 человек, опытные мейнтейнеры знакомых им крупных репозиториев, инструменты начала 2025 года. Авторы сами называют это «снимком возможностей ИИ начала 2025 года в одной релевантной обстановке» и отдельно оговаривают вероятное смещение в том, кто вызвался участвовать. 246 задач дают, по их словам, «ровно достаточную» статистическую мощность — то есть запас прочности минимальный.",
      "en": "Sixteen people, experienced maintainers of large repos they knew well, early-2025 tooling. The authors themselves call it \"a snapshot of early-2025 AI capabilities in one relevant setting\" and flag likely selection bias in who volunteered. The 246 issues give, in their words, \"just enough\" statistical power — the margin is thin."
     },
     "source": {
      "title": "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity",
      "url": "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/",
      "org": "METR",
      "date": "2025-07-10"
     }
    },
    {
     "claim": {
      "ru": "ИИ-навыки в целом оплачиваются с надбавкой, и половина спроса уже вне ИТ — то есть измерять качество ИИ придётся не только в лабораториях.",
      "en": "AI skills carry a pay premium overall, and half the demand is already outside IT — meaning AI quality will have to be measured well beyond the labs."
     },
     "figure": "+28% к зарплате (почти $18 000 в год) в вакансиях с ИИ-навыками; 51% таких вакансий — вне ИТ и компьютерных специальностей; выборка более 1,3 млрд объявлений",
     "kind": "jobs",
     "caveat": {
      "ru": "Это про ИИ-навыки вообще, а не про эвалы. В отчёте нет отдельной строки «оценка качества ИИ», так что к нашему треку цифра относится косвенно. Плюс надбавка — корреляция, а не эффект обучения: такие вакансии чаще сеньорские и чаще в дорогих отраслях.",
      "en": "This is about AI skills in general, not evals. The report has no separate line item for AI quality evaluation, so the figure applies to this track only indirectly. And the premium is a correlation, not a return to training: such postings skew senior and skew toward high-paying industries."
     },
     "source": {
      "title": "Beyond the Buzz: Developing the AI Skills Employers Actually Need",
      "url": "https://lightcast.io/resources/blog/beyond-the-buzz-press-release-2025-07-23",
      "org": "Lightcast",
      "date": "2025-07-23"
     }
    }
   ],
   "mechanics": [
    {
     "process": {
      "ru": "Продуктовая поддержка пользователей и карьерные подсказки в LinkedIn",
      "en": "User-facing product help and career guidance at LinkedIn"
     },
     "pattern": {
      "ru": "Качество ответов мерят в три слоя с разной скоростью. Инженеры гоняют быстрые грубые прогоны для направления. Разметчики оценивают до 500 диалогов в день по шкалам: общее качество, доля галлюцинаций, нарушения политик ответственного ИИ, связность и стиль. Живые пользователи — последняя инстанция по масштабу. Человек остаётся автором рубрики и источником эталона: сначала критерии обсуждала вся команда, потом перешли к «более принципиальному подходу с постоянными и разнообразными разметчиками» и привлекли внутреннюю команду лингвистов. Автоматическую оценку команда называет «святым Граалем, но всё ещё работой в процессе» — то есть модельные оценщики строятся, а не заменили людей.",
      "en": "Quality is measured in three layers at three speeds. Engineers run fast, coarse passes for direction. Annotators evaluate up to 500 conversations a day on overall quality score, hallucination rate, Responsible AI violations, coherence and style. Real users are the final court by scale. Humans remain the authors of the rubric and the source of ground truth: at first the whole team weighed in on criteria, then they moved to \"a more principled approach with consistent and diverse annotators\" and brought in their internal linguist team. The team calls automatic evaluation \"the holy grail, but still a work in progress\" — model-based evaluators are being built, not replacing people."
     },
     "outcome": {
      "ru": "Разметчики дают обратную связь примерно за сутки, сигнал от живых пользователей на одно изменение может занимать 3+ дня. Этот разрыв в скорости и есть причина, по которой строят автоматические оценщики: на детекции галлюцинаций был «некоторый успех (но легко не было!)».",
      "en": "Annotators return feedback with about a one-day turnaround; member feedback on a single change can take 3+ days. That speed gap is why they are building automated evaluators: on hallucination detection they had \"some success (but it wasn't easy!)\"."
     },
     "kind": "vendor",
     "source": {
      "title": "Musings on Building a Generative AI Product",
      "url": "https://www.linkedin.com/blog/engineering/generative-ai/musings-on-building-a-generative-ai-product",
      "org": "LinkedIn Engineering",
      "date": "2024-04-25"
     }
    },
    {
     "process": {
      "ru": "Код-ревью и написание кода внутри Google",
      "en": "Code review and code authoring inside Google"
     },
     "pattern": {
      "ru": "Решение о выкате принимают по онлайн-A/B, а не по офлайн-метрике: в посте прямо сказано, что «быстрые итерации с онлайн-A/B-экспериментами ключевы, поскольку офлайн-метрики часто лишь грубые прокси пользовательской ценности». Метрику принятия определяют буквально, до миллисекунд: число принятых подсказок делить на число показанных дольше 750 мс, пока пользователь не печатает. Человек в контуре — автор изменения: подсказку правки к комментарию ревьюера он принимает, редактирует или отклоняет сам.",
      "en": "Rollout decisions are made on online A/B tests, not offline metrics: the post states that \"quick iterations with online A/B experiments are key, as offline metrics are often only rough proxies of user value.\" The acceptance metric is defined down to the millisecond — suggestions accepted divided by suggestions shown for more than 750 ms while the user isn't typing. The human in the loop is the change author: they accept, edit, or dismiss each suggested fix to a reviewer comment themselves."
     },
     "outcome": {
      "ru": "Свыше 8% комментариев ревьюера сейчас закрываются с помощью ИИ. Доля принятых подсказок автодополнения — 37%, и ИИ помогает завершить около 50% набираемых символов кода; ещё ~2% кода в IDE даёт «умная вставка».",
      "en": "Over 8% of code review comments are now addressed with AI-based assistance. Completion suggestions are accepted 37% of the time, assisting in the completion of about 50% of code characters; smart paste contributes another ~2% of code in the IDE."
     },
     "kind": "experiment",
     "source": {
      "title": "AI in software engineering at Google: Progress and the path ahead",
      "url": "https://research.google/blog/ai-in-software-engineering-at-google-progress-and-the-path-ahead/",
      "org": "Google Research",
      "date": "2024-06-06"
     }
    },
    {
     "process": {
      "ru": "Приёмка рабочих результатов — отчёты, чертежи, юридические документы, ответы поддержки — по 44 профессиям из девяти отраслей",
      "en": "Accepting real work deliverables — reports, CAD drawings, legal documents, support replies — across 44 occupations in nine sectors"
     },
     "pattern": {
      "ru": "Эталон здесь не бенчмарк, а слепое парное сравнение: задачи построены из реальной работы профессионалов со средним стажем 14 лет, и результат модели сравнивают с результатом человека. Автоматический грейдер поставлен рядом как дешёвый прокси для быстрых итераций — и его специально сверили с людьми, а не приняли на веру. Люди задают потолок и остаются приёмкой; гольд-подмножество из 220 задач и публичный сервис автогрейдинга выложены открыто, чтобы сверку мог повторить кто угодно.",
      "en": "Ground truth here is not a benchmark but blind pairwise comparison: tasks are built from the real work of professionals averaging 14 years of experience, and the model deliverable is compared against a human one. An automated grader sits alongside as a cheap proxy for fast iteration — and it was deliberately checked against the humans rather than trusted. People set the ceiling and remain the acceptance gate; a gold subset of 220 tasks and a public automated grading service are open-sourced so anyone can redo the check."
     },
     "outcome": {
      "ru": "Автогрейдер совпадает с экспертами примерно в 66% случаев, тогда как эксперты между собой совпадают примерно в 71%. То есть потолок задан согласием людей, и он далеко не 100%.",
      "en": "The automated grader agrees with experts about 66% of the time, while experts agree with each other about 71%. The ceiling is set by human agreement, and it is nowhere near 100%."
     },
     "kind": "vendor",
     "source": {
      "title": "GDPval: Evaluating AI Model Performance on Real-World Economically Valuable Tasks",
      "url": "https://arxiv.org/abs/2510.04374",
      "org": "OpenAI (препринт arXiv)",
      "date": "2025-10-05"
     }
    },
    {
     "process": {
      "ru": "Первая линия поддержки клиентов в крупной софтверной компании",
      "en": "First-line customer support at a large software firm"
     },
     "pattern": {
      "ru": "Мерили не оценку на бенчмарке, а бизнес-метрику из логов — обращения, закрытые за час, — на поэтапном раскате ассистента среди 5 179 агентов поддержки. Человек в контуре решает сам: подсказка появляется в интерфейсе, использовать её или нет — выбор оператора. Именно поэтапность раската и дала возможность сравнить, а не просто отчитаться «стало лучше».",
      "en": "What was measured was not a benchmark score but a business metric from logs — issues resolved per hour — across a staggered rollout to 5,179 customer support agents. The human in the loop decides: the suggestion appears in the interface, and using it is the agent's call. The staggered rollout is what made comparison possible instead of a bare \"things improved\" claim."
     },
     "outcome": {
      "ru": "В среднем +14% обращений в час. Но средняя цифра прячет главное: у новичков и слабых по метрикам рост около 34%, у опытных и сильных — минимальный эффект. Одна усреднённая метрика по продукту такой разброс стирает — это и есть довод за разбивку по сегментам.",
      "en": "On average, +14% issues resolved per hour. But the average hides the point: novice and low-skilled workers gained around 34%, while experienced and highly skilled workers saw minimal impact. A single product-wide average erases that — which is exactly the argument for segmenting your metrics."
     },
     "kind": "experiment",
     "source": {
      "title": "Generative AI at Work (NBER Working Paper 31161)",
      "url": "https://www.nber.org/papers/w31161",
      "org": "NBER — Brynjolfsson, Li, Raymond",
      "date": "2023-04 (ред. 2023-11)"
     }
    },
    {
     "process": {
      "ru": "Выбор модели у поставщика и решение о релизе — по сути закупочная процедура",
      "en": "Vendor model selection and release decisions — a procurement process in practice"
     },
     "pattern": {
      "ru": "Открытая площадка собирает слепые парные голоса реальных людей на их собственных запросах и строит из них ранжирование. Человек тут не проверяет метрику — человек и есть метрика. Авторы отдельно закрыли главный вопрос доверия: проверили, что краудсорсинговые вопросы «достаточно разнообразны и различают модели», и что голоса толпы «хорошо согласуются» с оценками экспертов.",
      "en": "An open platform collects blind pairwise votes from real people on their own prompts and turns them into a ranking. The human isn't validating the metric here — the human is the metric. The authors addressed the obvious trust question head-on: they verified that the crowdsourced questions are \"sufficiently diverse and discriminating\" and that crowd votes are \"in good agreement\" with expert raters."
     },
     "outcome": {
      "ru": "К моменту публикации собрано более 240 тысяч голосов. Согласие толпы с экспертами авторы в аннотации называют «хорошим», но точной цифры там нет — так что это подтверждение направления, а не измеренный коэффициент.",
      "en": "Over 240,000 votes had been collected by publication. The abstract describes crowd-expert agreement as \"good\" but gives no exact figure — so this confirms the direction, not a measured coefficient."
     },
     "kind": "other",
     "source": {
      "title": "Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference",
      "url": "https://arxiv.org/abs/2403.04132",
      "org": "LMSYS / UC Berkeley (препринт arXiv, ICML 2024)",
      "date": "2024-03-07"
     }
    }
   ],
   "roles": [
    {
     "title": {
      "ru": "Инженер эвалов (продуктовый)",
      "en": "Evals Engineer (product)"
     },
     "note": {
      "ru": "Строит и держит систему измерений вокруг одной живой ИИ-фичи: набор эталонных примеров, рубрику, LLM-судью, сверенного с людьми, и дашборд, по которому принимают решение выкатывать или нет. Трек ведёт сюда напрямую: это те же три слоя, что описывает LinkedIn — быстрый прогон, разметка, живые пользователи.",
      "en": "Builds and maintains the measurement system around one live AI feature: the reference set, the rubric, an LLM judge calibrated against humans, and the dashboard the ship/no-ship call is made on. The track leads here directly — it's the same three layers LinkedIn describes: fast pass, annotation, real users."
     }
    },
    {
     "title": {
      "ru": "Исследовательский инженер по оценке моделей",
      "en": "Research Engineer, Model Evaluations"
     },
     "note": {
      "ru": "Лабораторная версия той же работы: превратить размытое «модель стала умнее» в защитимую метрику, поднять и укрепить распределённую платформу прогона эвалов, вести дашборды здоровья модели во время обучения и отличить просадку модели от поломки пайплайна. В вакансии Anthropic это буквально описание обязанностей.",
      "en": "The lab version of the same job: turn a vague \"the model got smarter\" into a defensible metric, build and harden the distributed eval execution platform, own the dashboards tracking model health during training, and tell a model regression apart from a broken pipeline. That is literally the Anthropic job description."
     }
    },
    {
     "title": {
      "ru": "Инженер качества ИИ-систем (AI QA)",
      "en": "AI Quality Engineer (AI QA)"
     },
     "note": {
      "ru": "Приходит из обычного QA и учится работать там, где нет ожидаемого результата: вместо ассертов — распределения, вместо «прошёл/упал» — доверительные интервалы и парные сравнения. Оговорка: отдельной статистики по вакансиям с таким названием я не нашёл, роль выведена из содержания работы, а не из подсчёта объявлений.",
      "en": "Comes from classic QA and learns to work where there is no expected output: distributions instead of assertions, confidence intervals and paired comparisons instead of pass/fail. Caveat: I found no standalone postings statistic under this title; the role is inferred from the nature of the work, not from a count of ads."
     }
    },
    {
     "title": {
      "ru": "Специалист по ответственному ИИ и аудиту (governance / assurance)",
      "en": "Responsible AI and assurance specialist (governance)"
     },
     "note": {
      "ru": "Отвечает не за то, чтобы метрика была хорошей, а за то, чтобы она вообще существовала, была задокументирована и воспроизводима внешним проверяющим. Именно эта категория ролей, по данным AI Index, выросла на 17% за 2025 — но это самооценка компаний в опросе, а не подсчёт по вакансиям. Техническая часть работы — та же, что в треке.",
      "en": "Accountable not for the metric being good but for it existing at all, being documented, and being reproducible by an outside reviewer. This is the role category AI Index reports growing 17% in 2025 — though that comes from companies' own survey answers, not a postings count. The technical work is the same as in this track."
     }
    }
   ],
   "skills": [
    {
     "name": {
      "ru": "Писать рубрику и инструкцию разметчику",
      "en": "Writing rubrics and annotation guidelines"
     },
     "why": {
      "ru": "Это узкое место, а не подготовительный этап. LinkedIn пишет, что критерии оценки разрастались именно потому, что их «очень трудно закодировать». А исследование EvalGen («Who Validates the Validators?», UIST 2024) нашло, почему так: часть критериев зависит от конкретной увиденной выдачи и не задаётся заранее — авторы назвали это «дрейфом критериев». Значит, рубрику придётся переписывать по ходу, и это нормальный режим работы, а не ошибка планирования.",
      "en": "This is the bottleneck, not a warm-up phase. LinkedIn says their evaluation criteria kept growing precisely because they are \"very hard to codify.\" And the EvalGen study (\"Who Validates the Validators?\", UIST 2024) found why: some criteria depend on the specific outputs observed and cannot be defined a priori — the authors called it \"criteria drift.\" So the rubric will get rewritten as you go, and that's the normal mode of work, not a planning failure."
     }
    },
    {
     "name": {
      "ru": "Калибровать LLM-судью против людей",
      "en": "Calibrating an LLM judge against humans"
     },
     "why": {
      "ru": "Судья без сверки — это не метрика, а мнение. Опорные цифры: в MT-Bench сильный судья (GPT-4) совпал с человеческими предпочтениями более чем в 80% случаев — на том же уровне, что и согласие людей между собой; в GDPval автогрейдер дал около 66% при согласии экспертов около 71%. Вывод один и тот же: потолок задают люди, и он не 100%. Считать согласие надо не только в сырых процентах, но и с поправкой на случайное совпадение.",
      "en": "An uncalibrated judge is an opinion, not a metric. The reference numbers: in MT-Bench a strong judge (GPT-4) matched human preferences over 80% of the time — the same level as human-human agreement; in GDPval the automated grader hit about 66% against about 71% expert-expert agreement. Same conclusion both times: humans set the ceiling and it isn't 100%. And agreement should be computed with a chance-correction, not just raw percentages."
     }
    },
    {
     "name": {
      "ru": "Знать смещения судьи и уметь их гасить",
      "en": "Knowing judge biases and neutralizing them"
     },
     "why": {
      "ru": "Работа по MT-Bench назвала штатные смещения LLM-судьи: позиционное, к длине ответа и к собственным генерациям, плюс ограниченную способность к рассуждению. Систематическое исследование позиционного смещения (15 судей, MTBench и DevBench, 22 задачи, более 150 тысяч оценок) добавило важное: позиционное смещение слабо зависит от длины компонентов промпта, зато сильно — от разрыва в качестве между вариантами. То есть чем ближе кандидаты, тем больше вы измеряете порядок, а не качество, — и тем нужнее перестановка местами и повторные прогоны.",
      "en": "The MT-Bench paper named the LLM judge's standard biases: position, verbosity, and self-enhancement, plus limited reasoning ability. A systematic study of position bias (15 judges, MTBench and DevBench, 22 tasks, over 150,000 evaluation instances) added the important part: position bias is only weakly influenced by the length of prompt components but is strongly affected by the quality gap between solutions. The closer the candidates, the more you are measuring order rather than quality — and the more you need position swaps and repeated runs."
     }
    },
    {
     "name": {
      "ru": "Статистика измерений: интервалы, парные сравнения, мощность",
      "en": "Measurement statistics: intervals, paired comparisons, power"
     },
     "why": {
      "ru": "Без этого эвал превращается в гадание по двум прогонам. Работа «Adding Error Bars to Evals» (Evan Miller, Anthropic, arXiv:2411.00640) разбирает эвал как выборку вопросов из более широкой «суперпопуляции» и даёт конкретное: формулы стандартных ошибок и доверительных интервалов, парное сравнение моделей, поправку на кластеризацию, снижение дисперсии и расчёт нужного размера выборки. В вакансии Anthropic «статистика и планирование экспериментов» стоит отдельным пунктом.",
      "en": "Without it an eval degenerates into reading tea leaves from two runs. \"Adding Error Bars to Evals\" (Evan Miller, Anthropic, arXiv:2411.00640) frames an eval as sampling questions from a broader \"super-population\" and delivers specifics: standard error and confidence interval formulas, paired model comparisons, clustering corrections, variance reduction, and power analysis for sample size. Anthropic's posting lists \"statistics and experimental design\" as its own line item."
     }
    },
    {
     "name": {
      "ru": "Связывать офлайн-метрику с продовым исходом",
      "en": "Tying offline metrics to production outcomes"
     },
     "why": {
      "ru": "Google формулирует это без обиняков: быстрые итерации с онлайн-A/B ключевы, потому что офлайн-метрики часто лишь грубые прокси пользовательской ценности. И метрику определяют буквально, включая порог 750 мс. Второй урок — из данных по поддержке (NBER 31161): средняя по продукту цифра +14% спрятала, что весь эффект пришёлся на новичков (+34%), а у сильных сотрудников его почти не было. Разбивка по сегментам — часть навыка, а не украшение отчёта.",
      "en": "Google puts it bluntly: quick iterations with online A/B experiments are key because offline metrics are often only rough proxies of user value. And the metric is defined literally, down to a 750 ms threshold. The second lesson comes from the support data (NBER 31161): a product-wide average of +14% concealed that the entire effect landed on novices (+34%) while high performers saw almost none. Segmenting is part of the skill, not report decoration."
     }
    },
    {
     "name": {
      "ru": "Проверять на дыры сам бенчмарк",
      "en": "Auditing the benchmark itself"
     },
     "why": {
      "ru": "Инструмент измерения ломается чаще, чем кажется. Разбор агентных бенчмарков (arXiv:2507.02825) нашёл конкретные дыры в известных наборах: у SWE-bench Verified недостаточно тестов, TAU-bench засчитывал пустые ответы как успешные. Такие дефекты искажают оценку агента до 100% в относительном выражении, а прогон предложенного чек-листа ABC по CVE-Bench срезал завышение на 33%. Плюс наблюдаемость: без трейсов шагов агента вы видите итог, но не место поломки.",
      "en": "The measuring instrument breaks more often than you'd think. An audit of agentic benchmarks (arXiv:2507.02825) found concrete holes in well-known suites: SWE-bench Verified uses insufficient test cases, TAU-bench counts empty responses as successful. Such defects under- or overestimate agent performance by up to 100% in relative terms, and running the proposed ABC checklist on CVE-Bench reduced the overestimation by 33%. Plus observability: without traces of the agent's steps you see the outcome but not where it broke."
     }
    }
   ],
   "anchors": [
    {
     "title": "Define success criteria and build evaluations (Develop test cases)",
     "url": "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests",
     "org": "Anthropic (документация)",
     "why": {
      "ru": "Самая короткая дорога от нуля до рабочего эвала. Разбирает способы оценивать — точное совпадение, косинусная близость на эмбеддингах, ROUGE-L, LLM-судья по шкале Лайкерта, бинарно или по порядковой шкале — с кодом под каждый. И даёт спорный, но полезный совет прямым текстом: «больше вопросов с чуть менее точной автоматической проверкой лучше, чем меньше вопросов с качественной ручной». Это ровно тот выбор, который придётся делать в первый же день.",
      "en": "The shortest path from zero to a working eval. It walks through grading methods — exact match, embedding cosine similarity, ROUGE-L, and an LLM judge on Likert, binary or ordinal scales — with code for each. And it states a contestable but useful rule outright: \"more questions with slightly lower signal automated grading is better than fewer questions with high-quality human hand-graded evals.\" That's exactly the trade-off you face on day one."
     }
    },
    {
     "title": "Evaluating AI Agents",
     "url": "https://www.deeplearning.ai/courses/evaluating-ai-agents/",
     "org": "DeepLearning.AI + Arize AI",
     "why": {
      "ru": "Открытый курс на 2 ч 36 мин: 15 видеоуроков, 6 примеров кода. Ровно про то, чего нет в обычном тестировании, — трейсинг шагов агента, оценка компонентов (маршрутизация, отдельные навыки) кодовыми проверками и LLM-судьёй, оценка траектории через convergence score, структурированные эксперименты и мониторинг уже в проде. Уровень начальный, нужен базовый Python. На момент проверки запись бесплатна (бета платформы), градуированное задание — по PRO-подписке.",
      "en": "An open 2h36m course: 15 video lessons, 6 code examples. Precisely the part regular testing doesn't cover — tracing agent steps, evaluating components (router decisions, individual skills) with code-based and LLM-as-a-Judge evaluators, trajectory evaluation via convergence score, structured experimentation, and production monitoring. Beginner level, basic Python required. Free to enroll as of checking (platform beta); the graded assignment requires PRO."
     }
    },
    {
     "title": "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena",
     "url": "https://arxiv.org/abs/2306.05685",
     "org": "NeurIPS 2023 Datasets & Benchmarks — Zheng, Chiang, Sheng и др.",
     "why": {
      "ru": "Классика, которая задала метод: именно здесь LLM-судья был впервые системно проверен и здесь же названы его штатные болезни — позиционное смещение, тяга к длинным ответам, предпочтение собственных генераций, ограниченная способность к рассуждению; авторы предлагают и способы часть из них гасить. Отсюда же берётся цифра, на которую все ссылаются: более 80% совпадения с человеческими предпочтениями — столько же, сколько между самими людьми. Читать до того, как поверить любому современному судье.",
      "en": "The classic that established the method: this is where the LLM judge was first tested systematically, and where its standard pathologies were named — position bias, verbosity bias, self-enhancement bias, limited reasoning — along with proposed mitigations. It's also the origin of the number everyone cites: over 80% agreement with human preferences, the same as humans with each other. Read it before trusting any modern judge."
     }
    },
    {
     "title": "Establishing Best Practices for Building Rigorous Agentic Benchmarks",
     "url": "https://arxiv.org/abs/2507.02825",
     "org": "препринт arXiv (Zhu, Jin, Pruksachatkun и др.), июль 2025",
     "why": {
      "ru": "Чек-лист (Agentic Benchmark Checklist), который спасает от самой дорогой ошибки — доверия к чужому бенчмарку. Авторы показывают на живых примерах, что бывает не так: у SWE-bench Verified недостаточно тестов, TAU-bench засчитывает пустые ответы как успешные. Искажение оценки агента доходит до 100% в относительном выражении; прогон чек-листа по CVE-Bench срезал завышение на 33%. Это препринт, но конкретика проверяемая.",
      "en": "A checklist (the Agentic Benchmark Checklist) that saves you from the most expensive mistake — trusting someone else's benchmark. The authors show, on live examples, what goes wrong: SWE-bench Verified uses insufficient test cases, TAU-bench counts empty responses as successful. Distortion of agent performance reaches 100% in relative terms; running the checklist on CVE-Bench cut the overestimation by 33%. It's a preprint, but the specifics are checkable."
     }
    },
    {
     "title": "AI RMF: Generative Artificial Intelligence Profile (NIST AI 600-1)",
     "url": "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
     "org": "NIST (США)",
     "why": {
      "ru": "Язык, на котором с эвалами говорят регуляторы и служба безопасности заказчика. Это кросс-секторальный профиль-компаньон к AI RMF 1.0 для генеративного ИИ: перечисляет риски и предлагаемые действия по управлению ими, включая оценку до выката. Финальная версия — 26 июля 2024, принятие добровольное. Полезен не техникой, а тем, что даёт готовые формулировки, когда измерения надо не только сделать, но и защитить перед комиссией.",
      "en": "The language regulators and your client's security team use to talk about evals. It is a cross-sectoral companion profile to AI RMF 1.0 for generative AI: it enumerates risks and suggested actions to manage them, including pre-deployment evaluation. Final version dated 26 July 2024; adoption is voluntary. Its value isn't technique — it's ready-made wording for when measurements have to be defended to a committee, not just performed."
     }
    }
   ],
   "caveat": {
    "ru": "Честно про доказательную базу этого трека: она перекошена. Само ремесло эвалов почти не измерено — я не нашёл ни одного исследования с контрольной группой, которое показало бы, что команда с выстроенными эвалами делает продукт лучше или быстрее. Всё, что есть про процесс, — инженерные самоотчёты больших компаний (LinkedIn, Google): без контроля, без повторения, без публикации сырых данных, с понятным интересом рассказчика. Проверяемые цифры есть только про инструменты: согласие судьи с людьми, смещения, дыры в бенчмарках.\n\nДальше — про сами цифры. Ключевые ориентиры согласия (более 80% в MT-Bench, ~66% против ~71% в GDPval) получены на конкретных задачах и языках и на вашу предметную область не переносятся: их надо перемерить у себя, иначе это цитата, а не метрика. И заметьте, где потолок: люди между собой согласны на 70–80%, то есть «эталон» сам шумный — идеальный судья обязан расходиться с любым отдельно взятым разметчиком.\n\nОтдельно неприятное: инструмент измерения ненадёжен. AI Index приводит случай, когда точность GPT-4o в задаче на различение знания и убеждения падала с 98,2% до 64,4% при проверке на галлюцинации, а разбор агентных бенчмарков нашёл прямые дефекты в известных наборах. Трек, который учит «мерить», обязан признать, что мерилки шатаются.\n\nПо спросу данных мало и они косвенные. Отдельной статистики по вакансиям «инженер эвалов» нет: цифры Lightcast — про ИИ-навыки вообще, рост управленческих ролей на 17% и падение доли компаний без политик с 24% до 11% — из корпоративного опроса, то есть самооценка, а зарплатный коридор $500–850 тыс. — одна вакансия одной фронтир-лаборатории, не медиана рынка, причём половина перечисленных там эвал-навыков стоит в разделе «желательно». Наконец, почти вся публичная практика — из бигтеха и лабораторий, на англоязычных задачах. Как это устроено в небольшой команде и на русском материале, публично почти не описано.",
    "en": "An honest account of this track's evidence base: it is lopsided. The craft of evals itself is barely measured — I found no controlled study showing that a team with solid evals ships a better or faster product. Everything about process comes from engineering self-reports by large companies (LinkedIn, Google): no controls, no replication, no published raw data, and an obvious interest in the story told. Checkable numbers exist only for the instruments: judge-human agreement, biases, holes in benchmarks.\n\nNow the numbers themselves. The headline agreement figures (over 80% in MT-Bench, ~66% vs ~71% in GDPval) come from specific tasks in specific languages and do not transfer to your domain: re-measure them in place, or you have a quotation rather than a metric. And note where the ceiling sits: humans agree with each other only 70-80% of the time, so ground truth is itself noisy — a perfect judge must disagree with any single annotator some of the time.\n\nThe uncomfortable part: the measuring instrument is unreliable. AI Index documents GPT-4o's accuracy on distinguishing knowledge from belief falling from 98.2% to 64.4% under hallucination testing, and an audit of agentic benchmarks found outright defects in well-known suites. A track that teaches \"measure it\" has to admit the rulers wobble.\n\nOn demand, the data is thin and indirect. There is no standalone job-postings statistic for \"evals engineer\": the Lightcast figures cover AI skills in general; the 17% growth in governance roles and the drop from 24% to 11% in companies lacking policies come from a corporate survey (self-assessment); and the $500-850k band is one posting at one frontier lab, not a market median — and half the eval skills it lists sit under \"preferred\" rather than \"required.\" Finally, nearly all published practice comes from big tech and labs, on English-language tasks. How this works in a small team, on Russian-language material, is almost undocumented publicly."
   }
  },
  "quant": {
   "lede": {
    "ru": "Публичных доказательств прибыльности стратегий нет и по устройству рынка быть не может: 400 прогонов на чистом случайном блуждании дали шарп около 0,9 внутри выборки и около нуля вне её, а по 313 опубликованным работам о кросс-секции доходностей авторы заключают, что большинство заявленных находок в финансовой экономике, вероятно, ложны. Подтверждается только процесс — проверка вне выборки, поправка на множественные проверки, независимая валидация с «effective challenge», — и трек ровно про него, а не про доходность.",
    "en": "There is no public evidence of profitable strategies and, given how markets work, there cannot be: 400 runs on pure random walks produced in-sample Sharpe ratios around 0.9 and out-of-sample around zero, and a review of 313 published papers on the cross-section of returns concludes that most claimed findings in financial economics are likely false. Only process is verifiable — out-of-sample testing, multiple-testing corrections, independent validation with \"effective challenge\" — and that, not returns, is what this track teaches."
   },
   "demand": [
    {
     "claim": {
      "ru": "МВФ посчитал долю вакансий на фронт-офисные роли — трейдеры, портфельные управляющие, портфельные стратеги, аналитики распределения активов, программные трейдеры — в тексте которых есть ИИ-терминология. В среднем за месяц: 4,5% в 2019 году, 4,9% в 2023-м, пик 6,6% в 2022-м. По этим ролям и по финансовому сектору доля объявлений, требующих ИИ-навыков, опережает общую долю ИИ-вакансий по экономике США.",
      "en": "The IMF measured the share of front-office job postings — traders, portfolio managers, portfolio strategists, asset-allocation analysts, programmatic traders — whose text contains AI terminology. Monthly averages: 4.5% in 2019, 4.9% in 2023, with a 6.6% peak in 2022. For these roles and for the financial services industry, the share of postings requiring AI skills outpaces the overall share of AI-related postings for the broader US economy."
     },
     "figure": "4,5% (2019) → 4,9% (2023), пик 6,6% (2022)",
     "kind": "jobs",
     "caveat": {
      "ru": "Слово «ИИ» в объявлении — ещё не рабочая нагрузка. Сдвиг с 4,5 до 4,9 процента крошечный, и после пика 2022 года доля была ниже, а не выше. Источники панели — Indeed Hiring Lab и LinkedIn Economic Graph; в тексте главы не разделено, какая именно база даёт объявления, а какая профили, поэтому приписывать цифру одному LinkedIn нельзя. Охват — 30 развитых и 14 развивающихся экономик, но сама цифра про рынок США.",
      "en": "The word \"AI\" in a posting is not a workload. The move from 4.5% to 4.9% is tiny, and after the 2022 peak the share was lower, not higher. The panel's sources are Indeed Hiring Lab and LinkedIn Economic Graph; the chapter does not separate which base supplies postings and which supplies profiles, so the figure cannot be attributed to LinkedIn alone. Coverage spans 30 advanced and 14 emerging economies, but this particular figure is about the US market."
     },
     "source": {
      "title": "Global Financial Stability Report, October 2024 — Chapter 3: Advances in Artificial Intelligence: Implications for Capital Market Activities",
      "url": "https://www.imf.org/-/media/files/publications/gfsr/2024/october/english/ch3.pdf",
      "org": "International Monetary Fund",
      "date": "октябрь 2024"
     }
    },
    {
     "claim": {
      "ru": "ESMA и 15 национальных регуляторов провели опрос с июня по сентябрь 2025 года: 728 организаций из 19 стран ЕС. Нехватку навыков и ресурсов как барьер назвали 29% респондентов — среди крупных предприятий доля выше, 34%. Соблюдение регуляторных требований отметили как трудность 45%.",
      "en": "ESMA and 15 national competent authorities ran a survey between June and September 2025: 728 entities across 19 EU countries. A shortage of skills and resources was named a barrier by 29% of respondents — higher, 34%, among large enterprises. Regulatory compliance was flagged as a challenge by 45%."
     },
     "figure": "29% респондентов (34% среди крупных) — нехватка навыков и ресурсов",
     "kind": "survey",
     "caveat": {
      "ru": "Участие было добровольным, и ESMA прямо пишет в сноске: приведённая статистика не обязательно репрезентативна для более широкой совокупности фирм ЕС, доля участия различалась по странам и секторам. Плюс «не хватает навыков и ресурсов» ничего не говорит о том, каких именно навыков и на каких должностях.",
      "en": "Participation was voluntary, and ESMA states in a footnote that the statistics presented are not necessarily representative of the broader population of EU-domiciled firms, with participation rates varying across countries and sectors. Also, \"lack of skills and resources\" says nothing about which skills, or in which roles."
     },
     "source": {
      "title": "AI adoption and trends in securities markets: EU evidence (TRV Risk Analysis)",
      "url": "https://www.esma.europa.eu/sites/default/files/2026-02/ESMA50-481369926-30599_TRV_Risk_Analysis_AI_adoption_and_trends_in_securities_markets.pdf",
      "org": "European Securities and Markets Authority (ESMA)",
      "date": "20 февраля 2026"
     }
    },
    {
     "claim": {
      "ru": "Третий совместный опрос Банка Англии и FCA (предыдущие — 2019 и 2022) охватил 118 фирм: 75% уже используют ИИ, ещё 10% планируют в течение трёх лет. При этом 46% фирм сообщили, что понимают применяемые ими ИИ-технологии лишь частично. 55% сценариев содержат какую-то степень автоматизации решений, полностью автономных — 2%.",
      "en": "The third joint Bank of England and FCA survey (earlier rounds in 2019 and 2022) covered 118 firms: 75% already use AI, another 10% plan to within three years. At the same time, 46% of respondent firms reported only \"partial understanding\" of the AI technologies they use. 55% of use cases have some degree of automated decision-making; only 2% are fully autonomous."
     },
     "figure": "75% фирм используют ИИ; 46% понимают его лишь частично",
     "kind": "survey",
     "caveat": {
      "ru": "«Используем ИИ» здесь покрывает всё — от антифрода до чат-бота на сайте. Про торговлю и стратегии опрос отдельно не разбивает, поэтому к квант-треку цифра относится косвенно: она про то, что в фирмах много моделей и мало людей, которые их понимают.",
      "en": "\"Using AI\" here covers everything from fraud screening to a website chatbot. The survey does not break out trading or strategy work, so it bears on the quant track only indirectly: it says firms run many models and have few people who understand them."
     },
     "source": {
      "title": "Artificial intelligence in UK financial services — 2024",
      "url": "https://www.bankofengland.co.uk/report/2024/artificial-intelligence-in-uk-financial-services-2024",
      "org": "Bank of England / FCA",
      "date": "21 ноября 2024"
     }
    },
    {
     "claim": {
      "ru": "CFA Institute опросил своих членов и получил, что больше двух третей респондентов ВЫРАЗИЛИ ЖЕЛАНИЕ развивать технические навыки, включая работу с ИИ, чтобы остаться востребованными в своих ролях.",
      "en": "CFA Institute surveyed its members and found that more than two-thirds of respondents EXPRESSED A DESIRE to develop their technical skills, including the use of AI, to stay relevant in their roles."
     },
     "figure": "больше двух третей респондентов",
     "kind": "survey",
     "caveat": {
      "ru": "Это желание учиться, а не спрос работодателя и не проверенный навык. Опрашивали членов профессиональной ассоциации — выборка смещена в сторону людей, которые и так вкладываются в квалификацию. Число респондентов на странице отчёта не указано. Данные собраны за последние две недели февраля 2024-го, отчёт вышел 13 января 2025-го.",
      "en": "This is an appetite to learn, not employer demand and not a demonstrated skill. The sample is members of a professional body, skewed toward people already investing in credentials. The report page does not state the number of respondents. Data were collected in the last two weeks of February 2024; the report came out on 13 January 2025."
     },
     "source": {
      "title": "Creating Value from Big Data in the Investment Management Process: A Workflow Analysis",
      "url": "https://rpc.cfainstitute.org/research/reports/2025/creating-value-from-big-data-in-the-investment-management-process",
      "org": "CFA Institute Research and Policy Center",
      "date": "13 января 2025"
     }
    },
    {
     "claim": {
      "ru": "Lightcast (данные для Stanford AI Index 2026): ИИ-навыки упоминаются в 2,5% американских вакансий — на 55% больше, чем годом ранее. Кластер «агентный ИИ» вырос с 0,06% объявлений в 2024 году до 0,23% в 2025-м, это примерно 90 тысяч вакансий в США. Самый востребованный специализированный навык — Python: 258 674 объявления.",
      "en": "Lightcast (data for the Stanford AI Index 2026): AI skills are now mentioned in 2.5% of all US job postings, up 55% compared to last year. The \"agentic AI\" cluster jumped from 0.06% of postings in 2024 to 0.23% in 2025, representing roughly 90,000 US job postings. The most in-demand specialised skill is Python, at 258,674 postings."
     },
     "figure": "2,5% вакансий в США; агентный ИИ 0,06% (2024) → 0,23% (2025)",
     "kind": "jobs",
     "caveat": {
      "ru": "Это вся экономика США, а не финансы: отраслевой разбивки на этой странице нет. Для квант-трека цифра работает только как фон — она показывает, куда двигается рынок труда в целом, и ничего не говорит про торговые подразделения.",
      "en": "This is the whole US economy, not finance: the page carries no industry breakdown. For the quant track it works only as background — it shows where the labour market is heading overall and says nothing about trading desks."
     },
     "source": {
      "title": "Lightcast and Stanford University: Annual AI Index 2026",
      "url": "https://lightcast.io/resources/research/stanford-ai-index-2026",
      "org": "Lightcast / Stanford HAI",
      "date": "2026"
     }
    }
   ],
   "mechanics": [
    {
     "process": {
      "ru": "Надзор за торгами: поиск манипуляций и мошенничества в потоке рыночных событий",
      "en": "Market surveillance: hunting manipulation and fraud in the daily flow of market events"
     },
     "pattern": {
      "ru": "Алгоритмы просеивают поток и метят подозрительное. Человек поток не смотрит — человек разбирает срабатывание. FINRA описывает свой порядок так: когда надзор указывает на потенциально проблемную активность, сотрудники расследуют дальше либо, для дел вне юрисдикции FINRA, направляют обращение в SEC или другое ведомство. Решение о том, что перед ним — схема или шум, остаётся за следователем.",
      "en": "Algorithms sift the flow and flag what looks wrong. Humans never watch the flow — they work the alerts. FINRA describes its own order of operations: when surveillance indicates potentially problematic activity, staff investigate further or, for matters outside FINRA's jurisdiction, make a referral to the SEC or another agency. Deciding whether something is a scheme or noise stays with the investigator."
     },
     "outcome": {
      "ru": "FINRA пишет, что запускает много алгоритмов, использующих ИИ для просмотра «сотен миллиардов рыночных событий, порождаемых ежедневно», в поисках мошенничества, манипуляций и иных нарушений. Отдельно организация ОЦЕНИВАЕТ эффект от GenAI-инструментов, уже развёрнутых или находящихся в разработке, как «многие тысячи часов» годовой экономии, и подчёркивает, что экспертиза сотрудников остаётся критически важной, особенно при сохранении «human-in-the-loop» в составе управления и контролей.",
      "en": "FINRA states it runs many algorithms that use AI to review \"the hundreds of billions of market events generated each day\" in search of fraud, manipulation or other misconduct. Separately it ESTIMATES \"many thousands of hours in annual efficiency gains\" from GenAI tools already deployed or in development, and stresses that staff expertise remains crucial, especially when maintaining a \"human-in-the-loop\" as part of its governance and controls."
     },
     "kind": "vendor",
     "source": {
      "title": "Advancing FINRA's Mission With AI",
      "url": "https://www.finra.org/media-center/blog/advancing-finras-mission-with-ai-1028205",
      "org": "FINRA",
      "date": "28 октября 2025"
     }
    },
    {
     "process": {
      "ru": "Подготовка документов и извлечение данных из неструктурированного текста",
      "en": "Drafting documents and extracting data from unstructured text"
     },
     "pattern": {
      "ru": "ИИ пишет черновик или вытаскивает сущности и связи из документа, а решение остаётся за человеком. Это не пожелание, а то, как фирмы сами описали свои внедрения: 77% сценариев работают с низкой или нулевой автономией, то есть требуется одобрение человека либо система только предлагает варианты.",
      "en": "AI drafts, or pulls entities and relationships out of a document, and the decision stays with a person. This is not an aspiration but how firms described their own deployments: 77% of AI use cases operate with low or no autonomy, meaning human approval is required or the AI system only provides suggestions."
     },
     "outcome": {
      "ru": "Из 847 сценариев, о которых сообщили 395 фирм, 239 (29% от общего числа) — подготовка черновиков и реферирование, 227 — внутренний ассистент или копилот, 109 — генерация кода. 87% сценариев фирмы отнесли к сугубо внутреннему использованию. Агентные системы — 141 сценарий (17%), и более высокой автоматизации решений это не даёт: 68% из них всё равно с низкой или нулевой автономией, лишь 27% с высокой или средней.",
      "en": "Of 847 use cases reported by 395 firms, 239 (29% of the total) are drafting and summarising information, 227 an internal assistant or copilot, 109 code generation. Firms classified 87% as internal-use only. Agentic systems account for 141 use cases (17%), and this does not translate into more automated decision-making: 68% of them are still low or no autonomy, only 27% high or medium."
     },
     "kind": "survey",
     "source": {
      "title": "AI adoption and trends in securities markets: EU evidence (TRV Risk Analysis)",
      "url": "https://www.esma.europa.eu/sites/default/files/2026-02/ESMA50-481369926-30599_TRV_Risk_Analysis_AI_adoption_and_trends_in_securities_markets.pdf",
      "org": "European Securities and Markets Authority (ESMA)",
      "date": "20 февраля 2026"
     }
    },
    {
     "process": {
      "ru": "Валидация моделей в банке: независимая проверка до того, как модель начнёт влиять на деньги",
      "en": "Model validation in a bank: independent review before a model touches money"
     },
     "pattern": {
      "ru": "Процесс устроен так, что модель должен оспорить человек, который её не делал. Руководство называет это «effective challenge» — критический анализ объективными осведомлёнными сторонами, способными выявить ограничения модели и добиться нужных изменений. Валидацию, КАК ПРАВИЛО, проводят сотрудники, не отвечающие за разработку и использование модели и не заинтересованные в том, будет ли она признана валидной; если часть работы практичнее сделать самим разработчикам, она обязана пройти критический обзор независимой стороны.",
      "en": "The process is built so that someone who did not build the model has to challenge it. The guidance calls this \"effective challenge\": critical analysis by objective, informed parties that can identify model limitations and produce appropriate changes. Validation is GENERALLY done by staff not responsible for model development or use and with no stake in whether the model is determined valid; where some validation work is best done by developers, it must be subject to critical review by an independent party."
     },
     "outcome": {
      "ru": "SR 11-7 задаёт три ключевых элемента валидации — оценку концептуальной обоснованности, текущий мониторинг и анализ исходов — и прямо описывает back-testing как одну из форм анализа исходов: сравнение фактических результатов с прогнозами модели на отрезке времени, НЕ использовавшемся при разработке, с частотой, соответствующей горизонту прогноза или окну оценки. Сам модельный риск определён как «потенциал неблагоприятных последствий от решений, основанных на неверных или неправильно использованных выводах и отчётах модели».",
      "en": "SR 11-7 sets out three core validation elements — evaluation of conceptual soundness, ongoing monitoring, and outcomes analysis — and explicitly describes back-testing as one form of outcomes analysis: comparing actual outcomes with model forecasts over a sample time period NOT used in model development, at a frequency matching the model's forecast horizon or performance window. Model risk itself is defined as \"the potential for adverse consequences from decisions based on incorrect or misused model outputs and reports.\""
     },
     "kind": "other",
     "source": {
      "title": "SR 11-7: Guidance on Model Risk Management",
      "url": "https://www.federalreserve.gov/boarddocs/srletters/2011/sr1107.pdf",
      "org": "Board of Governors of the Federal Reserve System / OCC",
      "date": "4 апреля 2011"
     }
    },
    {
     "process": {
      "ru": "Принятие инвестиционных решений и исполнение сделок",
      "en": "Investment decision-making and trade execution"
     },
     "pattern": {
      "ru": "Тут ИИ пока подпорка, а не решающий. По итогам опроса участников рынка МВФ пишет: хотя многие наблюдатели рисуют сценарии с автономным ИИ, генерирующим и исполняющим сделки без человеческого надзора, большинству ответивших участников рынка эта идея весьма некомфортна, а ИИ-стратегии, не понимаемые человеком, они считают «нестартующими». По регуляторным, риск-менеджерским, юридическим и этическим причинам большинство считает «human in the loop» обязательной частью любой ИИ-стратегии. Реально большие языковые модели встраивают как ВХОД в существующие аналитические модели — например, чтобы усилить предсказательную силу текстового анализа.",
      "en": "Here AI is still a support, not the decider. From its outreach, the IMF reports that although many observers envision autonomous AI generating and executing trades without human oversight, most responding market participants are quite uncomfortable with the idea and view AI-generated strategies not understood by humans as a nonstarter. For regulatory, risk-management, liability and ethical reasons, most see a \"human in the loop\" as an essential part of any AI-based strategy. In practice, large language models are being used as INPUTS into existing analytical models — for instance to improve the forecasting power of textual analysis."
     },
     "outcome": {
      "ru": "МВФ, ссылаясь на опрос Mercer Investments (2024), пишет, что внедрение ИИ в ключевые инвестиционные процессы — торговлю и исполнение инвестиционных решений — всё ещё в начальной стадии. По итогам собственного аутрича с участниками рынка и регуляторами МВФ заключает: большая часть текущего использования ИИ выглядит как продолжение прежних трендов машинного обучения и других продвинутых аналитических инструментов, а более значимые изменения — вопрос средне- и долгосрочной перспективы. Параллельно растёт число патентных заявок, упоминающих ИИ и машинное обучение в контексте HFT и алгоритмической торговли (WIPO PATENTSCOPE, 2009–2023).",
      "en": "Citing a Mercer Investments (2024) survey, the IMF reports that AI adoption in core investment processes such as trading and the execution of investment decisions is still nascent. From its own outreach with market participants and regulators, the IMF concludes that most current use of AI appears to be an extension of existing trends in machine learning and other advanced analytical tools, with more significant changes a medium- to long-term concern. In parallel, patent filings referencing AI/ML in the context of HFT and algorithmic trading are rising (WIPO PATENTSCOPE, 2009–2023)."
     },
     "kind": "survey",
     "source": {
      "title": "Global Financial Stability Report, October 2024 — Chapter 3: Advances in Artificial Intelligence: Implications for Capital Market Activities",
      "url": "https://www.imf.org/-/media/files/publications/gfsr/2024/october/english/ch3.pdf",
      "org": "International Monetary Fund",
      "date": "октябрь 2024"
     }
    },
    {
     "process": {
      "ru": "Инвестиционные услуги клиентам: кто отвечает за решение, принятое с ИИ",
      "en": "Client investment services: who answers for a decision made with AI"
     },
     "pattern": {
      "ru": "Контур задан надзорным ожиданием, а не обычаем. Ответственность за решения фирмы остаётся на её органе управления независимо от того, приняли их люди или ИИ-инструменты. Орган управления должен адекватно понимать, как ИИ применяется внутри фирмы, и обеспечивать надлежащий надзор за ним; фирмам следует проводить программы обучения по ИИ для сотрудников, особенно контрольных функций, и быть прозрачными в отношении роли ИИ в инвестиционном процессе перед клиентами.",
      "en": "The loop is set by supervisory expectation, not custom. Accountability for a firm's decisions stays with its management body regardless of whether those decisions are taken by people or AI-based tools. The management body should have an appropriate understanding of how AI is applied within the firm and ensure appropriate oversight of it; firms should run AI training programmes for relevant staff, especially in control functions, and be transparent with clients about AI's role in the investment process."
     },
     "outcome": {
      "ru": "ESMA формулирует прямо: «firms' decisions remain the responsibility of management bodies, irrespective of whether those decisions are taken by people or AI-based tools». ESMA ОЖИДАЕТ от инвестиционных фирм ведения исчерпывающих записей о применении ИИ — процессы принятия решений, использованные источники данных, применённые алгоритмы и любые изменения со временем. Ожидание распространяется и на случаи, когда сотрудники пользуются сторонними ИИ-сервисами (ChatGPT и подобные) с ведома и одобрения высшего руководства или без них.",
      "en": "ESMA puts it plainly: \"firms' decisions remain the responsibility of management bodies, irrespective of whether those decisions are taken by people or AI-based tools.\" ESMA EXPECTS investment firms to maintain comprehensive records on AI utilisation — decision-making processes, data sources used, algorithms implemented and any modifications made over time. The expectation extends to staff using third-party AI technologies (ChatGPT and the like) with or without the direct knowledge and approval of senior management."
     },
     "kind": "other",
     "source": {
      "title": "Public Statement on the use of Artificial Intelligence (AI) in the provision of retail investment services",
      "url": "https://www.esma.europa.eu/sites/default/files/2024-05/ESMA35-335435667-5924__Public_Statement_on_AI_and_investment_services.pdf",
      "org": "European Securities and Markets Authority (ESMA)",
      "date": "30 мая 2024"
     }
    }
   ],
   "roles": [
    {
     "title": {
      "ru": "Квант-исследователь систематических стратегий",
      "en": "Quantitative researcher, systematic strategies"
     },
     "note": {
      "ru": "Придумывает гипотезы о рынке и проверяет их так, чтобы результату можно было верить. Трек ведёт сюда через то, что в этой роли ценится больше всего: дисциплину проверки вне выборки и умение не обмануться собственным бэктестом. Никаких обещаний доходности здесь нет — есть навык отличать находку от совпадения.",
      "en": "Frames hypotheses about markets and tests them in a way whose results you can trust. The track leads here through what the role values most: out-of-sample discipline and the ability not to be fooled by your own backtest. There are no return promises in this skill — there is the ability to tell a discovery from a coincidence."
     }
    },
    {
     "title": {
      "ru": "Валидатор моделей (модельный риск)",
      "en": "Model validation / model risk analyst"
     },
     "note": {
      "ru": "Оспаривает модели, которые сделали другие. Роль существует потому, что её требует надзор: руководство ФРС и OCC (SR 11-7) закрепляет независимую валидацию и «effective challenge» как отдельную функцию и прямо говорит, что валидацию, как правило, ведут сотрудники без стейка в вердикте. Трек даёт ровно то, чем эта работа занята каждый день, — сравнение прогноза с фактом на отрезке, не использовавшемся при разработке, и внятную документацию результата.",
      "en": "Challenges models other people built. The role exists because supervisors require it: Fed and OCC guidance (SR 11-7) embeds independent validation and \"effective challenge\" as a separate function and states that validation is generally done by staff with no stake in the verdict. The track supplies exactly what the job does daily — comparing forecasts against outcomes on a sample period not used in development, and documenting the result legibly."
     }
    },
    {
     "title": {
      "ru": "Аналитик надзора за торгами",
      "en": "Trade surveillance analyst"
     },
     "note": {
      "ru": "Разбирает срабатывания системы, которая ищет манипуляции. Именно человек решает, что перед ним — схема или шум. FINRA описывает свой процесс так: алгоритмы с ИИ просматривают поток рыночных событий, а при указании на потенциально проблемную активность сотрудники расследуют дальше или направляют обращение в SEC либо другое ведомство, если дело вне юрисдикции FINRA.",
      "en": "Works the alerts from a system hunting manipulation. It is the human who decides whether this is a scheme or noise. FINRA describes its own process this way: AI algorithms review the flow of market events, and when surveillance indicates potentially problematic activity, staff investigate further or refer the matter to the SEC or another agency when it falls outside FINRA's jurisdiction."
     }
    },
    {
     "title": {
      "ru": "Разработчик исполняющих алгоритмов",
      "en": "Execution algorithm developer"
     },
     "note": {
      "ru": "Пишет и обслуживает алгоритмы исполнения заявок. Спрос узкий: по данным опроса ESMA на алгоритмическую торговлю приходится 10 ИИ-сценариев из 847, на HFT — 3, на робо-эдвайзинг — 2. Зато контур контроля жёсткий и хорошо описанный: режим MiFID II для алгоритмической торговли (RTS 6) требует документированного тестирования до запуска, мониторинга алгоритмической активности в реальном времени и возможности экстренно снять все неисполненные заявки на всех площадках («kill switch»).",
      "en": "Builds and maintains order-execution algorithms. Demand is narrow: in ESMA's survey, algorithmic trading accounts for 10 AI use cases out of 847, HFT for 3, robo-advising for 2. But the control envelope is strict and well documented: the MiFID II algorithmic trading regime (RTS 6) requires documented pre-deployment testing, real-time monitoring of algorithmic trading activity, and the ability to cancel all outstanding orders across all venues in an emergency (\"kill switch\")."
     }
    }
   ],
   "skills": [
    {
     "name": {
      "ru": "Проверка вне выборки на временных рядах: walk-forward и зазор между обучением и тестом",
      "en": "Out-of-sample validation for time series: walk-forward and a gap between train and test"
     },
     "why": {
      "ru": "Обычный KFold на рыночных данных врёт, и это написано в документации, а не в блоге: scikit-learn прямо предупреждает, что KFold и ShuffleSplit предполагают независимость и одинаковую распределённость наблюдений и на временных рядах дают «unreasonable correlation between training and testing instances (yielding poor estimates of generalization error)». Там же показан TimeSeriesSplit с рабочим кодом и параметром gap. Numerai формулирует ту же проблему по-своему: эры идут раз в неделю, а цель смотрит вперёд на 20 или 60 дней, поэтому значения цели «перекрываются» и «special care must be taken when applying cross validation».",
      "en": "Plain KFold lies on market data, and that is in the documentation, not a blog post: scikit-learn warns outright that KFold and ShuffleSplit assume samples are independent and identically distributed and on time series would result in \"unreasonable correlation between training and testing instances (yielding poor estimates of generalization error).\" The same page shows TimeSeriesSplit with working code and a gap parameter. Numerai states the same problem in its own terms: eras are one week apart while targets look forward 20 or 60 days, so target values are \"overlapping\" and \"special care must be taken when applying cross validation.\""
     }
    },
    {
     "name": {
      "ru": "Поправка на множественные проверки",
      "en": "Correcting for multiple testing"
     },
     "why": {
      "ru": "Харви, Лю и Чжу разобрали 313 опубликованных работ по кросс-секции доходностей и пришли к выводу: при таком объёме data mining нет ни экономического, ни статистического смысла применять привычный порог вроде t > 2,0 — новооткрытый фактор должен брать планку выше, t > 3,0. И дальше дословно: «we argue that most claimed research findings in financial economics are likely false». Без этой поправки достаточно долгого перебора, чтобы получить красивый результат из ничего.",
      "en": "Harvey, Liu and Zhu went through 313 published papers on the cross-section of returns and concluded that, given this extensive data mining, it makes neither economic nor statistical sense to use the usual t > 2.0 criterion — a newly discovered factor needs to clear a higher hurdle, t > 3.0. And verbatim: \"we argue that most claimed research findings in financial economics are likely false.\" Without that correction, a long enough search produces a beautiful result out of nothing."
     }
    },
    {
     "name": {
      "ru": "Понимание, как именно ломается бэктест",
      "en": "Understanding exactly how a backtest breaks"
     },
     "why": {
      "ru": "Бэйли с соавторами прогнали 400 тестовых запусков на чистом случайном блуждании. Внутри выборки шарпы сгруппировались вокруг 0,9, вне выборки — вокруг нуля. В половине прогонов при фиксированных параметрах инструмент перебирал 55 000 комбинаций — и авторы отмечают, что при большем переборе внутривыборочный шарп был бы ещё выше. Выводы жёсткие и дословные: «there is no SR threshold or haircut that can be considered safe», а метод hold-out «is not very effective in preventing backtest overfitting». И если не знать, сколько вариантов стратегии было перепробовано, узнать априори, переобучена она или нет, нельзя вообще.",
      "en": "Bailey and co-authors ran 400 test runs on pure random walks. In-sample Sharpe ratios centred on 0.9; out-of-sample, on zero. In half the runs, with a fixed parameter set, the tool explored 55,000 combinations — and the authors note that a wider sweep would have pushed the in-sample Sharpe higher still. The conclusions are blunt and verbatim: \"there is no SR threshold or haircut that can be considered safe,\" and the hold-out method \"is not very effective in preventing backtest overfitting.\" And if you do not know how many variants were tried, there is no way to know a priori whether the result is overfit."
     }
    },
    {
     "name": {
      "ru": "Работа с неструктурированным текстом: реферирование и извлечение сущностей",
      "en": "Working with unstructured text: summarisation and entity extraction"
     },
     "why": {
      "ru": "Именно здесь ИИ в финансах реально применяют, а не в автоторговле. FINRA в отчёте на 2026 год (опубликован в декабре 2025) пишет: топовый GenAI-сценарий среди фирм-членов — «Summarization and Information Extraction», то есть сжатие больших объёмов текста и извлечение конкретных сущностей, связей и ключевой информации из неструктурированных документов. У ESMA черновики и реферирование дают 239 из 847 заявленных сценариев, 29%. Это работа, за которую платят сегодня, а не в перспективе.",
      "en": "This is where AI in finance is actually deployed — not in autonomous trading. FINRA's 2026 report (published December 2025) states that the top GenAI use case among member firms is \"Summarization and Information Extraction\" — condensing large volumes of text and extracting specific entities, relationships or key information from unstructured documents. In ESMA's data, drafting and summarisation account for 239 of 847 reported use cases, 29%. This is work that pays now, not eventually."
     }
    },
    {
     "name": {
      "ru": "Модельный риск и документация под проверку",
      "en": "Model risk and audit-ready documentation"
     },
     "why": {
      "ru": "ESMA ожидает записей о применении ИИ: процессы принятия решений, источники данных, применённые алгоритмы, любые изменения со временем. FINRA в отчёте на 2026 год конкретнее — в разделе про мониторинг GenAI перечислено «storing prompt and output logs for accountability and troubleshooting; tracking which model version was used and when; and validation and human-in-the-loop review of model outputs, including performing regular checks for errors or bias». Кто умеет это оформлять, тот проходит надзорную проверку спокойнее.",
      "en": "ESMA expects records of AI use: decision-making processes, data sources, algorithms implemented, any modifications over time. FINRA's 2026 report is more specific — its GenAI monitoring section lists \"storing prompt and output logs for accountability and troubleshooting; tracking which model version was used and when; and validation and human-in-the-loop review of model outputs, including performing regular checks for errors or bias.\" People who can produce this face an examination far more calmly."
     }
    },
    {
     "name": {
      "ru": "Python и инженерия данных",
      "en": "Python and data engineering"
     },
     "why": {
      "ru": "В данных Lightcast Python — самый востребованный специализированный навык в ИИ-вакансиях: 258 674 объявления, рост почти на 30% к 2024 году. И самый быстрый долгосрочный рост дали не исследовательские навыки, а связанные с развёртыванием: Amazon Web Services, масштабируемость, управление рабочими процессами. Модель, которая живёт только в ноутбуке исследователя, в надзорный контур не встраивается и до продакшена не доезжает.",
      "en": "In Lightcast's data, Python is the most in-demand specialised skill in AI postings: 258,674 openings, up nearly 30% from 2024. And the fastest long-term growth came not from research skills but from deployment-oriented capabilities: Amazon Web Services, scalability, workflow management. A model that lives only in a researcher's notebook cannot be fitted into a supervisory control loop and never reaches production."
     }
    }
   ],
   "anchors": [
    {
     "title": "18.642 Topics in Mathematics with Applications in Finance (Fall 2024)",
     "url": "https://ocw.mit.edu/courses/18-642-topics-in-mathematics-with-applications-in-finance-fall-2024/",
     "org": "MIT OpenCourseWare",
     "why": {
      "ru": "Открытый курс MIT, где математики читают теорию, а практики индустрии показывают, где она применяется: линейная алгебра, вероятность и статистика, случайные процессы, численные методы. Есть видеолекции, конспекты, задачи, задания и групповые проекты; отдельным дополнительным ресурсом идёт инвестиционное соревнование Hedgehog Camp. Материалы под лицензией Creative Commons BY-NC-SA. Обновлённая версия курса 18.S096 2013 года.",
      "en": "An open MIT course where mathematicians teach the theory and industry practitioners show where it lands: linear algebra, probability and statistics, stochastic processes, numerical methods. Video lectures, notes, problem sets, assignments and group projects; an investment competition, Hedgehog Camp, is offered as an additional learning resource. Materials under a Creative Commons BY-NC-SA licence. An updated version of the 2013 course 18.S096."
     }
    },
    {
     "title": "Cross-validation: evaluating estimator performance — раздел о временных рядах",
     "url": "https://scikit-learn.org/stable/modules/cross_validation.html",
     "org": "scikit-learn",
     "why": {
      "ru": "Первоисточник по инструменту, без которого квант-работа превращается в самообман. В разделе про временные ряды прямо сказано, почему KFold и ShuffleSplit тут неприменимы — они предполагают независимость и одинаковую распределённость наблюдений, — и показан TimeSeriesSplit с рабочим кодом. Читается за десять минут, экономит месяцы иллюзий.",
      "en": "The primary reference for the one tool without which quant work becomes self-deception. The time-series section states outright why KFold and ShuffleSplit do not apply — they assume samples are independent and identically distributed — and shows TimeSeriesSplit with working code. Ten minutes to read; saves months of illusion."
     }
    },
    {
     "title": "Statistical Overfitting and Backtest Performance",
     "url": "https://sdm.lbl.gov/oapapers/ssrn-id2507040-bailey.pdf",
     "org": "Bailey, Ger, López de Prado, Sim, Wu — открытая копия на сайте Lawrence Berkeley National Laboratory (SSRN id 2507040)",
     "why": {
      "ru": "Вычислительный эксперимент, который стоит прочитать до первого собственного бэктеста: 400 тестовых прогонов на случайных данных, шарп внутри выборки около 0,9 против нуля вне неё, 55 000 перебранных комбинаций параметров в половине прогонов. Работа старая, но именно она задала способ думать о переобучении бэктестов, и её выводы не устарели.",
      "en": "A computational experiment worth reading before your first backtest: 400 test runs on random data, in-sample Sharpe around 0.9 against zero out-of-sample, 55,000 parameter combinations swept in half the runs. The paper is old, but it is the one that set the way people reason about backtest overfitting, and its conclusions have not aged out."
     }
    },
    {
     "title": "… and the Cross-Section of Expected Returns (NBER Working Paper 20592)",
     "url": "https://www.nber.org/system/files/working_papers/w20592/w20592.pdf",
     "org": "Harvey, Liu, Zhu — National Bureau of Economic Research",
     "why": {
      "ru": "Работа, поднявшая планку значимости в финансах. Авторы разобрали 313 опубликованных статей о кросс-секции доходностей, построили рамку множественного тестирования, дали временной ряд исторических порогов значимости с 1967 года и вывели порог t > 3,0 для новооткрытого фактора. Полный PDF открыт на сайте NBER, октябрь 2014. Читать как учебник статистической честности.",
      "en": "The paper that raised the significance bar in finance. The authors went through 313 published papers on the cross-section of returns, built a multiple-testing framework, produced a time series of historical significance cutoffs going back to 1967, and derived a t > 3.0 hurdle for a newly discovered factor. The full PDF is open on NBER's site, October 2014. Read it as a textbook on statistical honesty."
     }
    },
    {
     "title": "Numerai Docs — Data",
     "url": "https://docs.numer.ai/numerai-tournament/data",
     "org": "Numerai",
     "why": {
      "ru": "Документация действующего турнира предсказаний по акциям. Полезна одной честной фразой в описании данных: эры идут раз в неделю, а цель смотрит вперёд на 20 или 60 дней, поэтому значения цели перекрываются и «special care must be taken when applying cross validation». Живой пример утечки через горизонт прогноза, а не учебная задача.",
      "en": "Documentation for a live equity prediction tournament. Its value is one honest sentence in the data description: eras are one week apart while targets look forward 20 or 60 days, so target values are overlapping and \"special care must be taken when applying cross validation.\" A real example of leakage through the forecast horizon rather than a textbook exercise."
     }
    },
    {
     "title": "AI Risk Management Framework (AI RMF 1.0) и профиль для генеративного ИИ",
     "url": "https://www.nist.gov/itl/ai-risk-management-framework",
     "org": "NIST",
     "why": {
      "ru": "Бесплатная рамка управления ИИ-рисками добровольного применения, выпущена 26 января 2023 года, построена на четырёх функциях: Govern, Map, Measure, Manage. Есть отдельный профиль для генеративного ИИ (NIST-AI-600-1, 26 июля 2024) и playbook. Это не абстракция: FINRA приводит AI RMF 1.0 в списке дополнительных ресурсов раздела о генеративном ИИ в отчёте на 2026 год — то есть на неё смотрит надзор.",
      "en": "A free, voluntary-use AI risk-management framework released 26 January 2023, built on four functions: Govern, Map, Measure, Manage. There is a dedicated Generative AI Profile (NIST-AI-600-1, 26 July 2024) and a playbook. Not an abstraction: FINRA lists AI RMF 1.0 among the additional resources in the generative-AI section of its 2026 report, meaning supervisors look at it."
     }
    }
   ],
   "caveat": {
    "ru": "По самому ядру этого трека — прибыльным торговым системам — публичных доказательств нет и по устройству рынка быть не может. Работающие стратегии не публикуют, а опубликованные перестают работать. Всё, что здесь удалось подтвердить, относится к процессу, а не к результату: как считать, как проверять, кто отвечает. Обещаний доходности трек не даёт и дать не может.\n\nДанные прямо противоречат громким заголовкам. В опросе ESMA из 847 заявленных сценариев на управление риском портфеля приходится 20, на оптимизацию портфеля 19, на алгоритмическую торговлю 10, на HFT 3, на робо-эдвайзинг 2 — и большинство из них ещё в разработке или на стадии эксперимента. ИИ в финансах сегодня — это черновики, реферирование и извлечение данных из документов, а не автономная торговля. МВФ по итогам аутрича с участниками рынка формулирует резче: ИИ-стратегии, которых человек не понимает, участники считают «нестартующими».\n\nПрирода почти всех цифр по спросу — самооценка. ESMA прямо предупреждает, что участие в опросе было добровольным и статистика не обязательно репрезентативна. «Используем ИИ» у 75% фирм в опросе Банка Англии и FCA не означает, что ИИ где-то что-то решает — там же 46% фирм признают, что понимают свои технологии лишь частично. Оценки экономии — включая «многие тысячи часов» у FINRA — это самоотчёты и прогнозы организаций о себе, а не измерения в контролируемых условиях. Ни одного эксперимента с контрольной группой по применению ИИ в трейдинге при этой проверке найти не удалось.\n\nОпора трека на классику 2014–2015 годов — не лень, а признание того, что нового качественного корпуса по переобучению бэктестов не появилось; сами выводы Бэйли и Харви проверены построчно по первоисточникам и не устарели. И последнее, отрезвляющее: 18 марта 2024 года SEC впервые предъявила обвинения по антифрод-положениям в связи с раскрытием информации об ИИ — двум инвестиционным советникам, Delphia (USA) Inc. и Global Predictions Inc., которые урегулировали дело, заплатив 225 000 и 175 000 долларов соответственно. Красивые слова про ИИ в маркетинге теперь стоят денег, а не только репутации.",
    "en": "On the core of this track — profitable trading systems — there is no public evidence, and given how markets work there cannot be. Strategies that work are not published, and published ones stop working. Everything verified here concerns process rather than outcome: how to compute, how to validate, who is accountable. The track makes no return promises and cannot make any.\n\nThe data contradict the loud headlines. In ESMA's survey, of 847 reported use cases, 20 concern portfolio risk management, 19 portfolio optimisation, 10 algorithmic trading, 3 high-frequency trading and 2 robo-advising — and most of those remain in development or experimental stages. AI in finance today means drafting, summarisation and pulling data out of documents, not autonomous trading. From its outreach to market participants, the IMF puts it more sharply: participants view AI-generated strategies that humans do not understand as a nonstarter.\n\nNearly all the demand figures are self-reported. ESMA warns explicitly that participation was voluntary and the statistics are not necessarily representative. \"We use AI\" at 75% of firms in the Bank of England and FCA survey does not mean AI decides anything — in the same survey 46% of firms admit only partial understanding of the technologies they run. Efficiency estimates, including FINRA's \"many thousands of hours,\" are organisations' own reports and forecasts about themselves, not measurements under controlled conditions. This verification pass turned up no controlled experiment on AI use in trading at all.\n\nThe track leaning on 2014–2015 classics is not laziness but an admission that no substantial new body of work on backtest overfitting has appeared; the Bailey and Harvey conclusions themselves were checked line by line against the primary sources and have not aged out. And one final, sobering fact: on 18 March 2024 the SEC brought its first antifraud charges in connection with AI disclosures, against two investment advisers, Delphia (USA) Inc. and Global Predictions Inc., which settled for $225,000 and $175,000 respectively. Pretty words about AI in marketing now cost money, not just reputation."
   }
  },
  "security-eng": {
   "lede": {
    "ru": "Промпт-инъекция не решена, и говорят это те, кто от неё защищается: OWASP пишет, что неясно, существуют ли надёжные методы предотвращения, Google DeepMind — что перебрать пространство всех возможных атак невозможно. Человек на подтверждении дырy не закрывает — телеметрия показала, что одобряют примерно 93% запросов разрешений, — поэтому предмет трека это архитектурные границы: песочницы, права инструментов и контроль исходящего трафика, а не фильтр и не «спросим пользователя».",
    "en": "Prompt injection is unsolved, and the people saying so are the ones defending against it: OWASP states it is unclear whether fool-proof prevention methods exist, and Google DeepMind that enumerating the space of all possible attacks is intractable. A human approval step does not close the hole — telemetry showed roughly 93% of permission prompts get approved — so this track is about architectural boundaries: sandboxes, tool privileges and egress control, not a filter and not \"we'll ask the user\"."
   },
   "demand": [
    {
     "claim": {
      "ru": "Компании упираются в безопасность именно там, где хотят масштабировать агентов: почти две трети опрошенных назвали «опасения по безопасности и рискам» главным барьером к ПОЛНОМУ масштабированию агентного ИИ, а 72% отнесли кибербезопасность к высокорелевантным рискам.",
      "en": "Security is where companies stall when they try to scale agents: nearly two-thirds of respondents cite security and risk concerns as the top barrier to fully scaling agentic AI, and 72 percent cite cybersecurity as a highly relevant risk."
     },
     "figure": "«Nearly two-thirds of respondents cite security and risk concerns as the top barrier to fully scaling agentic AI»; «72 percent cite cybersecurity as highly relevant risks»",
     "kind": "survey",
     "caveat": {
      "ru": "Это самооценка: респонденты говорят, что ИМ мешает, а не измеряют защищённость своих систем. ~500 организаций, респонденты отбирались по причастности к управлению ИИ-рисками — «главный барьер» значит «так ответили». И кибербезопасность там НЕ первая тревога: неточность модели назвали 74%, то есть выше, чем 72% у кибербезопасности.",
      "en": "Self-assessment: respondents report what they feel blocks them, not how secure their systems are. ~500 organizations, respondents selected for involvement in AI governance and risk — \"top barrier\" means \"what people answered\". And cybersecurity is not the top concern in that list: inaccuracy was cited by 74 percent, above cybersecurity's 72 percent."
     },
     "source": {
      "title": "State of AI trust in 2026: Shifting to the agentic era",
      "url": "https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/tech-forward/state-of-ai-trust-in-2026-shifting-to-the-agentic-era",
      "org": "McKinsey",
      "date": "25 марта 2026 (опрос ~500 организаций, декабрь 2025 — январь 2026)"
     }
    },
    {
     "claim": {
      "ru": "Промпт-инъекция попала в государственный реестр уязвимостей: массовый корпоративный продукт получил номер CVE с формулировкой «Ai command injection in M365 Copilot allows an unauthorized attacker to disclose information over a network».",
      "en": "Prompt injection has entered the national vulnerability registry: a mass-market enterprise product got a CVE worded \"Ai command injection in M365 Copilot allows an unauthorized attacker to disclose information over a network\"."
     },
     "figure": "CVE-2025-32711, CWE-74 («Improper Neutralization of Special Elements in Output Used by a Downstream Component (Injection)»); CVSS 3.1 — 7.5 HIGH по оценке NVD, 9.3 CRITICAL по оценке Microsoft как CNA",
     "kind": "other",
     "caveat": {
      "ru": "Одна запись ничего не говорит о частоте таких дыр. NVD и Microsoft разошлись в оценке серьёзности (7.5 против 9.3), подтверждённой эксплуатации в природе в записи нет. Это доказывает, что класс атаки формально признан, а не масштаб ущерба и не размер рынка труда.",
      "en": "A single entry says nothing about frequency. NVD and Microsoft disagree on severity (7.5 vs 9.3), and the record shows no confirmed exploitation in the wild. It proves the attack class is formally recognized — not how much damage was done, and certainly not the size of a job market."
     },
     "source": {
      "title": "CVE-2025-32711 (National Vulnerability Database)",
      "url": "https://nvd.nist.gov/vuln/detail/CVE-2025-32711",
      "org": "NIST NVD",
      "date": "опубликовано 11 июня 2025"
     }
    },
    {
     "claim": {
      "ru": "Публично задокументированных сбоев ИИ становится больше: «Documented AI incidents continued to rise, with the AI Incident Database recording 362 in 2025, up from 233 in 2024».",
      "en": "Publicly documented AI failures are climbing: \"Documented AI incidents continued to rise, with the AI Incident Database recording 362 in 2025, up from 233 in 2024.\""
     },
     "figure": "362 инцидента в 2025 против 233 в 2024 (AI Incident Database)",
     "kind": "stats",
     "caveat": {
      "ru": "База собирает публично ОПИСАННЫЕ случаи, то есть меряет заодно внимание прессы и рост самой базы. Разбивки «сколько из них — промпт-инъекции в агентах» на странице нет. Прямым замером спроса на безопасника агентных систем это не является.",
      "en": "The database collects publicly REPORTED cases, so it also measures press attention and the database's own growth. The page gives no breakdown for \"how many were prompt injections against agents\". This is not a direct measure of demand for agent-security engineers."
     },
     "source": {
      "title": "Chapter 3: Responsible AI — The 2026 AI Index Report",
      "url": "https://hai.stanford.edu/ai-index/2026-ai-index-report/responsible-ai",
      "org": "Stanford HAI",
      "date": "2026 (данные за 2025)"
     }
    },
    {
     "claim": {
      "ru": "Внедрённые в веб-страницы инструкции уже есть в открытом вебе, а не только в лабораторных примерах: Google просканировал месячные снимки Common Crawl англоязычного веба (2–3 млрд страниц каждый) и зафиксировал относительный рост злонамеренной категории инъекций на 32% между ноябрём 2025 и февралём 2026.",
      "en": "Injected instructions are present on the open web, not only in lab samples: Google scanned Common Crawl monthly snapshots of the English-speaking web (2–3 billion pages each) and recorded a relative increase of 32% in the malicious category between November 2025 and February 2026."
     },
     "figure": "«We saw a relative increase of 32% in the malicious category between November 2025 and February 2026»",
     "kind": "telemetry",
     "caveat": {
      "ru": "Рост ТОЛЬКО относительный — абсолютных чисел в статье нет вообще. Common Crawl пропускает сайты с логин-стенами и запретами на обход, то есть почти все соцсети (LinkedIn, Facebook, X) в выборку не попали — авторы обещают их отдельным исследованием. Сами авторы пишут, что наблюдаемая активность выглядит малосложной и это «возможно, лишь часть общей картины».",
      "en": "The increase is purely relative — the article gives no absolute counts at all. Common Crawl skips sites with login walls and anti-crawl directives, so nearly all social platforms (LinkedIn, Facebook, X) are excluded; the authors defer those to a separate study. They themselves describe the observed activity as of limited sophistication and \"only part of the bigger picture\"."
     },
     "source": {
      "title": "AI threats in the wild: The current state of prompt injections on the web",
      "url": "https://blog.google/security/prompt-injections-web/",
      "org": "Google (блог безопасности blog.google; авторы Thomas Brunner, Yu-Han Liu, Moni Pande; упоминается совместная работа Google DeepMind и GTIG)",
      "date": "23 апреля 2026"
     }
    },
    {
     "claim": {
      "ru": "Работодатели ставят кибербезопасность сразу за ИИ по скорости роста спроса на навыки: «AI and big data top the list as the fastest-growing skills, followed closely by networks and cybersecurity and technological literacy».",
      "en": "Employers rank cybersecurity right behind AI among fastest-growing skills: \"AI and big data top the list as the fastest-growing skills, followed closely by networks and cybersecurity and technological literacy.\""
     },
     "figure": "«сети и кибербезопасность» — 2-е место среди быстрее всего растущих навыков на 2025–2030; выборка — более 1000 работодателей, 14+ млн работников, 22 отраслевых кластера, 55 экономик",
     "kind": "survey",
     "caveat": {
      "ru": "Это ожидания работодателей на пять лет вперёд, а не открытые вакансии сегодня и не зарплаты. Речь про кибербезопасность и сети ЦЕЛИКОМ: отдельной строки «безопасность ИИ-агентов» в рейтинге нет. Для нашего трека это прокси, а не прямое попадание.",
      "en": "Five-year employer expectations, not today's open postings and not salaries. It covers networks and cybersecurity as a WHOLE: there is no separate \"AI agent security\" line. For this track it is a proxy, not a direct hit."
     },
     "source": {
      "title": "The Future of Jobs Report 2025 — 3. Skills outlook",
      "url": "https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/3-skills-outlook/",
      "org": "World Economic Forum",
      "date": "7 января 2025"
     }
    }
   ],
   "mechanics": [
    {
     "process": {
      "ru": "Корпоративный ассистент/копилот над почтой, документами, сайтами и плагинами (Microsoft, Zero Trust / SFI)",
      "en": "Enterprise copilot over mail, documents, websites and plugins (Microsoft, Zero Trust / SFI)"
     },
     "pattern": {
      "ru": "Microsoft оформила защиту от косвенной инъекции как ПАТТЕРН архитектуры, а не как фильтр: Prompt Shields разбирают входящие промпты, spotlighting с датамаркингом изолирует внешний контент, детекция plan drift следит за отклонением многошагового рассуждения от исходной задачи, критик-агенты проверяют вход и выход в реальном времени, tool chain analysis блокирует рискованные последовательности вызовов инструментов, information flow control держит недоверенный контент в карантинных средах вывода, инструменты получают минимальные и короткоживущие права. Человек указан ПОСЛЕДНЕЙ линией: «The last line of defense against an attack is to verify risky actions with the user».",
      "en": "Microsoft published indirect-prompt-injection defense as an architectural PATTERN, not a filter: Prompt Shields analyze incoming prompts, spotlighting with data marking isolates external content, plan drift detection watches multi-step reasoning for deviation from the intended flow, critic agents audit inputs and outputs in real time, tool chain analysis blocks risky call sequences, information flow control keeps untrusted content in quarantined inference environments, and tools get minimal short-lived privileges. The human is listed as the LAST line: \"The last line of defense against an attack is to verify risky actions with the user.\""
     },
     "outcome": {
      "ru": "Никаких цифр эффективности в документе нет — есть предписание проектировать в расчёте на пробой («Design systems with the expectation that some attacks will succeed», «No single solution is sufficient») и честный список компромиссов: рост сложности, задержка и вычислительная стоимость от рантайм-мониторинга, ложные срабатывания вероятностных защит, постоянные вложения в тюнинг, отсутствие универсального решения.",
      "en": "The document reports no effectiveness figures at all — it prescribes designing for breach (\"Design systems with the expectation that some attacks will succeed\", \"No single solution is sufficient\") and lists honest trade-offs: added complexity, latency and compute cost from runtime monitoring, false positives from probabilistic defenses, ongoing tuning investment, and no universal solution."
     },
     "kind": "vendor",
     "source": {
      "title": "Defend against indirect prompt injection attacks (Zero Trust / SFI design pattern)",
      "url": "https://learn.microsoft.com/en-us/security/zero-trust/sfi/defend-indirect-prompt-injection",
      "org": "Microsoft",
      "date": "обновлено 19 марта 2026"
     }
    },
    {
     "process": {
      "ru": "Кодовый агент в терминале разработчика и в продуктовом вебе (Claude Code, claude.ai, Claude Cowork)",
      "en": "Coding agent in the developer's terminal and in the product web app (Claude Code, claude.ai, Claude Cowork)"
     },
     "pattern": {
      "ru": "Ставка сделана не на надзор за действиями, а на границы возможностей — формулировка авторов прямая: «Rather than supervising what the agent does, we supervise what it's able to do by enforcing access boundaries through, for example, sandboxes, virtual machines, and egress controls». Инструментарий: контейнеры gVisor для эфемерного серверного исполнения, полная изоляция в VM через гипервизор платформы, монтирование только для чтения и «чтение-запись-без-удаления», allowlist исходящего трафика через MITM-прокси внутри VM. Подтверждения человека остались на границе доверия («Do you trust this folder?», выбор монтируемой папки) плюс прерывание по ходу работы, но их вес сознательно понижен: «a tight perimeter also means you can relax oversight».",
      "en": "The bet is on capability boundaries rather than behavioural oversight — the authors put it plainly: \"Rather than supervising what the agent does, we supervise what it's able to do by enforcing access boundaries through, for example, sandboxes, virtual machines, and egress controls.\" The toolkit: gVisor containers for ephemeral server-side execution, full VM isolation via the platform hypervisor, read-only and read-write-no-delete mounts, egress allowlists through a MITM proxy inside the VM. Human approvals remain at the trust boundary (\"Do you trust this folder?\", choosing the mounted workspace) plus mid-run interruption, but their weight is deliberately reduced: \"a tight perimeter also means you can relax oversight.\""
     },
     "outcome": {
      "ru": "Три числа из поста, дословно: «Claude Opus 4.7 holds attack success to roughly 0.1% on single attempts, and around 5–6% after 100 adaptive attempts» на бенчмарке Gray Swan Agent Red Teaming; «Claude Code auto mode catches roughly 83% of overeager behaviors before they execute» — то есть ~17% проходит; и самое неудобное: «Our telemetry showed users approved roughly 93% of permission prompts. The more approvals a user sees, the less attention they pay to each». Вывод авторов — человек-в-контуре ошибаем и вероятностен; ответ был не «спрашивать лучше», а сократить число запросов разрешений на 84% за счёт OS-уровневых песочниц.",
      "en": "Three figures from the post, verbatim: \"Claude Opus 4.7 holds attack success to roughly 0.1% on single attempts, and around 5–6% after 100 adaptive attempts\" on the Gray Swan Agent Red Teaming benchmark; \"Claude Code auto mode catches roughly 83% of overeager behaviors before they execute\" — meaning ~17% get through; and the uncomfortable one: \"Our telemetry showed users approved roughly 93% of permission prompts. The more approvals a user sees, the less attention they pay to each.\" The authors' conclusion is that human-in-the-loop is fallible and probabilistic; their response was not \"ask better\" but cutting permission prompts by 84% via OS-level sandboxes."
     },
     "kind": "vendor",
     "source": {
      "title": "How we contain Claude across products",
      "url": "https://www.anthropic.com/engineering/how-we-contain-claude",
      "org": "Anthropic",
      "date": "25 мая 2026"
     }
    },
    {
     "process": {
      "ru": "Приёмка модели перед релизом: непрерывная состязательная оценка (Gemini)",
      "en": "Pre-release model acceptance: continuous adversarial evaluation (Gemini)"
     },
     "pattern": {
      "ru": "Набор автоматических адаптивных атак — Actor-Critic (атакующая модель предлагает триггеры и уточняет их по обратной связи), Beam Search (дописывание случайных токенов к базовому триггеру), TAP (Tree of Attacks with Pruning, чёрный ящик по расстоянию до целевого ответа), Linear Generation — крутится против версий модели, а найденные пробои идут в состязательное дообучение. Человек в контуре — исследователь, придумывающий новые КЛАССЫ атак: автоматика оптимизирует внутри уже известного пространства.",
      "en": "A suite of automated adaptive attacks — Actor-Critic (an attacker model proposes triggers refined by feedback), Beam Search (appending random tokens to a baseline trigger), TAP (Tree of Attacks with Pruning, black-box via edit distance to the target response), Linear Generation — runs against model versions, and whatever breaks through feeds adversarial fine-tuning. The human in the loop is the researcher inventing new attack CLASSES: automation only optimizes inside a known space."
     },
     "outcome": {
      "ru": "Против НЕЗАЩИЩЁННОЙ базовой модели: «At least one of the three attacks finds a trigger that succeeds on over 70% of test examples in all settings» — «all settings» это комбинации типов данных (номера паспортов, SSN, токены сброса пароля), форматов триггера (JSON и не-JSON) и эксплуатируемых функций (почта, календарь). Выводы авторов дословно: «Robustness requires defense in depth. Adversarially training improves resilience to known attacks, however enumerating the space of all possible attacks is intractable, and so it is not possible to claim that the model is truly robust», и отдельно: «Many defenses that perform well on our static evaluation set can be tricked by small and subtle adaptations to an attack».",
      "en": "Against the UNDEFENDED base model: \"At least one of the three attacks finds a trigger that succeeds on over 70% of test examples in all settings\" — \"all settings\" being combinations of information types (passport numbers, SSNs, password reset tokens), trigger formats (JSON and non-JSON) and exploited functions (email, calendar). The authors' conclusions verbatim: \"Robustness requires defense in depth. Adversarially training improves resilience to known attacks, however enumerating the space of all possible attacks is intractable, and so it is not possible to claim that the model is truly robust\", and separately: \"Many defenses that perform well on our static evaluation set can be tricked by small and subtle adaptations to an attack.\""
     },
     "kind": "experiment",
     "source": {
      "title": "Lessons from Defending Gemini Against Indirect Prompt Injections (arXiv:2505.14534)",
      "url": "https://arxiv.org/abs/2505.14534",
      "org": "Google DeepMind",
      "date": "20 мая 2025"
     }
    },
    {
     "process": {
      "ru": "Код-ревью и автоматизация пул-реквестов в CI/CD (GitHub Actions)",
      "en": "Code review and pull-request automation in CI/CD (GitHub Actions)"
     },
     "pattern": {
      "ru": "Агент читает issue и PR — текст, который пишет кто угодно. Исследователи Microsoft ПОСТРОИЛИ полезную нагрузку под видом «compliance review», которая заставляла Claude Code GitHub Action прочитать /proc/self/environ и вынести ANTHROPIC_API_KEY, срезав первые 7 символов, чтобы обойти сканер секретов. Корень: песочница Bubblewrap накрывала инструмент Bash, а инструмент Read работал внутрипроцессно с полным доступом к окружению. Лечение архитектурное, а не «лучший промпт»: «Agents Rule of Two» — рабочий процесс не должен одновременно обрабатывать недоверенный ввод, иметь доступ к секретам через инструменты и уметь менять состояние или общаться наружу; отдельный ключ на окружение и workflow; системный промпт, объявляющий весь контент GitHub недоверенным вводом. Люди в контуре — ревьюер PR и тот, кто нарезает права токенам.",
      "en": "The agent reads issues and PRs — text anyone can write. Microsoft researchers CONSTRUCTED a payload disguised as a \"compliance review\" that made the Claude Code GitHub Action read /proc/self/environ and exfiltrate ANTHROPIC_API_KEY with the first 7 characters stripped to evade secret scanning. Root cause: the Bubblewrap sandbox covered the Bash tool while the Read tool ran in-process with full environment access. The fix is architectural rather than a better prompt: the \"Agents Rule of Two\" — a workflow must never simultaneously process untrusted input, hold access to secrets via tools, and be able to change state or communicate externally; plus one key per environment and workflow, and a system prompt declaring all GitHub content untrusted input. The humans are the PR reviewer and whoever scopes the tokens."
     },
     "outcome": {
      "ru": "Сообщено 29 апреля 2026, исправлено 5 мая 2026 в Claude Code 2.1.128. Это ОДНА разобранная до конца цепочка эксплуатации, построенная исследователями, а не наблюдение атаки в природе и не оценка распространённости: сколько подобных пайплайнов уязвимо, отчёт не измеряет.",
      "en": "Reported 29 April 2026, fixed 5 May 2026 in Claude Code 2.1.128. This is ONE fully traced exploitation chain built by researchers — not an attack observed in the wild and not a prevalence estimate: the report does not measure how many pipelines are exposed."
     },
     "kind": "other",
     "source": {
      "title": "Securing CI/CD in an agentic world: Claude Code Github action case",
      "url": "https://www.microsoft.com/en-us/security/blog/2026/06/05/securing-ci-cd-in-agentic-world-claude-code-github-action-case/",
      "org": "Microsoft Defender Security Research Team",
      "date": "5 июня 2026"
     }
    },
    {
     "process": {
      "ru": "Браузерный агент, который сам ходит по сайтам и оформляет покупки (Chrome)",
      "en": "Browser agent that navigates sites and completes purchases on its own (Chrome)"
     },
     "pattern": {
      "ru": "Границы вместо уговоров. Отправная точка авторов честная: «Exposure to untrusted web content means it is inherently vulnerable to indirect prompt injection». Agent Origin Sets — развитие Site Isolation: агенту доступны только релевантные задаче источники, разделённые на read-only и read-writable, чтобы данные не перетекали между origin'ами. User Alignment Critic — отдельная модель на Gemini как высокодоверенный системный компонент: «This component is architected to see only metadata about the proposed action and not any unfiltered untrustworthy web content». Классификатор инъекций работает параллельно планированию: «This prompt-injection classifier runs in parallel to the planning model's inference, and will prevent actions from being taken». Плюс автоматический ред-тиминг на сгенерированных LLM вредоносных сайтах в песочнице с приоритетом на пользовательский контент соцсетей, финансовые транзакции и кражу учётных данных.",
      "en": "Boundaries instead of persuasion. The authors' starting point is honest: \"Exposure to untrusted web content means it is inherently vulnerable to indirect prompt injection.\" Agent Origin Sets extend Site Isolation: only task-relevant origins are reachable, split into read-only and read-writable so data cannot flow across origins. The User Alignment Critic is a separate Gemini-built model acting as a high-trust system component: \"This component is architected to see only metadata about the proposed action and not any unfiltered untrustworthy web content.\" The injection classifier runs alongside planning: \"This prompt-injection classifier runs in parallel to the planning model's inference, and will prevent actions from being taken.\" Plus automated red-teaming against LLM-generated malicious sandboxed sites, prioritizing social-media user-generated content, financial transactions and credential theft."
     },
     "outcome": {
      "ru": "Человек обязателен на деньгах и на доступе к аккаунтам: перед покупкой или платежом, отправкой сообщений, входом через Google Password Manager и переходом на чувствительные сайты (банковские, медицинские) агент останавливается; каждый шаг пишется в work log, задачу можно перехватить или остановить. Метрик эффективности Google не публикует ВООБЩЕ — описана только архитектура и принципы. Проверить работоспособность этих слоёв со стороны нельзя.",
      "en": "The human is mandatory on money and account access: before a purchase or payment, sending messages, signing in via Google Password Manager, or navigating to sensitive sites (banking, medical), the agent stops; every step goes into a work log and the user can take over or stop the task. Google publishes NO effectiveness metrics at all — only architecture and principles. There is no external way to check whether these layers work."
     },
     "kind": "vendor",
     "source": {
      "title": "Architecting Security for Agentic Capabilities in Chrome",
      "url": "https://blog.google/security/architecting-security-for-agentic/",
      "org": "Google (Chrome security team)",
      "date": "8 декабря 2025"
     }
    }
   ],
   "roles": [
    {
     "title": {
      "ru": "Инженер безопасности ИИ-систем",
      "en": "AI/LLM security engineer"
     },
     "note": {
      "ru": "Проектирует контур вокруг агента: что он читает, какие инструменты вызывает, куда может отправить байты. Основная работа — не фильтры, а архитектурные границы: не дать недоверенному вводу, доступу к секретам и возможности действовать наружу сойтись в одной сессии. Трек ведёт сюда напрямую: разбор триады, прав, egress и слоёв защиты — это его ежедневная работа.",
      "en": "Designs the boundary around the agent: what it reads, which tools it calls, where it can send bytes. The core work is architecture, not filters — keeping untrusted input, access to secrets, and outbound action from coinciding in one session. This is the track's direct destination: the trifecta, privileges, egress and layered defense are the daily job."
     }
    },
    {
     "title": {
      "ru": "Ред-тимер ИИ-систем",
      "en": "AI red teamer"
     },
     "note": {
      "ru": "Атакует свои же агенты до того, как это сделает кто-то другой: адаптивно, с итерациями, а не по статическому списку строк. Ключевой навык — понимать, что защита, показавшая нулевой успех атак на фиксированном наборе, ничего не гарантирует; это ровно то, что показали и препринт по Gemini, и «The Attacker Moves Second». Трек даёт и приёмы атаки, и честную методологию оценки.",
      "en": "Attacks their own agents before someone else does — adaptively, with iteration, not against a static list of strings. The key skill is understanding that a defense showing zero attack success on a fixed set guarantees nothing; that is exactly what both the Gemini preprint and \"The Attacker Moves Second\" demonstrated. The track supplies both the attack techniques and an honest evaluation methodology."
     }
    },
    {
     "title": {
      "ru": "SRE / платформенный инженер агентной платформы",
      "en": "SRE / agent platform engineer"
     },
     "note": {
      "ru": "Отвечает за то, чтобы у агента была песочница, VM, монтирование с ограниченными правами, короткоживущие секреты, allowlist исходящего трафика и журналы вызовов инструментов, по которым можно восстановить инцидент. Половина защиты агента — это инфраструктура, а не модель: именно так формулирует свой подход Anthropic, и именно эту роль трек подразумевает во «Для кого».",
      "en": "Owns the sandbox, the VM, restricted mounts, short-lived secrets, the egress allowlist, and tool-call logs good enough to reconstruct an incident. Half of agent security is infrastructure, not the model — that is exactly how Anthropic frames its own approach, and it is the role the track's audience line points at."
     }
    },
    {
     "title": {
      "ru": "Инженер по рискам и соответствию для ИИ",
      "en": "AI risk and compliance engineer"
     },
     "note": {
      "ru": "Превращает рамки в проверяемые требования: OWASP Top 10 for LLM Applications и Top 10 for Agentic Applications, профиль NIST AI 600-1 по генеративному ИИ, совместные рекомендации NCSC/CISA — в контроли, у которых есть владелец и доказательство исполнения. Без инженерного понимания инъекций роль вырождается в бумажную.",
      "en": "Turns frameworks into checkable requirements: OWASP Top 10 for LLM Applications and Top 10 for Agentic Applications, the NIST AI 600-1 generative-AI profile, the joint NCSC/CISA guidelines — into controls with an owner and evidence of execution. Without engineering understanding of injection the role degenerates into paperwork."
     }
    }
   ],
   "skills": [
    {
     "name": {
      "ru": "Моделирование угроз агентного контура: летальная триада и «Agents Rule of Two»",
      "en": "Threat modelling the agent boundary: the lethal trifecta and the Agents Rule of Two"
     },
     "why": {
      "ru": "Умение посмотреть на систему и сказать: здесь сходятся доступ к приватным данным, недоверенный контент и канал наружу — значит защищать надо не промптом, а разрывом одной из трёх ног. К этой же логике независимо пришли Meta («Agents Rule of Two», 31 октября 2025), Chrome (Agent Origin Sets) и Microsoft (правило «двух» в разборе CI/CD), потому что фильтры принципиально вероятностны.",
      "en": "Being able to look at a system and say: private data, untrusted content and an outbound channel meet here, so the fix is cutting one leg, not writing a better prompt. Meta (Agents Rule of Two, 31 October 2025), Chrome (Agent Origin Sets) and Microsoft (the rule of two in the CI/CD writeup) converged on this independently, because filters are inherently probabilistic."
     }
    },
    {
     "name": {
      "ru": "Разграничение прав инструментов и короткоживущие секреты",
      "en": "Least privilege for tools and short-lived credentials"
     },
     "why": {
      "ru": "Инъекция сама по себе безвредна — вред делают права, которые оказались у агента в руках. Отдельный ключ на окружение и на workflow, права, выдаваемые на время вызова и отбираемые после, — это и главная рекомендация в разборе утечки ключа из Claude Code GitHub Action, и отдельный пункт в паттерне Microsoft Zero Trust.",
      "en": "An injection on its own does nothing — the damage comes from the privileges the agent happens to hold. One key per environment and per workflow, privileges granted for the call and revoked after: that is both the headline recommendation in the Claude Code GitHub Action key-leak writeup and a distinct item in Microsoft's Zero Trust pattern."
     }
    },
    {
     "name": {
      "ru": "Контроль исходящего трафика и изоляция недоверенного контента",
      "en": "Egress control and isolation of untrusted content"
     },
     "why": {
      "ru": "Данные утекают через ссылку, отрендеренную картинку, разрешённый прокси. Практика: allowlist egress через прокси, разметка недоверенных фрагментов (spotlighting/datamarking), information flow control и карантинные среды вывода, разделение источников на read-only и read-write. Это то, чем закрывают третью ногу триады, и это единственный слой, работающий детерминированно.",
      "en": "Data leaves through a link, a rendered image, an allowlisted proxy. In practice: egress allowlists through a proxy, marking untrusted spans (spotlighting/data marking), information flow control with quarantined inference environments, splitting origins into read-only and read-write. This is how you cut the trifecta's third leg — and the only layer that behaves deterministically."
     }
    },
    {
     "name": {
      "ru": "Изоляция исполнения: песочница, виртуальная машина, границы файловой системы",
      "en": "Execution containment: sandboxes, VMs, filesystem boundaries"
     },
     "why": {
      "ru": "Ограничивать, что агент МОЖЕТ, надёжнее, чем следить, что он делает: контейнер, VM, монтирование только для чтения и прокси работают детерминированно и продолжают работать, когда защита на уровне модели не сработала. Это дословная формулировка Anthropic: «Rather than supervising what the agent does, we supervise what it's able to do».",
      "en": "Constraining what the agent CAN do beats supervising what it does: containers, VMs, read-only mounts and proxies are deterministic and keep working when model-level defenses fail. That is Anthropic's own wording: \"Rather than supervising what the agent does, we supervise what it's able to do.\""
     }
    },
    {
     "name": {
      "ru": "Адаптивный ред-тиминг и честное чтение цифр эффективности защиты",
      "en": "Adaptive red teaming and reading defense numbers honestly"
     },
     "why": {
      "ru": "Заказчику нужен человек, который отличит «атака не прошла по нашему статическому списку» от «атака не проходит». В препринте «The Attacker Moves Second» (октябрь 2025) 12 опубликованных защит, большинство из которых заявляли почти нулевой успех атак, были пробиты адаптивными атаками с успехом выше 90% у БОЛЬШИНСТВА из них. Навык — атаковать с итерациями и уметь сказать про свою же защиту, против чего именно она проверена.",
      "en": "Employers need someone who can tell \"the attack failed on our static list\" from \"the attack fails\". In the preprint \"The Attacker Moves Second\" (October 2025), 12 published defenses — most of which had reported near-zero attack success — were broken by adaptive attacks with success above 90% for MOST of them. The skill is iterating on attacks and being able to state what your own defense was actually tested against."
     }
    },
    {
     "name": {
      "ru": "Перевод рамок в проверяемые требования: OWASP LLM/Agentic Top 10, NIST AI 600-1, NCSC/CISA",
      "en": "Turning frameworks into checkable requirements: OWASP LLM/Agentic Top 10, NIST AI 600-1, NCSC/CISA guidelines"
     },
     "why": {
      "ru": "Эти документы — общий язык с аудитом, заказчиком и регулятором, и их спрашивают на собеседованиях как проверку, что человек не изобретает контроли с нуля. Отдельная часть навыка — проектировать точку человеческого подтверждения так, чтобы её не штамповали: телеметрия Anthropic показала ~93% одобренных запросов разрешений и прямо связала это с тем, что чем больше подтверждений видит пользователь, тем меньше внимания он уделяет каждому.",
      "en": "These documents are the shared language with audit, customers and regulators, and interviewers use them to check you are not inventing controls from scratch. A distinct part of the skill is designing human checkpoints that do not get rubber-stamped: Anthropic's telemetry showed ~93% of permission prompts approved and explicitly tied it to the fact that the more approvals a user sees, the less attention each one gets."
     }
    }
   ],
   "anchors": [
    {
     "title": "OWASP Top 10 for LLM Applications 2025 (+ Top 10 for Agentic Applications 2026)",
     "url": "https://genai.owasp.org/llm-top-10/",
     "org": "OWASP GenAI Security Project",
     "why": {
      "ru": "Отраслевой общий язык: LLM01 Prompt Injection, LLM02 Sensitive Information Disclosure, LLM05 Improper Output Handling, LLM06 Excessive Agency (проверено — состав списка именно такой). Ценен честностью: на странице LLM01 прямым текстом написано «Given the stochastic influence at the heart of the way models work, it is unclear if there are fool-proof methods of prevention for prompt injection», после чего документ переходит к ограничению прав, подтверждению рискованных действий, сегрегации внешнего контента и состязательному тестированию. Бесплатно; отдельный агентный набор из десяти рисков вышел 9 декабря 2025 при участии более 100 экспертов.",
      "en": "The industry's shared vocabulary: LLM01 Prompt Injection, LLM02 Sensitive Information Disclosure, LLM05 Improper Output Handling, LLM06 Excessive Agency (list composition verified). Valuable for its honesty: the LLM01 page states outright, \"Given the stochastic influence at the heart of the way models work, it is unclear if there are fool-proof methods of prevention for prompt injection\", then moves to privilege control, human approval for risky actions, segregation of external content and adversarial testing. Free; the separate ten-risk agentic set shipped 9 December 2025 with 100+ contributors."
     }
    },
    {
     "title": "NIST AI 600-1: Artificial Intelligence Risk Management Framework — Generative Artificial Intelligence Profile",
     "url": "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf",
     "org": "NIST, U.S. Department of Commerce",
     "why": {
      "ru": "Государственная рамка, июль 2024: 12 категорий риска (разделы 2.1–2.12), из них 2.9 «Information Security» отдельно разбирает прямую и косвенную промпт-инъекцию и отравление данных. Дословно: «it expands the available attack surface, as GAI itself is vulnerable to attacks like prompt injection or data poisoning». Это тот документ, на который ссылаются в требованиях к подрядчикам — читать надо в оригинале, а не в пересказах.",
      "en": "A government framework, July 2024: 12 risk categories (sections 2.1–2.12), of which 2.9 \"Information Security\" separately covers direct and indirect prompt injection and data poisoning. Verbatim: \"it expands the available attack surface, as GAI itself is vulnerable to attacks like prompt injection or data poisoning.\" This is the document cited in vendor requirements — read the original, not the summaries."
     }
    },
    {
     "title": "The lethal trifecta for AI agents: private data, untrusted content, and external communication",
     "url": "https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/",
     "org": "Simon Willison",
     "why": {
      "ru": "Первоисточник самого понятия «летальная триада», которое стоит в названии трека: доступ к приватным данным + недоверенный контент + возможность общаться наружу. Здесь же аргумент, почему «ловим 95% атак» в безопасности не работает (в веб-безопасности 95% — это провал), и вывод: «The only way to stay safe there is to avoid that lethal trifecta combination entirely». Позже эту же логику воспроизвели Meta в «Agents Rule of Two» (31 октября 2025) и Chrome в Agent Origin Sets (8 декабря 2025).",
      "en": "The primary source of the \"lethal trifecta\" idea in this track's title: private data + untrusted content + the ability to communicate externally. It also makes the argument for why \"we catch 95% of attacks\" fails as security (in web application security 95% is a failing grade), concluding: \"The only way to stay safe there is to avoid that lethal trifecta combination entirely.\" Meta's Agents Rule of Two (31 October 2025) and Chrome's Agent Origin Sets (8 December 2025) later reproduced the same logic."
     }
    },
    {
     "title": "Guidelines for secure AI system development",
     "url": "https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development/introduction",
     "org": "UK NCSC совместно с US CISA и партнёрскими агентствами",
     "why": {
      "ru": "Совместная государственная методика, v1.0, 27 ноября 2023: безопасность как требование на всём жизненном цикле системы, а не только на этапе разработки; промпт-инъекция и отравление данных введены под общий зонтик состязательного машинного обучения. Задала формат требований, на который потом легли отраслевые рамки. Читать вместе с блогом NCSC «Prompt injection is not SQL injection (it may be worse)» от 8 декабря 2025: «As there is no inherent distinction between “data” and “instruction”, it's very possible that prompt injection attacks may never be totally mitigated in the way that SQL injection attacks can be».",
      "en": "Joint government guidance, v1.0, 27 November 2023: security as a requirement across the whole system lifecycle, not just development; prompt injection and data poisoning placed under the adversarial-machine-learning umbrella. It set the requirements format later frameworks built on. Read alongside the NCSC blog \"Prompt injection is not SQL injection (it may be worse)\" of 8 December 2025: \"As there is no inherent distinction between 'data' and 'instruction', it's very possible that prompt injection attacks may never be totally mitigated in the way that SQL injection attacks can be.\""
     }
    },
    {
     "title": "Red Teaming LLM Applications (короткий курс)",
     "url": "https://www.deeplearning.ai/short-courses/red-teaming-llm-applications/",
     "org": "DeepLearning.AI + Giskard",
     "why": {
      "ru": "Практика руками, бесплатно, 1 час 29 минут: 7 видеоуроков и 5 примеров кода — атаки на чат-приложения промпт-инъекциями, обзор уязвимостей LLM, «Red Teaming at Scale» и «Red Teaming LLMs with LLMs». Ведут Matteo Dora и Luca Martial из Giskard. Хорош как первый заход в атакующую часть трека — с кодом, а не со слайдами. Дальше по глубине идти к первоисточникам: препринт Google DeepMind об адаптивных атаках на Gemini (arxiv.org/abs/2505.14534) и «The Attacker Moves Second» (arxiv.org/abs/2510.09023).",
      "en": "Hands-on and free, 1 hour 29 minutes: 7 video lessons and 5 code examples — attacking chat applications with prompt injections, an overview of LLM vulnerabilities, \"Red Teaming at Scale\" and \"Red Teaming LLMs with LLMs\". Taught by Matteo Dora and Luca Martial of Giskard. A good first step into the offensive half of the track — code, not slides. For depth, go on to the primary papers: Google DeepMind on adaptive attacks against Gemini (arxiv.org/abs/2505.14534) and \"The Attacker Moves Second\" (arxiv.org/abs/2510.09023)."
     }
    }
   ],
   "caveat": {
    "ru": "Главное, что нужно сказать вслух: промпт-инъекция не решена, и это утверждают не критики, а те, кто от неё защищается. OWASP (страница LLM01): «неясно, существуют ли надёжные методы предотвращения» — из-за стохастической природы работы моделей. Meta (31 октября 2025): «Prompt injection is a fundamental, unsolved weakness in all LLMs». NCSC (8 декабря 2025): поскольку у модели нет внутреннего различия между «данными» и «инструкцией», вполне возможно, инъекцию никогда не устранят так, как устранили SQL-инъекцию, — поэтому цель смещается на снижение вероятности и ущерба. Google DeepMind: «enumerating the space of all possible attacks is intractable». Поэтому трек честно учит снижению ущерба и архитектурным границам, а не «правильному фильтру», — и любой курс, обещающий «защиту от инъекций», продаёт то, чего нет.\n\nДальше — про качество доказательств, и здесь нужно быть жёстким. Все цифры по механикам получены вендорами про самих себя: Anthropic про Claude, Google про Gemini и Chrome, Microsoft про свой паттерн Zero Trust и про чужой GitHub Action. Независимых аудитов и сравнений вида «внедрили такой контроль — инцидентов стало столько» в открытом доступе нет. Две из пяти механик (Microsoft Zero Trust, Chrome) не содержат НИ ОДНОЙ цифры эффективности — только архитектуру и принципы; проверить эти слои со стороны нельзя вообще. Цифры Gemini относятся к незащищённой базовой модели, а не к тому, что реально отгружено пользователям (авторы это оговаривают отдельно). Случай с GitHub Action — сконструированный исследователями PoC, а не наблюдение атаки в природе. И общий поправочный коэффициент: в препринте «The Attacker Moves Second» (arxiv.org/abs/2510.09023, октябрь 2025) 12 опубликованных защит, большинство из которых заявляли почти нулевой успех атак, были пробиты адаптивными атаками с успехом выше 90% у большинства из них. Значит, любую цифру эффективности защиты — включая 0,1% и 83% из механик выше — читать надо как «против атак, известных на момент замера».\n\nПро спрос: прямых данных именно по роли «безопасник агентных систем» нет ни одной строки. Рынок мерят либо как кибербезопасность целиком (WEF: прогноз работодателей на пять лет, не вакансии), либо как ИИ-риски целиком. Опрос McKinsey — это мнения руководителей о барьерах, причём кибербезопасность там даже не первая тревога: неточность модели назвали 74% против 72% у кибербезопасности. База AI Incident Database считает публично ОПИСАННЫЕ случаи, то есть заодно меряет внимание прессы. Скан Google даёт относительный рост без единого абсолютного числа и по корпусу, из которого выпали почти все соцсети. Ни одна из этих цифр не говорит, сколько вакансий открыто и сколько платят.\n\nИ отдельно: человек-в-контуре не является решением по умолчанию, хотя выглядит им. Телеметрия Anthropic: «users approved roughly 93% of permission prompts», и чем больше подтверждений видит пользователь, тем меньше внимания он уделяет каждому. Ответом стало не «спрашивать лучше», а сокращение числа запросов на 84% за счёт песочниц уровня ОС. Если трек оставит у ученика мысль «поставим человека на подтверждение и всё», это провал; правильный вывод — подтверждения редкие, дорогие и только там, где действие необратимо (деньги, доступ к аккаунтам, отправка наружу).",
    "en": "The thing that has to be said out loud: prompt injection is not solved, and the people saying so are the ones defending against it. OWASP (LLM01 page): given the stochastic influence at the heart of how models work, \"it is unclear if there are fool-proof methods of prevention.\" Meta (31 October 2025): \"Prompt injection is a fundamental, unsolved weakness in all LLMs.\" The UK NCSC (8 December 2025): because there is no inherent distinction between \"data\" and \"instruction\" inside the model, prompt injection may never be totally mitigated the way SQL injection can be — so the goal shifts to reducing likelihood and impact. Google DeepMind: \"enumerating the space of all possible attacks is intractable.\" So this track teaches damage reduction and architectural boundaries rather than \"the right filter\" — and any course promising \"protection from injection\" is selling something that does not exist.\n\nOn evidence quality, and here we should be blunt. Every number in the mechanics section comes from vendors reporting on themselves: Anthropic on Claude, Google on Gemini and Chrome, Microsoft on its own Zero Trust pattern and on someone else's GitHub Action. Independent audits and before/after comparisons of the form \"we deployed this control, incidents went from X to Y\" do not exist in the public record. Two of the five mechanics (Microsoft Zero Trust, Chrome) contain NOT ONE effectiveness figure — only architecture and principles; there is no external way to check those layers at all. The Gemini numbers describe the undefended base model, not what actually ships to users (the authors say so explicitly). The GitHub Action case is a researcher-built PoC, not an attack observed in the wild. And the general correction factor: in the preprint \"The Attacker Moves Second\" (arxiv.org/abs/2510.09023, October 2025), 12 published defenses — most of which had reported near-zero attack success — were broken by adaptive attacks with success above 90% for most of them. So any defense-effectiveness figure, including the 0.1% and 83% above, must be read as \"against the attacks known at measurement time.\"\n\nOn demand: there is not a single line of direct data on the specific role of \"agent-systems security engineer.\" The market is measured either as cybersecurity as a whole (WEF: a five-year employer forecast, not job postings) or as AI risk as a whole. The McKinsey figures are executives' opinions about barriers, and cybersecurity is not even their top worry there: inaccuracy was cited by 74 percent against cybersecurity's 72 percent. The AI Incident Database counts publicly REPORTED cases, so it also measures press attention. Google's scan gives a relative increase with no absolute numbers, over a corpus that excludes nearly all social platforms. None of these tells you how many positions are open or what they pay.\n\nOne more thing: human-in-the-loop is not a default answer, even though it looks like one. Anthropic's telemetry: \"users approved roughly 93% of permission prompts\", and the more approvals a user sees, the less attention each one gets. Their response was not \"ask better\" but cutting prompts by 84% with OS-level sandboxes. If a learner leaves this track thinking \"we'll put a human on the approval and we're fine,\" the track has failed; the correct conclusion is that approvals must be rare, expensive, and reserved for irreversible actions — money, account access, anything leaving the perimeter."
   }
  }
 },
 "shared": [
  {
   "title": "Beyond the Buzz: Developing the AI Skills Employers Actually Need · generalist, developer, ai-analyst",
   "url": "https://lightcast.io/resources/blog/beyond-the-buzz-press-release-2025-07-23",
   "org": "Lightcast"
  },
  {
   "title": "2025 Stack Overflow Developer Survey — AI section · developer, memory-eng",
   "url": "https://survey.stackoverflow.co/2025/ai",
   "org": "Stack Overflow"
  },
  {
   "title": "Octoverse 2025: A new developer joins GitHub every second as AI leads TypeScript to #1 · developer, agent-architect",
   "url": "https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/",
   "org": "GitHub"
  },
  {
   "title": "How is Google using AI for internal code migrations? · developer, agent-architect",
   "url": "https://arxiv.org/abs/2501.06972",
   "org": "Google"
  },
  {
   "title": "Generative AI at Work (NBER Working Paper 31161) · generalist, ai-analyst",
   "url": "https://www.nber.org/papers/w31161",
   "org": "NBER (Brynjolfsson, Li, Raymond)"
  },
  {
   "title": "The State of AI: Global Survey 2025 · agent-architect, memory-eng",
   "url": "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
   "org": "McKinsey (QuantumBlack)"
  },
  {
   "title": "The 2026 AI Index Report — Responsible AI · ai-analyst, security-eng",
   "url": "https://hai.stanford.edu/ai-index/2026-ai-index-report/responsible-ai",
   "org": "Stanford HAI"
  },
  {
   "title": "Lightcast and Stanford University: Annual AI Index 2026 · agent-architect, quant",
   "url": "https://lightcast.io/resources/research/stanford-ai-index-2026",
   "org": "Lightcast / Stanford HAI"
  },
  {
   "title": "The Future of Jobs Report 2025 · generalist (digest), security-eng (глава 3, Skills outlook)",
   "url": "https://www.weforum.org/publications/the-future-of-jobs-report-2025/digest/",
   "org": "World Economic Forum"
  },
  {
   "title": "OWASP Top 10 for LLM Applications · developer, security-eng (memory-eng — отдельная запись LLM08, agent-architect — агентный threat-model того же проекта)",
   "url": "https://genai.owasp.org/llm-top-10/",
   "org": "OWASP GenAI Security Project"
  },
  {
   "title": "AI Risk Management Framework 1.0 + Generative AI Profile (NIST-AI-600-1) · generalist, quant (ai-analyst и security-eng ссылаются на сам профиль по генеративному ИИ)",
   "url": "https://www.nist.gov/itl/ai-risk-management-framework",
   "org": "NIST"
  },
  {
   "title": "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity · agent-architect, ai-analyst, и в оговорках трека developer",
   "url": "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/",
   "org": "METR"
  }
 ],
 "gaps": {
  "ru": "Где доказательная база слабая — честный список.\n\n— Ни по одному треку нет исследования, которое показало бы, что ОБУЧЕНИЕ этим навыкам даёт результат. Измерены инструменты, а не курсы: рандомизированные эксперименты про ИИ-ассистентов существуют, про обучение работе с ними — нет ни одного.\n\n— Большинство крупных цифр — самоотчёт заинтересованной стороны. Google отчитывается о Google, Anthropic об Anthropic, а единственный рандомизированный эксперимент с телеметрией офисных приложений спроектировал, провёл и опубликовал вендор, замерявший собственный продукт, и качество работы там не оценивалось вообще — только распределение времени. Пометка «самоотчёт» не превращает самоотчёт в измерение.\n\n— Там, где оценивали вслепую или независимо, картина хуже. В слепой оценке DBT конспект отчёта вышел и быстрее, и лучше; слайды быстрее, но хуже; анализ в Excel медленнее И хуже. Единственная независимая предрегистрированная проверка коммерческих RAG-систем, продававшихся как «без галлюцинаций», дала 17–33% галлюцинаций.\n\n— Самые яркие таблицы держатся на крошечных выборках. Слепая оценка DBT — 11 участников, то есть 2–3 человека в клетке, и отчёт сам просит считать её дополнением к основным данным. METR — 16 разработчиков, и авторы в феврале 2026 сами объявили выборку испорченной отбором. Юридическая проверка — 202 запроса, что авторы называют небольшой выборкой.\n\n— Данные вакансий считают слова в объявлениях, а не найм и не выплаченную зарплату. У четверти упоминаний ИИ нет внятного смысла вообще, 14% — про ИИ-инструменты в рекрутинге, конкретный инструмент называют лишь в 2% случаев. Надбавка +28% посчитана по ЗАЯВЛЕННОЙ вилке и сразу по всем профессиям: это корреляция, а не прибавка лично вам.\n\n— У части ролей, к которым ведут треки, прямых рыночных данных нет вовсе: архитектор агентов, инженер памяти, инженер эвалов, безопасник агентных систем. Кластер «агентный ИИ» — 0,23% вакансий США, и сам кластер добавили в классификацию в этом же году, то есть часть роста это то, что начали считать. Единственная зарплатная цифра ($500–850 тыс.) — одна вакансия одной лаборатории, причём половина эвал-навыков стоит там в разделе «желательно».\n\n— Мерилки шатаются. RULER и NoLiMa строят задачи синтетически, и переносимость их разрыва на чужой корпус из этих работ не следует. В известных агентных бенчмарках нашли прямые дефекты: у SWE-bench Verified недостаточно тестов, TAU-bench засчитывал пустые ответы как успешные. А 12 опубликованных защит от инъекций, большинство из которых заявляли почти нулевой успех атак, были пробиты адаптивными атаками с успехом выше 90% у большинства из них.\n\n— Долгосрочного нет ничего. Ни данных о сопровождаемости кода, написанного моделями, ни публичных цифр о том, сколько стоит поддерживать индексы и память агента через год, ни доказательства, что сэкономленное время превращается в производительность: DBT пишет «не нашли надёжных доказательств» и тут же оговаривает, что это не было целью оценки и данных для такого вывода собирали мало.\n\n— Перекос по предмету и языку. Почти всё — англоязычный бигтех и код. По Anthropic Economic Index на задачи «компьютерных и математических» профессий приходится 35% разговоров Claude.ai, тогда как личные, нерабочие запросы — 42%; про рядовую офисную работу данных просто меньше. Как всё это устроено в небольшой команде и на русскоязычном материале, публично почти не описано.\n\n— Про долю провалившихся агентных пилотов честного числа здесь нет. Ходящие по статьям «40% свернут к 2027-му» и «60% не доехали до прода» — прогнозы аналитиков и пресс-релизы вендоров, а не измерения; они выброшены намеренно, и заменить их нечем.\n\n— Учебные опоры непропорционально часто ведут к одному провайдеру курсов и к документации самих вендоров — Microsoft про Copilot, Anthropic про промптинг, Google про агентов. Это лучшее, что открыто и бесплатно, но это не независимая экспертиза, и там, где учебник и замеряемый продукт совпадают, об этом стоит помнить.",
  "en": "Where the evidence is weak — the honest list.\n\n— Not one track has a study showing that TRAINING these skills produces a result. What was measured is tools, not courses: randomized trials of AI assistants exist; randomized trials of learning to use them do not.\n\n— Most of the large numbers are self-reports by an interested party. Google reports on Google, Anthropic on Anthropic, and the single randomized experiment using office-application telemetry was designed, run and published by the vendor measuring its own product — and it assessed no work quality at all, only how time was allocated. Labelling a self-report as such does not turn it into a measurement.\n\n— Where work was assessed blind or independently, the picture is worse. In DBT's blind assessment, report summaries came out faster and better; slides faster but worse; Excel analysis slower AND worse. The one independent, preregistered audit of commercial RAG systems marketed as \"hallucination-free\" found 17-33% hallucination rates.\n\n— The most striking tables rest on tiny samples. DBT's blind assessment involved 11 participants — two or three people per cell — and the report itself asks that it be treated as supplementary. METR had 16 developers, and in February 2026 the authors declared their own sample compromised by selection effects. The legal audit covered 202 queries, which its authors call a small sample.\n\n— Job-posting data counts words in listings, not hires and not paid salaries. A quarter of AI mentions carry no discernible use case at all, 14% are about AI tools in recruiting, and only 2% name a specific tool. The 28% premium is computed from ADVERTISED ranges across all occupations at once: a correlation, not a raise for you personally.\n\n— Several of the roles these tracks lead to have no direct market data whatsoever: agent architect, memory engineer, evals engineer, agent-security engineer. The \"agentic AI\" cluster is 0.23% of US postings — and the cluster itself was added to the taxonomy that same year, so part of the growth is the start of counting. The one salary figure ($500-850k) is a single posting at a single lab, and half the eval skills it lists sit under \"preferred\".\n\n— The rulers wobble. RULER and NoLiMa construct their tasks synthetically, and nothing in those papers establishes that the gap transfers to your corpus. Well-known agentic benchmarks were found to have outright defects: SWE-bench Verified uses insufficient test cases, TAU-bench counted empty responses as successful. And 12 published injection defenses, most of which had reported near-zero attack success, were broken by adaptive attacks with success above 90% for most of them.\n\n— There is nothing long-run. No data on the maintainability of model-written code, no public figures on what it costs to keep indexes and agent memory alive a year on, and no evidence that saved time becomes productivity: DBT says it found \"no robust evidence\" and immediately notes this was not an aim of the evaluation and little data was collected for such a conclusion.\n\n— A skew by subject and by language. Almost everything is English-language big tech and code. In the Anthropic Economic Index, Computer and Mathematical occupations account for 35% of Claude.ai conversations while personal, non-work queries account for 42%; there is simply less data about ordinary office work. How any of this behaves in a small team, on Russian-language material, is barely documented publicly.\n\n— There is no honest figure here for the share of failed agentic pilots. The circulating \"40% will be scrapped by 2027\" and \"60% never reached production\" are analyst forecasts and vendor press releases, not measurements; they were discarded deliberately, and nothing replaces them.\n\n— The learning anchors lean disproportionately on one course provider and on vendor documentation — Microsoft on Copilot, Anthropic on prompting, Google on agents. It is the best that is open and free, but it is not independent assessment, and where the textbook and the measured product are the same object, that is worth remembering."
 },
 "tensions": [
  {
   "ru": "«Агенты уже пишут больше миллиона pull request'ов» против «масштабируют агентов 23%, а внутри отдельной функции не больше 10%». Противоречия нет: телеметрия считает СОЗДАННЫЕ PR, а не влитые и работающие, и сам отчёт называет наблюдаемое первым проблеском с сильными эффектами отбора — агентов запускают в репозиториях старше, крупнее и популярнее среднего. Опрос же меряет, что респондент САМ СЧИТАЕТ масштабированием. Одно про объём заявок, другое про эксплуатацию; между ними и лежит работа.",
   "en": "\"Agents already write over a million pull requests\" versus \"23% are scaling agents, and no more than 10% within any single function\". No contradiction: telemetry counts PRs CREATED, not merged and working, and the report itself calls this a first glimpse with strong selection effects — agents are pointed at repositories older, larger and more popular than average. The survey, meanwhile, measures what a respondent BELIEVES counts as scaling. One is submission volume, the other is operation — and the work lives in the gap between them."
  },
  {
   "ru": "У Google в миграциях 80% правок написал ИИ и время сократилось примерно вдвое, у METR опытные мейнтейнеры с ИИ работали на 19% МЕДЛЕННЕЕ. Это не спор, а разные условия. Google гоняет узкую механическую миграцию конвейером: детерминированные AST-инструменты находят места, дообученная модель пишет правку, автоматика крутит тесты — и 50% это оценка самих исполнителей, а не замер. METR брал открытые задачи в зрелых чужих репозиториях со случайным распределением. Вывод общий для обоих: чем сильнее задача сужена до проверяемой, тем лучше работает модель.",
   "en": "In Google's migrations AI authored 80% of the modifications and time roughly halved; in METR's trial experienced maintainers were 19% SLOWER with AI. Not a dispute but different conditions. Google runs a narrow mechanical migration as a pipeline: deterministic AST tooling finds the sites, a fine-tuned model writes the edit, automation loops the tests — and the 50% is an estimate by the engineers doing the work, not a measurement. METR took open-ended issues in mature repositories with random assignment. The shared lesson: the more a task is narrowed until it is checkable, the better the model does."
  },
  {
   "ru": "Внутри трека разработчика три хороших исследования дают три разных числа: +26,08% pull request'ов, примерно 21% ускорения, 19% замедления. Они мерили разное. «Выполненная задача» в полевых экспериментах равна pull request'у — это активность, а не доставленная ценность, и единственный показатель качества там не вырос. РКИ Google — одна подготовленная задача с широкими интервалами. METR — эксперты в собственных репозиториях. Правильное чтение: эффект зависит от задачи, кодовой базы и опыта, а не от инструмента как такового.",
   "en": "Within the developer track three good studies give three different numbers: +26.08% pull requests, roughly 21% faster, 19% slower. They measured different things. A \"completed task\" in the field experiments is a pull request — activity, not delivered value — and the one quality proxy there did not improve. Google's RCT is one prepared task with wide intervals. METR is experts working in their own repositories. The correct reading: the effect depends on the task, the codebase and experience, not on the tool as such."
  },
  {
   "ru": "«DWP: 19 минут в день на человека» против «Microsoft: время на встречах не сократилось» и «DBT: расписание и генерация картинок вышли в минус». Выигрыш существует ПО ЗАДАЧАМ, а не по сотруднику вообще: сжатие длинного (конспекты, поиск, чтение почты) подтверждается тремя независимыми замерами, встречи не поддаются ни у Microsoft, ни толком у DWP, а часть задач с ИИ становится дольше. Обещать «ускорение офисной работы» нельзя; обещать умение отличать одни задачи от других — можно.",
   "en": "\"DWP: 19 minutes a day per user\" versus \"Microsoft: meeting time did not fall\" and \"DBT: scheduling and image generation came out negative\". The gain exists PER TASK, not per worker: compressing long material (summaries, search, reading email) is confirmed by three independent measurements, meetings move for neither Microsoft nor really DWP, and some tasks take longer with AI. You cannot promise \"faster office work\"; you can promise the ability to tell those cases apart."
  },
  {
   "ru": "Евростат: ИИ используют 20% предприятий ЕС. Stanford AI Index: 88% организаций применяют ИИ хотя бы в одной бизнес-функции. Банк Англии и FCA: 75% фирм. Это не спор о фактах, а разные определения и выборки — «предприятие использует ИИ» засчитывается по одному отделу, а «применяет хотя бы в одной функции» ещё мягче. Тот же AI Index добавляет, что до полного масштаба хоть в одной функции довели меньше 10%, а в опросе Банка Англии 46% фирм признают, что понимают свои же технологии лишь частично. «Внедрили» и «работает» — разные вещи.",
   "en": "Eurostat: 20% of EU enterprises use AI. The Stanford AI Index: 88% of organisations use AI in at least one business function. The Bank of England and FCA: 75% of firms. Not a dispute about facts but a difference of definition and sample — \"the enterprise uses AI\" counts if one department does, and \"uses it in at least one function\" is looser still. The same AI Index adds that fewer than 10% have fully scaled AI in any single function, and in the Bank of England survey 46% of firms admit only partial understanding of the technologies they run. \"Adopted\" and \"working\" are different things."
  },
  {
   "ru": "«Успех атаки около 0,1% с одной попытки, 83% опасных действий перехвачено» — и рядом «промпт-инъекция не решена». Оба верны, потому что первое это снимок против атак, ИЗВЕСТНЫХ на момент замера. 12 опубликованных защит, заявлявших почти нулевой успех атак, были пробиты адаптивно с успехом выше 90% у большинства; авторы защиты Gemini прямо пишут, что перебрать пространство всех возможных атак невозможно, поэтому заявить настоящую устойчивость нельзя. Любую цифру эффективности защиты читать как «против того, что пробовали».",
   "en": "\"Attack success around 0.1% on single attempts, 83% of overeager behaviours caught\" sits next to \"prompt injection is unsolved\". Both hold, because the first is a snapshot against attacks KNOWN at measurement time. Twelve published defenses reporting near-zero attack success were broken adaptively with success above 90% for most of them, and Gemini's defenders state outright that enumerating the space of all possible attacks is intractable, so true robustness cannot be claimed. Read any defense-effectiveness figure as \"against what was tried\"."
  },
  {
   "ru": "«LLM-судья совпадает с людьми более чем в 80% случаев» и «автогрейдер совпал с экспертами примерно в 66%». Разные задачи и разные предметные области, но главное в другом: потолок задают люди, а они между собой согласны примерно в 71%. Идеальный судья ОБЯЗАН расходиться с любым отдельно взятым разметчиком. Отсюда правило трека: чужую цифру согласия нельзя переносить на свой домен, её надо перемерить у себя, иначе это цитата, а не метрика.",
   "en": "\"An LLM judge matches humans over 80% of the time\" and \"the automated grader agreed with experts about 66% of the time\". Different tasks and domains — but the real point is that humans set the ceiling and they agree with each other only about 71%. A perfect judge MUST disagree with any single annotator some of the time. Hence the track's rule: someone else's agreement figure does not transfer to your domain; re-measure it in place or it is a quotation, not a metric."
  },
  {
   "ru": "«Поиск по источникам чинит галлюцинации» (91,11% корректных ссылок против 21,27%) против «у коммерческих юридических RAG-систем 17–33% галлюцинаций». Извлечение снижает ошибку, но не устраняет её, и провал происходит не там, где ищут: частая причина — подтянутый документ текстуально похож, а юридически неприменим. Поэтому в треке про память поиск мерят ОТДЕЛЬНО от генерации, а проверку ссылок человеком не отменяют — она часть стоимости, а не бонус.",
   "en": "\"Grounded retrieval fixes hallucination\" (91.11% citation accuracy against 21.27%) versus \"commercial legal RAG systems hallucinate 17-33% of the time\". Retrieval reduces the error without eliminating it, and the failure is not where people look for it: a frequent cause is a retrieved document that is textually similar but legally inapplicable. Which is why the memory track measures retrieval SEPARATELY from generation and does not drop human citation checking — that check is part of the cost, not a bonus."
  },
  {
   "ru": "В треке квантов «ИИ в финансах это черновики и извлечение данных, автономной торговли нет» — в треке архитектора агентов «агенты вышли из демо». И то и другое верно: по опросу ESMA 77% сценариев работают с низкой или нулевой автономией, на алгоритмическую торговлю приходится 10 сценариев из 847, а ответственность за решение всё равно остаётся на органе управления фирмы. Агенты идут туда, где ошибка дешёвая и обратимая, и останавливаются там, где она стоит денег и требует подписи.",
   "en": "The quant track says AI in finance means drafting and data extraction, with no autonomous trading; the agent-architect track says agents have left the demo stage. Both are true: in ESMA's survey 77% of use cases run with low or no autonomy, algorithmic trading accounts for 10 use cases out of 847, and accountability for the decision stays with the firm's management body regardless. Agents go where errors are cheap and reversible and stop where they cost money and require a signature."
  },
  {
   "ru": "«ИИ-навыки дают +28% к зарплате» против «прирост вакансий в разработке на 71% пришёлся на старшие роли» и «агентный ИИ — 0,23% объявлений». Надбавка посчитана по заявленной вилке и сразу по всем профессиям: вакансии с ИИ в среднем старше по грейду и сложнее, из этого не следует, что навык сам добавляет денег конкретному человеку. Треки честнее читать как «работа, которая существует», а не как ценник на резюме.",
   "en": "\"AI skills carry a 28% salary premium\" versus \"71% of the growth in developer postings came from senior roles\" and \"agentic AI is 0.23% of postings\". The premium is computed from advertised ranges across all occupations at once: AI-mentioning postings skew more senior and more complex to begin with, so it does not follow that the skill itself adds money for a given person. Read the tracks as \"work that exists\", not as a price tag on a résumé."
  },
  {
   "ru": "Почти все треки опираются на человека как на последний рубеж — но данные показывают, что рубеж этот платный и дырявый. Телеметрия: одобряют примерно 93% запросов разрешений, и чем больше подтверждений видит человек, тем меньше внимания уделяет каждому. В DBT сама проверка вывода по слайдам в 30% случаев занимала ДОЛЬШЕ, чем без ИИ. Правильный вывод не «уберём человека» и не «поставим человека везде», а «подтверждения редкие, дорогие и только там, где действие необратимо».",
   "en": "Nearly every track leans on the human as the last line of defense — but the data shows that line is expensive and leaky. Telemetry: roughly 93% of permission prompts get approved, and the more approvals a person sees, the less attention each one gets. At DBT, verifying slide output took LONGER than working without AI in 30% of cases. The correct conclusion is neither \"remove the human\" nor \"put a human everywhere\", but \"approvals should be rare, expensive, and reserved for irreversible actions\"."
  }
 ]
};
