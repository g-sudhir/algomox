import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import Events from './pages/Events';
import RegisteredEvents from './pages/RegisteredEvents';
import CreateEvent from './pages/admin/CreateEvent';
import AdminEvents from './pages/admin/AdminEvents';
import { setToken, removeToken, isAuthenticated, isAdmin } from './utils/auth';

function App() {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  const handleLogin = (data) => {
    setToken(data.token);
    setAuthenticated(true);
  };

  const handleLogout = () => {
    removeToken();
    setAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        {authenticated && <Navbar onLogout={handleLogout} />}
        <div className="p-4">
          <Routes>
            <Route 
              path="/login" 
              element={!authenticated ? <AuthForm onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
            />
            
            <Route 
              path="/dashboard" 
              element={authenticated ? <Dashboard /> : <Navigate to="/login" />} 
            />
            
            <Route 
              path="/events" 
              element={authenticated ? <Events /> : <Navigate to="/login" />} 
            />
            
            <Route 
              path="/registered-events" 
              element={authenticated ? <RegisteredEvents /> : <Navigate to="/login" />} 
            />
            
            <Route 
              path="/admin/events" 
              element={authenticated && isAdmin() ? <AdminEvents /> : <Navigate to="/login" />} 
            />
            
            <Route 
              path="/admin/events/create" 
              element={authenticated && isAdmin() ? <CreateEvent /> : <Navigate to="/login" />} 
            />
            
            <Route path="/" element={<Navigate to={authenticated ? "/dashboard" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;