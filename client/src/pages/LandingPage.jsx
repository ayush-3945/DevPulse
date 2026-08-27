import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiBarChart2, FiActivity, FiCpu } from 'react-icons/fi';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (username.trim()) {
      navigate(`/dashboard/${username.trim()}`);
    }
  };

  const features = [
    {
      icon: <FiBarChart2 className="w-6 h-6 text-purple-400" />,
      title: 'Contribution Heatmaps',
      description: 'Beautiful visual breakdown of your GitHub activity and commit history.'
    },
    {
      icon: <FiActivity className="w-6 h-6 text-blue-400" />,
      title: 'Repository Health Scores',
      description: 'Actionable metrics on repo maintainability, stars, and engagement.'
    },
    {
      icon: <FiCpu className="w-6 h-6 text-pink-400" />,
      title: 'AI Developer Personality',
      description: 'Gemini AI analyzes your coding style and generates a unique profile.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Decode Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 animate-gradient-x">
              GitHub DNA
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Instantly generate a beautiful, AI-powered intelligence dashboard for any GitHub developer. See heatmaps, repo health, and personality traits.
          </p>

          <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-16 relative">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative flex items-center bg-gray-800 rounded-xl border border-gray-700 focus-within:border-purple-500 transition-colors shadow-2xl">
                <div className="pl-5 text-gray-400">
                  <FiSearch className="w-6 h-6" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter a GitHub username..."
                  className="w-full py-4 pl-4 pr-16 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg rounded-xl"
                  autoComplete="off"
                  spellCheck="false"
                />
                <button
                  type="submit"
                  disabled={!username.trim()}
                  className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Explore
                </button>
              </div>
            </div>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full mt-10"
        >
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800 transition-colors group">
              <div className="bg-gray-900/50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default LandingPage;
