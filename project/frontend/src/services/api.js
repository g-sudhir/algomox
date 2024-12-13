import axios from 'axios';

const API_URL = 'https://algomox-eventmanagementbackend.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response;
};

export const register = async (userData) => {
  const response = await api.post('/auth/signup', userData);
  return response;
};

// Events API
export const fetchEvents = async (params) => {
  const response = await api.get('/events', { params });
  return response.data.data.events;
};

export const fetchEvent = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data.data.event;
};

export const createEvent = async (eventData) => {
  const response = await api.post('/events', eventData);
  return response.data.data.event;
};

export const updateEvent = async (id, eventData) => {
  const response = await api.patch(`/events/${id}`, eventData);
  return response.data.data.event;
};

export const deleteEvent = async (id) => {
  await api.delete(`/events/${id}`);
};

export const registerForEvent = async (eventId) => {
  const response = await api.post(`/events/${eventId}/register`);
  return response.data;
};

export const fetchMyEvents = async () => {
  const response = await api.get('/events/my/events');
  return response.data.data.events;
};

export const fetchEventRegistrations = async (eventId) => {
  const response = await api.get(`/events/${eventId}/registrations`);
  return response.data.data.registrations;
};
