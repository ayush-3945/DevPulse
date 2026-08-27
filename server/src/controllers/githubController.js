const githubService = require('../services/githubService');

const getProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ status: 'error', message: 'Username is required' });
    }

    const profileData = await githubService.getUserProfile(username);
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
    const reposData = await githubService.getUserRepos(username);
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
