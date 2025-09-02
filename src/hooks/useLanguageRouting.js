import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../i18n';

export const useLanguageRouting = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const currentLangFromPath = pathSegments[0];

    // Check if URL has a language prefix
    if (supportedLanguages.includes(currentLangFromPath)) {
      // Language is in URL, use it
      if (i18n.language !== currentLangFromPath) {
        i18n.changeLanguage(currentLangFromPath);
      }
    } else {
      // No language in URL, detect and redirect
      const detectedLang = i18n.language || 'en';
      
      if (!supportedLanguages.includes(detectedLang)) {
        // Unsupported language detected, redirect to not supported page
        navigate('/language-not-supported');
        return;
      }

      // Redirect to language-prefixed URL if not English
      if (detectedLang !== 'en') {
        const newPath = `/${detectedLang}${location.pathname}${location.search}`;
        navigate(newPath, { replace: true });
      }
    }
  }, [location, navigate, i18n]);

  return {
    currentLanguage: i18n.language,
    isLanguageSupported: (lang) => supportedLanguages.includes(lang)
  };
};

export const getLanguageFromPath = (pathname) => {
  const pathSegments = pathname.split('/').filter(Boolean);
  const potentialLang = pathSegments[0];
  
  if (supportedLanguages.includes(potentialLang)) {
    return {
      language: potentialLang,
      pathWithoutLanguage: '/' + pathSegments.slice(1).join('/')
    };
  }
  
  return {
    language: 'en',
    pathWithoutLanguage: pathname
  };
};

export const buildLanguagePath = (language, path) => {
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return language === 'en' ? `/${cleanPath}` : `/${language}/${cleanPath}`;
};