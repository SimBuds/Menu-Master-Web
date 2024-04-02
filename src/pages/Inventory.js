import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getInventoryById, createInventory, updateInventory, deleteInventory } from '../services/Mutations';
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

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const { data: inventoryData, isLoading } = useQuery('inventory', getInventoryById);

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
    // Update the inventoryItems state directly
    setInventoryItems((prevItems) =>
      prevItems.map((item) => (item.id === data.id ? data : item))
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

const deleteMutation = useMutation(deleteInventory, {
  onSuccess: (deletedItemId) => {
    console.log('Item deleted successfully:', deletedItemId);
    // Update the inventoryItems state directly
    setInventoryItems((prevItems) =>
      prevItems.filter((item) => item.id !== deletedItemId)
    );
    queryClient.invalidateQueries('inventory');
  },
  onError: (error) => {
    console.error('Error deleting item:', error);
  },
  onMutate: (itemId) => {
    console.log('Deleting item with id:', itemId);
  }
});


useEffect(() => {
  console.log('Inventory Data:', inventoryData);
  if (!isLoading && inventoryData && inventoryData.data) {
    const formattedInventoryItems = inventoryData.data.map(item => ({
      ...item,
      _id: item._id.$oid,
      ingredient_id: item.ingredient_id.$oid,
      stock: item.stock
    }));
    console.log('Formatted Inventory Items:', formattedInventoryItems);
    setInventoryItems(formattedInventoryItems);
  }
}, [inventoryData, isLoading]);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = inventoryItems.filter(item =>
    item.product && item.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (itemId) => {
    setItemToDelete(itemId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    console.log('Confirm delete for item ID:', itemToDelete);
    await deleteMutation.mutateAsync(itemToDelete);
    setShowDeleteConfirmation(false);
    setItemToDelete(null);
  };  
  

  const handleEdit = (itemId) => {
    const itemToEdit = inventoryItems.find(item => item.id === itemId);
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
    if (newItem.id) {
      // It's an existing item, update it
      console.log('Updating item with id:', newItem.id);
      await updateMutation.mutateAsync({ inventoryId: newItem.id, inventoryData: newItem });
    } else {
      // It's a new item, add it
      const newItemId = Math.max(0, ...inventoryItems.map(item => item.id || 0)) + 1; // Ensure no NaN values
      const newItemWithId = { ...newItem, id: newItemId };
      console.log('Creating new item with id:', newItemId);
      await createMutation.mutateAsync(newItemWithId);
    }
    setShowAddForm(false);
    // Reset the newItem state directly here
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
    event.preventDefault(); // Prevent the form from causing a page reload
    handleAddItem(); // Proceed to add the item with the current form data
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
                          <p>Do you really want to delete this item? This process cannot be undone.</p>
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
        <span>Showing {filteredItems.length} results of {inventoryItems.length}</span>
        <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>Add item +</button>
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
                      <label htmlFor="itemName">Item Name *</label>
                      <input type="text" className="form-control" id="itemName" name="product" placeholder="Type here" value={newItem.product} onChange={handleAddItemChange} required />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="itemPar">Item Par *</label>
                      <input type="text" className="form-control" id="itemPar" name="par" placeholder="Type here" value={newItem.par} onChange={handleAddItemChange} required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="itemCategory">Item Category *</label>
                      <select id="itemCategory" className="form-control custom-select" name="category" value={newItem.category} onChange={handleAddItemChange} required>
                        <option value="">Select...</option>
                        <option value="Produce">Produce</option>
                        {/* Other category options */}
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="itemUnit">Item Unit</label>
                      <select id="itemUnit" className="form-control custom-select" name="unit" value={newItem.unitCost} onChange={handleAddItemChange}>
                        <option value="">Select...</option>
                        <option value="lb">lb</option>
                        {/* Other unit options */}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="itemSupplier">Item Supplier</label>
                      <select id="itemSupplier" className="form-control custom-select" name="supplier" value={newItem.supplier} onChange={handleAddItemChange}>
                        <option value="">Select...</option>
                        <option value="GFS">GFS</option>
                        {/* Other supplier options */}
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="itemLocation">Item Location</label>
                      <select id="itemLocation" className="form-control custom-select" name="location" value={newItem.location} onChange={handleAddItemChange}>
                        <option value="">Select...</option>
                        <option value="Freezer">Freezer</option>
                        {/* Other location options */}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="itemSeason">Item Season</label>
                      <select id="itemSeason" className="form-control custom-select" name="season" value={newItem.season} onChange={handleAddItemChange}>
                        <option value="">Select...</option>
                        <option value="Summer">Summer</option>
                        {/* Other season options */}
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="itemPackSize">Item Pack Size</label>
                      <select id="itemPackSize" className="form-control custom-select" name="packSize" value={newItem.packSize} onChange={handleAddItemChange}>
                        <option value="">Select...</option>
                        <option value="Flat 64">Flat 64</option>
                        {/* Other pack size options */}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-12">
                      <label htmlFor="itemNotes">Item Notes</label>
                      <textarea className="form-control" id="itemNotes" rows="3" name="notes" value={newItem.notes} onChange={handleAddItemChange}></textarea>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="itemAmount">Amount *</label>
                      <input type="text" className="form-control" id="itemAmount" name="amount" placeholder="Type here" value={newItem.amount} onChange={handleAddItemChange} required />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="itemUnitCost">Unit Cost *</label>
                      <input type="text" className="form-control" id="itemUnitCost" name="unitCost" placeholder="Type here" value={newItem.unitCost} onChange={handleAddItemChange} required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="itemTotalCost">Total Cost *</label>
                      <input type="text" className="form-control" id="itemTotalCost" name="totalCost" placeholder="Type here" value={newItem.totalCost} onChange={handleAddItemChange} required />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="itemReorder">Reorder Level *</label>
                      <input type="text" className="form-control" id="itemReorder" name="reorder" placeholder="Type here" value={newItem.reorder} onChange={handleAddItemChange} required />
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

export default Inventory;