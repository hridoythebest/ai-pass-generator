import React, { useState, useEffect } from 'react';
import { FaRegCopy, FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import './sass/PassBar.scss';

const PassBar = ({ password }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    if (password) {
      try {
        await navigator.clipboard.writeText(password);
        setCopySuccess(true);
        // Show native notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = 'Password copied!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.classList.add('show');
        }, 100);

        setTimeout(() => {
          notification.classList.remove('show');
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 300);
        }, 2000);
      } catch (err) {
        console.error('Failed to copy password');
      }
    }
  };

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  return (
    <div className="pass-bar">
      <input
        type={showPassword ? 'text' : 'password'}
        value={password || ''}
        readOnly
        placeholder="Click Generate to create password"
        className="pass-input"
      />
      <div className="pass-bar-actions">
        <button
          className={`action-btn ${copySuccess ? 'success' : ''}`}
          onClick={handleCopy}
          disabled={!password}
          title="Copy to clipboard"
        >
          <FaRegCopy />
          <span className="tooltip">Copy</span>
        </button>
        <button
          className="action-btn"
          onClick={() => setShowPassword(!showPassword)}
          disabled={!password}
          title={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          <span className="tooltip">{showPassword ? 'Hide' : 'Show'}</span>
        </button>
      </div>
    </div>
  );
};

export default PassBar;
