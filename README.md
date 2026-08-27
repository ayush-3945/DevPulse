# DevPulse 🚀

DevPulse is a modern, premium full-stack web application that transforms a standard GitHub username into a beautiful, insightful, and AI-powered developer dashboard. 

![DevPulse Landing Page](./assets/preview.png) *(Note: Add a screenshot here)*

## 🌟 Features

- **GitHub DNA Extraction**: Fetches public profile, repository data, and language statistics directly via GitHub API.
- **AI Personality Archetype**: Uses **Google Gemini 1.5 Flash** to analyze a developer's code patterns and generate a unique "Developer Archetype" with fun facts and trait scoring.
- **Contribution Heatmap**: A classic green-purple GitHub-style contribution graph with a premium dark-mode glow.
- **Language Doughnut Chart**: Visually stunning Chart.js doughnut chart breaking down a developer's most used languages by bytes.
- **Repo Health Score Algorithm**: Evaluates top repositories based on stars, forks, and recency, assigning them a Health Badge (Healthy, Fair, Needs Love).
- **MongoDB Caching Engine**: Smart caching layer to reduce GitHub API calls and bypass rate limits.
- **Premium Glassmorphism UI**: Built with Tailwind CSS, Framer Motion, and React Icons for a buttery smooth user experience.

## 🛠️ Technology Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- Framer Motion
- Chart.js & React-Chartjs-2
- React Router DOM
- React Hot Toast (Notifications)
- React Github Calendar

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- Octokit (GitHub API SDK)
- @google/generative-ai (Gemini AI SDK)
- Helmet & Express Rate Limit (Security)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas URI or Local MongoDB instance
- GitHub Personal Access Token
- Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ayush-3945/DevPulse.git
   cd DevPulse
   ```

2. **Backend Setup:**
   ```bash
   cd server
   npm install
   
   # Create .env file
   cp .env.example .env
   # Fill in your variables in the .env file
   
   # Start the server
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd ../client
   npm install
   
   # Create .env file
   echo "VITE_API_URL=http://localhost:5000/api" > .env
   
   # Start the frontend
   npm run dev
   ```

4. **Open your browser:**
   Navigate to \`http://localhost:5173\`

## 🧠 System Architecture

1. **Client** requests `/api/github/:username/profile`.
2. **Server** checks **MongoDB** `CachedProfile` collection.
3. If cache hits and is within 24h, return data instantly.
4. If cache miss, server calls **GitHub API / Gemini API**, aggregates the data, saves to MongoDB, and returns to Client.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a Pull Request.

---
*Built with ❤️ by Ayush*
