import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectUserLoggedIn, selectUserRole } from '../../main';
import ThemeToggle from "../../theme/ThemeToggle";

// AdminButton Component
const AdminButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // redoix
  const roleId = useSelector(selectUserRole);

    // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  if (roleId !== 0) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md text-white hover:bg-blue-700 dark:hover:bg-gray-700 focus:outline-none transition-colors"
        aria-label="Admin options"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-5 h-5"
        >
          <path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z" />
          <path d="M12 10v4" />
          <circle cx="12" cy="16" r="1" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 text-sm">
          <Link 
            to="/admin/create-league" 
            className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Create League
          </Link>
          <Link 
            to="/admin/manage-matchmaking" 
            className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Manage Matchmaking
          </Link>
          <Link 
            to="/admin/moderate" 
            className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Moderate
          </Link>
          <Link 
            to="/admin" 
            className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Admin Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const loggedIn = useSelector(selectUserLoggedIn);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Brand/Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold">
              Tailwind Shadcn Site
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:bg-blue-700 dark:hover:bg-gray-700 px-3 py-2 rounded-md">Home</Link>
            {loggedIn && (
              <Link to="/dashboard" className="hover:bg-blue-700 dark:hover:bg-gray-700 px-3 py-2 rounded-md">Dashboard</Link>
            )}
            {!loggedIn && (
              <Link to="/registration" className="hover:bg-blue-700 dark:hover:bg-gray-700 px-3 py-2 rounded-md">Register</Link>
            )}
            {!loggedIn && (
              <Link to="/login" className="hover:bg-blue-700 dark:hover:bg-gray-700 px-3 py-2 rounded-md">Login</Link>
            )}
            {loggedIn && (
              <Link to="/leagues" className="hover:bg-blue-700 dark:hover:bg-gray-700 px-3 py-2 rounded-md">Leagues</Link>
            )}
            {loggedIn && (
              <Link to="/logout" className="hover:bg-blue-700 dark:hover:bg-gray-700 px-3 py-2 rounded-md">Logout</Link>
            )}

            <AdminButton />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-blue-700 dark:hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block hover:bg-blue-700 dark:hover:bg-gray-700 px-3 py-2 rounded-md">Home</Link>
              {loggedIn && (
                <Link to="/dashboard" className="block hover:bg-blue-700 dark:hover:bg-gray-700 px-3 py-2 rounded-md">Dashboard</Link>
              )}
              {!loggedIn && (
                <Link to="/registration" className="block hover:bg-blue-700 dark:hover:bg-gray-700 px-3 py-2 rounded-md">Register</Link>
              )}
              {!loggedIn && (
                <Link to="/login" className="block hover:bg-blue-700 dark:hover:bg-gray-700 px-3 py-2 rounded-md">Login</Link>
              )}
              {loggedIn && (
                <Link to="/leagues" className="block hover:bg-blue-700 dark:hover:bg-gray-700 px-3 py-2 rounded-md">Leagues</Link>
              )}
              {loggedIn && (
                <Link to="/logout" className="block hover:bg-blue-700 dark:hover:bg-gray-700 px-3 py-2 rounded-md">Logout</Link>
              )}
              <div className="block px-3 py-2">
                <AdminButton />
              </div>
              <div className="px-3 py-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;