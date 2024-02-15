import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css'; // Importing custom CSS

function Sidebar() {
  return (
    <nav className="navbar navbar-light bg-light flex-column justify-content-center">
      <div className="navbar-brand mb-5">Menu Master</div>
      <ul className="navbar-nav flex-column align-items-center">
        <li className="nav-item mb-3">
          <NavLink to="/" activeClassName="active" exact className="nav-link">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink to="/inventory" activeClassName="active" className="nav-link">
            Inventory
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink to="/menu" activeClassName="active" className="nav-link">
            Menu
          </NavLink>
        </li>
        {/* ... other nav items ... */}
      </ul>
    </nav>
  );
}

export default Sidebar;