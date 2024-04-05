import React, { useState } from 'react';
import { Card, ListGroup, ListGroupItem,  InputGroup, FormControl } from 'react-bootstrap';
import { BsSearch, BsCalendar } from 'react-icons/bs';
import '../assets/css/PrepList.css';
import { useQuery } from 'react-query';
import { getAllRecipes } from '../services/Mutations';

function PrepList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error } = useQuery('recipes', getAllRecipes);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  const filteredItems = data.data.filter(item =>
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
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </Card.Header>
        <ListGroup variant="flush">
          {filteredItems.map((item, index) => (
            <ListGroupItem key={index} className="d-flex justify-content-between align-items-center prep-item">
              <div className="item-info">
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
      </Card>
    </div>
  );
}

export default PrepList;