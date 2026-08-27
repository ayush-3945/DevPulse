const githubService = require('../services/githubService');
const CachedProfile = require('../models/CachedProfile');

const getProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ status: 'error', message: 'Username is required' });
    }

    // Check cache first
    let cached = await CachedProfile.findOne({ username: username.toLowerCase() });
    if (cached && cached.profileData) {
      return res.status(200).json({ status: 'success', data: cached.profileData, cached: true });
    }

    const profileData = await githubService.getUserProfile(username);

    // Save to cache
    if (!cached) {
      cached = new CachedProfile({ username: username.toLowerCase() });
    }
    cached.profileData = profileData;
    await cached.save();

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

    let cached = await CachedProfile.findOne({ username: username.toLowerCase() });
    if (cached && cached.repoData && cached.repoData.length > 0) {
      return res.status(200).json({ status: 'success', data: cached.repoData, cached: true });
    }

    const reposData = await githubService.getUserRepos(username);

    if (!cached) {
      cached = new CachedProfile({ username: username.toLowerCase() });
    }
    cached.repoData = reposData;
    await cached.save();

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

    let cached = await CachedProfile.findOne({ username: username.toLowerCase() });
    if (cached && cached.languageData) {
      return res.status(200).json({ status: 'success', data: cached.languageData, cached: true });
    }
    
    // First get repos
    const repos = await githubService.getUserRepos(username);
    
    // Aggregate languages from all repos concurrently
    const languagePromises = repos
      .filter(repo => repo.language && !repo.fork) // only include non-fork repos that have a primary language
      .map(repo => githubService.getRepoLanguages(username, repo.name));
    
    const reposLanguages = await Promise.all(languagePromises);
    
    // Combine language bytes
    const aggregatedLanguages = {};
    reposLanguages.forEach(repoLangs => {
      Object.keys(repoLangs).forEach(lang => {
        aggregatedLanguages[lang] = (aggregatedLanguages[lang] || 0) + repoLangs[lang];
      });
    });

    if (!cached) {
      cached = new CachedProfile({ username: username.toLowerCase() });
    }
    cached.languageData = aggregatedLanguages;
    await cached.save();

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
