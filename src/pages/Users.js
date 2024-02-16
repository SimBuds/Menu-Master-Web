import React, { useState } from 'react';
import { Button, Table, Form, FormControl, Modal } from 'react-bootstrap';
import '../assets/css/Users.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Users = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    
    // Temporary data array
    const [users, setUsers] = useState([
        { username: 'Casey123', role: 'Chef', firstName: 'Casey', lastName: 'Ipsum', status: 'Active' },
        { username: 'Matt123', role: 'Dishwasher', firstName: 'Matt', lastName: 'Ipsum', status: 'Inactive' },
        { username: 'Bruno123', role: 'Bartender', firstName: 'Lorem', lastName: 'Ipsum', status: 'Active' },
        { username: 'Lukas123', role: 'Garde manger', firstName: 'Bruno', lastName: 'Ipsum', status: 'Active' },
        { username: 'Anjana123', role: 'GM', firstName: 'Anjana', lastName: 'Ipsum', status: 'Active' },
        // ... add more users as needed
    ]);

    // Filtered users based on search query
    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.status.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Placeholder functions for button logic
    const handleEdit = (username) => {
        console.log('Edit user:', username);
        // Edit logic here
    };

    const handleAddUser = () => {
        console.log('Add user');
        // Add user logic here
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowModal(true);
    };
    
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleConfirmDelete = () => {
        if (userToDelete) {
        setUsers(users.filter(user => user.username !== userToDelete.username));
        setUserToDelete(null);
        }
        setShowModal(false);
    };

    return (
        <div className="users-table-container">
          <h1>Users</h1>
          <div className="mb-3">
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search ..."
                className="me-2"
                aria-label="Search"
                onChange={e => setSearchQuery(e.target.value)}
              />
            </Form>
          </div>
          <Button variant="primary" className="mb-3" onClick={handleAddUser}>
            Add user +
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.status}</td>
                  <td>
                    <Button variant="outline-secondary" className="me-2" onClick={() => handleEdit(user.username)}>
                      Edit
                    </Button>
                    <Button variant="outline-danger" onClick={() => handleDeleteClick(user)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
    
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you really want to delete this item? This process cannot be undone.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    };
    
    export default Users;