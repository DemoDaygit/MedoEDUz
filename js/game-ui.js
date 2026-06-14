/**
 * ============================================================
 *  MedoEDUz Game UI — Визуальный слой игрового движка
 *  HUD игрока, тосты опыта, церемонии левел-апа и эволюции
 * ============================================================
 */

'use strict';

const GameUI = (() => {
    let hudEl, fabEl, panelEl;
    let xpQueue = [];
    let processingQueue = false;

    // ---------- Построение HUD ----------
    function buildHUD() {
        // Плавающая кнопка-аватар (FAB) — точка входа в игровую панель
        fabEl = document.createElement('button');
        fabEl.className = 'game-fab';
        fabEl.setAttribute('aria-label', 'Открыть профиль игрока');
        fabEl.innerHTML = `
            <span class="game-fab__ring"></span>
            <span class="game-fab__avatar" id="gameFabAvatar">🐻</span>
            <span class="game-fab__level" id="gameFabLevel">1</span>
        `;
        document.body.appendChild(fabEl);

        // Выдвижная панель профиля
        panelEl = document.createElement('aside');
        panelEl.className = 'game-panel';
        panelEl.innerHTML = `
            <div class="game-panel__overlay"></div>
            <div class="game-panel__sheet">
                <button class="game-panel__close" aria-label="Закрыть">&times;</button>

                <div class="game-panel__hero">
                    <div class="game-avatar-big" id="gameAvatarBig">
                        <span class="game-avatar-big__emoji">🐻</span>
                        <span class="game-avatar-big__glow"></span>
                    </div>
                    <h3 class="game-stage-name" id="gameStageName">Медвежонок</h3>
                    <p class="game-stage-title" id="gameStageTitle">Только начал свой путь</p>
                </div>

                <div class="game-level-block">
                    <div class="game-level-row">
                        <span>Уровень <strong id="gamePanelLevel">1</strong></span>
                        <span id="gamePanelXP">0 / 100 XP</span>
                    </div>
                    <div class="game-xpbar">
                        <div class="game-xpbar__fill" id="gamePanelBar" style="width:0%"></div>
                    </div>
                </div>

                <div class="game-stats-grid">
                    <div class="game-stat">
                        <span class="game-stat__value" id="gameStatStreak">0</span>
                        <span class="game-stat__label">🔥 дней подряд</span>
                    </div>
                    <div class="game-stat">
                        <span class="game-stat__value" id="gameStatXP">0</span>
                        <span class="game-stat__label">⚡ всего XP</span>
                    </div>
                    <div class="game-stat">
                        <span class="game-stat__value" id="gameStatAch">0</span>
                        <span class="game-stat__label">🏆 ачивок</span>
                    </div>
                </div>

                <div class="game-evolution-track" id="gameEvoTrack"></div>

                <h4 class="game-section-label">Достижения</h4>
                <div class="game-achievements" id="gameAchievements"></div>

                <button class="game-reset" id="gameReset">Сбросить прогресс</button>
            </div>
        `;
        document.body.appendChild(panelEl);

        // События
        fabEl.addEventListener('click', openPanel);
        panelEl.querySelector('.game-panel__close').addEventListener('click', closePanel);
        panelEl.querySelector('.game-panel__overlay').addEventListener('click', closePanel);
        panelEl.querySelector('#gameReset').addEventListener('click', () => {
            if (confirm('Сбросить весь игровой прогресс? Это действие необратимо.')) {
                GameEngine.reset();
            }
        });
    }

    function openPanel() {
        renderPanel();
        panelEl.classList.add('is-open');
        fabEl.classList.add('is-hidden');
    }

    function closePanel() {
        panelEl.classList.remove('is-open');
        fabEl.classList.remove('is-hidden');
    }

    // ---------- Рендер панели ----------
    function renderPanel() {
        const s = GameEngine.getState();

        document.getElementById('gamePanelLevel').textContent = s.level;
        document.getElementById('gameFabLevel').textContent = s.level;
        document.getElementById('gamePanelXP').textContent =
            `${s.progress.current} / ${s.progress.needed} XP`;
        document.getElementById('gamePanelBar').style.width = s.progress.percent + '%';

        document.getElementById('gameStatStreak').textContent = s.streak;
        document.getElementById('gameStatXP').textContent = s.xp;
        document.getElementById('gameStatAch').textContent = s.achievements.length;

        document.getElementById('gameStageName').textContent = s.stage.name;
        document.getElementById('gameStageTitle').textContent = s.stage.title;
        document.querySelector('#gameAvatarBig .game-avatar-big__emoji').textContent = s.stage.emoji;
        document.getElementById('gameFabAvatar').textContent = s.stage.emoji;

        // Трек эволюции
        const track = document.getElementById('gameEvoTrack');
        track.innerHTML = s.allStages
            .map((stg) => {
                const done = s.level >= stg.minLevel;
                const active = stg.id === s.stage.id;
                return `
                <div class="game-evo-node ${done ? 'is-done' : ''} ${active ? 'is-active' : ''}"
                     title="${stg.name} · ур. ${stg.minLevel}">
                    <span class="game-evo-node__emoji">${stg.emoji}</span>
                    <span class="game-evo-node__lvl">${stg.minLevel}</span>
                </div>`;
            })
            .join('<span class="game-evo-line"></span>');

        // Достижения
        const achWrap = document.getElementById('gameAchievements');
        achWrap.innerHTML = s.allAchievements
            .map((a) => {
                const unlocked = s.achievements.includes(a.id);
                return `
                <div class="game-ach ${unlocked ? 'is-unlocked' : 'is-locked'}" title="${a.desc}">
                    <span class="game-ach__icon">${unlocked ? a.icon : '🔒'}</span>
                    <span class="game-ach__name">${a.name}</span>
                </div>`;
            })
            .join('');
    }

    // ---------- Тосты получения XP ----------
    function queueXPToast(payload) {
        xpQueue.push(payload);
        if (!processingQueue) processQueue();
    }

    function processQueue() {
        if (xpQueue.length === 0) {
            processingQueue = false;
            return;
        }
        processingQueue = true;
        const payload = xpQueue.shift();

        const toast = document.createElement('div');
        toast.className = 'xp-toast';
        toast.innerHTML = `
            <span class="xp-toast__amount">+${payload.amount} XP</span>
            ${payload.reason ? `<span class="xp-toast__reason">${payload.reason}</span>` : ''}
        `;
        document.body.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add('show'));

        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove(), { once: true });
            setTimeout(processQueue, 250);
        }, 1800);

        // Подсветка FAB-кольца
        fabEl.classList.add('pulse');
        setTimeout(() => fabEl.classList.remove('pulse'), 700);

        // Обновляем мини-уровень
        const s = GameEngine.getState();
        document.getElementById('gameFabLevel').textContent = s.level;
        fabEl.style.setProperty('--fab-progress', s.progress.percent + '%');
    }

    // ---------- Церемония левел-апа ----------
    function showLevelUp({ to }) {
        const overlay = document.createElement('div');
        overlay.className = 'levelup-overlay';
        overlay.innerHTML = `
            <div class="levelup-card">
                <div class="levelup-burst"></div>
                <div class="levelup-badge">${to}</div>
                <h2 class="levelup-title">Новый уровень!</h2>
                <p class="levelup-sub">Ты достиг <strong>${to}</strong> уровня</p>
            </div>
        `;
        document.body.appendChild(overlay);
        requestAnimationFrame(() => overlay.classList.add('show'));

        if (window.AnimationEngine) AnimationEngine.confetti();

        setTimeout(() => {
            overlay.classList.remove('show');
            overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
        }, 2600);
    }

    // ---------- Церемония эволюции ----------
    function showEvolution({ from, to }) {
        const overlay = document.createElement('div');
        overlay.className = 'evolve-overlay';
        overlay.innerHTML = `
            <div class="evolve-scene">
                <div class="evolve-rays"></div>
                <div class="evolve-morph">
                    <span class="evolve-from">${from.emoji}</span>
                    <span class="evolve-arrow">⟶</span>
                    <span class="evolve-to">${to.emoji}</span>
                </div>
                <h2 class="evolve-title">ЭВОЛЮЦИЯ!</h2>
                <p class="evolve-sub">${from.name} превратился в <strong>${to.name}</strong></p>
            </div>
        `;
        document.body.appendChild(overlay);
        requestAnimationFrame(() => overlay.classList.add('show'));

        if (window.AnimationEngine) {
            AnimationEngine.confetti();
            AnimationEngine.flash(to.aura);
        }

        setTimeout(() => {
            overlay.classList.remove('show');
            overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
        }, 3600);
    }

    // ---------- Тост достижения ----------
    function showAchievement(ach) {
        const toast = document.createElement('div');
        toast.className = 'ach-toast';
        toast.innerHTML = `
            <div class="ach-toast__icon">${ach.icon}</div>
            <div class="ach-toast__body">
                <span class="ach-toast__label">Достижение разблокировано</span>
                <span class="ach-toast__name">${ach.name}</span>
                <span class="ach-toast__desc">${ach.desc}</span>
            </div>
        `;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));

        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove(), { once: true });
        }, 4000);
    }

    // ---------- Инициализация ----------
    function init() {
        buildHUD();

        GameEngine.on('xp', queueXPToast);
        GameEngine.on('levelup', showLevelUp);
        GameEngine.on('evolve', showEvolution);
        GameEngine.on('achievement', showAchievement);
        GameEngine.on('ready', () => {
            const s = GameEngine.getState();
            document.getElementById('gameFabAvatar').textContent = s.stage.emoji;
            document.getElementById('gameFabLevel').textContent = s.level;
            fabEl.style.setProperty('--fab-progress', s.progress.percent + '%');
        });
    }

    return { init, renderPanel };
})();

window.GameUI = GameUI;
