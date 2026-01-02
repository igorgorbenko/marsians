// Internationalization (i18n) Module
let currentLang = localStorage.getItem('lang') || 'ru';
let translations = {};

// Load translations
async function loadTranslations() {
    try {
        const response = await fetch('data/translations.json');
        translations = await response.json();
        return translations;
    } catch (error) {
        console.error('Error loading translations:', error);
        return null;
    }
}

// Get nested translation
function getTranslation(key) {
    const keys = key.split('.');
    let value = translations[currentLang];

    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            return key; // Return key if translation not found
        }
    }

    return value;
}

// Update all elements with data-i18n attribute
function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key);

        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
}

// Switch language
function switchLanguage(lang) {
    if (lang === currentLang) return;

    currentLang = lang;
    localStorage.setItem('lang', lang);

    // Update active state on buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    updateContent();
}

// Initialize i18n
async function initI18n() {
    await loadTranslations();

    // Set up language switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });

        // Set initial active state
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        }
    });

    // Apply initial language
    updateContent();
}

// Export for use in other modules
window.i18n = {
    init: initI18n,
    switch: switchLanguage,
    get: getTranslation,
    getCurrentLang: () => currentLang
};
