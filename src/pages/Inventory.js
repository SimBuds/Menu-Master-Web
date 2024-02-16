import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Inventory() {
  const initialInventoryItems = [
    { id: 1, product: 'Carrot', amount: '2 kg', par: '3 kg', unitCost: '$5.49', totalCost: '$10.98', category: 'Produce', reorder: '1 kg' },
    { id: 2, product: 'Onion', amount: '10 lb', par: '10 lb', unitCost: '$3.99', totalCost: '$3.99', category: 'Produce', reorder: '0 kg' },
  ];

  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = inventoryItems.filter(item =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (itemId) => {
    setInventoryItems(inventoryItems.filter(item => item.id !== itemId));
  };

  const handleEdit = (itemId) => {
    // You can set up a modal or a separate edit page for this
    console.log('Edit item with id:', itemId);
    // Implement the edit logic here
  };

  const handleAddItemChange = (event) => {
    const { name, value } = event.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = () => {
    const newItemWithId = { ...newItem, id: inventoryItems.length + 1 };
    setInventoryItems([...inventoryItems, newItemWithId]);
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
            <th scope="col">Product</th>
            <th scope="col">Amount</th>
            <th scope="col">Par</th>
            <th scope="col">Unit Cost</th>
            <th scope="col">Total Cost</th>
            <th scope="col">Category</th>
            <th scope="col">Reorder</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td>{item.product}</td>
              <td>{item.amount}</td>
              <td>{item.par}</td>
              <td>{item.unitCost}</td>
              <td>{item.totalCost}</td>
              <td>{item.category}</td>
              <td>{item.reorder}</td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={() => handleEdit(item.id)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <span>Showing {filteredItems.length} results of {inventoryItems.length}</span>
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
                {/* Form inputs */}
                <input type="text" className="form-control mb-2" name="product" placeholder="Product" value={newItem.product} onChange={handleAddItemChange} />
                {/* Repeat for each input field */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleAddItem}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Pagination component goes here */}
    </div>
  );
}

export default Inventory;