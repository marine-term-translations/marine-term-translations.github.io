import React from 'react';
import SEOHelmet from '../components/SEOHelmet';
import MarckdownViewer from '../components/MarckdownViewer';

const AboutPage = () => {
  return (
    <>
      <SEOHelmet
        title="About Marine Term Translations"
        description="Learn about the Marine Term Translations platform, its mission to facilitate multilingual understanding of maritime concepts, and how to use our translation tools and resources."
        keywords="about marine translations, maritime terminology guide, marine vocabulary platform, translation platform usage, marine terminology mission"
        url="/about"
        type="website"
      />
      <MarckdownViewer fullLink="https://raw.githubusercontent.com/marine-term-translations/Front-End/refs/heads/main/Information/Usage.md" />
    </>
  );
};

export default AboutPage;