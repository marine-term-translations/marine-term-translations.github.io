import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHelmet = ({
  title = 'Marine Term Translations',
  description = 'A comprehensive platform for marine terminology translations, facilitating multilingual understanding of maritime concepts and technical terms.',
  keywords = 'marine, maritime, translation, terminology, ocean, sea, nautical, multilingual',
  image = '/logo512.png',
  url = 'https://marine-term-translations.github.io',
  type = 'website'
}) => {
  const fullTitle = title === 'Marine Term Translations' ? title : `${title} | Marine Term Translations`;
  const fullUrl = url.startsWith('http') ? url : `https://marine-term-translations.github.io${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `https://marine-term-translations.github.io${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Marine Term Translations Team" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Marine Term Translations" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@marine_terms" />
      <meta name="twitter:creator" content="@marine_terms" />
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#0066cc" />
      <meta name="application-name" content="Marine Term Translations" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Marine Term Translations",
          "description": description,
          "url": "https://marine-term-translations.github.io",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://marine-term-translations.github.io/list?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHelmet;