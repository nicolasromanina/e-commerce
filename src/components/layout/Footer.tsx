import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Package className="h-6 w-6 text-accent-200" />
              <span className="font-display font-bold text-xl text-white">
                Luxe
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Premium shopping experience with curated products for the discerning customer.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#"
                className="text-gray-400 hover:text-accent-200 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#"
                className="text-gray-400 hover:text-accent-200 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#"
                className="text-gray-400 hover:text-accent-200 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#"
                className="text-gray-400 hover:text-accent-200 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/categories/electronics" className="text-gray-400 hover:text-white transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/categories/fashion" className="text-gray-400 hover:text-white transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/categories/home" className="text-gray-400 hover:text-white transition-colors">
                  Home & Living
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-gray-400 hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-gray-400 hover:text-white transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-gray-400 hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/order-tracking" className="text-gray-400 hover:text-white transition-colors">
                  Order Tracking
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest products and exclusive offers.
            </p>
            <form className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-200"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bg-primary-600 text-white p-1 rounded-md hover:bg-primary-700 transition-colors"
                  aria-label="Subscribe"
                >
                  <Mail className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </form>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Luxe Commerce. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-500 text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-500 text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="text-gray-500 text-sm hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;