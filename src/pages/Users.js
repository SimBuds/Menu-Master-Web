import React, { useState } from 'react';
import { Button, Table, Form, FormControl } from 'react-bootstrap';
import { useQuery, useMutation } from 'react-query';
import { getUsers, registerUser, getAllRestaurants } from '../services/Mutations';
import AddUser from '../components/AddUser';
import '../assets/css/Users.css';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [restaurantId, setRestaurantId] = useState(null);

  // Fetch users using useQuery
  const { data: users, isLoading, error } = useQuery('users', getUsers, {
    select: responseData => responseData.data || [],
  });

  // Fetch restaurant id
  useQuery('restaurants', getAllRestaurants, {
    select: responseData => responseData.data || [],
    onSuccess: (data) => {
      if (data.length > 0) {
        setRestaurantId(data[0].id);
      }
    }
  });

  // Mutation for adding a user
  const addUserMutation = useMutation(registerUser, {
    onError: (error) => {
      console.error('Error adding user:', error);
    },
    onSuccess: () => {
      toggleAddUserModal();
    }
  });

  // Show loading or error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  // Filter users based on the search query
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.user_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.active ? 'active' : 'inactive').includes(searchQuery.toLowerCase())
  );

  const toggleAddUserModal = () => setShowAddUserModal(!showAddUserModal);

  const handleAddUser = (userData) => {
    // Construct the userData object with all necessary fields
    const fullUserData = {
      ...userData,
      restaurant_id: "65f8954489e6e77ac7fb1027",
    };
    
    // Call the mutation to register the user
    addUserMutation.mutate(fullUserData);
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>User Type</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.user_type}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.active ? 'Active' : 'Inactive'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center mt-3">
        <Button variant="primary" onClick={toggleAddUserModal}>
          Add user +
        </Button>
      </div>
      <AddUser 
        show={showAddUserModal} 
        handleClose={toggleAddUserModal} 
        handleAddUser={handleAddUser}
        restaurantId={restaurantId}
      />
    </div>
  );
};

export default Users;