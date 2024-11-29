import React, { useState } from 'react';
import { Menu, X, UserCircle, Calendar, BookCheck, LogOut } from 'lucide-react';

interface User {
  name: string;
  email: string;
}

interface NavbarProps {
  user: User;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/events', icon: <Calendar className="h-5 w-5" />, text: 'Events' },
    { href: '/registered', icon: <BookCheck className="h-5 w-5" />, text: 'Registered' }
  ];

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

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-indigo-600 flex items-center space-x-1"
              >
                {link.icon}
                <span>{link.text}</span>
              </a>
            ))}
            <div className="flex items-center space-x-4">
              <UserCircle className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600">{user.name}</span>
              <button
                onClick={onLogout}
                className="text-gray-600 hover:text-red-600 flex items-center space-x-1"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                <span className="flex items-center space-x-2">
                  {link.icon}
                  <span>{link.text}</span>
                </span>
              </a>
            ))}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center px-3">
                <UserCircle className="h-6 w-6 text-gray-400" />
                <span className="ml-3 text-base font-medium text-gray-600">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="mt-3 w-full flex items-center px-3 py-2 text-base font-medium text-red-600 hover:text-red-700"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}