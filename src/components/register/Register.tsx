// src/pages/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import api from '../../api/axios';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simple validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Make POST request to the server for registration
      const response = await api.post('/users/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      console.log('User registered:', response.data);

      // Redirect to login page after successful registration
      navigate('/login');
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'An error occurred. Please try again.'
      );
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2>Register</h2>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div>
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default Register;
