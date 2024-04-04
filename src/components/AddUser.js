import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddUser = ({ show, handleClose, handleAddUser }) => {
    const staticRestaurantId = "65f8954489e6e77ac7fb1027"; // Your static restaurant ID

    const [userData, setUserData] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        login_key: '',
        restaurant_id: staticRestaurantId,
        user_type: '',
        active: true
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = () => {
        handleAddUser(userData);
        handleClose();
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
                <Button variant="primary" onClick={handleSubmit}>
                    Add User
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddUser;