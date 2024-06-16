import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../../axiosConfig";


function SignIn() {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
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
      if (!email || !password) {
        setError('email and password are required.');
        return;
      }

      const response = await axios.post('/auth/signin', { email, password });
      const { user, token } = response.data;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      navigateUser(user);
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Invalid email or password. Please try again.');
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
    <div className="container">
      <div className="mt-5 auth-box">
        <h4>Sign In</h4>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
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
        <button className="btn btn-primary btn-block" onClick={handleSignIn}>
          Sign In
        </button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default SignIn;
