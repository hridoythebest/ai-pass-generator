import { createContext, useState } from "react";

export const PassContext = createContext();

export const PassGenDataProvider = ({ children }) => {
  const [pass, setPass] = useState("");
  const [length, setLength] = useState(16);
  const [checkState, setCheckState] = useState({
    uppercase: true,
    lowercase: true,
    number: true,
    symbol: true,
  });
  const [passState, setPassState] = useState({
    custom: false,
    basic: true,
    strong: false,
  });
  
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <PassContext.Provider
      value={{
        checkState,
        setCheckState,
        length,
        setLength,
        passState,
        setPassState,
        pass,
        setPass,
        aiAnalysis,
        setAiAnalysis,
        suggestions,
        setSuggestions,
        isAnalyzing,
        setIsAnalyzing,
      }}
    >
      {children}
    </PassContext.Provider>
  );
};

export default PassContext;
