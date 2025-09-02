import React from 'react';
import SEOHelmet from '../components/SEOHelmet';
import ListRepo from '../components/ListRepo';

const ListPage = () => {
  return (
    <>
      <SEOHelmet
        title="Translation Repositories"
        description="Browse all active marine term translation repositories. Find translation projects for different languages, contribute to marine vocabulary databases, and access collaborative translation spaces."
        keywords="translation repositories, marine translation projects, collaborative translation, language databases, marine vocabulary translation, multilingual repositories"
        url="/list"
        type="website"
      />
      <ListRepo />
    </>
  );
};

export default ListPage;