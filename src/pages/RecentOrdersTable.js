import React from 'react';
import './RecentOrdersTable.css';

const RecentOrdersTable = ({ orders }) => {
    return (
        <table className="recent-orders-table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                    <tr key={index}>
                        <td>{order.product}</td>
                        <td>${order.unitPrice}</td>
                        <td>{order.quantity}</td>
                        <td>${order.total}</td>
                        <td>{order.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RecentOrdersTable;