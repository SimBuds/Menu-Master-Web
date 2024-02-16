import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import PrepList from './components/PrepList';
import Inventory from './pages/Inventory';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row">
          {isLoggedIn && (
            <div className="col-md-2">
              <Sidebar />
            </div>
          )}
          <div className={isLoggedIn ? "col-md-10" : "col-md-12"}>
            <Routes>
              <Route path="/" element={!isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <Navigate replace to="/dashboard" />} />
              <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate replace to="/" />} />
              <Route path="/inventory" element={isLoggedIn ? <Inventory /> : <Navigate replace to="/" />} />
              <Route path="/menu" element={<h1>Menu</h1>} />
              <Route path="/users" element={<h1>Users</h1>} />
              <Route path="/suppliers" element={<h1>Suppliers</h1>} />
              <Route path="/recipes" element={<h1>Recipes</h1>} />
              <Route path="/logout" element={<h1>Logout</h1>} />
              {/* Redirect any other route to the LoginPage or Dashboard depending on the login status */}
              <Route path="*" element={!isLoggedIn ? <Navigate replace to="/" /> : <Navigate replace to="/dashboard" />} />
            </Routes>
          </div>
          {isLoggedIn && (
            <div className="col-md-2">
              <PrepList />
            </div>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;