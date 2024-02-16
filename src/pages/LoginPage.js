import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import chefmanImage from '../assets/images/chefman.png';
import '../assets/css/Login.css';

function LoginPage({ onLogin }) {
  // Define temporary credentials as variables
  const TEMP_USERNAME = 'admin';
  const TEMP_PASSWORD = 'password123';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Use the TEMP_USERNAME and TEMP_PASSWORD variables for validation
    if (username === TEMP_USERNAME && password === TEMP_PASSWORD) {
      onLogin(true);
      navigate('/dashboard');
    } else {
      alert('Invalid username or password');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="login-page">
      <div className="text-center mb-4">
        <h1>Menu Master</h1> {/* Ensure "Menu Master" is prominently displayed */}
      </div>
      <div className="login-image">
        <img src={chefmanImage} alt="Login Visual" />
      </div>
      
      <div className="login-container">
        <div className="login-header">Welcome back.</div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="keepSignedIn" />
            <label className="form-check-label" htmlFor="keepSignedIn">Keep me signed in</label>
          </div>
          <button className="forgot-password-link btn btn-link" type="button" onClick={handleForgotPassword}>Forgot your password?</button>
          <button type="submit" className="login-btn btn btn-primary w-100">Sign in</button>
        </form>
        <div className="login-footer mt-3">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;