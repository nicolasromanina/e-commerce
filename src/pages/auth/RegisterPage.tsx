import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row-reverse items-center">
          {/* Right Column - Form */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center">
            <RegisterForm />
          </div>
          
          {/* Left Column - Image & Text */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end">
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Join Luxe Commerce
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Create an account to experience premium shopping with personalized recommendations and exclusive offers.
              </p>
              
              <div className="aspect-video rounded-lg overflow-hidden mb-6">
                <img
                  src="https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Premium shopping experience"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Already have an account?</h3>
                <p className="text-gray-600 mb-4">
                  Sign in to your existing account to continue shopping and manage your orders.
                </p>
                <Link
                  to="/login"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Sign in to your account →
                </Link>
              </div>
              
              <p className="text-sm text-gray-500">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="text-primary-600 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-600 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;