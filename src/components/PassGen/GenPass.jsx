import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { geminiService } from '../../services/geminiService';
import PasswordAnalysis from './components/PasswordAnalysis';
import { PassContext } from './context/PassContext';
import PassGenLogic from './PassGenLogic';
import './sass/PasswordAnalysis.scss';
import './sass/GenPass.scss';

const genPass = new PassGenLogic();

const GenPass = () => {
  const { setPass, length, checkState, pass } = useContext(PassContext);
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateClick = async () => {
    const newPass = genPass.gererate(length, checkState);
    setPass(newPass);

    // Get AI suggestions
    setLoading(true);
    try {
      const aiSuggestions = await geminiService.generatePasswordSuggestions({
        length: length,
        ...checkState
      });
      setSuggestions(aiSuggestions);
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
    }
    setLoading(false);
  };

  const handleSuggestionClick = (password) => {
    setPass(password);
  };

  function handlePrev() {
    const pass = genPass.prev();
    pass && setPass(pass);
  }

  function handleNext() {
    const pass = genPass.next();
    pass && setPass(pass);
  }

  useEffect(() => {
    handleGenerateClick();
  }, []);

  return (
    <motion.div 
      className="generate-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ul className="gen-pass">
        <li className="pass-gen-list">
          <button onClick={handlePrev} className="prev history-btn btn">
            <FaChevronLeft />
          </button>
        </li>
        <li className="pass-gen-list">
          <motion.button
            className="generate-btn"
            onClick={handleGenerateClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Generate Password
          </motion.button>
        </li>
        <li className="pass-gen-list">
          <button onClick={handleNext} className="prev history-btn btn">
            <FaChevronRight />
          </button>
        </li>
      </ul>

      <PasswordAnalysis password={pass} />

      {loading && (
        <div className="suggestions-loading">
          Getting AI suggestions...
        </div>
      )}

      {suggestions && (
        <motion.div 
          className="ai-suggestions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3>AI Suggestions</h3>
          <div className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                className="suggestion-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleSuggestionClick(suggestion.password)}
              >
                <div className="password">{suggestion.password}</div>
                <div className="explanation">{suggestion.explanation}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GenPass;
