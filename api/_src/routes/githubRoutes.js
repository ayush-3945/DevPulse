const express = require('express');
const router = express.Router();
const githubController = require('../controllers/githubController');

router.get('/:username/profile', githubController.getProfile);
router.get('/:username/repos', githubController.getRepos);
router.get('/:username/languages', githubController.getLanguages);

module.exports = router;
