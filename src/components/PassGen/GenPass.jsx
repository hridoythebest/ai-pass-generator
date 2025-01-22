import React, { useState } from 'react';
import { FaRobot, FaClockRotateLeft, FaGears } from 'react-icons/fa6';
import PassBar from './PassBar';
import PasswordAnalysis from './components/PasswordAnalysis';
import './sass/GenPass.scss';

const GenPass = () => {
  const [password, setPassword] = useState('');
  const [passwordHistory, setPasswordHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [settings, setSettings] = useState({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });
  const [showSettings, setShowSettings] = useState(false);

  const generatePassword = () => {
    const charset = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    };

    let chars = '';
    if (settings.includeUppercase) chars += charset.uppercase;
    if (settings.includeLowercase) chars += charset.lowercase;
    if (settings.includeNumbers) chars += charset.numbers;
    if (settings.includeSymbols) chars += charset.symbols;

    let newPassword = '';
    for (let i = 0; i < settings.length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(newPassword);
    setPasswordHistory(prev => [...prev, { password: newPassword, timestamp: new Date() }].slice(-10));
  };

  return (
    <div className="generate-section">
      <PassBar password={password} />
      
      <div className="controls">
        <button className="control-btn generate" onClick={generatePassword}>
          <FaRobot />
          <span>Generate Password</span>
        </button>
        
        <button 
          className="control-btn history" 
          onClick={() => setShowHistory(!showHistory)}
          disabled={passwordHistory.length === 0}
        >
          <FaClockRotateLeft />
          <span>History</span>
        </button>

        <button 
          className="control-btn settings" 
          onClick={() => setShowSettings(!showSettings)}
        >
          <FaGears />
          <span>Settings</span>
        </button>
      </div>

      {showSettings && (
        <div className="settings-panel">
          <h3>Password Settings</h3>
          <div className="settings-grid">
            <div className="setting-item">
              <label htmlFor="length">Length: {settings.length}</label>
              <input
                type="range"
                id="length"
                min="8"
                max="32"
                value={settings.length}
                onChange={(e) => setSettings({ ...settings, length: parseInt(e.target.value) })}
              />
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.includeUppercase}
                  onChange={(e) => setSettings({ ...settings, includeUppercase: e.target.checked })}
                />
                Uppercase Letters
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.includeLowercase}
                  onChange={(e) => setSettings({ ...settings, includeLowercase: e.target.checked })}
                />
                Lowercase Letters
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.includeNumbers}
                  onChange={(e) => setSettings({ ...settings, includeNumbers: e.target.checked })}
                />
                Numbers
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.includeSymbols}
                  onChange={(e) => setSettings({ ...settings, includeSymbols: e.target.checked })}
                />
                Special Characters
              </label>
            </div>
          </div>
        </div>
      )}

      {showHistory && (
        <div className="history-panel">
          <h3>Password History</h3>
          <div className="history-list">
            {passwordHistory.map((item, index) => (
              <div key={index} className="history-item" onClick={() => setPassword(item.password)}>
                <span className="password">{item.password}</span>
                <span className="timestamp">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {password && <PasswordAnalysis password={password} />}
    </div>
  );
};

export default GenPass;
