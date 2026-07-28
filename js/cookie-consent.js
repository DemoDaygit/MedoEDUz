// Cookie Consent Banner
// Управление согласием на использование cookies

class CookieConsent {
    constructor() {
        this.cookieName = 'medoeduz_cookie_consent';
        this.consentGiven = this.getConsent();
        this.init();
    }

    init() {
        // Если согласие уже дано, не показываем баннер
        if (this.consentGiven) {
            this.enableAnalytics();
            return;
        }

        // Создаем и показываем баннер
        this.createBanner();
        this.showBanner();
    }

    createBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-consent-text">
                    <h3>🍪 Мы используем cookies</h3>
                    <p>
                        Мы используем cookies для улучшения вашего опыта на сайте, анализа посещаемости
                        и персонализации контента. Продолжая использовать сайт, вы соглашаетесь с нашей
                        <a href="pages/privacy-policy.html">Политикой конфиденциальности</a>.
                    </p>
                </div>
                <div class="cookie-consent-actions">
                    <button id="cookie-accept-all" class="btn btn-primary">
                        Принять все
                    </button>
                    <button id="cookie-accept-necessary" class="btn btn-secondary">
                        Только необходимые
                    </button>
                    <button id="cookie-settings" class="btn btn-text">
                        Настроить
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Добавляем обработчики событий
        document.getElementById('cookie-accept-all').addEventListener('click', () => {
            this.acceptAll();
        });

        document.getElementById('cookie-accept-necessary').addEventListener('click', () => {
            this.acceptNecessary();
        });

        document.getElementById('cookie-settings').addEventListener('click', () => {
            this.showSettings();
        });
    }

    showBanner() {
        setTimeout(() => {
            const banner = document.getElementById('cookie-consent-banner');
            if (banner) {
                banner.classList.add('show');
                // Сообщаем остальному интерфейсу реальную высоту баннера,
                // чтобы плавающие элементы (аватар игрока, тосты XP)
                // приподнялись и не оказались под ним.
                document.documentElement.style.setProperty(
                    '--cookie-banner-h', banner.offsetHeight + 'px'
                );
                document.body.classList.add('cookie-banner-visible');
            }
        }, 1000);
    }

    hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('show');
            document.body.classList.remove('cookie-banner-visible');
            document.documentElement.style.setProperty('--cookie-banner-h', '0px');
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }

    acceptAll() {
        this.setConsent({
            necessary: true,
            functional: true,
            analytics: true,
            marketing: true
        });
        this.enableAnalytics();
        this.hideBanner();
        this.showNotification('Настройки cookies сохранены', 'success');
    }

    acceptNecessary() {
        this.setConsent({
            necessary: true,
            functional: false,
            analytics: false,
            marketing: false
        });
        this.hideBanner();
        this.showNotification('Сохранены только необходимые cookies', 'info');
    }

    showSettings() {
        this.hideBanner();

        const settingsModal = document.createElement('div');
        settingsModal.id = 'cookie-settings-modal';
        settingsModal.className = 'cookie-settings-modal';
        settingsModal.innerHTML = `
            <div class="cookie-settings-overlay"></div>
            <div class="cookie-settings-content">
                <div class="cookie-settings-header">
                    <h2>Настройки cookies</h2>
                    <button class="cookie-settings-close">&times;</button>
                </div>
                <div class="cookie-settings-body">
                    <p class="cookie-settings-description">
                        Выберите, какие типы cookies вы хотите разрешить. Вы можете изменить эти настройки в любое время.
                    </p>

                    <div class="cookie-setting-item">
                        <div class="cookie-setting-info">
                            <h4>Необходимые cookies</h4>
                            <p>Обеспечивают базовую функциональность сайта. Не могут быть отключены.</p>
                        </div>
                        <label class="toggle-switch disabled">
                            <input type="checkbox" checked disabled>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>

                    <div class="cookie-setting-item">
                        <div class="cookie-setting-info">
                            <h4>Функциональные cookies</h4>
                            <p>Запоминают ваши предпочтения и персональные настройки.</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="cookie-functional">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>

                    <div class="cookie-setting-item">
                        <div class="cookie-setting-info">
                            <h4>Аналитические cookies</h4>
                            <p>Помогают нам понять, как посетители используют наш сайт.</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="cookie-analytics">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>

                    <div class="cookie-setting-item">
                        <div class="cookie-setting-info">
                            <h4>Маркетинговые cookies</h4>
                            <p>Используются для показа релевантной рекламы.</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="cookie-marketing">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
                <div class="cookie-settings-footer">
                    <button id="cookie-save-settings" class="btn btn-primary">
                        Сохранить настройки
                    </button>
                    <button id="cookie-accept-all-modal" class="btn btn-secondary">
                        Принять все
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(settingsModal);

        // Показываем модальное окно
        setTimeout(() => {
            settingsModal.classList.add('show');
        }, 10);

        // Обработчики
        document.querySelector('.cookie-settings-close').addEventListener('click', () => {
            this.closeSettings();
        });

        document.querySelector('.cookie-settings-overlay').addEventListener('click', () => {
            this.closeSettings();
        });

        document.getElementById('cookie-save-settings').addEventListener('click', () => {
            this.saveSettings();
        });

        document.getElementById('cookie-accept-all-modal').addEventListener('click', () => {
            this.acceptAll();
            this.closeSettings();
        });
    }

    closeSettings() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    saveSettings() {
        const consent = {
            necessary: true,
            functional: document.getElementById('cookie-functional').checked,
            analytics: document.getElementById('cookie-analytics').checked,
            marketing: document.getElementById('cookie-marketing').checked
        };

        this.setConsent(consent);

        if (consent.analytics) {
            this.enableAnalytics();
        }

        this.closeSettings();
        this.showNotification('Настройки cookies сохранены', 'success');
    }

    getConsent() {
        const consent = localStorage.getItem(this.cookieName);
        return consent ? JSON.parse(consent) : null;
    }

    setConsent(consent) {
        const consentData = {
            ...consent,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem(this.cookieName, JSON.stringify(consentData));
        this.consentGiven = consentData;
    }

    enableAnalytics() {
        // Здесь подключаем Google Analytics, Яндекс.Метрику и т.д.
        console.log('Analytics enabled');

        // Пример для Google Analytics
        if (window.gtag) {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }

        // Пример для Яндекс.Метрики
        if (window.ym) {
            ym('YOUR_COUNTER_ID', 'setUserID', 'anonymous');
        }
    }

    showNotification(message, type = 'info') {
        // Используем функцию из script.js, если она доступна
        if (typeof showNotification === 'function') {
            showNotification(message, type);
        } else {
            console.log(`${type}: ${message}`);
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new CookieConsent();
});
