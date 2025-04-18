import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Column - Form */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center">
            <LoginForm />
          </div>
          
          {/* Right Column - Image & Text */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Luxe Commerce
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Sign in to your account to access your profile, track orders, and get personalized recommendations.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 className="font-medium text-gray-900 mb-2">New Customer?</h3>
                <p className="text-gray-600 mb-4">
                  Create an account to enjoy these benefits:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-success-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">
                      Fast checkout with saved shipping info
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-success-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">
                      Track orders and view order history
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-success-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">
                      Receive personalized product recommendations
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-success-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">
                      Create wishlists and save favorite items
                    </span>
                  </li>
                </ul>
                <div className="mt-4">
                  <Link
                    to="/register"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Create an account →
                  </Link>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                By signing in, you agree to our{' '}
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

export default LoginPage;