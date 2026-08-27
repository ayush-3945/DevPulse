import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
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
