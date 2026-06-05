import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.track2311investments.org',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;