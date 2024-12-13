import { mockEvents, mockUsers } from '../utils/mockData';
import { getUserId } from '../utils/auth';

let events = [...mockEvents];
let users = [...mockUsers];

export const login = async (credentials) => {
  const user = users.find(
    u => u.email === credentials.email && u.password === credentials.password
  );
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const token = btoa(JSON.stringify({ 
    id: user.id, 
    role: user.role,
    name: user.name,
    email: user.email 
  }));
  
  return {
    status: 'success',
    data: {
      user,
      token
    }
  };
};

export const register = async (userData) => {
  const existingUser = users.find(u => u.email === userData.email);
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const newUser = {
    id: users.length + 1,
    ...userData
  };

  users.push(newUser);
  const token = btoa(JSON.stringify({ 
    id: newUser.id, 
    role: newUser.role,
    name: newUser.name,
    email: newUser.email 
  }));

  return {
    status: 'success',
    data: {
      user: newUser,
      token
    }
  };
};

export const fetchEvents = async () => {
  return events;
};

export const createEvent = async (eventData) => {
  const newEvent = {
    id: events.length + 1,
    ...eventData,
    registrations: []
  };

  events.push(newEvent);
  return newEvent;
};

export const deleteEvent = async (eventId) => {
  events = events.filter(event => event.id !== eventId);
};

export const fetchEventRegistrations = async (eventId) => {
  const event = events.find(e => e.id === eventId);
  return event ? event.registrations : [];
};

export const registerForEvent = async (eventId) => {
  const userId = getUserId();
  if (!userId) {
    throw new Error('User not authenticated');
  }

  const event = events.find(e => e.id === eventId);
  if (!event) {
    throw new Error('Event not found');
  }

  const user = users.find(u => u.id === userId);
  if (!user) {
    throw new Error('User not found');
  }

  const alreadyRegistered = event.registrations.some(
    reg => reg.userId === userId
  );

  if (alreadyRegistered) {
    throw new Error('Already registered for this event');
  }

  const registration = {
    id: event.registrations.length + 1,
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    registeredAt: new Date().toISOString()
  };

  event.registrations.push(registration);
  events = events.map(e => e.id === eventId ? { ...e, registrations: [...e.registrations, registration] } : e);
  
  return { message: 'Successfully registered for the event' };
};

export const getRegisteredEvents = async () => {
  const userId = getUserId();
  if (!userId) {
    return [];
  }

  return events.filter(event => 
    event.registrations.some(reg => reg.userId === userId)
  );
};