import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { githubApi } from '../services/api';
import Navbar from '../components/Navbar';
import ProfileCard from '../features/profile/ProfileCard';
import ContributionHeatmap from '../features/heatmap/ContributionHeatmap';
import LanguageCharts from '../features/languages/LanguageCharts';
import { FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const DashboardPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [languagesLoading, setLanguagesLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch profile first to show UI faster
        const profileData = await githubApi.getProfile(username);
        setProfile(profileData);
        setLoading(false); // Stop main loading so profile shows

        // Then fetch languages (can take longer because it aggregates repos)
        setLanguagesLoading(true);
        const langsData = await githubApi.getLanguages(username);
        setLanguages(langsData);

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.response?.data?.message || 'Failed to load user data');
        toast.error('Failed to load user data');
        setLoading(false);
      } finally {
        setLanguagesLoading(false);
      }
    };

    if (username) {
      fetchDashboardData();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-400 animate-pulse">Analyzing GitHub DNA for {username}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md text-center">
            <FiAlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">User Not Found</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 mx-auto bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              <FiArrowLeft /> Back to Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Toaster position="top-right" />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (Profile & AI) */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileCard profile={profile} />
            {/* AI Personality Card will go here */}
          </div>

          {/* Right Column (Heatmap, Languages, Repos) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Phase 5: Heatmap placeholder */}
            <ContributionHeatmap username={username} />

            {/* Phase 6: Language charts */}
            <div className="grid grid-cols-1 gap-6">
              {languagesLoading ? (
                <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 h-64 flex flex-col items-center justify-center">
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-3" />
                  <span className="text-gray-500 text-sm">Analyzing repository languages...</span>
                </div>
              ) : (
                <LanguageCharts languages={languages} />
              )}
            </div>
            
            {/* Phase 7: Repos Grid placeholder */}
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 h-96 flex items-center justify-center border-dashed">
              <span className="text-gray-500">Top Repositories (Coming soon)</span>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
