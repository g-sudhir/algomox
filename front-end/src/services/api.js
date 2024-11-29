import axios from 'axios';
import { getToken } from '../utils/auth';

// For demo purposes, we'll use a mock API base URL
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock users data
const mockUsers = [
  { id: 1, email: 'admin@example.com', password: 'admin123', name: 'Admin User', role: 'admin' },
  { id: 2, email: 'user@example.com', password: 'user123', name: 'Regular User', role: 'user' }
];

export const login = async (credentials) => {
  try {
    // Mock login logic
    const user = mockUsers.find(u => 
      u.email === credentials.email && 
      u.password === credentials.password
    );
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Create a mock token
    const token = btoa(JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      exp: Date.now() + 24*60*60*1000
    }));

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    };
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
};

export const register = async (userData) => {
  try {
    // Mock registration logic
    if (mockUsers.some(u => u.email === userData.email)) {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      role: userData.role || 'user'
    };

    mockUsers.push(newUser);
    
    // Create a mock token
    const token = btoa(JSON.stringify({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      exp: Date.now() + 24*60*60*1000
    }));

    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
      token
    };
  } catch (error) {
    throw new Error(error.message || 'Registration failed');
  }
};

// ... existing code ...

// Mock events data
const mockEvents = [
  {
    id: 1,
    name: "Tech Conference 2024",
    startDate: "2024-06-15",
    endDate: "2024-06-17",
    duration: "3 days",
    chiefGuest: "John Doe",
    location: "Convention Center",
    description: "Annual technology conference featuring the latest innovations",
    image: "https://picsum.photos/400/300"
  },
  {
    id: 2,
    name: "Workshop on AI",
    startDate: "2024-07-20",
    endDate: "2024-07-21",
    duration: "2 days",
    chiefGuest: "Jane Smith",
    location: "Tech Hub",
    description: "Hands-on workshop on artificial intelligence and machine learning",
    image: "https://picsum.photos/400/301"
  }
];

// Mock registrations data
const mockRegistrations = [
  { id: 1, eventId: 1, userId: 1, userName: "John Smith", userEmail: "john@example.com" },
  { id: 2, eventId: 1, userId: 2, userName: "Jane Doe", userEmail: "jane@example.com" }
];

export const fetchEvents = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockEvents;
  } catch (error) {
    throw new Error('Failed to fetch events');
  }
};

export const createEvent = async (eventData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newEvent = {
      id: mockEvents.length + 1,
      ...eventData
    };
    mockEvents.push(newEvent);
    return newEvent;
  } catch (error) {
    throw new Error('Failed to create event');
  }
};

export const deleteEvent = async (eventId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const index = mockEvents.findIndex(event => event.id === eventId);
    if (index === -1) {
      throw new Error('Event not found');
    }
    mockEvents.splice(index, 1);
    return true;
  } catch (error) {
    throw new Error('Failed to delete event');
  }
};

export const fetchEventRegistrations = async (eventId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockRegistrations.filter(reg => reg.eventId === eventId);
  } catch (error) {
    throw new Error('Failed to fetch event registrations');
  }
};

export const registerForEvent = async (eventId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get current user from token
    const token = getToken();
    const userData = JSON.parse(atob(token));
    
    // Check if already registered
    const existingRegistration = mockRegistrations.find(
      reg => reg.eventId === eventId && reg.userId === userData.id
    );
    
    if (existingRegistration) {
      throw new Error('You are already registered for this event');
    }
    
    // Create new registration
    const newRegistration = {
      id: mockRegistrations.length + 1,
      eventId,
      userId: userData.id,
      userName: userData.name,
      userEmail: userData.email
    };
    
    mockRegistrations.push(newRegistration);
    return newRegistration;
  } catch (error) {
    throw new Error(error.message || 'Failed to register for event');
  }
};