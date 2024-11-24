import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Events from './pages/Events';
import RegisteredEvents from './pages/RegisteredEvents';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (formData) => {
    setUser({
      name: formData.name || 'John Doe',
      email: formData.email
    });
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage('dashboard');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    if (!isAuthenticated) {
      return <AuthForm onLogin={handleLogin} />;
    }

    let pageContent;
    switch (currentPage) {
      case 'events':
        pageContent = <Events />;
        break;
      case 'registered':
        pageContent = <RegisteredEvents />;
        break;
      default:
        pageContent = <Dashboard onPageChange={handlePageChange} />;
    }

    return (
      <>
        <Navbar 
          user={user}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onLogout={handleLogout}
        />
        <div className="container mx-auto px-4 py-8">
          {pageContent}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderContent()}
    </div>
  );
}

export default App;