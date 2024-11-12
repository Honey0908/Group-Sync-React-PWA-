import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

interface User {
  _id: string;
  username: string;
  email: string;
  // Add other user properties if necessary
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
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/users/login', { email, password });
      console.log(response);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(response.data.user);
      navigate('/');
    } catch (error) {
      console.error('Login error', error);
    }
  };

  // Function to check token validity (optional)
  const checkTokenValidity = async () => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
    // const token = localStorage.getItem('token');
    // if (token) {
    //   try {
    //     const response = await api.get('/users/validate-token');
    //     setUser(response.data.user); // Set user based on the valid token response
    //   } catch (error) {
    //     console.error('Token validation failed', error);
    //     logout();
    //   }
    // }
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

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
    localStorage.removeItem('token');
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
