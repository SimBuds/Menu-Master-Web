import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { AuthContextProvider, useAuth } from './context/AuthContext';
import { queryClient } from './services/QueryClient';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Menu from './pages/Menu';
import Inventory from './pages/Inventory';
import PrepList from './components/PrepList';
import Suppliers from './pages/Suppliers';
import Recipes from './pages/Recipes';
import Invoices from './pages/Invoices';
import NotFoundPage from './pages/NotFoundPage';
import Sidebar from './components/Sidebar';
import './assets/css/App.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

function AppContent() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="app-container">
      <div className="row">
        {isLoggedIn && (
          <div className="col-md-2">
            <Sidebar onLogout={logout} />
          </div>
        )}
        <div className={isLoggedIn ? "col-md-8" : "col-md-12"}>
          <Routes>
            <Route path="/" element={!isLoggedIn ? <LoginPage /> : <Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate replace to="/" />} />
            <Route path="/inventory" element={isLoggedIn ? <Inventory /> : <Navigate replace to="/" />} />
            <Route path="/users" element={isLoggedIn ? <Users /> : <Navigate replace to="/" />} />
            <Route path="/menu" element={isLoggedIn ? <Menu /> : <Navigate replace to="/" />} />
            <Route path="/suppliers" element={isLoggedIn ? <Suppliers /> : <Navigate replace to="/" />} />
            <Route path="/recipes" element={isLoggedIn ? <Recipes /> : <Navigate replace to="/" />} />
            <Route path="/invoices" element={isLoggedIn ? <Invoices /> : <Navigate replace to="/" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        {isLoggedIn && (
          <div className="col-md-2">
            <PrepList />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;