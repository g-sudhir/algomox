import { jwtDecode } from 'jwt-decode';

export const setToken = (token,role) => {
  localStorage.setItem('token', token);
  localStorage.setItem('role',role);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const isAdmin = () => {
  return localStorage.getItem('role') === "admin"; 
};

export const getUserId = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.id;
  } catch (error) {
    return null;
  }
};

export const getCurrentUser = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role
    };
  } catch (error) {
    return null;
  }
};
