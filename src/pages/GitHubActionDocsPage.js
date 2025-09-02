import React from 'react';
import SEOHelmet from '../components/SEOHelmet';
import MarckdownViewer from '../components/MarckdownViewer';

const GitHubActionDocsPage = () => {
  return (
    <>
      <SEOHelmet
        title="GitHub Actions Documentation"
        description="Learn about GitHub Actions integration for Marine Term Translations. Discover automated workflows, CI/CD processes, and translation automation tools."
        keywords="GitHub Actions, CI/CD, translation automation, automated workflows, marine translations automation, continuous integration"
        url="/gh_action"
        type="website"
      />
      <MarckdownViewer fullLink="https://raw.githubusercontent.com/vliz-be-opsci/ldes_translation_gh_action/main/README.md" />
    </>
  );
};

export default GitHubActionDocsPage;