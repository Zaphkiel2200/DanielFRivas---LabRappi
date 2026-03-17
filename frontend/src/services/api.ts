import axios from 'axios';

// By default, assume local development backend on port 3000
// VITE_API_URL can be set in Vercel to override the backend's URL
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
