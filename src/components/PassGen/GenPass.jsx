import React, { useState } from 'react';
import { FaRobot, FaClockRotateLeft, FaGears } from 'react-icons/fa6';
import PassBar from './PassBar';
import PasswordAnalysis from './components/PasswordAnalysis';
import './sass/GenPass.scss';

const GenPass = () => {
  const [password, setPassword] = useState('');
  const [passwordHistory, setPasswordHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(true); 
  const [settings, setSettings] = useState({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

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

    if (!chars) {
      alert('Please select at least one character type!');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < settings.length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(newPassword);
    setPasswordHistory(prev => [...prev, { password: newPassword, timestamp: new Date() }].slice(-10));
  };

  const getStrengthDescription = (password) => {
    if (!password) return null;
    
    let strength = 0;
    let feedback = [];

    if (password.length >= 12) {
      strength += 2;
      feedback.push('✅ Good length (12+ characters)');
    } else if (password.length >= 8) {
      strength += 1;
      feedback.push('⚠️ Decent length (8+ characters)');
    } else {
      feedback.push('❌ Too short (less than 8 characters)');
    }

    if (/[A-Z]/.test(password)) {
      strength += 1;
      feedback.push('✅ Contains uppercase letters');
    }
    if (/[a-z]/.test(password)) {
      strength += 1;
      feedback.push('✅ Contains lowercase letters');
    }
    if (/[0-9]/.test(password)) {
      strength += 1;
      feedback.push('✅ Contains numbers');
    }
    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 1;
      feedback.push('✅ Contains special characters');
    }

    if (/(.)\1{2,}/.test(password)) {
      strength -= 1;
      feedback.push('❌ Contains repeated characters');
    }
    if (/^[A-Za-z]+$/.test(password) || /^[0-9]+$/.test(password)) {
      strength -= 1;
      feedback.push('❌ Lacks character variety');
    }

    let strengthText = '';
    if (strength >= 5) strengthText = 'Very Strong 💪';
    else if (strength >= 4) strengthText = 'Strong 👍';
    else if (strength >= 3) strengthText = 'Moderate 👌';
    else if (strength >= 2) strengthText = 'Weak ⚠️';
    else strengthText = 'Very Weak ❌';

    return {
      strength: strengthText,
      feedback,
      tips: [
        '🔑 Use a mix of characters',
        '📏 Aim for 12+ characters',
        '🎲 Avoid common patterns',
        '🚫 Avoid personal info',
        '🔄 Change passwords regularly'
      ]
    };
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
          className={`control-btn settings ${showSettings ? 'active' : ''}`}
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
            <div className="setting-item length-setting">
              <div className="length-header">
                <label htmlFor="length">Length</label>
                <div className="length-control">
                  <button 
                    className="length-btn"
                    onClick={() => setSettings(prev => ({ 
                      ...prev, 
                      length: Math.max(8, prev.length - 1)
                    }))}
                  >
                    -
                  </button>
                  <span className="length-value">{settings.length}</span>
                  <button 
                    className="length-btn"
                    onClick={() => setSettings(prev => ({ 
                      ...prev, 
                      length: Math.min(32, prev.length + 1)
                    }))}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="slider-container">
                <input
                  type="range"
                  id="length"
                  min="8"
                  max="32"
                  step="1"
                  value={settings.length}
                  onChange={(e) => setSettings({ ...settings, length: parseInt(e.target.value) })}
                  className="length-slider"
                />
                <div className="length-marks">
                  <span>8</span>
                  <span>16</span>
                  <span>24</span>
                  <span>32</span>
                </div>
              </div>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.includeUppercase}
                  onChange={(e) => setSettings({ ...settings, includeUppercase: e.target.checked })}
                />
                Uppercase Letters (A-Z)
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.includeLowercase}
                  onChange={(e) => setSettings({ ...settings, includeLowercase: e.target.checked })}
                />
                Lowercase Letters (a-z)
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.includeNumbers}
                  onChange={(e) => setSettings({ ...settings, includeNumbers: e.target.checked })}
                />
                Numbers (0-9)
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.includeSymbols}
                  onChange={(e) => setSettings({ ...settings, includeSymbols: e.target.checked })}
                />
                Special Characters (!@#$%^&*)
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

      {password && <PasswordAnalysis password={password} getStrengthDescription={getStrengthDescription} />}
    </div>
  );
};

export default GenPass;
