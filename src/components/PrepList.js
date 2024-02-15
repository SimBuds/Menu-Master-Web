import React, { useState } from 'react';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="col">
      <InputField 
        className="form-control mb-3"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="list-group">
        {filteredItems.map((item, index) => (
          <div className="list-group-item" key={index}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{item.name}</h5>
              <small>{item.quantity}</small>
            </div>
            <p className="mb-1">{item.role}</p>
          </div>
        ))}
      </div>
      <Button className="btn btn-primary mt-3" text="See All" onClick={() => {/* See all functionality */}} />
    </div>
  );
}

export default PrepList;