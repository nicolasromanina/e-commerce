import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import Badge from '../ui/Badge';
import { Card } from '../ui/Card';
import { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartStore();
  
  // Calculate discount percentage if there's a discount price
  const discountPercentage = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : null;
  
  // Handle add to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  // Animation variants
  const cardVariants = {
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  };
  
  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };
  
  const actionButtonVariants = {
    initial: { opacity: 0, y: 20 },
    hover: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      variants={cardVariants}
    >
      <Card className="group h-full flex flex-col overflow-hidden">
        {/* Product Image with Overlay Actions */}
        <Link to={`/products/${product.id}`} className="relative overflow-hidden">
          {/* Discount Badge */}
          {discountPercentage && (
            <div className="absolute top-2 left-2 z-10">
              <Badge variant="error" className="px-2 py-1 bg-error-600 text-white">
                -{discountPercentage}%
              </Badge>
            </div>
          )}
          
          {/* Featured Badge */}
          {product.featured && !discountPercentage && (
            <div className="absolute top-2 left-2 z-10">
              <Badge variant="primary" className="px-2 py-1 bg-primary-600 text-white">
                Featured
              </Badge>
            </div>
          )}
          
          {/* Wishlist Button */}
          <button
            className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all shadow-sm"
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
          
          {/* Product Image */}
          <div className="relative pt-[100%] bg-gray-100">
            <motion.img
              src={product.images[0]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform"
              variants={imageVariants}
            />
          </div>
          
          {/* Action Buttons Overlay */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center space-x-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              variants={actionButtonVariants}
              className="p-2 rounded-full bg-white shadow-md hover:bg-primary-50 transition-colors"
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4 text-gray-700" />
            </motion.button>
            <motion.button
              variants={actionButtonVariants}
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-primary-600 shadow-md hover:bg-primary-700 transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-4 w-4 text-white" />
            </motion.button>
          </div>
        </Link>
        
        {/* Product Info */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Product Category */}
          <div className="text-xs text-gray-500 mb-1">
            {product.category}
          </div>
          
          {/* Product Name */}
          <Link to={`/products/${product.id}`} className="block">
            <h3 className="text-sm sm:text-base font-medium text-gray-800 mb-1 hover:text-primary-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          
          {/* Stock Status */}
          <div className="mt-auto pt-2">
            {/* Price */}
            <div className="flex items-center">
              {product.discountPrice ? (
                <>
                  <span className="text-sm font-medium text-gray-900">
                    {formatPrice(product.discountPrice)}
                  </span>
                  <span className="ml-2 text-xs text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-sm font-medium text-gray-900">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            
            {/* Availability */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <div 
                  className={`h-2 w-2 rounded-full mr-1 ${
                    product.stock > 10 
                      ? 'bg-success-500' 
                      : product.stock > 0 
                        ? 'bg-warning-500' 
                        : 'bg-error-500'
                  }`}
                />
                <span className="text-xs text-gray-500">
                  {product.stock > 10 
                    ? 'In Stock' 
                    : product.stock > 0 
                      ? 'Low Stock' 
                      : 'Out of Stock'}
                </span>
              </div>
              
              {/* Rating */}
              <div className="flex items-center">
                <span className="text-xs font-medium text-gray-900 mr-1">
                  {product.rating}
                </span>
                <svg className="h-3 w-3 text-accent-300" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 15.585l-6.327 3.325 1.209-7.035-5.117-4.981 7.079-1.027L10 0l3.156 6.867 7.079 1.027-5.117 4.981 1.209 7.035L10 15.585z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;