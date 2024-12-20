import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../../services/api';
import './Checkout.css';


const Checkout = ({ cart, clearCart, userId }) => {
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleOrder = async () => {
        if (cart.length === 0) {
            setMessage('Your cart is empty.');
            return;
        }

        try {
            const orderDetails = {
                userId,
                address,
                paymentMethod,
                items: cart.map(item => ({
                    productId: item._id,
                    quantity: item.quantity,
                })), 
            };

            console.log('Order details:', orderDetails); // Log detalii cerere
            const response = await placeOrder(orderDetails);
            console.log(response.data);

            setMessage('Order placed successfully!');
            clearCart(); // Golește coșul după plasare
            navigate('/orders'); // Navighează la istoricul comenzilor
            
        } catch (err) {
            console.error('Error placing order:', err.response?.data || err.message);
            setMessage('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            {message && <p>{message}</p>}
            <div className="checkout-items">
                <h3>Your Items</h3>
                <ul>
                    {cart.map((item) => (
                        <li key={item._id}>
                            {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
            <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Payment Method:</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                    </select>
                </div>
                <button type="button" onClick={handleOrder}>
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default Checkout;
