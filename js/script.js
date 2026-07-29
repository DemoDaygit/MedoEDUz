// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initScrollEffects();
    initForm();
    initAnimations();
});

// ===== НАВИГАЦИЯ =====
function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Гамбургер меню
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Изменение навбара при скролле
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ===== ЭФФЕКТЫ ПРИ СКРОЛЛЕ =====
function initScrollEffects() {
    // Кнопка "Наверх"
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Анимация появления элементов
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Наблюдаем за секциями
    const sections = document.querySelectorAll('.section-header, .benefit-card, .course-card, .testimonial-card, .about-item');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// ===== ФОРМА =====
function initForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Валидация
            if (!data.name || !data.email) {
                showNotification(t('Пожалуйста, заполните обязательные поля'), 'error');
                return;
            }

            // Простая валидация email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification(t('Пожалуйста, введите корректный email'), 'error');
                return;
            }

            // Симуляция отправки формы
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = t('Отправка...');
            submitBtn.disabled = true;

            try {
                // Здесь должна быть реальная отправка на сервер
                // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });

                // Симуляция задержки
                await new Promise(resolve => setTimeout(resolve, 1500));

                showNotification(t('Спасибо! Мы свяжемся с вами в ближайшее время'), 'success');
                contactForm.reset();
            } catch (error) {
                showNotification(t('Произошла ошибка. Попробуйте позже'), 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// ===== УВЕДОМЛЕНИЯ =====
function showNotification(message, type = 'info') {
    // Удаляем предыдущие уведомления
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Стили для уведомления
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        backgroundColor: type === 'success' ? '#3FD87A' : type === 'error' ? '#FF6B70' : '#8B7CFF',
        color: 'white',
        fontWeight: '600',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        zIndex: '9999',
        animation: 'slideIn 0.3s ease',
        maxWidth: '400px'
    });

    document.body.appendChild(notification);

    // Удаляем через 5 секунд
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ===== АНИМАЦИИ =====
function initAnimations() {
    // Добавляем CSS для анимаций
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .animate-fade-in-up {
            animation: fadeInUp 0.6s ease;
        }
    `;
    document.head.appendChild(style);
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====

// Плавный скролл к секции
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        const offset = 80; // Высота навбара
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Скролл к контактам
function scrollToContact() {
    scrollToSection('#contact');
}

// Скролл к разделу "О проекте"
function scrollToAbout() {
    scrollToSection('#about');
}

// Скролл наверх
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== СЧЕТЧИКИ =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Скорость анимации

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target') || parseInt(counter.innerText);
            const count = +counter.innerText.replace(/\D/g, '');

            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        // Запускаем анимацию при появлении в области видимости
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    updateCount();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// Анимацией счётчиков теперь управляет AnimationEngine (js/animations.js),
// который сохраняет суффиксы (+, %) и использует плавный easing.
// Старая реализация выше оставлена для обратной совместимости, но не вызывается.

// ===== ПАРАЛЛАКС ЭФФЕКТ =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== ЛЕНИВАЯ ЗАГРУЗКА ИЗОБРАЖЕНИЙ =====
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

lazyLoadImages();

// ===== ТЕМНАЯ ТЕМА (ОПЦИОНАЛЬНО) =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');

    if (themeToggle) {
        // Проверяем сохраненную тему
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);

        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// ===== ОБРАБОТКА КНОПОК КУРСОВ =====
document.querySelectorAll('.btn-course').forEach(btn => {
    btn.addEventListener('click', function() {
        const courseName = this.closest('.course-card').querySelector('h3').textContent;
        showNotification(`Вы выбрали курс: ${courseName}. Прокрутите к форме для записи!`, 'info');
        setTimeout(() => scrollToContact(), 1000);
    });
});

// ===== ВАЛИДАЦИЯ ТЕЛЕФОНА =====
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 0) {
            if (value[0] === '7' || value[0] === '8') {
                value = '7' + value.substring(1);
            }

            let formatted = '+7';
            if (value.length > 1) {
                formatted += ' (' + value.substring(1, 4);
            }
            if (value.length >= 5) {
                formatted += ') ' + value.substring(4, 7);
            }
            if (value.length >= 8) {
                formatted += '-' + value.substring(7, 9);
            }
            if (value.length >= 10) {
                formatted += '-' + value.substring(9, 11);
            }

            e.target.value = formatted;
        }
    });
}

// ===== ОТСЛЕЖИВАНИЕ АКТИВНОЙ СЕКЦИИ В НАВИГАЦИИ =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

updateActiveNavLink();

console.log(t('🦡 MedoEDUz - Медоеду ВСЁ! Сайт загружен успешно.'));
