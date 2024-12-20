import React from 'react';
import { useNavigate } from 'react-router-dom';
import { saveCart } from '../../services/api';
import './Cart.css';

const Cart = ({ cart, updateCart, removeFromCart }) => {
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (cart.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        try {
            const userId = localStorage.getItem('userId');

            if (!userId) {
                alert('You must be logged in to proceed to checkout.');
                return;
            }

            const cartData = {
                userId,
                items: cart.map((item) => ({
                    productId: item._id,
                    quantity: item.quantity,
                })),
            };

            await saveCart(cartData);

            navigate('/checkout');
        } catch (err) {
            console.error('Failed to save cart:', err.response?.data || err.message);
            alert('Failed to proceed to checkout. Please try again.');
        }
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            onChange={(e) =>
                                                updateCart(item._id, parseInt(e.target.value))
                                            }
                                        />
                                    </td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => removeFromCart(item._id)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleCheckout}>Proceed to Checkout</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
