import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

interface User {
  name: string;
  email: string;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (formData: { email: string; password: string; name?: string }) => {
    // In a real app, you would validate credentials with a backend
    setUser({
      name: formData.name || 'User',
      email: formData.email
    });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && user ? (
        <>
          <Navbar user={user} onLogout={handleLogout} />
          <Dashboard />
        </>
      ) : (
        <AuthForm onLogin={handleLogin} />
      )}
    </div>
  );
}