import { User } from '../types';

// Mock user data
export const users: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'John Doe',
    role: 'user',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

// Mock authentication functions
export const authenticate = (email: string, password: string): User | null => {
  // In a real app, you'd check the password hash here
  // For demo purposes, we'll accept any password
  const user = users.find(user => user.email === email);
  return user || null;
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};