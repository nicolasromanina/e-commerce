import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import { Mail, Lock, AlertCircle } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuthStore();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // For demo, use admin@example.com or user@example.com with any password
      const user = await login(email, password);
      
      if (user) {
        // Redirect based on user role
        navigate(user.role === 'admin' ? '/admin' : '/');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-card max-w-md w-full">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-error-50 border border-error-200 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 text-error-500 mr-2 mt-0.5" />
            <p className="text-sm text-error-800">{error}</p>
          </div>
        )}
        
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="h-4 w-4" />}
          placeholder="Enter your email"
          required
          fullWidth
        />
        
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock className="h-4 w-4" />}
          placeholder="Enter your password"
          required
          fullWidth
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:text-primary-700">
            Forgot password?
          </Link>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          fullWidth
        >
          Sign In
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-primary-600 hover:text-primary-700">
            Sign up
          </Link>
        </p>
      </div>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
          </div>
        </div>
        
        <div className="mt-4 grid gap-2">
          <button
            type="button"
            onClick={() => {
              setEmail('admin@example.com');
              setPassword('password');
            }}
            className="text-sm text-left p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium">Admin:</span> admin@example.com / password
          </button>
          <button
            type="button"
            onClick={() => {
              setEmail('user@example.com');
              setPassword('password');
            }}
            className="text-sm text-left p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium">User:</span> user@example.com / password
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;