import React from 'react';
import { FaGithub, FaCode } from 'react-icons/fa6';
import GenPass from './components/PassGen/GenPass';
import CustomCursor from './components/Cursor/CustomCursor';
import ParticleBackground from './components/Background/ParticleBackground';
import metadata from './metadata.json';
import './styles/global.scss';
import './styles/App.scss';

const App = () => {
  const { developer } = metadata;

  return (
    <>
      <CustomCursor />
      <div className="app">
        <ParticleBackground />
        <header className="app-header">
          <h1>AI Password Generator</h1>
          <p className="subtitle">Generate secure passwords with AI-powered analysis</p>
        </header>
        <main className="app-main">
          <GenPass />
        </main>
        <footer className="app-footer">
          <div className="footer-content">
            <div className="tech-stack">
              <div className="tech-badge">
                <FaCode className="icon" />
                React
              </div>
              <div className="tech-badge ai">
                <span className="ai-icon">AI</span>
                Google Gemini
              </div>
            </div>
            <div className="developer-info">
              <div className="dev-name">
                <span className="label">Developed by</span>
                <a 
                  href={developer.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="name"
                >
                  {developer.name}
                </a>
              </div>
              <a 
                href={developer.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="github-link"
              >
                <FaGithub className="icon" />
                <span className="username">{developer.slug}</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
