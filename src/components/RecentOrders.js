import React from 'react';
import InputField from './common/InputField';

function RecentOrders() {
  // Placeholder data
  const orders = [{ product: 'Avocados', unitPrice: '$12', quantity: 50, total: '$600', status: 'Delivered' }];
  return (
    <div>
      <InputField placeholder="Search Product..." />
      {/* ... map over orders and display them ... */}
      {orders.map((order, index) => (
        <div key={index}>
          <span>{order.product}</span>
          <span>{order.unitPrice}</span>
          <span>{order.quantity}</span>
          <span>{order.total}</span>
          <span>{order.status}</span>
        </div>
      ))}
    </div>
  );
}

export default RecentOrders;