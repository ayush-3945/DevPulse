const geminiService = require('../services/geminiService');

const getPersonalityReport = async (req, res, next) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ status: 'error', message: 'Username is required' });
    }

    const report = await geminiService.generatePersonalityReport(username);
    
    res.status(200).json({
      status: 'success',
      data: report
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPersonalityReport
};
