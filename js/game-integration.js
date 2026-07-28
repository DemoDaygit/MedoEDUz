/**
 * ============================================================
 *  MedoEDUz Game Integration — Связующий слой
 *  Привязывает игровые события к реальным действиям на сайте
 * ============================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Порядок важен: сначала анимации (на них опираются церемонии),
    // затем игровой UI, затем ядро (оно эмитит события в UI).
    if (window.AnimationEngine) AnimationEngine.init();
    if (window.GameUI) GameUI.init();
    if (window.GameEngine) GameEngine.init();

    if (!window.GameEngine) return;

    // ---------- XP за посещение секций ----------
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    GameEngine.visitSection(entry.target.id);
                }
            });
        },
        { threshold: 0.4 }
    );
    sections.forEach((s) => sectionObserver.observe(s));

    // ---------- XP за изучение курсов ----------
    document.querySelectorAll('.course-card').forEach((card, idx) => {
        const title = card.querySelector('h3')?.textContent?.trim() || `course-${idx}`;
        const handler = () => GameEngine.openCourse(title);
        card.querySelector('.btn-course')?.addEventListener('click', handler);
        // Глубокий интерес: долгое наведение тоже считается
        let hoverTimer;
        card.addEventListener('mouseenter', () => {
            hoverTimer = setTimeout(handler, 2000);
        });
        card.addEventListener('mouseleave', () => clearTimeout(hoverTimer));
    });

    // ---------- Достижение "Социальный" ----------
    const testimonials = document.getElementById('testimonials');
    if (testimonials) {
        testimonials.addEventListener('mouseenter', () => GameEngine.unlock('social'), {
            once: true,
        });
    }

    // ---------- Достижение "Книжный червь" (доскролл до конца) ----------
    let reachedBottom = false;
    window.addEventListener(
        'scroll',
        () => {
            if (reachedBottom) return;
            const scrolledToEnd =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 80;
            if (scrolledToEnd) {
                reachedBottom = true;
                GameEngine.unlock('reader');
            }
        },
        { passive: true }
    );

    // ---------- XP за отправку формы ----------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            GameEngine.unlock('committed');
        });
    }
    // Форма записи на курс (на детальных страницах)
    const enrollForm = document.getElementById('enrollForm');
    if (enrollForm) {
        enrollForm.addEventListener('submit', () => GameEngine.unlock('committed'));
    }

    // ---------- Микро-XP за вовлечённость (клики по интерактиву) ----------
    let clickXpCooldown = false;
    document.addEventListener('click', (e) => {
        if (clickXpCooldown) return;
        if (e.target.closest('a, button')) {
            GameEngine.addXP(5, 'Активность');
            clickXpCooldown = true;
            setTimeout(() => (clickXpCooldown = false), 3000);
        }
    });

    // ---------- Пасхалка: Konami Code ----------
    const konami = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a',
    ];
    let konamiPos = 0;
    document.addEventListener('keydown', (e) => {
        const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        if (key === konami[konamiPos]) {
            konamiPos++;
            if (konamiPos === konami.length) {
                konamiPos = 0;
                GameEngine.unlock('konami');
                if (window.AnimationEngine) {
                    AnimationEngine.confetti();
                    AnimationEngine.flash('#3FD87A');
                }
            }
        } else {
            konamiPos = 0;
        }
    });
});
