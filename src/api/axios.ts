import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}/api`,
});

// Interceptor to add Authorization header with JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
