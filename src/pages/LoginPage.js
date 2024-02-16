import React from 'react';
import chefmanImage from '../assets/styles/chefman.png'; // Ensure this path is correct
import '../assets/styles/login.css';

function LoginPage() {
  return (
    <div className="login-page">
      {/* <div className="logo">MENU MASTER</div> */}
      <div className="login-image">
        <img src={chefmanImage} alt="Login Visual" />
      </div>
      
      <div className="login-container">
        
        <div className="login-header">Welcome back.</div>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" placeholder="Enter username" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter password" />
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="keepSignedIn" />
            <label className="form-check-label" htmlFor="keepSignedIn">Keep me signed in</label>
          </div>
          <a href="#" className="forgot-password-link">Forgot your password?</a>
          <button type="submit" className="login-btn">Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;