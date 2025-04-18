import React from 'react';
import { useCartStore } from '../../store/cartStore';
import { X, Trash2, ShoppingBag, AlertCircle } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CartSidebar: React.FC = () => {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity } = useCartStore();
  
  // Calculate cart totals
  const subtotal = items.reduce(
    (total, item) => total + (item.product.discountPrice || item.product.price) * item.quantity,
    0
  );
  
  // Handle quantity change
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };
  
  // Maximum stock for any product (for demo)
  const MAX_QUANTITY = 10;
  
  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={closeCart}
          />
        )}
      </AnimatePresence>
      
      {/* Cart Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Your Cart {items.length > 0 && `(${items.length})`}
              </h2>
              <button
                onClick={closeCart}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Cart Items */}
            {items.length > 0 ? (
              <div className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-4">
                  {items.map((item) => (
                    <motion.li
                      key={item.productId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex border-b border-gray-100 pb-4"
                    >
                      {/* Product Image */}
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link to={`/products/${item.productId}`} onClick={closeCart}>
                                {item.product.name}
                              </Link>
                            </h3>
                            <p className="ml-4">
                              {formatPrice(
                                (item.product.discountPrice || item.product.price) * item.quantity
                              )}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.category}
                          </p>
                        </div>
                        
                        <div className="flex flex-1 items-end justify-between text-sm mt-2">
                          {/* Quantity Controls */}
                          <div className="flex items-center border rounded-md">
                            <button
                              onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="px-2 py-1 text-gray-800">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              disabled={item.quantity >= MAX_QUANTITY}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          
                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-error-600 hover:text-error-800 flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <ShoppingBag className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Your cart is empty</h3>
                <p className="text-gray-500 text-center mb-6">
                  Looks like you haven't added any products to your cart yet.
                </p>
                <Button
                  onClick={closeCart}
                  variant="primary"
                >
                  Continue Shopping
                </Button>
              </div>
            )}
            
            {/* Cart Summary */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>{formatPrice(subtotal)}</p>
                </div>
                
                {/* Shipping Note */}
                <p className="text-sm text-gray-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1 text-accent-200" />
                  Shipping and taxes calculated at checkout
                </p>
                
                {/* Checkout Button */}
                <div className="mt-4">
                  <Link to="/checkout" onClick={closeCart}>
                    <Button 
                      variant="primary" 
                      fullWidth
                    >
                      Checkout
                    </Button>
                  </Link>
                </div>
                
                {/* Continue Shopping */}
                <div className="mt-2 flex justify-center text-center text-sm text-gray-500">
                  <button
                    onClick={closeCart}
                    className="font-medium text-primary-600 hover:text-primary-700"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartSidebar;