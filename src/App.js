import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import MarckdownViewer from "./components/MarckdownViewer";
import LanguageNotSupported from "./components/LanguageNotSupported";
import { AuthProvider } from "./contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supportedLanguages } from "./i18n";
import { useEffect } from "react";

// Import SEO-optimized page components
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import AboutPage from "./pages/AboutPage";
import FrontendDocsPage from "./pages/FrontendDocsPage";
import BackendDocsPage from "./pages/BackendDocsPage";
import GitHubActionDocsPage from "./pages/GitHubActionDocsPage";
import GeneralDocsPage from "./pages/GeneralDocsPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

function App() {
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
    <Route key="home" path="/" element={<HomePage />} />,

    /* Translator */
    <Route key="list" path="/list" element={<ListPage />} />,
    <Route key="about" path="/about" element={<AboutPage />} />,

    /* Developer */
    <Route key="front" path="/front" element={<FrontendDocsPage />} />,
    <Route key="back" path="/back" element={<BackendDocsPage />} />,
    <Route
      key="gh_action"
      path="/gh_action"
      element={<GitHubActionDocsPage />}
    />,
    <Route key="general" path="/general" element={<GeneralDocsPage />} />,

    /* Administrator */
    <Route
      key="instruction"
      path="/instruction"
      element={<MarckdownViewer fullLink="" />}
    />,
    <Route
      key="admin-dashboard"
      path="/admin-dashboard"
      element={<AdminDashboardPage />}
    />,

    <Route key="not-found" path="*" element={<LanguageNotSupported />} />,
  ];

  return (
    <AuthProvider>
      <HashRouter>
        <div className="App">
          <NavBar />
          <Routes>
            {/* Language not supported route */}
            <Route
              path="/language-not-supported"
              element={<LanguageNotSupported />}
            />

            {/* Language-specific routes */}
            {supportedLanguages
              .filter((lang) => lang !== "en")
              .map((lang) => (
                <Route
                  key={lang}
                  path={`/${lang}/*`}
                  element={
                    <LanguageWrapper>
                      <Routes>{getMainRoutes()}</Routes>
                    </LanguageWrapper>
                  }
                />
              ))}

            {/* English routes (no prefix) */}
            <Route
              path="/*"
              element={
                <LanguageWrapper>
                  <Routes>{getMainRoutes()}</Routes>
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
