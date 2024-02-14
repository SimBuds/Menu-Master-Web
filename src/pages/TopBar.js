import React from 'react';
import './TopBar.css';

const TopBar = ({ onSearch }) => {
    return (
        <header className="top-bar">
            <div className="search-container">
                <input type="search" placeholder="Search..." onChange={onSearch} />
            </div>
            {/* ...profile info */}
        </header>
    );
};

export default TopBar;
