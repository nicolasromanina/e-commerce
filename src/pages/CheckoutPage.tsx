import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, Check } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select, { SelectOption } from '../components/ui/Select';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { formatPrice } from '../utils/formatters';
import { motion } from 'framer-motion';

const countries: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
];

const states: SelectOption[] = [
  { value: 'ca', label: 'California' },
  { value: 'ny', label: 'New York' },
  { value: 'tx', label: 'Texas' },
  { value: 'fl', label: 'Florida' },
];

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  
  const { items, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Information
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'ca',
    postalCode: '',
    country: 'us',
    
    // Payment Information
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    savePaymentMethod: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate order summary
  const subtotal = items.reduce(
    (total, item) => total + (item.product.discountPrice || item.product.price) * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  // Validate form for the current step
  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (activeStep === 1) {
      // Validate shipping information
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.addressLine1) newErrors.addressLine1 = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
    } else if (activeStep === 2) {
      // Validate payment information
      if (!formData.cardName) newErrors.cardName = 'Name on card is required';
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) 
        newErrors.cardNumber = 'Invalid card number';
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) 
        newErrors.expiryDate = 'Invalid format (MM/YY)';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
      if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'Invalid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission for each step
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateStep()) {
      if (activeStep < 3) {
        setActiveStep(activeStep + 1);
        window.scrollTo(0, 0);
      } else {
        // Submit order
        handlePlaceOrder();
      }
    }
  };
  
  // Go back to previous step
  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/cart');
    }
  };
  
  // Place order
  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      // Clear cart and navigate to success page
      clearCart();
      navigate('/checkout/success', { 
        state: { 
          orderId: `ORD-${Date.now()}`,
          total 
        } 
      });
    }, 2000);
  };
  
  // If cart is empty, redirect to products
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-lg shadow-card p-8 text-center">
            <div className="mb-6">
              <div className="h-24 w-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="h-12 w-12 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products">
              <Button variant="primary">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {activeStep === 1 ? 'Back to Cart' : 'Back to Previous Step'}
        </button>
        
        {/* Checkout Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center w-full max-w-3xl">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className="relative flex items-center justify-center">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center border-2 z-10 ${
                      step < activeStep
                        ? 'bg-success-500 border-success-500 text-white'
                        : step === activeStep
                        ? 'bg-white border-primary-600 text-primary-600'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    {step < activeStep ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span>{step}</span>
                    )}
                  </div>
                  <div className="absolute bottom-0 transform translate-y-4">
                    <span
                      className={`text-xs font-medium ${
                        step <= activeStep ? 'text-gray-900' : 'text-gray-400'
                      }`}
                    >
                      {step === 1 ? 'Shipping' : step === 2 ? 'Payment' : 'Review'}
                    </span>
                  </div>
                </div>
                {step < 3 && (
                  <div
                    className={`flex-1 h-1 ${
                      step < activeStep ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-card p-6"
            >
              {/* Step 1: Shipping Information */}
              {activeStep === 1 && (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        error={errors.fullName}
                        fullWidth
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        fullWidth
                      />
                    </div>
                    
                    <Input
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      fullWidth
                    />
                    
                    <Input
                      label="Address Line 1"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleChange}
                      error={errors.addressLine1}
                      fullWidth
                    />
                    
                    <Input
                      label="Address Line 2 (Optional)"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleChange}
                      fullWidth
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        error={errors.city}
                        fullWidth
                      />
                      <Select
                        label="State"
                        options={states}
                        value={formData.state}
                        onChange={(value) => handleSelectChange('state', value)}
                        error={errors.state}
                        fullWidth
                      />
                      <Input
                        label="Postal Code"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        error={errors.postalCode}
                        fullWidth
                      />
                    </div>
                    
                    <Select
                      label="Country"
                      options={countries}
                      value={formData.country}
                      onChange={(value) => handleSelectChange('country', value)}
                      error={errors.country}
                      fullWidth
                    />
                    
                    <div className="mt-6">
                      <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </>
              )}
              
              {/* Step 2: Payment Information */}
              {activeStep === 2 && (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Information</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="p-4 border border-primary-100 bg-primary-50 rounded-md flex items-start mb-4">
                      <Lock className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-primary-800">
                        Your payment information is secure. We use industry-standard encryption to protect your data.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <Input
                        label="Name on Card"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        error={errors.cardName}
                        fullWidth
                      />
                      
                      <Input
                        label="Card Number"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        error={errors.cardNumber}
                        placeholder="1234 5678 9012 3456"
                        rightIcon={<CreditCard className="h-5 w-5" />}
                        fullWidth
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Expiry Date"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          error={errors.expiryDate}
                          placeholder="MM/YY"
                          fullWidth
                        />
                        
                        <Input
                          label="CVV"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          error={errors.cvv}
                          placeholder="123"
                          fullWidth
                        />
                      </div>
                      
                      <div className="flex items-start">
                        <input
                          id="savePaymentMethod"
                          name="savePaymentMethod"
                          type="checkbox"
                          checked={formData.savePaymentMethod}
                          onChange={handleChange}
                          className="h-4 w-4 mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                        />
                        <label htmlFor="savePaymentMethod" className="ml-2 block text-sm text-gray-700">
                          Save this payment method for future purchases
                        </label>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-3">
                      <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                      >
                        Continue to Review
                      </Button>
                      
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        fullWidth
                      >
                        Back to Shipping
                      </Button>
                    </div>
                  </form>
                </>
              )}
              
              {/* Step 3: Review & Place Order */}
              {activeStep === 3 && (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Review Your Order</h2>
                  
                  <div className="space-y-6">
                    {/* Shipping Information */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-900">Shipping Information</h3>
                        <button
                          onClick={() => setActiveStep(1)}
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-gray-800">{formData.fullName}</p>
                        <p className="text-gray-800">{formData.addressLine1}</p>
                        {formData.addressLine2 && <p className="text-gray-800">{formData.addressLine2}</p>}
                        <p className="text-gray-800">
                          {formData.city}, {states.find(s => s.value === formData.state)?.label} {formData.postalCode}
                        </p>
                        <p className="text-gray-800">{countries.find(c => c.value === formData.country)?.label}</p>
                        <p className="text-gray-800">{formData.phone}</p>
                        <p className="text-gray-800">{formData.email}</p>
                      </div>
                    </div>
                    
                    {/* Payment Information */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-900">Payment Information</h3>
                        <button
                          onClick={() => setActiveStep(2)}
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-gray-800">{formData.cardName}</p>
                        <p className="text-gray-800">
                          **** **** **** {formData.cardNumber.slice(-4)}
                        </p>
                        <p className="text-gray-800">Expires: {formData.expiryDate}</p>
                      </div>
                    </div>
                    
                    {/* Order Items */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Order Items</h3>
                      <div className="border rounded-md divide-y">
                        {items.map((item) => (
                          <div key={item.productId} className="flex py-4 px-4">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>{item.product.name}</h3>
                                  <p className="ml-4">
                                    {formatPrice(
                                      (item.product.discountPrice || item.product.price) * item.quantity
                                    )}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  Quantity: {item.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={handlePlaceOrder}
                      isLoading={isProcessing}
                      fullWidth
                    >
                      Place Order
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      disabled={isProcessing}
                      fullWidth
                    >
                      Back to Payment
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-card p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-success-600 font-medium">Free</span>
                  ) : (
                    <span className="text-gray-900 font-medium">{formatPrice(shipping)}</span>
                  )}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900 font-medium">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="text-gray-900 font-bold">Total</span>
                  <span className="text-gray-900 font-bold">{formatPrice(total)}</span>
                </div>
              </div>
              
              {/* Order Items Preview */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Items in Cart ({items.length})</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={item.productId} className="flex items-center p-2 bg-gray-50 rounded-md">
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-3 flex-1 text-sm">
                        <p className="font-medium text-gray-900 truncate">{item.product.name}</p>
                        <p className="text-gray-500">
                          Qty: {item.quantity} × {formatPrice(item.product.discountPrice || item.product.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Promo Code */}
              <div className="mb-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Promo code"
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    Apply
                  </Button>
                </div>
              </div>
              
              {/* Secure Checkout */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                  <Lock className="h-4 w-4 mr-1" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex justify-center space-x-2">
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-8" />
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className="h-8" />
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="PayPal" className="h-8" />
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196539.png" alt="American Express" className="h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;