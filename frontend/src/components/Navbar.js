
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from '../contexts/AuthContext';

const Navbar = () => {
  const { state, dispatch } = useAuthState();
  const history = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    history('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Todo App
        </Typography>
        {state && state.isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/tasks">Tasks</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;