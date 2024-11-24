import React, { useState } from 'react';
import { Menu, X, UserCircle, Calendar, BookCheck, LogOut, LayoutDashboard } from 'lucide-react';

function Navbar({ user, currentPage, onPageChange, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'registered', label: 'Registered Events', icon: BookCheck }
  ];

  const handleNavClick = (id) => {
    if (onPageChange) {
      onPageChange(id);
      setIsMobileMenuOpen(false);
    }
  };

  const NavItem = ({ id, label, icon: Icon, isMobile }) => {
    const isActive = currentPage === id;
    const baseClasses = "flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200";
    const activeClasses = "text-indigo-600 bg-indigo-50";
    const inactiveClasses = "text-gray-600 hover:text-indigo-600 hover:bg-gray-50";
    const mobileClasses = isMobile ? "w-full" : "";

    return (
      <button
        onClick={() => handleNavClick(id)}
        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${mobileClasses}`}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-800">EventHub</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map(item => (
              <NavItem key={item.id} {...item} />
            ))}
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
              <div className="flex items-center space-x-2">
                <UserCircle className="h-5 w-5 text-gray-600" />
                <span className="text-gray-600">{user?.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(item => (
              <NavItem key={item.id} {...item} isMobile />
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 pb-3">
            <div className="px-4 flex items-center space-x-3">
              <UserCircle className="h-6 w-6 text-gray-400" />
              <span className="text-gray-600">{user?.name}</span>
            </div>
            <div className="mt-3 px-2">
              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-red-600 hover:text-red-700 hover:bg-gray-50"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;