import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Menu from './pages/Menu';
import Sidebar from './components/Sidebar';
import Inventory from './pages/Inventory';
import PrepList from './components/PrepList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row">
          {isLoggedIn && (
            <div className="col-md-2">
              <Sidebar onLogout={handleLogout} />
            </div>
          )}
          <div className={isLoggedIn ? "col-md-8" : "col-md-12"}>
            <Routes>
              <Route path="/" element={!isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <Navigate replace to="/dashboard" />} />
              <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate replace to="/" />} />
              <Route path="/inventory" element={isLoggedIn ? <Inventory /> : <Navigate replace to="/" />} />
              <Route path="/users" element={isLoggedIn ? <Users /> : <Navigate replace to="/" />} />
              <Route path="/menu" element={isLoggedIn ? <Menu /> : <Navigate replace to="/" />} />
              <Route path="/suppliers" element={<h1>Suppliers</h1>} />
              <Route path="/recipes" element={<h1>Recipes</h1>} />
            </Routes>
          </div>
          {isLoggedIn && (
            <div className="col-md-2">
              <PrepList />
            </div>
          )}
        </div>
      </div>c
    </BrowserRouter>
  );
}

export default App;