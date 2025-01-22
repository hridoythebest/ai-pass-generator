import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAeZm3FQmS1jO4oMrb4ZCQuLZW_EGPVWcs");

export const geminiService = {
  async analyzePasswordStrength(password) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Analyze this password: "${password}" and provide a detailed security assessment including:
      1. Overall strength (weak/medium/strong)
      2. Time to crack estimation
      3. Specific vulnerabilities
      4. Improvement suggestions
      Format the response in JSON.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      console.error('Error analyzing password:', error);
      return null;
    }
  },

  async generatePasswordSuggestions(requirements) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Generate 3 strong password suggestions based on these requirements: ${JSON.stringify(requirements)}. 
      Consider modern password security standards and make them memorable but secure.
      Format the response in JSON with password and explanation for each suggestion.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      console.error('Error generating suggestions:', error);
      return null;
    }
  }
};
