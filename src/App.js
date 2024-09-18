import './App.css';
import { Routes, Route, HashRouter} from 'react-router-dom';
import MarckdownViewer from './components/MarckdownViewer'

function App() {
  return (
    <HashRouter >
      <div className="App">
        <Routes>
          <Route path='/' element={
            <MarckdownViewer fullLink="https://raw.githubusercontent.com/marine-term-translations/marine-term-translations.github.io/main/README.md"/>
          } />
          <Route path='/ldes_translation_gh_action' element=
          {
            <MarckdownViewer fullLink="https://raw.githubusercontent.com/vliz-be-opsci/ldes_translation_gh_action/main/README.md" title="ldes_translation_gh_action Information"/>
          } />
          
        </Routes>
      </div>
    </HashRouter >
  );
}

export default App;
