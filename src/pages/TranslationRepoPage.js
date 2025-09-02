import React from 'react';
import SEOHelmet from '../components/SEOHelmet';
import MarckdownViewer from '../components/MarckdownViewer';
import { useParams } from 'react-router-dom';

const TranslationRepoPage = () => {
  const { repoName } = useParams();
  const repoUrl = `https://raw.githubusercontent.com/marine-term-translations/${repoName}/main/README.md`;
  
  // Extract language and vocabulary from repo name (format: VocabularyName-LanguageCode)
  const parts = repoName ? repoName.split('-') : [];
  const languageCode = parts.length > 1 ? parts[parts.length - 1] : '';
  const vocabularyName = parts.length > 1 ? parts.slice(0, -1).join('-') : repoName;
  
  return (
    <>
      <SEOHelmet
        title={`${vocabularyName} Translation (${languageCode.toUpperCase()})`}
        description={`Access the ${vocabularyName} marine terminology translation project for ${languageCode.toUpperCase()} language. Contribute to marine vocabulary translations and explore linguistic resources.`}
        keywords={`${vocabularyName}, ${languageCode} translation, marine terminology ${languageCode}, marine vocabulary ${languageCode}, translation project`}
        url={`/${repoName}`}
        type="website"
      />
      <MarckdownViewer fullLink={repoUrl} />
    </>
  );
};

export default TranslationRepoPage;