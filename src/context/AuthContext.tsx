import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toastNotify } from '../utils/lib';

interface User {
  _id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Function to check token validity
  const checkTokenValidity = async () => {
    const token = localStorage.getItem('token');
    // At first, set user from local storage
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      navigate('/');
    }

    if (token) {
      // Check if the user is online before making the API request
      if (!navigator.onLine) {
        console.warn('No network connection. Skipping token validation.');
        return; // Skip the API call when offline
      }

      try {
        const response = await api.get('/users/validate-token');
        setUser(response.data.user);
      } catch (error) {
        console.error('Token validation failed', error);
        logout();
      }
    }
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/users/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(response.data.user);
      navigate('/');
    } catch (error: any) {
      toastNotify('error', error?.response?.data?.error);
      console.error('Login error', error);
    }
  };

  // Register function
  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      await api.post('/users/register', { username, email, password });
      navigate('/login');
    } catch (error) {
      console.error('Registration error', error);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/login');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
