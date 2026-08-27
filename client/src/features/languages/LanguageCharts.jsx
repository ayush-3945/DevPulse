import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend);

const LanguageCharts = ({ languages }) => {
  if (!languages || Object.keys(languages).length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 h-64 flex flex-col items-center justify-center">
        <p className="text-gray-400">No language data available</p>
      </div>
    );
  }

  // Calculate percentages and sort
  const totalBytes = Object.values(languages).reduce((acc, curr) => acc + curr, 0);
  const sortedLanguages = Object.entries(languages)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: ((bytes / totalBytes) * 100).toFixed(1)
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 6); // Take top 6 languages

  // Amber / Gold focused palette
  const backgroundColors = [
    '#F5A623', // Primary (highest %) - main amber gold
    '#FFC15E', // Second - lighter amber
    '#C97F1C', // Third - deep rich amber
    '#8A7350', // Fourth - muted warm gold
    '#6B5A3E', // Fifth - warm bronze
    '#4A3E2B', // Sixth - dark warm tone
  ];

  const borderColors = [
    '#F5A623',
    '#FFC15E',
    '#C97F1C',
    '#8A7350',
    '#6B5A3E',
    '#4A3E2B',
  ];

  const data = {
    labels: sortedLanguages.map(l => l.name),
    datasets: [
      {
        data: sortedLanguages.map(l => l.bytes),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
        hoverOffset: 4
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We will build a custom legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const lang = sortedLanguages[context.dataIndex];
            return ` ${lang.name}: ${lang.percentage}%`;
          }
        },
        backgroundColor: 'rgba(31, 41, 55, 0.9)',
        titleColor: '#fff',
        bodyColor: '#e5e7eb',
        borderColor: 'rgba(107, 114, 128, 0.3)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
      }
    },
    cutout: '70%',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 relative"
    >
      <h3 className="text-xl font-bold text-white mb-6">Top Languages</h3>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-48 h-48 relative">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
            <span className="text-3xl font-bold text-white">{sortedLanguages[0]?.percentage}%</span>
            <span className="text-xs text-gray-400 truncate max-w-[80px]">{sortedLanguages[0]?.name}</span>
          </div>
        </div>

        {/* Custom Legend */}
        <div className="flex-1 w-full grid grid-cols-2 gap-3">
          {sortedLanguages.map((lang, index) => (
            <div key={lang.name} className="flex items-center gap-2 bg-gray-900/50 px-3 py-2 rounded-lg border border-gray-700/30">
              <span 
                className="w-3 h-3 rounded-full shrink-0" 
                style={{ backgroundColor: borderColors[index] }}
              />
              <div className="flex-1 truncate">
                <span className="text-sm text-gray-300 font-medium truncate block">{lang.name}</span>
              </div>
              <span className="text-xs text-gray-500 font-mono">{lang.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LanguageCharts;
