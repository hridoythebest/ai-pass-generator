import React from 'react';
import '../sass/PasswordAnalysis.scss';

const PasswordAnalysis = ({ password, getStrengthDescription }) => {
  const analysis = getStrengthDescription(password);

  if (!analysis) return null;

  return (
    <div className="password-analysis">
      <div className="strength-section">
        <h3>Password Strength</h3>
        <div className="strength-indicator">
          <span className="strength-text">{analysis.strength}</span>
        </div>
      </div>

      <div className="analysis-section">
        <div className="feedback-list">
          <h4>Analysis</h4>
          {analysis.feedback.map((item, index) => (
            <div key={index} className="feedback-item">
              {item}
            </div>
          ))}
        </div>

        <div className="tips-section">
          <h4>Security Tips</h4>
          <div className="tips-list">
            {analysis.tips.map((tip, index) => (
              <div key={index} className="tip-item">
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordAnalysis;
