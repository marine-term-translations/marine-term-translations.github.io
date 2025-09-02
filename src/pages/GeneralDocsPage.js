import React from 'react';
import SEOHelmet from '../components/SEOHelmet';
import MarckdownViewer from '../components/MarckdownViewer';

const GeneralDocsPage = () => {
  return (
    <>
      <SEOHelmet
        title="General Documentation"
        description="Access general documentation and overview of the Marine Term Translations platform. Learn about project goals, structure, and comprehensive platform information."
        keywords="general documentation, platform overview, marine translations guide, project documentation, platform information, getting started"
        url="/general"
        type="website"
      />
      <MarckdownViewer fullLink="https://raw.githubusercontent.com/marine-term-translations/marine-term-translations.github.io/main/README.md" />
    </>
  );
};

export default GeneralDocsPage;