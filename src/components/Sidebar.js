import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/sidebar.css';

function Sidebar() {
  return (
    <nav className="sidebar">
      <ul className="sidebar-nav">
        <li className="nav-item">
          <NavLink to="/" activeClassName="active" exact>
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/inventory" activeClassName="active">
            Inventory
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/menu" activeClassName="active">
            Menu
          </NavLink>
        </li>
        {/* ... other nav items ... */}
      </ul>
    </nav>
  );
}

export default Sidebar;
