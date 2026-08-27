import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiStar, FiBookOpen, FiMapPin, FiLink, FiCalendar } from 'react-icons/fi';

const ProfileCard = ({ profile }) => {
  if (!profile) return null;

  const joinedDate = new Date(profile.created_at).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-gold/10 rounded-full blur-3xl" />
      
      <div className="flex flex-col gap-6 items-start">
        {/* Avatar & Header */}
        <div className="flex items-center gap-4 w-full">
          <div className="relative shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-gold to-amber-light rounded-full blur opacity-70" />
            <img 
              src={profile.avatar_url} 
              alt={profile.login} 
              className="relative w-20 h-20 rounded-full border-2 border-gray-800 object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold text-white truncate">{profile.name || profile.login}</h2>
            <a 
              href={profile.html_url} 
              target="_blank" 
              rel="noreferrer"
              className="text-amber-gold hover:text-amber-light transition-colors text-sm font-medium"
            >
              @{profile.login}
            </a>
            <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
              {profile.location && (
                <div className="flex items-center gap-1 truncate">
                  <FiMapPin className="text-amber-gold shrink-0" /> {profile.location}
                </div>
              )}
              <div className="flex items-center gap-1 shrink-0">
                <FiCalendar className="text-amber-gold shrink-0" /> {joinedDate}
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="text-gray-300 text-sm leading-relaxed">{profile.bio}</p>
        )}

        {/* Stats Grid: 3 Equal Non-Overlapping Columns */}
        <div className="grid grid-cols-3 gap-3 w-full">
          <div className="bg-gray-900/60 rounded-xl p-3 border border-gray-700/30 text-center flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
              <FiBookOpen className="text-amber-gold shrink-0" /> <span>Repos</span>
            </div>
            <div className="text-xl font-bold text-white">{profile.public_repos}</div>
          </div>
          
          <div className="bg-gray-900/60 rounded-xl p-3 border border-gray-700/30 text-center flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
              <FiUsers className="text-amber-gold shrink-0" /> <span>Followers</span>
            </div>
            <div className="text-xl font-bold text-white">{profile.followers}</div>
          </div>
          
          <div className="bg-gray-900/60 rounded-xl p-3 border border-gray-700/30 text-center flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
              <FiUsers className="text-amber-gold shrink-0" /> <span>Following</span>
            </div>
            <div className="text-xl font-bold text-white">{profile.following}</div>
          </div>
        </div>

        {/* Website / Blog Link */}
        {profile.blog && (
          <div className="w-full bg-gray-900/60 rounded-xl p-3 border border-gray-700/30 flex items-center gap-2 overflow-hidden">
            <FiLink className="text-amber-gold shrink-0 text-sm" />
            <a 
              href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
              target="_blank"
              rel="noreferrer" 
              className="text-amber-gold hover:text-amber-light truncate text-sm transition-colors"
            >
              {profile.blog}
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileCard;
