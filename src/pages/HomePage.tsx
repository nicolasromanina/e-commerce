import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Package, Truck, ShieldCheck, Timer } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductCard from '../components/products/ProductCard';
import { Product } from '../types';
import { getFeaturedProducts, getProductsByCategory } from '../data/products';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [electronicsProducts, setElectronicsProducts] = useState<Product[]>([]);
  const [fashionProducts, setFashionProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Load featured products
    setFeaturedProducts(getFeaturedProducts());
    
    // Load category products
    setElectronicsProducts(getProductsByCategory('Electronics').slice(0, 4));
    setFashionProducts(getProductsByCategory('Fashion').slice(0, 4));
  }, []);
  
  // Hero section animation variants
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white pt-32 pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              variants={itemVariants}
            >
              Premium Shopping Experience
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl mb-8 text-gray-100"
              variants={itemVariants}
            >
              Discover curated products for the discerning customer. 
              Quality and style for those who appreciate the finer things.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              variants={itemVariants}
            >
              <Link to="/products">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="bg-white text-primary-700 hover:bg-gray-100"
                >
                  Shop Now
                </Button>
              </Link>
              <Link to="/categories">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Explore Categories
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 0L48 8.875C96 17.75 192 35.5 288 44.375C384 53.25 480 53.25 576 44.375C672 35.5 768 17.75 864 8.875C960 0 1056 0 1152 8.875C1248 17.75 1344 35.5 1392 44.375L1440 53.25V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>
      
      {/* Value Propositions */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              className="flex items-center p-6 bg-gray-50 rounded-lg"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="flex-shrink-0 p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Premium Quality</h3>
                <p className="text-sm text-gray-600">Curated selection of top-tier products</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center p-6 bg-gray-50 rounded-lg"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="flex-shrink-0 p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Fast Shipping</h3>
                <p className="text-sm text-gray-600">Free delivery on orders over $100</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center p-6 bg-gray-50 rounded-lg"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="flex-shrink-0 p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Secure Payments</h3>
                <p className="text-sm text-gray-600">100% secure payment processing</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center p-6 bg-gray-50 rounded-lg"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="flex-shrink-0 p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <Timer className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Easy Returns</h3>
                <p className="text-sm text-gray-600">30-day money-back guarantee</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <Link 
              to="/products" 
              className="text-primary-600 hover:text-primary-700 flex items-center"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Promotional Banner */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent-200 to-accent-300">
            <div className="absolute inset-0 mix-blend-overlay opacity-30 pattern-dots"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center p-8 md:p-12">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-2">Summer Sale</h2>
                <p className="text-lg text-primary-800 mb-4">Get up to 40% off on selected items</p>
                <Link to="/sale">
                  <Button 
                    variant="primary" 
                    size="lg"
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    Shop Now
                  </Button>
                </Link>
              </div>
              <div className="hidden md:block w-1/3">
                <img 
                  src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Summer Sale" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Electronics Category */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Electronics</h2>
            <Link 
              to="/categories/electronics" 
              className="text-primary-600 hover:text-primary-700 flex items-center"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {electronicsProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Fashion Category */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Fashion</h2>
            <Link 
              to="/categories/fashion" 
              className="text-primary-600 hover:text-primary-700 flex items-center"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fashionProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Stay updated with the latest products, sales, and promotions
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              />
              <Button 
                variant="primary" 
                className="whitespace-nowrap"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;