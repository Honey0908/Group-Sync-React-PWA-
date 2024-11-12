import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assume you have an AuthContext for authentication state

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth(); // Hook to check authentication state
  console.log(isAuthenticated);
  // If authenticated, render the requested route (Outlet is a placeholder for child routes)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
