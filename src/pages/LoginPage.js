import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import chefmanImage from '../assets/images/chefman.png';
import '../assets/css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';


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
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            {/* Left side with image and Menu Master text */}
            <h1 className="text-white text-center text-md-left">Menu Master</h1>
            <div className="login-image my-4 my-md-0">
              <img src={chefmanImage} alt="Login Visual" className="img-fluid" />
            </div>
          </div>
          <div className="col-12 col-md-6">
            {/* Right side with login form */}
            <div className="login-container bg-white p-4 shadow rounded">
              <h2 className="login-header mb-4">Welcome back.</h2>
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
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="keepSignedIn" />
                    <label className="form-check-label" htmlFor="keepSignedIn">Keep me signed in</label>
                  </div>
                  <button className="forgot-password-link btn btn-link" type="button" onClick={handleForgotPassword}>
                    Forgot your password?
                  </button>
                </div>
                <button type="submit" className="login-btn btn btn-primary w-100">Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;