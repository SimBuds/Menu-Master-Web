import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMutation } from 'react-query';
import chefmanImage from '../assets/images/chefman.png';
import '../assets/css/Login.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginUser = async ({ username, password }) => {
    // Check for mock credentials
    if (username === 'testuser' && password === 'testpass') {
      console.log('Mock login successful');
      // Simulating a successful login response
      login({ username: 'testuser', token: 'mock-token' });
      console.log('User logged in', username);
      navigate('/dashboard', { replace: true });
      return; // Add this line to prevent further execution
    } else {
      // Actual login logic with backend request
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log('Login successful', data);
        login({ username: data.username, token: data.token });
        navigate('/dashboard');
      } catch (error) {
        console.error('Login error:', error);
        alert(error.message);
      }
    }
  };

  const { mutate, isLoading, error } = useMutation(loginUser, {
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    mutate({ username, password });
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h1 className="text-white text-center text-md-left">Menu Master</h1>
            <div className="login-image my-4 my-md-0">
              <img src={chefmanImage} alt="Login Visual" className="img-fluid" />
            </div>
          </div>
          <div className="col-12 col-md-6">
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
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="keepSignedIn"
                      checked={keepSignedIn}
                      onChange={(e) => setKeepSignedIn(e.target.checked)}
                    />
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
      {isLoading && <p>Logging in...</p>}
      {error && <p>Error logging in: {error.message}</p>}
    </div>
  );
}

export default LoginPage;