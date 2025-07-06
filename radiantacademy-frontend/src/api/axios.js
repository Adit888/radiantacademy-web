import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // atau sesuaikan dengan port Flask kamu
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log("🔐 Token yang dikirim:", token); // Tambahkan log debug
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
