// src/components/Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthDispatch } from '../contexts/AuthContext'; // Assuming you have an AuthContext for managing authentication
import { TextField, Button, FormControl } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useAuthDispatch(); // Custom hook to dispatch authentication actions
  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = { username, password };
      const response = await axios.post('http://127.0.0.1:8000/api/login/', userData);

      const { user, token } = response.data;
      dispatch({ type: 'LOGIN', payload: { user, token } }); // Assuming your context handles setting user and token
      history.push('/tasks'); // Redirect to tasks page after successful login
    } catch (error) {
      setError('Invalid username or password'); // Handle specific error messages based on response
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <form onSubmit={handleLogin}>
          <FormControl fullWidth>
            <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <TextField type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </FormControl>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Login
          </Button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
