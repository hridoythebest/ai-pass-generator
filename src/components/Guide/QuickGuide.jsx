import React from 'react';
import { FaTimes, FaLock, FaSliders, FaAi, FaCopy, FaShieldHalved } from 'react-icons/fa6';
import './QuickGuide.scss';

const QuickGuide = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="quick-guide-overlay">
      <div className="quick-guide-modal">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="guide-content">
          <h2>Quick Start Guide</h2>
          
          <div className="guide-sections">
            {/* Generate Section */}
            <div className="guide-section">
              <div className="section-header">
                <FaLock className="icon" />
                <h3>Generate Password</h3>
              </div>
              <p>Click the "Generate" button to create a secure password instantly. Each password is unique and cryptographically secure.</p>
            </div>

            {/* Customize Section */}
            <div className="guide-section">
              <div className="section-header">
                <FaSliders className="icon" />
                <h3>Customize Settings</h3>
              </div>
              <ul>
                <li>Adjust password length using the slider</li>
                <li>Toggle character types (uppercase, lowercase, numbers, symbols)</li>
                <li>Enable/disable similar character exclusion</li>
              </ul>
            </div>

            {/* AI Analysis Section */}
            <div className="guide-section">
              <div className="section-header">
                <FaAi className="icon" />
                <h3>AI Analysis</h3>
              </div>
              <ul>
                <li>View password strength and memorability score</li>
                <li>Check for common patterns and vulnerabilities</li>
                <li>Assess quantum computing resistance</li>
                <li>Get AI-powered security recommendations</li>
              </ul>
            </div>

            {/* Copy & Use Section */}
            <div className="guide-section">
              <div className="section-header">
                <FaCopy className="icon" />
                <h3>Copy & Use</h3>
              </div>
              <p>Click the copy icon or use Ctrl/Cmd + C to copy your password. A notification will confirm successful copying.</p>
            </div>

            {/* Security Tips Section */}
            <div className="guide-section">
              <div className="section-header">
                <FaShieldHalved className="icon" />
                <h3>Security Tips</h3>
              </div>
              <ul>
                <li>Use unique passwords for each account</li>
                <li>Aim for 16+ characters for better security</li>
                <li>Include a mix of all character types</li>
                <li>Check the AI analysis for potential weaknesses</li>
              </ul>
            </div>
          </div>

          <div className="guide-footer">
            <p>For detailed instructions, check our <a href="/docs/USER_GUIDE.md" target="_blank">full documentation</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickGuide;
