# AI-Powered Password Generator

![Version](https://img.shields.io/badge/version-1.0.0-brightgreen)
![React](https://img.shields.io/badge/React-18.x-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A modern, AI-powered password generator built with React and Google Gemini AI. Generate secure passwords with real-time strength analysis, breach detection, and quantum resistance assessment.

## 🌟 Features

- **Advanced Password Generation**
  - Customizable password length and character sets
  - Real-time password strength visualization
  - Copy to clipboard functionality
  - Interactive password length slider

- **AI-Powered Analysis**
  - Memorability score calculation
  - Entropy analysis
  - Common pattern detection
  - Breach history checking
  - AI and quantum computing resistance assessment

- **Modern UI/UX**
  - Custom interactive cursor
  - Particle background animation
  - Cyberpunk-inspired design
  - Responsive layout for all devices
  - Glassmorphism effects

## 🚀 Installation

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)
- Google Gemini AI API key

### Step 1: Clone the Repository

```bash
git clone https://github.com/hridoythebest/ai-password-generator.git
cd ai-password-generator
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Environment Setup

1. Create a `.env` file in the root directory
2. Add your Google Gemini AI API key:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

### Step 4: Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Step 5: Build for Production

```bash
npm run build
```

## 🔧 Configuration

### Password Generation Settings

You can customize the default password generation settings in `src/config/passwordConfig.js`:

- Minimum/Maximum password length
- Character sets (uppercase, lowercase, numbers, symbols)
- Default settings

### AI Analysis Configuration

Modify AI analysis parameters in `src/services/geminiService.js`:

- Analysis topics
- Strength thresholds
- Response formatting

## 🎨 Customization

### Theme Colors

Edit the color scheme in `src/styles/_variables.scss`:

```scss
:root {
  --primary-color: #00ff00;
  --background-color: #000000;
  --text-color: #ffffff;
  // ... other color variables
}
```

### Particle Background

Customize particle animation in `src/components/Background/ParticleBackground.jsx`

## 📚 Tech Stack

- **Frontend Framework**: React 18.x
- **Styling**: SCSS
- **AI Integration**: Google Gemini AI
- **Build Tool**: Vite
- **Animation**: React TsParticles
- **Icons**: React Icons

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Md Hridoy Hossain**
- GitHub: [@hridoythebest](https://github.com/hridoythebest)
- Profession: Passionate Python Developer
- Focus: AI-driven development and automation

## 🌐 Links

- [Live Demo](#)
- [Documentation](#)
- [Report Bug](https://github.com/hridoythebest/ai-password-generator/issues)
- [Request Feature](https://github.com/hridoythebest/ai-password-generator/issues)

---

<p align="center">Made with ❤️ by Md Hridoy Hossain</p>
