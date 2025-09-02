import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

const supportedLanguages = ['en', 'fr', 'nl'];

// Custom language detection function
const customDetector = {
  name: 'customDetector',
  lookup() {
    // First check localStorage
    const stored = localStorage.getItem('i18nextLng');
    if (stored && supportedLanguages.includes(stored)) {
      return stored;
    }

    // Then check browser language
    const browserLang = navigator.language.split('-')[0];
    if (supportedLanguages.includes(browserLang)) {
      return browserLang;
    }

    // Check navigator.languages array
    for (const lang of navigator.languages || []) {
      const langCode = lang.split('-')[0];
      if (supportedLanguages.includes(langCode)) {
        return langCode;
      }
    }

    // Default to English
    return 'en';
  },
  cacheUserLanguage(lng) {
    localStorage.setItem('i18nextLng', lng);
  }
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: customDetector.lookup(), // Set initial language
    fallbackLng: 'en',
    supportedLngs: supportedLanguages,
    
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage']
    },

    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false
    }
  });

// Add custom detector
i18n.services.languageDetector.addDetector(customDetector);

export default i18n;
export { supportedLanguages };