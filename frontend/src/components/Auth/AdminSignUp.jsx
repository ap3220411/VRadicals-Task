import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'; // Import makeStyles
import { Container, Box, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  box: {
    // Define your styles here
    // For example:
    padding: theme.spacing(2),
    border: '1px solid #ccc',
    borderRadius: theme.spacing(1),
  },
}));

export default function AdminSignUp() {
  const classes = useStyles();
  const navigate = useNavigate(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSignUp = async () => {
    try {
      
      if (!username || !password) {
        console.error('Username and password are required');
        return;
      }
      
     
      if (!role) {
        console.error('Role is required');
        return;
      }

      console.log('Signing up:', { username, password, role });
      
      
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5} className={classes.box}>
        <Typography variant="h4">Sign Up</Typography>
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
        <div className="form-group">
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <Button variant="contained" color="primary" onClick={handleSignUp} fullWidth>
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}
