import React from 'react';
import GenPass from './components/PassGen/GenPass';
import CustomCursor from './components/Cursor/CustomCursor';
import ParticleBackground from './components/Background/ParticleBackground';
import './styles/global.scss';
import './styles/App.scss';

const App = () => {
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
          <p>Built with React & Google Gemini AI</p>
        </footer>
      </div>
    </>
  );
};

export default App;
