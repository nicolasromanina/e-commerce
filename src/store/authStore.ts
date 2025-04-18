import { create } from 'zustand';
import { AuthState, User } from '../types';
import { persist } from 'zustand/middleware';
import { authenticate } from '../data/users';

export const useAuthStore = create<AuthState & {
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<User | null>;
}>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (email, password) => {
        set({ isLoading: true });
        
        try {
          // In a real app, this would be an API call
          const user = authenticate(email, password);
          
          if (user) {
            set({ 
              user, 
              isAuthenticated: true, 
              isLoading: false 
            });
            return user;
          } else {
            set({ isLoading: false });
            return null;
          }
        } catch (error) {
          set({ isLoading: false });
          return null;
        }
      },
      
      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        });
      },
      
      register: async (email, password, name) => {
        set({ isLoading: true });
        
        try {
          // In a real app, this would be an API call
          // For demo purposes, we'll just create a new user
          const newUser: User = {
            id: `user-${Date.now()}`,
            email,
            name,
            role: 'user'
          };
          
          set({ 
            user: newUser, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          return newUser;
        } catch (error) {
          set({ isLoading: false });
          return null;
        }
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);