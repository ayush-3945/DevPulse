import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiGrid, FiShield, FiFingerprint } from 'react-icons/fi';
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
      icon: <FiGrid className="w-6 h-6 text-amber-gold" />,
      title: 'Contribution Heatmaps',
      description: 'Beautiful visual breakdown of your GitHub activity and commit history.'
    },
    {
      icon: <FiShield className="w-6 h-6 text-amber-gold" />,
      title: 'Repository Health Scores',
      description: 'Actionable metrics on repo maintainability, stars, and engagement.'
    },
    {
      icon: <FiFingerprint className="w-6 h-6 text-amber-gold" />,
      title: 'AI Developer Personality',
      description: 'Gemini AI analyzes your coding style and generates a unique profile.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-gold/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-light/10 blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-gold via-amber-light to-amber-gold animate-gradient-x">
              GitHub
            </span>, Actually Understood.
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Enter any GitHub username. Get a visual breakdown of activity, repo health, and an AI-generated developer personality — instantly.
          </p>

          <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-16 relative z-20">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-gold to-amber-light rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative flex items-center bg-gray-800 rounded-xl border border-gray-700 focus-within:border-amber-gold transition-colors shadow-2xl">
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
                  className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-amber-gold to-amber-light hover:from-amber-light hover:to-amber-gold text-gray-900 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Explore
                </button>
              </div>
            </div>
          </form>

          {/* Floating Preview Card */}
          <div className="mt-8 mb-16 relative mx-auto max-w-3xl z-10 hidden md:block">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-gold/20 to-amber-light/20 rounded-2xl blur opacity-50"></div>
            <div className="relative bg-gray-800/80 backdrop-blur-md border border-amber-gold/30 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row gap-8 items-center text-left">
              
              {/* Mock Heatmap */}
              <div className="flex-1 w-full bg-gray-900/80 rounded-xl p-4 border border-gray-700/50">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-24 h-3 bg-gray-700 rounded-full"></div>
                  <div className="w-16 h-3 bg-gray-700 rounded-full"></div>
                </div>
                <div className="grid grid-cols-12 gap-1.5">
                  {[...Array(48)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-full aspect-square rounded-sm ${
                        Math.random() > 0.7 
                          ? 'bg-amber-gold/90 shadow-[0_0_8px_rgba(245,166,35,0.4)]' 
                          : Math.random() > 0.4 
                            ? 'bg-amber-gold/40' 
                            : 'bg-gray-800'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Mock AI Snippet */}
              <div className="flex-1 w-full space-y-4">
                <div className="flex items-center gap-2">
                  <FiFingerprint className="text-amber-gold w-5 h-5" />
                  <h4 className="text-amber-gold font-semibold text-sm tracking-widest uppercase">AI Analysis</h4>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  "You are the <span className="text-white font-medium">Night Owl Architect</span>. Your commit history shows deep focus sessions between 11 PM and 3 AM. You prioritize clean, modular code with a heavy emphasis on modern React patterns."
                </p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-amber-gold/10 text-amber-gold text-xs rounded-md border border-amber-gold/20">Night Owl</span>
                  <span className="px-2 py-1 bg-amber-gold/10 text-amber-gold text-xs rounded-md border border-amber-gold/20">React Master</span>
                </div>
              </div>
            </div>
          </div>

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
