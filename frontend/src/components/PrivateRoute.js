import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthState } from '../contexts/AuthContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useAuthState();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;

