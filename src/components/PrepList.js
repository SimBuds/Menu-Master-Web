import React, { useState } from 'react';
import { Card, ListGroup, ListGroupItem, Button, InputGroup, FormControl } from 'react-bootstrap';
import { BsSearch, BsCalendar } from 'react-icons/bs';
import '../assets/css/PrepList.css';
import demiImage from '../assets/images/demi.jpg';
import cremeImage from '../assets/images/creme.jpg';
import mashedImage from '../assets/images/mash.jpg';


function PrepList() {
  const [searchTerm, setSearchTerm] = useState('');

 // Placeholder data for the list
  const items = [
    { 
      name: 'Demi Glace', 
      role: 'Saucier', 
      quantity: '500 ml', 
      image: demiImage
    },
    { 
      name: 'Creme Brulee', 
      role: 'Pastry Chef', 
      quantity: '50 Orders', 
      image: cremeImage
    },
        { 
      name: 'Mashed Potatoes', 
      role: 'Line Set', 
      quantity: '10.00 KG', 
      image: mashedImage
    },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter items based on search term
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="prep-list-container">
      <InputGroup className="mb-3 search-bar">
        <InputGroup.Text>
          <BsSearch />
        </InputGroup.Text>
        <FormControl
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </InputGroup>

      <Card className="prep-list-card">
        <Card.Header className="prep-header">
          <div className="header-title">Prep List:</div>
          <div className="header-date">
            <BsCalendar />
            <span>15/02/2024</span>
          </div>
        </Card.Header>
        <ListGroup variant="flush">
          {filteredItems.map((item, index) => (
            <ListGroupItem key={index} className="d-flex justify-content-between align-items-center prep-item">
              <div className="item-info">
              <img src={item.image} alt={item.name} className="item-image" />
                <div>
                  <h6 className="item-name">{item.name}</h6>
                  <small className="text-muted item-role">{item.role}</small>
                </div>
              </div>
              <div className="item-quantity">
                <span>{item.quantity}</span>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
        <Card.Footer className="text-center">
          {/* Button color = #f05f40; */}
          
          <Button variant="danger" className="sell-all-btn">
            Prep All Items
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default PrepList;