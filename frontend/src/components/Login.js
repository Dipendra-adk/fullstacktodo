// src/components/Login.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../api';
import { useAuthDispatch } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useAuthDispatch();
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = { username, password };
      const { user, token } = await loginUser(userData);
      dispatch({ type: 'LOGIN', payload: { user, token } });
      history.push('/tasks');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
