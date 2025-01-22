import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { geminiService } from '../../../services/geminiService';
import '../sass/PasswordAnalysis.scss';

const PasswordAnalysis = ({ password }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const analyzePassword = async () => {
      if (password && password.length > 0) {
        setLoading(true);
        try {
          const result = await geminiService.analyzePasswordStrength(password);
          setAnalysis(result);
        } catch (error) {
          console.error('Error analyzing password:', error);
        }
        setLoading(false);
      }
    };

    analyzePassword();
  }, [password]);

  if (!password || password.length === 0) return null;
  if (loading) return <div className="analysis-loading">Analyzing password strength...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="password-analysis"
    >
      {analysis && (
        <>
          <div className={`strength-indicator ${analysis.strength?.toLowerCase()}`}>
            <span className="label">Strength:</span>
            <span className="value">{analysis.strength}</span>
          </div>
          
          <div className="crack-time">
            <span className="label">Estimated time to crack:</span>
            <span className="value">{analysis.timeToCrack}</span>
          </div>

          {analysis.vulnerabilities && (
            <div className="vulnerabilities">
              <h4>Vulnerabilities:</h4>
              <ul>
                {analysis.vulnerabilities.map((vuln, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {vuln}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {analysis.suggestions && (
            <div className="suggestions">
              <h4>Suggestions for improvement:</h4>
              <ul>
                {analysis.suggestions.map((suggestion, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {suggestion}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default PasswordAnalysis;
