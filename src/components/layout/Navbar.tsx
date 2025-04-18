import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Home, Package, Heart, LogIn } from 'lucide-react';
import Button from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { items, toggleCart } = useCartStore();
  
  // Calculate cart items count
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);
  
  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with query
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-primary-600" />
            <span className="font-display font-bold text-xl text-primary-600">
              Luxe
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
            >
              Shop
            </Link>
            <Link 
              to="/categories" 
              className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
            >
              About
            </Link>
          </nav>
          
          {/* Desktop Search & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Form */}
            <form 
              onSubmit={handleSearchSubmit}
              className="relative"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 h-10 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
            
            {/* Cart Button */}
            <button 
              onClick={toggleCart}
              className="relative p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 rounded-full bg-primary-600 text-white text-xs font-bold">
                  {cartItemsCount}
                </span>
              )}
            </button>
            
            {/* User Account */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <User className="w-full h-full p-1" />
                    )}
                  </div>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  <Link 
                    to="/orders" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Orders
                  </Link>
                  {user?.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button 
                  variant="primary" 
                  size="sm"
                  icon={<LogIn className="h-4 w-4" />}
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={toggleCart}
              className="relative p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 rounded-full bg-primary-600 text-white text-xs font-bold">
                  {cartItemsCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
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
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search */}
              <form 
                onSubmit={handleSearchSubmit}
                className="mb-4"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </form>
              
              {/* Navigation Links */}
              <nav className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                >
                  <Home className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">Home</span>
                </Link>
                <Link 
                  to="/products" 
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                >
                  <Package className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">Shop</span>
                </Link>
                <Link 
                  to="/categories" 
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                >
                  <Package className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">Categories</span>
                </Link>
                <Link 
                  to="/wishlist" 
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                >
                  <Heart className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">Wishlist</span>
                </Link>
              </nav>
              
              {/* Authentication */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        {user?.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <User className="w-full h-full p-2" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <Link to="/profile">
                      <Button variant="outline" fullWidth>
                        Your Profile
                      </Button>
                    </Link>
                    <Link to="/orders">
                      <Button variant="outline" fullWidth>
                        Your Orders
                      </Button>
                    </Link>
                    {user?.role === 'admin' && (
                      <Link to="/admin">
                        <Button variant="outline" fullWidth>
                          Admin Dashboard
                        </Button>
                      </Link>
                    )}
                    <Button 
                      variant="ghost" 
                      fullWidth
                      onClick={logout}
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link to="/login">
                      <Button variant="primary" fullWidth>
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="outline" fullWidth>
                        Create Account
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;