import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FaGithub, FaCode } from 'react-icons/fa6';
import GenPass from './components/PassGen/GenPass';
import CustomCursor from './components/Cursor/CustomCursor';
import ParticleBackground from './components/Background/ParticleBackground';
import HamburgerMenu from './components/Menu/HamburgerMenu';
import DocPage from './pages/DocPage';
import metadata from './metadata.json';
import './styles/global.scss';
import './styles/App.scss';

const App = () => {
  const { developer } = metadata;

  const MainContent = () => (
    <>
      <header className="app-header">
        <h1>AI Password Generator</h1>
        <p className="subtitle">Generate secure passwords with AI-powered analysis</p>
      </header>
      <main className="app-main">
        <GenPass />
      </main>
    </>
  );

  return (
    <Router>
      <CustomCursor />
      <HamburgerMenu />
      <div className="app">
        <ParticleBackground />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/docs/:docId" element={<DocPage />} />
        </Routes>
        <footer className="app-footer">
          <div className="footer-content">
            <div className="tech-stack">
              <div className="tech-badge">
                <FaCode className="icon" />
                <span>Built with {developer.tech}</span>
              </div>
            </div>
            <div className="developer-info">
              <a
                href={developer.github}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                <FaGithub className="icon" />
                <span>{developer.slug}</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
