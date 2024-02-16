import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBox, faUtensils, faUsers, faTruck, faBook, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Sidebar({ onLogout }) {

  return (
    <nav className="sidebar d-flex flex-column">
      <div className="sidebar-brand p-3 mb-3">MENU MASTER</div>
      <div className="menu-section mb-3">
        <p className="menu-section-title px-3 mb-2">MAIN MENU</p>
        <NavLink to="/" exact className="menu-item p-3" activeClassName="active">
          <FontAwesomeIcon icon={faTachometerAlt} className="menu-icon" /> Dashboard
        </NavLink>
        <NavLink to="/inventory" className="menu-item" activeClassName="active">
          <FontAwesomeIcon icon={faBox} className="menu-icon" /> Inventory
        </NavLink>
        <NavLink to="/menu" className="menu-item" activeClassName="active">
          <FontAwesomeIcon icon={faUtensils} className="menu-icon" /> Menu
        </NavLink>
        <NavLink to="/users" className="menu-item" activeClassName="active">
          <FontAwesomeIcon icon={faUsers} className="menu-icon" /> Users
        </NavLink>
        <NavLink to="/suppliers" className="menu-item" activeClassName="active">
          <FontAwesomeIcon icon={faTruck} className="menu-icon" /> Suppliers
        </NavLink>
        <NavLink to="/recipes" className="menu-item" activeClassName="active">
          <FontAwesomeIcon icon={faBook} className="menu-icon" /> Recipes
        </NavLink>
      </div>
      <div className="menu-section account-section">
        <p className="menu-section-title px-3 mb-2">ACCOUNT</p>
        <span className="menu-item disabled p-3">Casey Hsu</span>
        <button className="logout-button" onClick={onLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" /> Logout
        </button>
      </div>
    </nav>
  );
}

export default Sidebar;