const geminiService = require('../services/geminiService');
const CachedProfile = require('../models/CachedProfile');

const getPersonalityReport = async (req, res, next) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ status: 'error', message: 'Username is required' });
    }

    let cached = await CachedProfile.findOne({ username: username.toLowerCase() });
    if (cached && cached.personalityReport) {
      return res.status(200).json({ status: 'success', data: cached.personalityReport, cached: true });
    }

    const report = await geminiService.generatePersonalityReport(username);
    
    if (!cached) {
      cached = new CachedProfile({ username: username.toLowerCase() });
    }
    cached.personalityReport = report;
    await cached.save();

    res.status(200).json({ status: 'success', data: report });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPersonalityReport
};
