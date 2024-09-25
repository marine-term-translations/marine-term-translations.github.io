import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import MarckdownViewer from './components/MarckdownViewer';
import ListRepo from './components/ListRepo';

function App() {
  
  return (
    <HashRouter >
      <div className="App">
        <NavBar/>
        <Routes>
          <Route path='/' element=
          {
            //!\\
            <MarckdownViewer fullLink=""/>
          } />
          {/* Navigation */}

          {/* Translater */}
          <Route path='/list' element=
          {
            <ListRepo/>
          } />
          <Route path='/about' element=
          {
            <MarckdownViewer fullLink="https://raw.githubusercontent.com/marine-term-translations/Front-End/refs/heads/main/Information/Usage.md"/>
          } />

          {/* Developer */}
          <Route path='/front' element=
          {
            //!\\
            <MarckdownViewer fullLink=""/>
          } />
          <Route path='/back' element=
          {
            <MarckdownViewer fullLink="https://raw.githubusercontent.com/marine-term-translations/Back-End/main/Readme.md"/>
          } />
          <Route path='/gh_action' element=
          {
            <MarckdownViewer fullLink="https://raw.githubusercontent.com/vliz-be-opsci/ldes_translation_gh_action/main/README.md"/>
          } />
          <Route path='/general' element=
          {
            //!\\
            <MarckdownViewer fullLink="https://raw.githubusercontent.com/marine-term-translations/marine-term-translations.github.io/main/README.md"/>
          } />

          {/* Administrator */}
          <Route path='/instruction' element=
          {
            //!\\
            <MarckdownViewer fullLink=""/>
          } />
        </Routes>
      </div>
    </HashRouter >
  );
}

export default App;