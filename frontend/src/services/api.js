import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const contactAPI = {
  submit: (data) => api.post('/contacts', data),
  getAll: () => api.get('/contacts'),
  delete: (id) => api.delete(`/contacts/${id}`)
};

export const trainerAPI = {
  getAll: () => api.get('/trainers'),
  getById: (id) => api.get(`/trainers/${id}`),
  create: (data) => api.post('/trainers', data),
  update: (id, data) => api.put(`/trainers/${id}`, data),
  delete: (id) => api.delete(`/trainers/${id}`)
};

export const planAPI = {
  getAll: () => api.get('/membership-plans'),
  create: (data) => api.post('/membership-plans', data),
  update: (id, data) => api.put(`/membership-plans/${id}`, data),
  delete: (id) => api.delete(`/membership-plans/${id}`)
};

export const testimonialAPI = {
  getAll: () => api.get('/testimonials'),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`)
};

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  verify: () => api.get('/auth/verify')
};

export default api;
