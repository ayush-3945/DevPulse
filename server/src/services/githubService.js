const { Octokit } = require('octokit');

// Initialize Octokit (will use token from environment if available)
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || undefined,
});

/**
 * Fetch basic user profile data
 */
const getUserProfile = async (username) => {
  try {
    const { data } = await octokit.rest.users.getByUsername({
      username,
    });
    return data;
  } catch (error) {
    if (error.status === 404) {
      throw { statusCode: 404, message: 'User not found on GitHub' };
    }
    throw error;
  }
};

/**
 * Fetch all public repositories for a user
 */
const getUserRepos = async (username) => {
  try {
    // Note: This fetches up to 100 public repos. 
    // For users with more, pagination would be needed.
    const { data } = await octokit.rest.repos.listForUser({
      username,
      type: 'owner',
      sort: 'updated',
      per_page: 100,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch language usage across a repository
 */
const getRepoLanguages = async (owner, repo) => {
  try {
    const { data } = await octokit.rest.repos.listLanguages({
      owner,
      repo,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch recent activity/events for a user
 */
const getUserEvents = async (username) => {
  try {
    const { data } = await octokit.rest.activity.listPublicEventsForUser({
      username,
      per_page: 50,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserProfile,
  getUserRepos,
  getRepoLanguages,
  getUserEvents
};
