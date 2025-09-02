import React from 'react';
import SEOHelmet from '../components/SEOHelmet';
import MarckdownViewer from '../components/MarckdownViewer';
import ActiveTranslationSpaces from '../components/ActiveTranslationSpaces';

const HomePage = () => {
  return (
    <>
      <SEOHelmet
        title="Marine Term Translations - Home"
        description="Discover comprehensive marine terminology translations across multiple languages. Access active translation spaces, contribute to marine vocabulary databases, and explore maritime documentation."
        keywords="marine translation, maritime terminology, ocean vocabulary, nautical terms, multilingual marine dictionary, sea terminology, marine translation platform"
        url="/"
        type="website"
      />
      <MarckdownViewer fullLink="https://raw.githubusercontent.com/marine-term-translations/marine-term-translations.github.io/main/siteInfo.md" />
      <ActiveTranslationSpaces />
    </>
  );
};

export default HomePage;