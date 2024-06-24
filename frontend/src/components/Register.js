
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, FormControl } from '@mui/material';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useNavigate();

  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userData = { firstName, lastName, username, email, password };

      const csrftoken = getCookie('csrftoken'); // Retrieve CSRF token from cookies

      await axios.post('http://127.0.0.1:8000/api/register/', userData, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': csrftoken,
        }
      });

      history('/login'); // Redirect to login page after successful registration
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2 style={{ textAlign: 'center' }}>Register</h2>
        <form onSubmit={handleRegister}>
          <FormControl fullWidth>
            <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <TextField type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <TextField type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <TextField type="password" label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </FormControl>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Register
          </Button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Register;
