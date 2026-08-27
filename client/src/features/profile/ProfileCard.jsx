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
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur opacity-70" />
          <img 
            src={profile.avatar_url} 
            alt={profile.login} 
            className="relative w-28 h-28 rounded-full border-2 border-gray-800 object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 w-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">{profile.name || profile.login}</h2>
              <a 
                href={profile.html_url} 
                target="_blank" 
                rel="noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                @{profile.login}
              </a>
            </div>
            
            <div className="mt-2 md:mt-0 flex gap-4 text-sm text-gray-400">
              {profile.location && (
                <div className="flex items-center gap-1">
                  <FiMapPin /> {profile.location}
                </div>
              )}
              <div className="flex items-center gap-1">
                <FiCalendar /> Joined {joinedDate}
              </div>
            </div>
          </div>

          {profile.bio && (
            <p className="text-gray-300 mb-6 max-w-2xl">{profile.bio}</p>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/30">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <FiBookOpen /> Repos
              </div>
              <div className="text-2xl font-bold text-white">{profile.public_repos}</div>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/30">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <FiUsers /> Followers
              </div>
              <div className="text-2xl font-bold text-white">{profile.followers}</div>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/30">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <FiUsers /> Following
              </div>
              <div className="text-2xl font-bold text-white">{profile.following}</div>
            </div>

            {profile.blog && (
              <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/30 flex flex-col justify-center overflow-hidden">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <FiLink /> Website
                </div>
                <a 
                  href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                  target="_blank"
                  rel="noreferrer" 
                  className="text-blue-400 hover:text-blue-300 truncate text-sm"
                >
                  {profile.blog}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
