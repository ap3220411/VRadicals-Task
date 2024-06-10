import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Box, Button } from '@material-ui/core';
import './AuthStyles.css'; // Custom CSS file for additional styling
import axios from "../../axiosConfig";

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    
    if (user && token) {
      navigateUser(user);
    }
  }, []);

  const handleSignIn = async () => {
    try {
      if (!username || !password) {
        setError('Username and password are required.');
        return;
      }

      const response = await axios.post('/auth/signin', { username, password });
      const { user, token } = response.data;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      navigateUser(user);
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Invalid username or password. Please try again.');
    }
  };

  const navigateUser = (user) => {
    if (user.role === 'Admin') {
      navigate('/admin-dashboard');
    } else if (user.role === 'HR') {
      navigate('/hr-dashboard');
    } else {
      console.error('Invalid user role:', user.role);
      setError('Invalid user role. Please contact support.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5} className="auth-box">
        <Typography variant="h4">Sign In</Typography>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button variant="contained" color="primary" onClick={handleSignIn} fullWidth>
          Sign In
        </Button>
        {error && <Typography variant="body2" color="error">{error}</Typography>}
      </Box>
    </Container>
  );
}

export default SignIn;
