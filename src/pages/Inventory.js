import React, { useState, useEffect, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getAllInventory, createInventory, updateInventory, getIngredientById } from '../services/Mutations';
import '../assets/css/Inventory.css';

function Inventory() {
  const queryClient = useQueryClient();
  const [inventoryItems, setInventoryItems] = useState([]);
  const [ingredientNames, setIngredientNames] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    ingredient_id: '',
    stock: ''
  });

  const { data: inventoryData, isLoading } = useQuery('inventory', getAllInventory);

  const createMutation = useMutation(createInventory, {
    onMutate: (newItem) => {
      console.log('Creating item with payload:', newItem);
      return newItem;
    },
    onSuccess: (data) => {
      console.log('Item created successfully, response data:', data);
      queryClient.setQueryData('inventory', (oldData) => [...(oldData || []), data.data]);
      resetFields();
    },
    onError: (error) => {
      console.error('Error creating item:', error);
    },
  });

  const updateMutation = useMutation(updateInventory, {
    onMutate: (updateData) => {
      console.log('Updating item with payload:', updateData);
      return updateData;
    },
    onSuccess: (data) => {
      console.log('Item updated successfully, response data:', data);
      queryClient.invalidateQueries('inventory');
      resetFields();
    },
    onError: (error) => {
      console.error('Error updating item:', error);
    },
  });

  const resetFields = () => {
    setShowAddForm(false);
    setNewItem({
      ingredient_id: '',
      stock: ''
    });
  };

  useEffect(() => {
    if (inventoryData?.data && Object.keys(ingredientNames).length > 0) {
      // Now we wait until ingredient names are loaded before setting inventory items
      const processedInventoryItems = inventoryData.data.map(item => ({
        ...item,
        ingredient_name: ingredientNames[item.ingredient_id] || 'Loading...',
      }));
      setInventoryItems(processedInventoryItems);
    }
  }, [inventoryData, ingredientNames]);

  useEffect(() => {
    const fetchIngredientNames = async () => {
      const names = {};
      if (inventoryData?.data) {
        for (const item of inventoryData.data) {
          if (!names[item.ingredient_id]) {
            const ingredient = await getIngredientById(item.ingredient_id);
            if (ingredient && ingredient.code === 200 && ingredient.data) {
              names[item.ingredient_id] = ingredient.data.name;
            } else {
              // Proper error handling, or set a placeholder
              names[item.ingredient_id] = "Name not found";
              console.error(`Ingredient not found for ID ${item.ingredient_id}`);
            }
          }
        }
        setIngredientNames(names);
      }
    };
    
    fetchIngredientNames();
  }, [inventoryData]);  

  const filteredItems = useMemo(() => {
    if (!searchTerm) {
      return inventoryItems;
    }
    return inventoryItems.filter(item =>
      item.ingredient_id?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [inventoryItems, searchTerm]);

  const handleEdit = (_id) => {
    const itemToEdit = inventoryItems.find(item => item._id === _id);
    if (itemToEdit) {
      setNewItem({
        ...itemToEdit,
        stock: String(itemToEdit.stock)
      });
      setShowAddForm(true);
    } else {
      console.error('Item not found');
    }
  };  

  // Inventory.js
  const handleAddItem = async () => {
    if (!newItem.ingredient_id || isNaN(newItem.stock)) {
      // Set error state here
      console.error('Invalid input');
      return;
    }
  
    const payload = {
      ingredient_id: newItem.ingredient_id,
      stock: parseInt(newItem.stock, 10)
    };
  
    console.log('Creating new item with payload:', payload);
  
    try {
      const response = await createMutation.mutateAsync(payload);
      console.log('Item created successfully, response data:', response.data);
      // Update local state or cache as necessary
  
      // Reset form or provide further user feedback
    } catch (error) {
      console.error('Failed to create item:', error);
      // Provide user feedback based on the error
    }
  };

  const handleAddItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddItem();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="container-fluid mt-4">
      <h2>Inventory</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search ..."
          aria-label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Ingredient ID</th>
            <th scope="col">Stock</th>
            <th scope="col">Modify</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 ? (
            <tr>
              <td colSpan="3">No items found.</td>
            </tr>
          ) : (
            filteredItems.map(item => (
              <tr key={item._id}>
                <td>{ingredientNames[item.ingredient_id] || item.ingredient_id}</td>
                <td>{item.stock}</td>
                <td>
                  <button className="btn btn-primary btn-sm" onClick={() => handleEdit(item._id)}>Edit</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <span>Showing {inventoryItems.length} results</span>
        <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>Add item +</button>
      </div>
      {showAddForm && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{newItem._id ? 'Edit' : 'Add New'} Item</h5>
                <button type="button" className="close" onClick={() => setShowAddForm(false)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="itemStock">Stock *</label>
                    <input
                      type="text"
                      pattern="\d*"
                      className="form-control"
                      id="itemStock"
                      name="stock"
                      placeholder="Enter stock amount"
                      value={newItem.stock}
                      onChange={handleAddItemChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ingredientId">Ingredient ID *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="ingredientId"
                      name="ingredient_id"
                      value={newItem.ingredient_id}
                      onChange={handleAddItemChange}
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;