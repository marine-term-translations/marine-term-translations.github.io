const fs = require('fs');
const path = require('path');

// Routes configuration with SEO metadata
const routes = {
  '/': {
    title: 'Marine Term Translations - Home',
    description: 'Discover comprehensive marine terminology translations across multiple languages. Access active translation spaces, contribute to marine vocabulary databases, and explore maritime documentation.',
    keywords: 'marine translation, maritime terminology, ocean vocabulary, nautical terms, multilingual marine dictionary, sea terminology, marine translation platform'
  },
  '/list': {
    title: 'Translation Repositories | Marine Term Translations',
    description: 'Browse all active marine term translation repositories. Find translation projects for different languages, contribute to marine vocabulary databases, and access collaborative translation spaces.',
    keywords: 'translation repositories, marine translation projects, collaborative translation, language databases, marine vocabulary translation, multilingual repositories'
  },
  '/about': {
    title: 'About Marine Term Translations',
    description: 'Learn about the Marine Term Translations platform, its mission to facilitate multilingual understanding of maritime concepts, and how to use our translation tools and resources.',
    keywords: 'about marine translations, maritime terminology guide, marine vocabulary platform, translation platform usage, marine terminology mission'
  },
  '/front': {
    title: 'Frontend Documentation | Marine Term Translations',
    description: 'Explore the frontend development documentation for Marine Term Translations platform. Learn about React components, UI frameworks, and development guidelines for contributors.',
    keywords: 'frontend documentation, React development, marine translations frontend, UI components, development guidelines, contributor docs'
  },
  '/back': {
    title: 'Backend Documentation | Marine Term Translations',
    description: 'Access backend development documentation for Marine Term Translations platform. Learn about APIs, data structures, server architecture, and backend development guidelines.',
    keywords: 'backend documentation, API documentation, marine translations backend, server architecture, database design, backend development'
  },
  '/gh_action': {
    title: 'GitHub Actions Documentation | Marine Term Translations',
    description: 'Learn about GitHub Actions integration for Marine Term Translations. Discover automated workflows, CI/CD processes, and translation automation tools.',
    keywords: 'GitHub Actions, CI/CD, translation automation, automated workflows, marine translations automation, continuous integration'
  },
  '/general': {
    title: 'General Documentation | Marine Term Translations',
    description: 'Access general documentation and overview of the Marine Term Translations platform. Learn about project goals, structure, and comprehensive platform information.',
    keywords: 'general documentation, platform overview, marine translations guide, project documentation, platform information, getting started'
  },
  '/admin-dashboard': {
    title: 'Admin Dashboard | Marine Term Translations',
    description: 'Access the administrative dashboard for Marine Term Translations platform. Manage translations, monitor projects, and oversee platform operations.',
    keywords: 'admin dashboard, translation management, platform administration, marine translations admin, project management'
  }
};

function generateStaticHtml(route, metadata) {
  const baseUrl = 'https://marine-term-translations.github.io';
  const canonicalUrl = `${baseUrl}${route}`;
  const imageUrl = `${baseUrl}/logo512.png`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0066cc" />
    
    <!-- Basic SEO Meta Tags -->
    <title>${metadata.title}</title>
    <meta name="description" content="${metadata.description}" />
    <meta name="keywords" content="${metadata.keywords}" />
    <meta name="author" content="Marine Term Translations Team" />
    <meta name="robots" content="index, follow" />
    <meta name="language" content="English" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${canonicalUrl}" />
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${metadata.title}" />
    <meta property="og:description" content="${metadata.description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="Marine Term Translations" />
    <meta property="og:locale" content="en_US" />
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${metadata.title}" />
    <meta name="twitter:description" content="${metadata.description}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <meta name="twitter:site" content="@marine_terms" />
    <meta name="twitter:creator" content="@marine_terms" />
    
    <!-- Additional Meta Tags -->
    <meta name="application-name" content="Marine Term Translations" />
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "${metadata.title}",
      "description": "${metadata.description}",
      "url": "${canonicalUrl}",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Marine Term Translations",
        "url": "${baseUrl}"
      }
    }
    </script>
    
    <link rel="apple-touch-icon" href="/logo192.png" />
    <link rel="manifest" href="/manifest.json" />
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    
    <!-- Fallback redirect script for hash routing -->
    <script>
      // If the current path doesn't match the expected route, redirect using hash routing
      if (window.location.pathname !== '/' && !window.location.hash) {
        window.location.replace('/#' + window.location.pathname);
      }
    </script>
</body>
</html>`;
}

function createStaticPages() {
  const buildDir = '/home/runner/work/marine-term-translations.github.io/marine-term-translations.github.io/build';
  
  // Create static HTML pages for each route
  Object.entries(routes).forEach(([route, metadata]) => {
    const routePath = route === '/' ? '' : route;
    const dirPath = path.join(buildDir, routePath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // Generate and save the HTML
    const html = generateStaticHtml(route, metadata);
    const filePath = path.join(dirPath, 'index.html');
    fs.writeFileSync(filePath, html);
    
    console.log(`Generated static HTML for: ${route} -> ${filePath}`);
  });
  
  console.log('Static HTML pages generation completed!');
}

// Run the static page generation
createStaticPages();