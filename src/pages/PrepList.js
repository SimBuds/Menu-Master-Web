import React, { useState } from 'react';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import '../assets/styles/preplist.css';

function PrepList() {
  const [searchTerm, setSearchTerm] = useState('');

  // Placeholder data for the list
  const items = [
    { name: 'Demi Glace', role: 'Saucier', quantity: '500 ml' },
    { name: 'Creme Brulee', role: 'Pastry chef 1', quantity: '500 ml' },
    // ...other items
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter items based on search term
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="prep-list">
      <InputField 
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="prep-items">
        {filteredItems.map((item, index) => (
          <div className="prep-item" key={index}>
            <div className="prep-image">
              {/* Place image here, for now we'll just show the name */}
              <img src="path-to-your-image.jpg" alt={item.name} />
            </div>
            <div className="prep-info">
              <h3>{item.name}</h3>
              <p>{item.role}</p>
              <p>{item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <Button text="See All" onClick={() => {/* Sell all functionality */}} />
    </div>
  );
}

export default PrepList;