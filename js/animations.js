/**
 * ============================================================
 *  MedoEDUz Animation Engine — Движок продвинутых анимаций
 *  Частицы, конфетти, 3D-tilt, магнитные кнопки, реактивный
 *  курсор, scroll-reveal, морфинг и эффекты "живого" интерфейса
 * ============================================================
 *
 *  Все эффекты уважают prefers-reduced-motion и автоматически
 *  отключаются на слабых устройствах / при экономии движения.
 */

'use strict';

const AnimationEngine = (() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    let particleCanvas, pctx, particles = [];
    let rafId = null;
    let pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // ============================================================
    //  1. ФОНОВАЯ СИСТЕМА ЧАСТИЦ (нейросеть)
    // ============================================================
    function initParticleField() {
        if (reduceMotion) return;

        particleCanvas = document.createElement('canvas');
        particleCanvas.className = 'fx-particles';
        document.body.appendChild(particleCanvas);
        pctx = particleCanvas.getContext('2d');

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const count = isMobile ? 28 : 70;
        particles = Array.from({ length: count }, () => spawnParticle());

        animateParticles();
    }

    function resizeCanvas() {
        if (!particleCanvas) return;
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    }

    function spawnParticle() {
        return {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 2 + 1,
        };
    }

    function animateParticles() {
        const w = particleCanvas.width;
        const h = particleCanvas.height;
        pctx.clearRect(0, 0, w, h);

        // Текущий акцентный цвет берём из CSS-переменной (меняется при эволюции)
        const accent = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary-color').trim() || '#6366f1';

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            // Лёгкое притяжение к курсору
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 180) {
                p.x += (dx / dist) * 0.3;
                p.y += (dy / dist) * 0.3;
            }

            // Отражение от границ
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;

            pctx.beginPath();
            pctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            pctx.fillStyle = hexToRgba(accent, 0.5);
            pctx.fill();

            // Связи между близкими частицами — "нейронная сеть"
            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j];
                const d = Math.hypot(p.x - q.x, p.y - q.y);
                if (d < 120) {
                    pctx.beginPath();
                    pctx.moveTo(p.x, p.y);
                    pctx.lineTo(q.x, q.y);
                    pctx.strokeStyle = hexToRgba(accent, 0.12 * (1 - d / 120));
                    pctx.lineWidth = 1;
                    pctx.stroke();
                }
            }
        }

        rafId = requestAnimationFrame(animateParticles);
    }

    function hexToRgba(hex, alpha) {
        hex = hex.replace('#', '');
        if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        return `rgba(${r},${g},${b},${alpha})`;
    }

    // ============================================================
    //  2. РЕАКТИВНЫЙ КУРСОР (свечение-спутник)
    // ============================================================
    function initCursorGlow() {
        if (reduceMotion || isMobile) return;

        const glow = document.createElement('div');
        glow.className = 'fx-cursor-glow';
        document.body.appendChild(glow);

        let gx = pointer.x, gy = pointer.y;

        function loop() {
            gx += (pointer.x - gx) * 0.12;
            gy += (pointer.y - gy) * 0.12;
            glow.style.transform = `translate(${gx}px, ${gy}px)`;
            requestAnimationFrame(loop);
        }
        loop();

        // Увеличение свечения над интерактивными элементами
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('a, button, .course-card, .benefit-card')) {
                glow.classList.add('is-active');
            }
        });
        document.addEventListener('mouseout', () => glow.classList.remove('is-active'));
    }

    // Единый трекинг указателя
    window.addEventListener('mousemove', (e) => {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
    });

    // ============================================================
    //  3. 3D-TILT КАРТОЧКИ
    // ============================================================
    function initTiltCards() {
        if (reduceMotion || isMobile) return;

        const cards = document.querySelectorAll(
            '.course-card, .benefit-card, .testimonial-card'
        );

        cards.forEach((card) => {
            card.classList.add('fx-tilt');
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const px = (e.clientX - rect.left) / rect.width;
                const py = (e.clientY - rect.top) / rect.height;
                const rx = (py - 0.5) * -10;
                const ry = (px - 0.5) * 12;
                card.style.transform =
                    `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
                card.style.setProperty('--shine-x', px * 100 + '%');
                card.style.setProperty('--shine-y', py * 100 + '%');
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ============================================================
    //  4. МАГНИТНЫЕ КНОПКИ
    // ============================================================
    function initMagneticButtons() {
        if (reduceMotion || isMobile) return;

        document.querySelectorAll('.btn-primary, .cta-button-nav').forEach((btn) => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const mx = e.clientX - rect.left - rect.width / 2;
                const my = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${mx * 0.25}px, ${my * 0.35}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // ============================================================
    //  5. SCROLL-REVEAL (каскадное появление)
    // ============================================================
    function initScrollReveal() {
        const targets = document.querySelectorAll(
            '.benefit-card, .course-card, .testimonial-card, .about-item, .section-header'
        );

        if (reduceMotion) {
            targets.forEach((t) => t.classList.add('reveal-in'));
            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        const delay = (entry.target.dataset.revealDelay || (i % 6) * 90);
                        setTimeout(() => entry.target.classList.add('reveal-in'), delay);
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        targets.forEach((t) => {
            t.classList.add('reveal-prep');
            io.observe(t);
        });
    }

    // ============================================================
    //  6. КОНФЕТТИ (для церемоний)
    // ============================================================
    function confetti() {
        if (reduceMotion) return;

        const canvas = document.createElement('canvas');
        canvas.className = 'fx-confetti';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#0ea5e9'];
        const pieces = Array.from({ length: 140 }, () => ({
            x: Math.random() * canvas.width,
            y: -20 - Math.random() * canvas.height * 0.3,
            r: Math.random() * 7 + 3,
            color: colors[(Math.random() * colors.length) | 0],
            vx: (Math.random() - 0.5) * 6,
            vy: Math.random() * 4 + 3,
            rot: Math.random() * Math.PI,
            vr: (Math.random() - 0.5) * 0.3,
        }));

        let frames = 0;
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pieces.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.08;
                p.rot += p.vr;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
                ctx.restore();
            });
            frames++;
            if (frames < 200) {
                requestAnimationFrame(draw);
            } else {
                canvas.remove();
            }
        }
        draw();
    }

    // ============================================================
    //  7. ВСПЫШКА ЭКРАНА (эволюция)
    // ============================================================
    function flash(color) {
        if (reduceMotion) return;
        const el = document.createElement('div');
        el.className = 'fx-flash';
        el.style.background = color || '#ffffff';
        document.body.appendChild(el);
        requestAnimationFrame(() => el.classList.add('show'));
        setTimeout(() => {
            el.classList.remove('show');
            el.addEventListener('transitionend', () => el.remove(), { once: true });
        }, 500);
    }

    // ============================================================
    //  8. АНИМИРОВАННЫЕ СЧЁТЧИКИ
    // ============================================================
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting || entry.target.dataset.counted) return;
                entry.target.dataset.counted = '1';
                animateCounter(entry.target);
            });
        }, { threshold: 0.6 });
        counters.forEach((c) => io.observe(c));
    }

    function animateCounter(el) {
        const raw = el.textContent.trim();
        const match = raw.match(/^([\d\s]+)(.*)$/);
        if (!match) return;
        const target = parseInt(match[1].replace(/\s/g, ''), 10);
        const suffix = match[2] || '';
        if (isNaN(target)) return;

        const duration = 1400;
        const start = performance.now();
        function step(now) {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            el.textContent = Math.round(target * eased) + suffix;
            if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    // ============================================================
    //  9. ПРОГРЕСС ЧТЕНИЯ (верхняя полоса)
    // ============================================================
    function initReadingProgress() {
        const bar = document.createElement('div');
        bar.className = 'fx-reading-progress';
        document.body.appendChild(bar);

        window.addEventListener('scroll', () => {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
            bar.style.width = pct + '%';
        }, { passive: true });
    }

    // ============================================================
    //  ИНИЦИАЛИЗАЦИЯ
    // ============================================================
    function init() {
        initParticleField();
        initCursorGlow();
        initTiltCards();
        initMagneticButtons();
        initScrollReveal();
        initCounters();
        initReadingProgress();
    }

    function destroy() {
        if (rafId) cancelAnimationFrame(rafId);
        if (particleCanvas) particleCanvas.remove();
    }

    return { init, destroy, confetti, flash };
})();

window.AnimationEngine = AnimationEngine;
