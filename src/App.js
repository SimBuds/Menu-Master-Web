import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import PrepList from './components/PrepList';
import Inventory from './pages/Inventory'; // Import other pages you want to navigate to
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/menu" element={<h1>Menu</h1>} />
              <Route path="/users" element={<h1>Users</h1>} />
              <Route path="/suppliers" element={<h1>Suppliers</h1>} />
              <Route path="/recipes" element={<h1>Recipes</h1>} />
              <Route path="/logout" element={<h1>Logout</h1>} />
            </Routes>
          </div>
          <div className="col-md-2">
            <PrepList />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;