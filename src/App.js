import React from 'react';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import PrepList from './components/PrepList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-8">
          <Dashboard />
        </div>
        <div className="col-md-2">
          <PrepList />
        </div>
      </div>
    </div>
  );
}

export default App;