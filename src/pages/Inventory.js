import React, { useState, useEffect, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getAllInventory, createInventory, updateInventory } from '../services/Mutations';
import '../assets/css/Inventory.css';

function Inventory() {
  const queryClient = useQueryClient();
  const [inventoryItems, setInventoryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    product: '',
    amount: '',
    par: '',
    unitCost: '',
    totalCost: '',
    category: '',
    reorder: ''
  });

  const { data: inventoryData, isLoading } = useQuery('inventory', getAllInventory);

  const createMutation = useMutation(createInventory, {
    onSuccess: (newItem) => {
      queryClient.setQueryData('inventory', (oldData) => {
        return [...(oldData || []), newItem];
      });
    },
  onError: (error) => {
    console.error('Error creating item:', error);
  },
  onMutate: (newItem) => {
    console.log('Creating item with payload:', newItem);
  }
});

const updateMutation = useMutation(updateInventory, {
  onSuccess: (data) => {
    console.log('Item updated successfully:', data);
    setInventoryItems((prevItems) =>
      prevItems.map((item) => (item._id === data._id ? data : item))
    );
    queryClient.invalidateQueries('inventory');
  },
  onError: (error) => {
    console.error('Error updating item:', error);
  },
  onMutate: (updateData) => {
    console.log('Updating item with payload:', updateData);
  }
});

useEffect(() => {
  if (!isLoading && inventoryData?.data) {
    const formattedInventoryItems = inventoryData.data.map(item => ({
      _id: item._id.$oid,
      ingredient_id: item.ingredient_id.$oid,
      stock: item.stock,
    }));
    setInventoryItems(formattedInventoryItems);
    console.log('inventoryItems set:', formattedInventoryItems);
  }
}, [inventoryData, isLoading]);

const filteredItems = useMemo(() => {
  if (!searchTerm) {
    return inventoryItems;
  }
  return inventoryItems.filter(item =>
    item.ingredient_id?.toString().includes(searchTerm)
  );
}, [inventoryItems, searchTerm]);

const handleEdit = (_id) => {
  const itemToEdit = inventoryItems.find(item => item._id === _id);
  if (itemToEdit) {
    setNewItem(itemToEdit);
    setShowAddForm(true);
  } else {
    console.error('Item not found');
  }
};

const handleAddItemChange = (e) => {
  const { name, value } = e.target;
  setNewItem(prevState => ({
    ...prevState,
    [name]: value,
  }));
};

const handleAddItem = async () => {
  console.log('Submitting item:', newItem);
  if (newItem._id) {
    console.log('Updating item with id:', newItem._id);
    await updateMutation.mutateAsync({ inventoryId: newItem._id, inventoryData: newItem });
  } else {
    console.log('Creating new item');
    await createMutation.mutateAsync(newItem);
  }
  setShowAddForm(false);
  setNewItem({
    product: '',
    amount: '',
    par: '',
    unitCost: '',
    totalCost: '',
    category: '',
    reorder: ''
  });
};

const handleSubmit = (event) => {
  event.preventDefault();
  handleAddItem();
};

const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
};
  
  return (
    <div className="container mt-4">
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
          <th scope="col">ID</th>
          <th scope="col">Ingredient ID</th>
          <th scope="col">Stock</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredItems.length === 0 ? (
          <tr>
            <td colSpan="4">No items found.</td>
          </tr>
        ) : (
          filteredItems.map(item => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.ingredient_id}</td>
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
                  <h5 className="modal-title">Add New Item</h5>
                  <button type="button" className="close" onClick={() => setShowAddForm(false)} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    {/* Stock Input */}
                    <div className="form-group">
                      <label htmlFor="itemStock">Stock *</label>
                      <input
                        type="number"
                        className="form-control"
                        id="itemStock"
                        name="stock"
                        placeholder="Enter stock amount"
                        value={newItem.stock}
                        onChange={handleAddItemChange}
                        required
                      />
                    </div>
                    {/* Ingredient ID Select */}
                    <div className="form-group">
                      <label htmlFor="ingredientId">Ingredient ID *</label>
                      <select
                        id="ingredientId"
                        className="form-control custom-select"
                        name="ingredient_id"
                        value={newItem.ingredient_id}
                        onChange={handleAddItemChange}
                        required
                      >
                        <option value="1">Bananas</option>
                        <option value="2">Apples</option>
                        <option value="3">Oranges</option>
                      </select>
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