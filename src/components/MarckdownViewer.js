import React, { useEffect, useState } from 'react';
import Markdown from 'marked-react';

const MarckdownViewer = ({ fullLink, title=null }) => {
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
          setLink(githubUrl)
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

    fetchReadme();
  }, [fullLink]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
      return <div>Error: {error}</div>;
  }

  if (!mdContent) {
      return <div>Error loading content.</div>;
  }

  return (
    <div>
      {title ? (<h1><a href={link}> {title} </a></h1>):(<></>)}
      <Markdown>{mdContent}</Markdown>
    </div>
  );
};

export default MarckdownViewer;
