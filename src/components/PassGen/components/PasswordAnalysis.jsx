import React, { useState, useEffect } from 'react';
import { geminiService } from '../../../services/geminiService';
import '../sass/PasswordAnalysis.scss';

const PasswordAnalysis = ({ password, getStrengthDescription }) => {
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const basicAnalysis = getStrengthDescription(password);

  useEffect(() => {
    const analyzeWithAI = async () => {
      if (password && password.length > 0) {
        setLoading(true);
        try {
          const result = await geminiService.analyzePasswordStrength(password);
          setAiAnalysis(result);
        } catch (error) {
          console.error('Error analyzing password:', error);
        }
        setLoading(false);
      }
    };

    analyzeWithAI();
  }, [password]);

  if (!basicAnalysis) return null;

  return (
    <div className="password-analysis">
      {/* Basic Analysis Section */}
      <div className="strength-section">
        <h3>Password Strength</h3>
        <div className="strength-indicator">
          <span className="strength-text">{basicAnalysis.strength}</span>
        </div>
      </div>

      <div className="analysis-grid">
        {/* Quick Analysis */}
        <div className="analysis-section quick-analysis">
          <h4>Quick Analysis</h4>
          <div className="feedback-list">
            {basicAnalysis.feedback.map((item, index) => (
              <div key={index} className="feedback-item">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Security Tips */}
        <div className="analysis-section security-tips">
          <h4>Security Tips</h4>
          <div className="tips-list">
            {basicAnalysis.tips.map((tip, index) => (
              <div key={index} className="tip-item">
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Analysis Section */}
      <div className="ai-analysis-section">
        <h3>AI-Powered Analysis</h3>
        {loading ? (
          <div className="loading-animation">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>AI is analyzing your password...</p>
          </div>
        ) : aiAnalysis ? (
          <div className="ai-feedback">
            <div className="ai-strength">
              <h4>AI Verdict</h4>
              <p className="ai-strength-text">{aiAnalysis.strength}</p>
            </div>
            
            {aiAnalysis.vulnerabilities && (
              <div className="ai-vulnerabilities">
                <h4>Potential Vulnerabilities</h4>
                <ul>
                  {aiAnalysis.vulnerabilities.map((vuln, index) => (
                    <li key={index} className="vulnerability-item">
                      ⚠️ {vuln}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {aiAnalysis.suggestions && (
              <div className="ai-suggestions">
                <h4>AI Suggestions</h4>
                <ul>
                  {aiAnalysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="suggestion-item">
                      💡 {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {aiAnalysis.timeToCrack && (
              <div className="crack-time">
                <h4>Estimated Time to Crack</h4>
                <p className="time-value">⏱️ {aiAnalysis.timeToCrack}</p>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PasswordAnalysis;
