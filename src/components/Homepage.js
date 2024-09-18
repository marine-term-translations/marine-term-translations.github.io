import React, { useEffect, useState } from 'react';

const MarckdownViewer = ({ fullLink, title }) => {
  const [link, setLink] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mdContent, setMdContent] = useState('');

  useEffect(() => {
    const fetchReadme = async () => {
      
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
      <h1><a href={link}> {title} </a></h1>
    </div>
  );
};

export default MarckdownViewer;