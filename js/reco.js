/**
 * ============================================================
 *  MedoEDUz Reco — рекомендательный движок вектора освоения
 * ============================================================
 *
 *  Чистая логика без DOM. Отвечает на вопрос «что осваивать
 *  дальше именно вам» — учитывая выбранный трек, уровень,
 *  незавершённые квесты и проваленные проверки.
 *
 *  Смысл: уникализировать путь. Два ученика с одинаковым
 *  прогрессом, но разными треками получают разные рекомендации.
 */

'use strict';

const Reco = (() => {

    function levelOrder(model, lvl) {
        return (model.LEVELS[lvl] && model.LEVELS[lvl].order) || 99;
    }

    /** Узел относится к треку игрока? (нет трека → всё «в треке») */
    function inTrack(node, track) {
        if (!track) return true;
        return Array.isArray(node.tracks) && node.tracks.indexOf(track) !== -1;
    }

    /** Доступен ли узел: пререквизиты освоены и хватает уровня */
    function isAvailable(node, mastered, playerLevel) {
        const prereqOk = (node.prereqs || []).every((p) => mastered.has(p));
        return !mastered.has(node.id) && prereqOk && playerLevel >= node.reqLevel;
    }

    /**
     * Главная функция: что делать дальше.
     * @param model    window.CURRICULUM
     * @param ctx      { mastered:Set, playerLevel:number, profile, checks, quests }
     * @returns { primary: nodeId|null, reason: string, alternatives: [nodeId] }
     */
    function next(model, ctx) {
        const { mastered, playerLevel, profile, checks, quests } = ctx;
        const track = profile && profile.track;

        // 1. Проваленная проверка на уже освоенном узле — приоритет на повтор.
        for (const node of model.NODES) {
            if (!mastered.has(node.id)) continue;
            const r = checks && checks[node.id];
            if (r && r.answers && r.passed === false) {
                return { primary: node.id, reason: 'Вернитесь: проверка не пройдена', alternatives: [] };
            }
        }

        // 2. Начатый, но не завершённый квест — доведите до конца.
        for (const node of model.NODES) {
            if (mastered.has(node.id)) continue;
            const done = (quests && quests[node.id]) || [];
            if (done.length > 0 && done.length < node.quest.steps.length) {
                return { primary: node.id, reason: 'Завершите начатую миссию', alternatives: [] };
            }
        }

        // 3. Доступные узлы своего трека — берём самый лёгкий по сложности.
        const available = model.NODES.filter((n) => isAvailable(n, mastered, playerLevel));

        const inMyTrack = available
            .filter((n) => inTrack(n, track))
            .sort((a, b) =>
                levelOrder(model, a.level) - levelOrder(model, b.level) ||
                a.reqLevel - b.reqLevel);

        // 4. Бонус: узел, открывающий синергию (1 из 2 узлов уже освоен).
        const synergyBoost = new Set();
        (model.SYNERGIES || []).forEach((syn) => {
            const have = syn.nodes.filter((id) => mastered.has(id)).length;
            if (have === syn.nodes.length - 1) {
                syn.nodes.forEach((id) => { if (!mastered.has(id)) synergyBoost.add(id); });
            }
        });

        // Если среди доступных в треке есть узел-«достройка синергии» — он в приоритете.
        const synergyPick = inMyTrack.find((n) => synergyBoost.has(n.id));
        if (synergyPick) {
            return {
                primary: synergyPick.id,
                reason: 'Откроет синергию навыков',
                alternatives: inMyTrack.filter((n) => n.id !== synergyPick.id).slice(0, 3).map((n) => n.id),
            };
        }

        if (inMyTrack.length) {
            return {
                primary: inMyTrack[0].id,
                reason: 'Следующий шаг вашего трека',
                alternatives: inMyTrack.slice(1, 4).map((n) => n.id),
            };
        }

        // 5. В треке ничего не доступно — предложим смежное из общего пула.
        const anyAvailable = available.sort((a, b) =>
            levelOrder(model, a.level) - levelOrder(model, b.level) || a.reqLevel - b.reqLevel);
        if (anyAvailable.length) {
            return {
                primary: anyAvailable[0].id,
                reason: 'Расширьте кругозор за пределы трека',
                alternatives: anyAvailable.slice(1, 4).map((n) => n.id),
            };
        }

        return { primary: null, reason: 'Всё доступное освоено — поднимайте уровень', alternatives: [] };
    }

    /** Прогресс по треку: сколько узлов трека освоено из всех */
    function trackProgress(model, track, mastered) {
        const nodes = model.NODES.filter((n) => inTrack(n, track));
        const done = nodes.filter((n) => mastered.has(n.id)).length;
        return { done, total: nodes.length, pct: nodes.length ? Math.round(done / nodes.length * 100) : 0 };
    }

    return { next, inTrack, isAvailable, trackProgress };
})();

window.Reco = Reco;
