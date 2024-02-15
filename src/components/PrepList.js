import React, { useState } from 'react';
import { Card, ListGroup, ListGroupItem, Button, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsSearch, BsCalendar, BsThreeDotsVertical } from 'react-icons/bs';
import '../assets/css/PrepList.css';

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
    <div className="container mt-3">
      <InputGroup className="mb-3 search-bar">
        <InputGroup.Text className="search-icon">
          <BsSearch />
        </InputGroup.Text>
        <FormControl
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="rounded-pill"
        />
      </InputGroup>

      <Card className="prep-list-card shadow-sm">
        <Card.Header as="h5" className="prep-header d-flex justify-content-between align-items-center">
          Prep <BsCalendar />
        </Card.Header>
        <ListGroup variant="flush">
          {filteredItems.map((item, index) => (
            <ListGroupItem key={index} className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img src={item.image} alt={item.name} className="rounded-circle mr-2 item-image" />
                <div>
                  <h6 className="mb-0 item-name">{item.name}</h6>
                  <small className="text-muted item-role">{item.role}</small>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <small className="item-quantity">{item.quantity}</small>
                <BsThreeDotsVertical />
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
        <Card.Footer className="text-center">
          <Button variant="danger" className="rounded-pill sell-all-btn">
            Sell All
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default PrepList;