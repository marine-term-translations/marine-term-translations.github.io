import React from 'react';
import SEOHelmet from '../components/SEOHelmet';
import MarckdownViewer from '../components/MarckdownViewer';

const BackendDocsPage = () => {
  return (
    <>
      <SEOHelmet
        title="Backend Documentation"
        description="Access backend development documentation for Marine Term Translations platform. Learn about APIs, data structures, server architecture, and backend development guidelines."
        keywords="backend documentation, API documentation, marine translations backend, server architecture, database design, backend development"
        url="/back"
        type="website"
      />
      <MarckdownViewer fullLink="https://raw.githubusercontent.com/marine-term-translations/Back-End/main/Readme.md" />
    </>
  );
};

export default BackendDocsPage;