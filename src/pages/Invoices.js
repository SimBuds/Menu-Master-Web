import React, { useState } from 'react';
import '../assets/css/Inventory.css';

function Invoices() {
  const initialInvoiceItems = [
    { id: 1, product: 'Avacadoes', unitPrice: '$12.00', quantity: 50, total: '$600.00', status: 'Delivered'},
    { id: 2, product: 'Chicken Breast', unitPrice: '$12.00', quantity: 50, total: '$600.00', status: 'Delivered'},
    { id: 3, product: 'Avacadoes', unitPrice: '$12.00', quantity: 50, total: '$600.00', status: 'Delivered'},
  ];

  const [invoiceItems, setInvoiceItems] = useState(initialInvoiceItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    product: '',
    unitPrice: '',
    quantity: '',
    total: '',
    status: ''
  });

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = invoiceItems.filter(item =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (invoiceId) => {
    setItemToDelete(invoiceId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    setInvoiceItems(invoiceItems.filter(item => item.id !== itemToDelete));
    setShowDeleteConfirmation(false);
    setItemToDelete(null); // Reset the itemToDelete state
  };

  const handleEdit = (invoiceId) => {
    const itemToEdit = invoiceItems.find(item => item.id === invoiceId);
    if (itemToEdit) {
      setNewInvoice(itemToEdit);
      setShowAddForm(true);
    } else {
      console.error('Item not found');
    }
  };

  const handleAddItemChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddItem = () => {
    if (newInvoice.id) {
      // It's an existing item, update it
      setInvoiceItems(invoiceItems.map(item => item.id === newInvoice.id ? newInvoice : item));
    } else {
      // It's a new item, add it
      const newItemWithId = { ...newInvoice, id: Math.max(...invoiceItems.map(item => item.id)) + 1 };
      setInvoiceItems([...invoiceItems, newItemWithId]);
    }
    setShowAddForm(false);
    setNewInvoice({
        product: '',
        unitPrice: '',
        quantity: '',
        total: '',
        status: ''
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from causing a page reload
    handleAddItem(); // Proceed to add the item with the current form data
  };  
  
  return (
    <div className="container mt-4">
      <h2>Invoices</h2>
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
            <th scope="col">Unit Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
            <th scope="col">Total Cost</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td>{item.product}</td>
              <td>{item.unitPrice}</td>
              <td>{item.quantity}</td>
              <td>{item.total}</td>
              <td>{item.status}</td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={() => handleEdit(item.id)}>Edit</button>
                {showDeleteConfirmation && (
                  <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="modal-dialog" role="document">
                      <div className="modal-content" style={{ borderRadius: '5px', padding: '20px', textAlign: 'center' }}>
                        <div className="modal-header" style={{ justifyContent: 'space-between', alignItems: 'center', borderBottom: 'none', padding: '0' }}>
                          <h5 className="modal-title" style={{ fontWeight: 'bold', fontSize: '1.2rem', margin: '0' }}>
                            <svg style={{ width: '24px', height: '24px', marginRight: '10px', fill: 'red' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
                            </svg>
                            Are you sure?
                          </h5>
                          <button type="button" className="close" onClick={() => setShowDeleteConfirmation(false)} aria-label="Close" style={{ fontSize: '1.5rem', color: '#000', opacity: '0.7' }}>
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body" style={{ paddingBottom: '20px' }}>
                          <p>Do you really want to delete this invoice? This process cannot be undone.</p>
                        </div>
                        <div className="modal-footer" style={{ borderTop: 'none', justifyContent: 'center', paddingTop: '0' }}>
                          <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteConfirmation(false)} style={{ marginRight: '10px', backgroundColor: '#6c757d' }}>Cancel</button>
                          <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
                  <i className="fas fa-trash-alt" style={{ marginRight: '5px' }}></i>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <span>Showing {filteredItems.length} results of {invoiceItems.length}</span>
        <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>Add invoice +</button>
      </div>
      {showAddForm && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" onClick={() => setShowAddForm(false)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="itemName">Invoice Name *</label>
                      <input type="text" className="form-control" id="itemName" name="product" placeholder="Type here" value={newInvoice.product} onChange={handleAddItemChange} required />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="itemPar">Unit Price *</label>
                      <input type="text" className="form-control" id="itemPar" name="par" placeholder="Type here" value={newInvoice.unitPrice} onChange={handleAddItemChange} required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="itemCategory">Quantity *</label>
                      <select id="itemCategory" className="form-control custom-select" name="category" value={newInvoice.quantity} onChange={handleAddItemChange} required>
                        <option value="">Select...</option>
                        <option value="Produce">Produce</option>
                        {/* Other category options */}
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="itemUnit">Total</label>
                      <select id="itemUnit" className="form-control custom-select" name="unit" value={newInvoice.total} onChange={handleAddItemChange}>
                        <option value="">Select...</option>
                        <option value="lb">lb</option>
                        {/* Other unit options */}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="itemSupplier">Status</label>
                      <select id="itemSupplier" className="form-control custom-select" name="supplier" value={newInvoice.status} onChange={handleAddItemChange}>
                        <option value="">Select...</option>
                        <option value="GFS">GFS</option>
                        {/* Other supplier options */}
                      </select>
                    </div>
                    
                  
                   
                  </div>


                  
                  
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary btn-cancel" onClick={() => setShowAddForm(false)}>Cancel</button>
                    <button type="submit" className="btn btn-save" style={{ backgroundColor: '#f05f40', color: 'white' }}>Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    {/* Pagination component goes here */}
    </div>
  );
}

export default Invoices;