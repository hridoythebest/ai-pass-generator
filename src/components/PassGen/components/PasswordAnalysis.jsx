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

    const debounceTimeout = setTimeout(analyzeWithAI, 500);
    return () => clearTimeout(debounceTimeout);
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

      {/* Enhanced AI Analysis Section */}
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
            {/* Primary Analysis */}
            <div className="ai-primary-analysis">
              <div className="ai-strength">
                <h4>AI Verdict</h4>
                <p className="ai-strength-text">{aiAnalysis.strength}</p>
              </div>
              
              <div className="crack-time">
                <h4>Time to Crack</h4>
                <p className="time-value">⏱️ {aiAnalysis.timeToCrack}</p>
              </div>
            </div>

            {/* Advanced Metrics */}
            <div className="ai-advanced-metrics">
              <div className="metric-item">
                <h4>Memorability Score</h4>
                <div className="metric-content">
                  <span className="score">🧠 {aiAnalysis.memorabilityScore}</span>
                  <p className="explanation">{aiAnalysis.memorabilityScore}/10</p>
                </div>
              </div>

              <div className="metric-item">
                <h4>Entropy Score</h4>
                <div className="metric-content">
                  <span className="score">🎲 {aiAnalysis.entropyScore}</span>
                  <p className="explanation">bits of randomness</p>
                </div>
              </div>
            </div>

            {/* Pattern Analysis */}
            {aiAnalysis.commonPatterns && (
              <div className="ai-patterns">
                <h4>Common Patterns Found</h4>
                <ul>
                  {aiAnalysis.commonPatterns.map((pattern, index) => (
                    <li key={index} className="pattern-item">
                      🔍 {pattern}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Unique Features */}
            {aiAnalysis.uniqueFeatures && (
              <div className="ai-unique-features">
                <h4>Strong Points</h4>
                <ul>
                  {aiAnalysis.uniqueFeatures.map((feature, index) => (
                    <li key={index} className="feature-item">
                      ✨ {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Breach History */}
            {aiAnalysis.breachHistory && (
              <div className="ai-breach-history">
                <h4>Breach Analysis</h4>
                <div className="breach-content">
                  <p className="similar-passwords">
                    🔒 {aiAnalysis.breachHistory.similarPasswords}
                  </p>
                  <div className={`risk-level ${aiAnalysis.breachHistory.riskLevel}`}>
                    Risk Level: {aiAnalysis.breachHistory.riskLevel}
                  </div>
                </div>
              </div>
            )}

            {/* AI & Quantum Resistance */}
            <div className="ai-resistance-grid">
              {aiAnalysis.aiResistance && (
                <div className="ai-resistance">
                  <h4>AI Resistance</h4>
                  <div className="resistance-content">
                    <div className="score">🤖 Score: {aiAnalysis.aiResistance.score}/10</div>
                    <p className="explanation">{aiAnalysis.aiResistance.explanation}</p>
                  </div>
                </div>
              )}

              {aiAnalysis.quantumResistance && (
                <div className="quantum-resistance">
                  <h4>Quantum Computing Resistance</h4>
                  <div className="resistance-content">
                    <div className="assessment">⚛️ {aiAnalysis.quantumResistance.assessment}</div>
                    <p className="explanation">{aiAnalysis.quantumResistance.explanation}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Vulnerabilities Section */}
            {aiAnalysis.vulnerabilities && aiAnalysis.vulnerabilities.length > 0 && (
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

            {/* Suggestions Section */}
            {aiAnalysis.suggestions && aiAnalysis.suggestions.length > 0 && (
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
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PasswordAnalysis;
