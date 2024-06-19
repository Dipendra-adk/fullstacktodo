
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Route, Navigate } from 'react-router-dom';
import { useAuthState } from '../contexts/AuthContext';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuthState();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
};

export default PrivateRoute;
