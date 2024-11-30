export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    const decoded = JSON.parse(atob(token));
    return !!decoded.id;
  } catch (error) {
    return false;
  }
};

export const isAdmin = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = JSON.parse(atob(token));
    return decoded.role === 'admin';
  } catch (error) {
    return false;
  }
};

export const getUserId = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = JSON.parse(atob(token));
    return decoded.id;
  } catch (error) {
    return null;
  }
};

export const getCurrentUser = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return JSON.parse(atob(token));
  } catch (error) {
    return null;
  }
};