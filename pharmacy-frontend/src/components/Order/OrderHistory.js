import React, { useState, useEffect } from 'react';
import { getUserOrders } from '../../services/api';
import './OrderHistory.css';


const OrderHistory = ({ userId }) => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getUserOrders(userId);
                setOrders(response.data);
            } catch (err) {
                console.error('Error fetching orders:', err.response?.data || err.message);
                setError('Failed to fetch orders. Please try again.');
            }
        };

        if (userId) fetchOrders();
    }, [userId]);

    if (!userId) {
        return <p>Please log in to view your order history.</p>;
    }

    return (
        <div className="order-history-container">
            <h2>Your Order History</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {orders.length === 0 ? (
                <p>You have no orders yet.</p>
            ) : (
                <div>
                    {orders.map((order) => (
                        <div key={order._id} style={{ border: '1px solid #ddd', margin: '10px 0', padding: '10px' }}>
                            <h3>Order details</h3>
                            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
                            <p>Address: {order.address}</p>
                            <p>Payment Method: {order.paymentMethod}</p>
                            <h4>Products:</h4>
                            <ul>
                                {order.items.map((item) => (
                                    <li key={item.productId._id}>
                                        {item.productId.name} - {item.quantity} x ${item.productId.price.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
