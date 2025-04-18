import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { register } = useAuthStore();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const user = await register(email, password, name);
      
      if (user) {
        navigate('/');
      } else {
        setError('Failed to create account. Please try again.');
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
        <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
        <p className="text-gray-600 mt-2">Sign up to get started with Luxe</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-error-50 border border-error-200 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 text-error-500 mr-2 mt-0.5" />
            <p className="text-sm text-error-800">{error}</p>
          </div>
        )}
        
        <Input
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          leftIcon={<User className="h-4 w-4" />}
          placeholder="Enter your full name"
          required
          fullWidth
        />
        
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
          placeholder="Create a password"
          helperText="Must be at least 6 characters"
          required
          fullWidth
        />
        
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          leftIcon={<Lock className="h-4 w-4" />}
          placeholder="Confirm your password"
          required
          fullWidth
        />
        
        <div className="flex items-start">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="h-4 w-4 mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            I agree to the{' '}
            <Link to="/terms" className="font-medium text-primary-600 hover:text-primary-700">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="font-medium text-primary-600 hover:text-primary-700">
              Privacy Policy
            </Link>
          </label>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          fullWidth
        >
          Create Account
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;