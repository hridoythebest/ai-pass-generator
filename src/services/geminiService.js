import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAeZm3FQmS1jO4oMrb4ZCQuLZW_EGPVWcs");

// Helper function to extract JSON from markdown response
const extractJSONFromResponse = (text) => {
  try {
    // Remove markdown code block syntax and find JSON content
    const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('No valid JSON found in response');
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return null;
  }
};

export const geminiService = {
  async analyzePasswordStrength(password) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Analyze this password: "${password}" and provide a detailed security assessment in the following JSON format (respond ONLY with the JSON, no additional text):
      {
        "strength": "weak|medium|strong",
        "timeToCrack": "estimated time to crack",
        "vulnerabilities": ["list of specific vulnerabilities"],
        "suggestions": ["list of improvement suggestions"],
        "commonPatterns": ["list of common patterns found in the password"],
        "uniqueFeatures": ["list of unique or strong features"],
        "memorabilityScore": "1-10 rating with explanation",
        "entropyScore": "bits of entropy",
        "breachHistory": {
          "similarPasswords": "description of similar passwords in breaches",
          "riskLevel": "low|medium|high"
        },
        "aiResistance": {
          "score": "1-10",
          "explanation": "how resistant it is to AI guessing"
        },
        "quantumResistance": {
          "assessment": "weak|moderate|strong",
          "explanation": "explanation of quantum computing resistance"
        }
      }`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return extractJSONFromResponse(response.text());
    } catch (error) {
      console.error('Error analyzing password:', error);
      return {
        strength: "unknown",
        timeToCrack: "unable to calculate",
        vulnerabilities: ["Unable to analyze password strength"],
        suggestions: ["Try again later"]
      };
    }
  },

  async generatePasswordSuggestions(requirements) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Generate 3 strong password suggestions based on these requirements: ${JSON.stringify(requirements)}. 
      Ensure passwords are both secure and memorable. Return in JSON format:
      {
        "passwords": [
          {
            "value": "the password",
            "strength": "description of strength",
            "memoryTip": "how to remember it"
          }
        ]
      }`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return extractJSONFromResponse(response.text());
    } catch (error) {
      console.error('Error generating passwords:', error);
      return {
        passwords: [
          {
            value: "Error generating password",
            strength: "unknown",
            memoryTip: "Please try again"
          }
        ]
      };
    }
  }
};
