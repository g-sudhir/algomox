// import { jwtDecode } from 'jwt-decode';

// export const setToken = (token) => {
//   localStorage.setItem('token', token);
// };

// export const getToken = () => {
//   return localStorage.getItem('token');
// };

// export const removeToken = () => {
//   localStorage.removeItem('token');
// };

// export const isAuthenticated = () => {
//   const token = getToken();
//   if (!token) return false;

//   try {
//     const decoded = jwtDecode(token);
//     const currentTime = Date.now() / 1000;
//     return decoded.exp > currentTime;
//   } catch (error) {
//     return false;
//   }
// };

// export const isAdmin = () => {
//   const token = getToken();
//   if (!token) return false;

//   try {
//     const decoded = jwtDecode(token);
//     return decoded.role === 'admin';
//   } catch (error) {
//     return false;
//   }
// };

// export const getUserId = () => {
//   const token = getToken();
//   if (!token) return null;

//   try {
//     const decoded = jwtDecode(token);
//     return decoded.id;
//   } catch (error) {
//     return null;
//   }
// };

// export const getCurrentUser = () => {
//   const token = getToken();
//   if (!token) return null;

//   try {
//     const decoded = jwtDecode(token);
//     return {
//       id: decoded.id,
//       name: decoded.name,
//       email: decoded.email,
//       role: decoded.role
//     };
//   } catch (error) {
//     return null;
//   }
// };