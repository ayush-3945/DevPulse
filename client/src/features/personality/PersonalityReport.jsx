import React from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiCheckCircle } from 'react-icons/fi';

const PersonalityReport = ({ report, loading }) => {
  if (loading) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 animate-pulse" />
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4 relative z-10" />
        <p className="text-purple-400 font-medium relative z-10 animate-pulse">Gemini AI is analyzing code patterns...</p>
      </div>
    );
  }

  if (!report) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-800/50 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden"
    >
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <FiCpu className="text-purple-400 text-xl" />
          <h3 className="text-xl font-bold text-white">AI Developer Personality</h3>
        </div>

        <div className="text-center mb-8">
          <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-2xl font-bold text-white mb-4 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            {report.archetype}
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">
            {report.summary}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Traits (Simple progress bars instead of radar chart for now) */}
          <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Trait Analysis</h4>
            <div className="space-y-4">
              {Object.entries(report.traits).map(([trait, score]) => (
                <div key={trait}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300 capitalize">{trait}</span>
                    <span className="text-purple-400 font-mono">{score}/10</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: \`\${score * 10}%\` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Strengths */}
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Key Strengths</h4>
              <ul className="space-y-2">
                {report.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                    <FiCheckCircle className="text-green-400 shrink-0 mt-0.5" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fun Facts */}
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Fun Facts</h4>
              <ul className="space-y-2">
                {report.funFacts.map((fact, i) => (
                  <li key={i} className="text-gray-300 text-sm pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-purple-500 before:rounded-full">
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalityReport;
