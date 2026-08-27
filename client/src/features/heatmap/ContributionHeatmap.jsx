import React, { useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';

const ContributionHeatmap = ({ username }) => {
  const [year, setYear] = useState('last');

  const validTheme = {
    light: ['#1f2937', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706'],
    dark: ['#1f2937', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706'],
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-xl font-bold text-white">Contribution Activity</h3>
        
        <select 
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="bg-gray-900 border border-gray-700 text-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-purple-500"
        >
          <option value="last">Last Year</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      </div>

      <div className="overflow-x-auto pb-2 custom-scrollbar relative z-10 text-gray-400">
        <GitHubCalendar 
          username={username} 
          year={year === 'last' ? 'last' : year}
          theme={validTheme}
          colorScheme="dark"
          blockSize={14}
          blockMargin={4}
          fontSize={12}
          hideColorLegend={false}
          hideTotalCount={false}
          style={{ width: '100%' }}
        />
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 4px;
        }
      `}} />
    </motion.div>
  );
};

export default ContributionHeatmap;
