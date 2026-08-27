const githubService = require('../services/githubService');
const CachedProfile = require('../models/CachedProfile');

const getProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ status: 'error', message: 'Username is required' });
    }

    const mongoose = require('mongoose');
    let cached = null;
    
    // Check cache first if connected
    if (mongoose.connection.readyState === 1) {
      cached = await CachedProfile.findOne({ username: username.toLowerCase() });
      if (cached && cached.profileData) {
        return res.status(200).json({ status: 'success', data: cached.profileData, cached: true });
      }
    }

    const profileData = await githubService.getUserProfile(username);

    // Save to cache if connected
    if (mongoose.connection.readyState === 1) {
      if (!cached) {
        cached = new CachedProfile({ username: username.toLowerCase() });
      }
      cached.profileData = profileData;
      await cached.save();
    }

    res.status(200).json({
      status: 'success',
      data: profileData
    });
  } catch (error) {
    next(error);
  }
};

const getRepos = async (req, res, next) => {
  try {
    const { username } = req.params;

    const mongoose = require('mongoose');
    let cached = null;

    if (mongoose.connection.readyState === 1) {
      cached = await CachedProfile.findOne({ username: username.toLowerCase() });
      if (cached && cached.repoData && cached.repoData.length > 0) {
        return res.status(200).json({ status: 'success', data: cached.repoData, cached: true });
      }
    }

    const reposData = await githubService.getUserRepos(username);

    if (mongoose.connection.readyState === 1) {
      if (!cached) {
        cached = new CachedProfile({ username: username.toLowerCase() });
      }
      cached.repoData = reposData;
      await cached.save();
    }

    res.status(200).json({
      status: 'success',
      data: reposData
    });
  } catch (error) {
    next(error);
  }
};

const getLanguages = async (req, res, next) => {
  try {
    const { username } = req.params;

    const mongoose = require('mongoose');
    let cached = null;

    if (mongoose.connection.readyState === 1) {
      cached = await CachedProfile.findOne({ username: username.toLowerCase() });
      if (cached && cached.languageData) {
        return res.status(200).json({ status: 'success', data: cached.languageData, cached: true });
      }
    }
    
    // First get repos
    const repos = await githubService.getUserRepos(username);
    
    // Aggregate languages from top 5 non-fork repos (fast & rate-limit safe)
    const targetRepos = repos
      .filter(repo => repo.language && !repo.fork)
      .slice(0, 5);
    
    const languagePromises = targetRepos.map(repo => 
      githubService.getRepoLanguages(username, repo.name).catch(() => null)
    );
    
    const reposLanguages = await Promise.allSettled(languagePromises);
    
    // Combine language bytes
    const aggregatedLanguages = {};
    reposLanguages.forEach(result => {
      if (result.status === 'fulfilled' && result.value) {
        Object.keys(result.value).forEach(lang => {
          aggregatedLanguages[lang] = (aggregatedLanguages[lang] || 0) + result.value[lang];
        });
      }
    });

    // Fallback if detailed byte endpoints returned empty: count primary languages
    if (Object.keys(aggregatedLanguages).length === 0) {
      targetRepos.forEach(repo => {
        if (repo.language) {
          aggregatedLanguages[repo.language] = (aggregatedLanguages[repo.language] || 0) + 1000;
        }
      });
    }

    if (mongoose.connection.readyState === 1) {
      if (!cached) {
        cached = new CachedProfile({ username: username.toLowerCase() });
      }
      cached.languageData = aggregatedLanguages;
      await cached.save();
    }

    res.status(200).json({
      status: 'success',
      data: aggregatedLanguages
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  getRepos,
  getLanguages
};
