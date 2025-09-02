import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../i18n';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Update URL to reflect language change
    const currentPath = window.location.hash.replace('#/', '');
    const pathParts = currentPath.split('/');
    
    // Remove current language prefix if exists
    if (supportedLanguages.includes(pathParts[0])) {
      pathParts.shift();
    }
    
    // Add new language prefix
    const newPath = lng === 'en' ? pathParts.join('/') : `${lng}/${pathParts.join('/')}`;
    window.location.hash = `#/${newPath}`;
  };

  const getCurrentLanguageLabel = () => {
    return t(`language.${i18n.language}`);
  };

  return (
    <NavDropdown title={getCurrentLanguageLabel()} id="language-dropdown">
      {supportedLanguages.map((lng) => (
        <NavDropdown.Item
          key={lng}
          onClick={() => changeLanguage(lng)}
          active={i18n.language === lng}
        >
          {t(`language.${lng}`)}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};

export default LanguageSwitcher;