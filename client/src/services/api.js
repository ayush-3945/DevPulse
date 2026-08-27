import axios from 'axios';

// VITE_API_URL can be empty in production on Vercel since frontend and backend share the same domain
const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout to prevent hanging
});

export const githubApi = {
  getProfile: async (username) => {
    const response = await api.get(`/github/${username}/profile`);
    return response.data.data;
  },
  getRepos: async (username) => {
    const response = await api.get(`/github/${username}/repos`);
    return response.data.data;
  },
  getLanguages: async (username) => {
    const response = await api.get(`/github/${username}/languages`);
    return response.data.data;
  },
  getPersonality: async (username) => {
    const response = await api.post(`/ai/${username}/personality`);
    return response.data.data;
  }
};

export default api;
