import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import MarckdownViewer from "./components/MarckdownViewer";
import ListRepo from "./components/ListRepo";
import ActiveTranslationSpaces from "./components/ActiveTranslationSpaces";
import AdminDashboard from "./components/AdminDashboard";
import LanguageNotSupported from "./components/LanguageNotSupported";
import { AuthProvider } from "./contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from './i18n';
import { useEffect } from 'react';

function App() {
  // Component to handle dynamic translation repository routes
  const TranslationRepo = () => {
    const { repoName } = useParams();
    const repoUrl = `https://raw.githubusercontent.com/marine-term-translations/${repoName}/main/README.md`;
    return <MarckdownViewer fullLink={repoUrl} />;
  };

  // Component to handle language routing
  const LanguageWrapper = ({ children }) => {
    const { lang } = useParams();
    const { i18n } = useTranslation();

    useEffect(() => {
      if (lang && supportedLanguages.includes(lang)) {
        i18n.changeLanguage(lang);
      }
    }, [lang, i18n]);

    return children;
  };

  // Component to redirect based on browser language
  // const LanguageRedirect = () => {
  //   const { i18n } = useTranslation();
    
  //   useEffect(() => {
  //     // Check browser language
  //     const browserLang = navigator.language.split('-')[0];
  //     const detectedLang = supportedLanguages.includes(browserLang) ? browserLang : 'en';
      
  //     // Check localStorage
  //     const storedLang = localStorage.getItem('i18nextLng');
  //     const targetLang = (storedLang && supportedLanguages.includes(storedLang)) ? storedLang : detectedLang;
      
  //     // Set i18n language
  //     i18n.changeLanguage(targetLang);
      
  //     // Navigate to appropriate language route
  //     if (targetLang === 'en') {
  //       window.location.hash = '#/';
  //     } else {
  //       window.location.hash = `#/${targetLang}/`;
  //     }
  //   }, [i18n]);

  //   return null;
  // };

  // Main content routes - these are the routes that will be shared across languages
  const getMainRoutes = () => [
    <Route
      key="home"
      path="/"
      element={
        <>
          <MarckdownViewer fullLink="https://raw.githubusercontent.com/marine-term-translations/marine-term-translations.github.io/main/siteInfo.md" />
          <ActiveTranslationSpaces />
          <MarckdownViewer fullLink="https://raw.githubusercontent.com/marine-term-translations/marine-term-translations.github.io/main/conventions.md" />
        </>
      }
    />,
    
    /* Translator */
    <Route key="list" path="/list" element={<ListRepo />} />,
    <Route
      key="about"
      path="/about"
      element={
        <MarckdownViewer fullLink="https://raw.githubusercontent.com/marine-term-translations/Front-End/refs/heads/main/Information/Usage.md" />
      }
    />,

    /* Developer */
    <Route
      key="front"
      path="/front"
      element={<MarckdownViewer fullLink="" />}
    />,
    <Route
      key="back"
      path="/back"
      element={
        <MarckdownViewer fullLink="https://raw.githubusercontent.com/marine-term-translations/Back-End/main/Readme.md" />
      }
    />,
    <Route
      key="gh_action"
      path="/gh_action"
      element={
        <MarckdownViewer fullLink="https://raw.githubusercontent.com/vliz-be-opsci/ldes_translation_gh_action/main/README.md" />
      }
    />,
    <Route
      key="general"
      path="/general"
      element={
        <MarckdownViewer fullLink="https://raw.githubusercontent.com/marine-term-translations/marine-term-translations.github.io/main/README.md" />
      }
    />,

    /* Administrator */
    <Route
      key="instruction"
      path="/instruction"
      element={<MarckdownViewer fullLink="" />}
    />,
    <Route
      key="admin-dashboard"
      path="/admin-dashboard"
      element={<AdminDashboard />}
    />,

    /* Dynamic routes for translation repositories */
    <Route
      key="repo"
      path="/:repoName"
      element={<TranslationRepo />}
    />
  ];

  return (
    <AuthProvider>
      <HashRouter>
        <div className="App">
          <NavBar />
          <Routes>
            {/* Language not supported route */}
            <Route path="/language-not-supported" element={<LanguageNotSupported />} />
            
            {/* Language-specific routes */}
            {supportedLanguages.filter(lang => lang !== 'en').map(lang => (
              <Route
                key={lang}
                path={`/${lang}/*`}
                element={
                  <LanguageWrapper>
                    <Routes>
                      {getMainRoutes()}
                    </Routes>
                  </LanguageWrapper>
                }
              />
            ))}
            
            {/* English routes (no prefix) */}
            <Route
              path="/*"
              element={
                <LanguageWrapper>
                  <Routes>
                    {getMainRoutes()}
                  </Routes>
                </LanguageWrapper>
              }
            />
          </Routes>
        </div>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
