import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { Check, PackageOpen, Clock, Truck, Home } from 'lucide-react';
import Button from '../components/ui/Button';
import { formatPrice } from '../utils/formatters';

const OrderSuccessPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as { orderId: string; total: number } | undefined;
  
  // Redirect if coming to this page directly without an order
  if (!state?.orderId) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-card p-8">
          <div className="text-center mb-8">
            <div className="h-20 w-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-10 w-10 text-success-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Your order has been placed!
            </h1>
            <p className="text-gray-600">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-500 mb-1">Order Number</p>
                <p className="font-medium text-gray-900">{state.orderId}</p>
              </div>
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-500 mb-1">Date</p>
                <p className="font-medium text-gray-900">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-500 mb-1">Total</p>
                <p className="font-medium text-gray-900">{formatPrice(state.total)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                <p className="font-medium text-gray-900">Credit Card</p>
              </div>
            </div>
          </div>
          
          {/* Order Timeline */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Order Timeline
            </h2>
            <div className="space-y-4">
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <PackageOpen className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
                </div>
                <div className="pt-2">
                  <p className="font-medium text-gray-900">Order Placed</p>
                  <p className="text-sm text-gray-500">
                    {new Date().toLocaleString('en-US', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Your order has been received and is being processed.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
                </div>
                <div className="pt-2">
                  <p className="font-medium text-gray-400">Processing</p>
                  <p className="text-sm text-gray-500">Estimated: In 1-2 days</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Your order will be prepared for shipping.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
                </div>
                <div className="pt-2">
                  <p className="font-medium text-gray-400">Shipped</p>
                  <p className="text-sm text-gray-500">Estimated: In 3-5 days</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Your order will be on its way to you.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Home className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="pt-2">
                  <p className="font-medium text-gray-400">Delivered</p>
                  <p className="text-sm text-gray-500">Estimated: In 5-7 days</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Your order will be delivered to your address.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Email Notification */}
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-8">
            <p className="text-primary-800">
              We've sent a confirmation email to your email address with all the details of your order.
              You will also receive updates when your order ships.
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Link to="/orders">
              <Button variant="outline">View Order History</Button>
            </Link>
            <Link to="/">
              <Button variant="primary">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;