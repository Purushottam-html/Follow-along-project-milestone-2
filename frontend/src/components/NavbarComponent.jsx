import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ userEmail, userName }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userData');
    window.location.href = '/login';
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen]);

  const handleMenuItemClick = () => {
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="bg-purple-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/homepage" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-400">
                AniMerch
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/homepage" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-800 hover:text-pink-200 transition">
                Home
              </Link>
              <Link to="/homepage" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-800 hover:text-pink-200 transition">
                Products
              </Link>
              <Link to="/homepage" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-800 hover:text-pink-200 transition">
                Collections
              </Link>
              <Link to="/homepage" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-800 hover:text-pink-200 transition">
                About
              </Link>
            </div>
          </div>
          
          {/* Search Bar (Desktop) */}
          <div className={`hidden md:flex items-center transition-all duration-300 ${isSearchOpen ? 'w-64' : 'w-0'}`}>
            {isSearchOpen && (
              <input
                type="text"
                placeholder="Search for anime merch..."
                className="w-full bg-purple-800 text-white border border-purple-700 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            )}
          </div>
          
          {/* Right side icons */}
          <div className="flex items-center">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-md text-gray-100 hover:text-pink-200 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <Link to="/cart" className="p-2 rounded-md text-gray-100 hover:text-pink-200 focus:outline-none relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute top-0 right-0 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>
            
            {userEmail ? (
              <div className="relative user-menu">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 rounded-md text-gray-100 hover:text-pink-200 focus:outline-none flex items-center"
                >
                  <span className="mr-2">{userName || 'User'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isUserMenuOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu">
                      <Link
                        to="/profile"
                        onClick={handleMenuItemClick}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100"
                        role="menuitem"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/add-product"
                        onClick={handleMenuItemClick}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100"
                        role="menuitem"
                      >
                        Add Product
                      </Link>
                      <Link
                        to="/my-products"
                        onClick={handleMenuItemClick}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100"
                        role="menuitem"
                      >
                        Your Products
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-100"
                        role="menuitem"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="p-2 rounded-md text-gray-100 hover:text-pink-200 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-100 hover:text-pink-200 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/homepage" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-800 hover:text-pink-200">
              Home
            </Link>
            <Link to="/homepage" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-800 hover:text-pink-200">
              Products
            </Link>
            <Link to="/homepage" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-800 hover:text-pink-200">
              Collections
            </Link>
            <Link to="/homepage" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-800 hover:text-pink-200">
              About
            </Link>
            <div className="pt-2">
              <input
                type="text"
                placeholder="Search for anime merch..."
                className="w-full bg-purple-800 text-white border border-purple-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
