import React from 'react';
import RepoCard from './RepoCard';
import { motion } from 'framer-motion';

const RepoHealthGrid = ({ repos }) => {
  if (!repos || repos.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 h-48 flex items-center justify-center">
        <p className="text-gray-400">No public repositories found.</p>
      </div>
    );
  }

  // Filter out forks and sort by stars
  const topRepos = repos
    .filter(repo => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Top Repositories & Health</h3>
        <span className="text-sm text-gray-400">Showing top {topRepos.length}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topRepos.map((repo, index) => (
          <RepoCard key={repo.id} repo={repo} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default RepoHealthGrid;
