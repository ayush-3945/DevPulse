import React from 'react';
import { FiStar, FiGitBranch, FiAlertCircle, FiActivity } from 'react-icons/fi';
import { motion } from 'framer-motion';

const RepoCard = ({ repo }) => {
  // Simple Repo Health Score Calculation
  const calculateHealth = () => {
    let score = 50; // Base score
    
    // Stars weight (up to 25 points)
    score += Math.min(repo.stargazers_count * 2, 25);
    
    // Forks weight (up to 15 points)
    score += Math.min(repo.forks_count * 3, 15);
    
    // Activity / Recency weight (up to 10 points)
    const daysSinceUpdate = (new Date() - new Date(repo.updated_at)) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate < 30) score += 10;
    else if (daysSinceUpdate < 90) score += 5;
    
    // Cap at 100
    return Math.min(Math.round(score), 100);
  };

  const healthScore = calculateHealth();

  // Determine Badge Color
  let healthColor = 'text-green-400 bg-green-400/10 border-green-400/20';
  let healthLabel = 'Healthy';
  
  if (healthScore < 50) {
    healthColor = 'text-red-400 bg-red-400/10 border-red-400/20';
    healthLabel = 'Needs Love';
  } else if (healthScore < 75) {
    healthColor = 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    healthLabel = 'Fair';
  }

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -5 }}
      className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 rounded-xl p-5 block transition-all group"
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-lg font-bold text-white group-hover:text-purple-400 truncate pr-2">
          {repo.name}
        </h4>
        <div className={`px-2 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 whitespace-nowrap ${healthColor}`}>
          <FiActivity /> {healthLabel} ({healthScore})
        </div>
      </div>

      <p className="text-gray-400 text-sm mb-4 line-clamp-2 h-10">
        {repo.description || 'No description provided.'}
      </p>

      <div className="flex items-center gap-4 text-sm text-gray-400">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span>{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1 hover:text-gray-300">
          <FiStar /> {repo.stargazers_count}
        </div>
        <div className="flex items-center gap-1 hover:text-gray-300">
          <FiGitBranch /> {repo.forks_count}
        </div>
        <div className="flex items-center gap-1 hover:text-gray-300">
          <FiAlertCircle /> {repo.open_issues_count}
        </div>
      </div>
    </motion.a>
  );
};

export default RepoCard;
