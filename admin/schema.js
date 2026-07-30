/**
 * ============================================================
 *  Схемы сущностей курса — из них СТРОЯТСЯ формы редактора
 * ============================================================
 *
 *  Правило проекта запрещает фреймворки, а руками писать форму на
 *  каждую сущность — это сотни строк и гарантированный рассинхрон
 *  с моделью: поле в узле появилось, а в форме его нет.
 *
 *  Поэтому здесь ОДНА декларация на сущность, а рендерер в admin.js
 *  один на все. Добавить поле = дописать строку сюда.
 *
 *  Типы полей: text · textarea · number · select · color · emoji ·
 *              list (строки) · nodes (мультивыбор узлов) ·
 *              tracks (мультивыбор треков) · checks (вопросы проверки)
 */

'use strict';

window.ADMIN_SCHEMA = (function () {

    var NODE = {
        title: 'Узел курса',
        idField: 'id',
        // help объясняет НЕ «что это за поле», а последствия ошибки:
        // редактор курса — не место для угадывания.
        fields: [
            { key: 'id', label: 'Идентификатор', type: 'text', readonlyOnEdit: true,
              help: 'Меняться не должен: на него ссылается прогресс учеников и предпосылки соседних узлов.' },
            { key: 'title', label: 'Название', type: 'text', required: true },
            { key: 'emoji', label: 'Эмодзи', type: 'emoji' },
            { key: 'branch', label: 'Ветка', type: 'select', source: 'branches', required: true },
            { key: 'level', label: 'Сложность', type: 'select', source: 'levels' },
            { key: 'tracks', label: 'Треки', type: 'tracks',
              help: 'Узел, которого нет ни в одном треке, не попадёт ни в один персональный маршрут.' },
            { key: 'col', label: 'Столбец на карте', type: 'number' },
            { key: 'row', label: 'Ряд на карте', type: 'number',
              help: 'Координаты влияют на слияние ареала: соседние по вертикали узлы сливаются в одну область.' },
            { key: 'reqLevel', label: 'Требуемый уровень', type: 'number' },
            { key: 'xp', label: 'Опыт за освоение', type: 'number' },
            { key: 'prereqs', label: 'Предпосылки', type: 'nodes',
              help: 'Цикл в предпосылках заблокирует обе стороны навсегда. Проверка при сохранении это ловит.' },
            { key: 'desc', label: 'Короткое описание', type: 'textarea', rows: 2 },
            { key: 'learn', label: 'Чему учит', type: 'list' },
            { key: 'tools', label: 'Инструменты', type: 'list' },
            { key: 'apply.now', label: 'Что даёт сразу', type: 'textarea', rows: 2 },
            { key: 'apply.case', label: 'Пример из практики', type: 'textarea', rows: 3 },
            { key: 'trap', label: 'Где заваливаются', type: 'textarea', rows: 2 },
            { key: 'quest.title', label: 'Задание: название', type: 'text' },
            { key: 'quest.steps', label: 'Задание: шаги', type: 'list' },
            { key: 'quest.proof', label: 'Задание: доказательство', type: 'text' },
            { key: 'check', label: 'Вопросы проверки', type: 'checks',
              help: 'Индекс верного ответа считается от нуля. Вопрос без верного ответа сохранён не будет.' },
        ],
    };

    var BRANCH = {
        title: 'Ветка (биом на карте)',
        idField: 'key',
        fields: [
            { key: 'key', label: 'Ключ', type: 'text', readonlyOnEdit: true },
            { key: 'name', label: 'Название', type: 'text', required: true },
            { key: 'emoji', label: 'Эмодзи', type: 'emoji' },
            { key: 'color', label: 'Цвет', type: 'color', required: true,
              help: 'Жёлто-янтарный диапазон зарезервирован под бренд Медоеда и будет отклонён.' },
        ],
    };

    var TRACK = {
        title: 'Трек обучения',
        idField: 'key',
        fields: [
            { key: 'key', label: 'Ключ', type: 'text', readonlyOnEdit: true },
            { key: 'name', label: 'Название', type: 'text', required: true },
            { key: 'emoji', label: 'Эмодзи', type: 'emoji' },
            { key: 'color', label: 'Цвет', type: 'color' },
            { key: 'goal', label: 'Цель трека', type: 'textarea', rows: 2 },
            { key: 'forWhom', label: 'Для кого', type: 'textarea', rows: 2 },
            { key: 'coreNodes', label: 'Ключевые узлы', type: 'nodes' },
        ],
    };

    var SYNERGY = {
        title: 'Синергия',
        idField: 'id',
        fields: [
            { key: 'id', label: 'Идентификатор', type: 'text', readonlyOnEdit: true },
            { key: 'name', label: 'Название', type: 'text', required: true },
            { key: 'emoji', label: 'Эмодзи', type: 'emoji' },
            { key: 'nodes', label: 'Узлы связки', type: 'nodes', required: true,
              help: 'Синергия с менее чем двумя узлами не имеет смысла и будет скрыта.' },
            { key: 'gives', label: 'Что даёт', type: 'textarea', rows: 2 },
        ],
    };

    /**
     * Правила геймификации. Значения по умолчанию совпадают с кодом:
     * пустое поле = «оставить как в коде», а не «обнулить».
     *
     * ВАЖНО: правила проекта запрещают награждать за присутствие.
     * Поэтому здесь нет и не должно быть «XP за визит» и «XP за клик».
     */
    var MECHANICS = {
        title: 'Механики обучения',
        fields: [
            { key: 'xpPerLevelBase', label: 'Опыт за первый уровень', type: 'number', placeholder: '100',
              help: 'Основание кривой уровней. Больше — медленнее рост.' },
            { key: 'xpGrowth', label: 'Рост стоимости уровня', type: 'number', step: '0.05', placeholder: '1.35' },
            { key: 'streakGraceDays', label: 'Прощаемых пропусков в месяц', type: 'number', placeholder: '2',
              help: 'Серия не обнуляется: пропуски прощаются. Ноль здесь вернёт наказание за пропуск — так делать не стоит.' },
            { key: 'checkPassRatio', label: 'Порог прохождения проверки', type: 'number', step: '0.05', placeholder: '0.7',
              help: 'Ориентир сложности — около 85% верных ответов. Слишком высокий порог превращает курс в экзамен.' },
            { key: 'reviewFirstDays', label: 'Первый повтор через (дней)', type: 'number', placeholder: '1' },
            { key: 'reviewGrowth', label: 'Множитель интервала повтора', type: 'number', step: '0.1', placeholder: '2' },
            { key: 'confidentErrorMin', label: 'Порог уверенной ошибки', type: 'number', step: '0.05', placeholder: '0.7',
              help: 'Неверный ответ при уверенности выше порога разбирается отдельно: такие ошибки исправляются прочнее.' },
            { key: 'weekDayMinutes', label: 'Минут на день первой недели', type: 'number', placeholder: '30' },
        ],
    };

    return {
        node: NODE,
        branch: BRANCH,
        track: TRACK,
        synergy: SYNERGY,
        mechanics: MECHANICS,
    };
})();
