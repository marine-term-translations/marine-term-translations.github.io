import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Markdown from 'marked-react';
import Lowlight from 'react-lowlight';
import 'bootstrap/dist/css/bootstrap.min.css';
import javascript from 'highlight.js/lib/languages/javascript';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/default.css'

Lowlight.registerLanguage('js', javascript);
Lowlight.registerLanguage('bash', bash);
Lowlight.registerLanguage('json', json);

const MarckdownViewer = ({ fullLink = null}) => {
  const [link, setLink] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mdContent, setMdContent] = useState('');

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const response = await fetch(fullLink);
        let text = await response.text();

        const urlParts = fullLink.split('/');
        const baseUrl = urlParts.slice(0, urlParts.length - 1).join('/');

        text = text.replace(/!\[([^\]]*)]\(([^)]+)\)/g, (match, altText, imgUrl) => {
          if (!imgUrl.startsWith('http')) {
            imgUrl = `${baseUrl}/${imgUrl}`;
          }
          return `![${altText}](${imgUrl})`;
        });

        if (fullLink.includes('raw.githubusercontent.com')) {
          let githubUrl = fullLink.replace('raw.githubusercontent.com', 'github.com');
          githubUrl = githubUrl.replace('/main/', '/blob/main/');
          setLink(githubUrl);
        }

        setMdContent(text);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error fetching Marckdown:', error);
        setLoading(false);
        setError('Failed to fetch the Marckdown from GitHub.');
      }
    };

    if (fullLink) {
      fetchReadme();
    }
  }, [fullLink]);

  const getFirstLine = (text) => {
    const lines = text.split('\n');
    return lines[0];
  };

  const renderer = {
    code(snippet, lang) {
      return <Lowlight key={Math.random()} language={lang} value={snippet} />;
    },
  };

  if (!fullLink) {
    return <div>The link for this page was not filled</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!mdContent) {
    return <div>Error loading content.</div>;
  }

  const firstLine = getFirstLine(mdContent);

  return (
    <div className='mt-5'>
      {firstLine && (
        <h1 className='m-5'><a href={link}>{firstLine}</a></h1>
      )}
      <Markdown value={mdContent.split('\n').slice(1).join('\n')} renderer={renderer} openLinksInNewTab breaks gmf/>
    </div>
  );
};

export default MarckdownViewer;