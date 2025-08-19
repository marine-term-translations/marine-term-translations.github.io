import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import MarckdownViewer from "./components/MarckdownViewer";
import ListRepo from "./components/ListRepo";
import ActiveTranslationSpaces from "./components/ActiveTranslationSpaces";
import { useParams } from "react-router-dom";

function App() {
  // Component to handle dynamic translation repository routes
  const TranslationRepo = () => {
    const { repoName } = useParams();
    const repoUrl = `https://raw.githubusercontent.com/marine-term-translations/${repoName}/main/README.md`;
    return <MarckdownViewer fullLink={repoUrl} />;
  };

  return (
    <HashRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MarckdownViewer fullLink="https://raw.githubusercontent.com/marine-term-translations/marine-term-translations.github.io/main/siteInfo.md" />
                <ActiveTranslationSpaces />
                <MarckdownViewer fullLink="https://raw.githubusercontent.com/marine-term-translations/marine-term-translations.github.io/main/conventions.md" />
              </>
            }
          />
          {/* Navigation */}

          {/* Translater */}
          <Route path="/list" element={<ListRepo />} />
          <Route
            path="/about"
            element={
              <MarckdownViewer fullLink="https://raw.githubusercontent.com/marine-term-translations/Front-End/refs/heads/main/Information/Usage.md" />
            }
          />

          {/* Developer */}
          <Route
            path="/front"
            element={
              //!\\
              <MarckdownViewer fullLink="" />
            }
          />
          <Route
            path="/back"
            element={
              <MarckdownViewer fullLink="https://raw.githubusercontent.com/marine-term-translations/Back-End/main/Readme.md" />
            }
          />
          <Route
            path="/gh_action"
            element={
              <MarckdownViewer fullLink="https://raw.githubusercontent.com/vliz-be-opsci/ldes_translation_gh_action/main/README.md" />
            }
          />
          <Route
            path="/general"
            element={
              //!\\
              <MarckdownViewer fullLink="https://raw.githubusercontent.com/marine-term-translations/marine-term-translations.github.io/main/README.md" />
            }
          />

          {/* Administrator */}
          <Route
            path="/instruction"
            element={
              //!\\
              <MarckdownViewer fullLink="" />
            }
          />

          {/* Dynamic routes for translation repositories */}
          <Route
            path="/:repoName"
            element={<TranslationRepo />}
          />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
