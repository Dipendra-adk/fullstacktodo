// src/context/AuthContext.js
import React, { createContext, useState } from 'react';
import { useQueryClient } from 'react-query';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    try {
      // Make API call to login endpoint
      // Example:
      // const response = await axios.post('/api/login', userData);
      // const data = response.data;
      const data = { user: userData }; // Example data for demonstration
      setUser(data.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Make API call to logout endpoint
      // Example:
      // const response = await axios.post('/api/logout');
      // Clear user state and cache
      setUser(null);
      queryClient.clear();
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
