import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import '../assets/css/RecentOrders.css';

function RecentOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [orders, setOrders] = useState([
    { product: 'Avocados', unitPrice: '$12', quantity: '50', total: '$600', status: 'Delivered' },
    { product: 'Chicken Breast', unitPrice: '$300', quantity: '100', total: '$900', status: 'In Transit' },
    { product: 'Flour', unitPrice: '$500', quantity: '12 lb', total: '$1000', status: 'Ordered' },
    { product: 'Apples', unitPrice: '$5', quantity: '30', total: '$150', status: 'Delivered' },
  ]);

  const filteredOrders = orders.filter(order => {
    return (
      (statusFilter === 'All' || order.status === statusFilter) &&
      order.product.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDeliver = (product) => {
    setOrders(orders.map(order => 
      order.product === product ? { ...order, status: 'Delivered' } : order
    ));
  };

  return (
    <div className="recent-orders">
      <div className="filters">
        <input
          type="text"
          className="form-control search-product"
          placeholder="Search Product..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="form-control status-filter"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Delivered">Delivered</option>
          <option value="In Transit">In Transit</option>
          <option value="Ordered">Ordered</option>
        </select>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Unit price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Status</th>
            <th>Delivery</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={index}>
              <td>{order.product}</td>
              <td>{order.unitPrice}</td>
              <td>{order.quantity}</td>
              <td>{order.total}</td>
              <td className={`status ${order.status.replace(' ', '-').toLowerCase()}`}>{order.status}</td>
              <td>
                <Button onClick={() => handleDeliver(order.product)} disabled={order.status === 'Delivered'}>
                  Mark as Delivered
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default RecentOrders;