import React from 'react';
import SEOHelmet from '../components/SEOHelmet';
import MarckdownViewer from '../components/MarckdownViewer';

const FrontendDocsPage = () => {
  return (
    <>
      <SEOHelmet
        title="Frontend Documentation"
        description="Explore the frontend development documentation for Marine Term Translations platform. Learn about React components, UI frameworks, and development guidelines for contributors."
        keywords="frontend documentation, React development, marine translations frontend, UI components, development guidelines, contributor docs"
        url="/front"
        type="website"
      />
      <MarckdownViewer fullLink="https://raw.githubusercontent.com/marine-term-translations/React-Front-End/refs/heads/main/README.md" />
      <MarckdownViewer fullLink="https://raw.githubusercontent.com/marine-term-translations/marine-term-translations.github.io/main/conventions.md" />
    </>
  );
};

export default FrontendDocsPage;