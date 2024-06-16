import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../../axiosConfig";
import './AuthStyles.css'; 

function SignUp() {
  const navigate = useNavigate(); 
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSignUp = async () => {
    try {
      await axios.post('/auth/signup', { email, password, role });
      alert(" Account Created Successfully")
      navigate('/');
    } catch (error) {
      alert('Error signing up:', error);
    }
  };

  return (
    <div className="container">
      <div className="auth-box mt-5">
        <h4> SignUp</h4>
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
        <div className="form-group">
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="HR">HR</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button className="btn btn-primary btn-block" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignUp;
