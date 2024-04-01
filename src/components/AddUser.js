import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { registerUser } from '../services/Mutations';

const AddUser = ({ show, handleClose, handleSaveUser, user = null, mode = 'add' }) => {
    const [userData, setUserData] = useState({
        username: user?.username || '',
        user_type: user?.user_type || '',
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        email: user?.email || '',
        restaurant_id: user?.restaurant_id || '',
        active: user?.active || false
    });

const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
};

const handleAddUser = async () => {
    try {
        await registerUser(userData);
        handleClose();
        console.log('User added successfully');
    } catch (error) {
        console.error('Error adding user:', error);
    }
};

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" value={userData.username} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={userData.password} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="first_name" value={userData.first_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="last_name" value={userData.last_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={userData.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formRestaurantId">
            <Form.Label>Restaurant ID</Form.Label>
            <Form.Control type="text" name="restaurant_id" value={userData.restaurant_id} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formUserType">
            <Form.Label>User Type</Form.Label>
            <Form.Control type="text" name="user_type" value={userData.user_type} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formActive">
            <Form.Check
              type="checkbox"
              label="Active"
              checked={userData.active}
              onChange={(e) => setUserData({ ...userData, active: e.target.checked })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddUser}>
          Add User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUser;