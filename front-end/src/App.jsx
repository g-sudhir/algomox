import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import Events from './pages/Events';
import RegisteredEvents from './pages/RegisteredEvents';
import CreateEvent from './pages/admin/CreateEvent';
import AdminEvents from './pages/admin/AdminEvents';
import { setToken, removeToken, isAuthenticated } from './utils/auth';

function App() {
  const navigate = useNavigate();

  const handleLogin = (data) => {
    setToken(data.token);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      {isAuthenticated() && <Navbar onLogout={handleLogout} />}
      <div className="p-4">
        <Routes>
          <Route 
            path="/login" 
            element={!isAuthenticated() ? <AuthForm onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
          />
          
          <Route 
            path="/dashboard" 
            element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/events" 
            element={isAuthenticated() ? <Events /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/registered-events" 
            element={isAuthenticated() ? <RegisteredEvents /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/admin/events" 
            element={isAuthenticated() ? <AdminEvents /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/admin/events/create" 
            element={isAuthenticated() ? <CreateEvent /> : <Navigate to="/login" />} 
          />
          
          <Route path="/" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;