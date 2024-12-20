// backend/controllers/orderController.js

const mongoose = require('mongoose');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Place a new order
const placeOrder = async (req, res) => {
    try {
        console.log('Order request received:', req.body); // Log cererea primită
        const { userId, address, paymentMethod } = req.body;

        // Retrieve user's cart
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty or does not exist' });
        }

        // Calculate total amount
        const totalAmount = cart.items.reduce((sum, item) => {
            return sum + item.productId.price * item.quantity;
        }, 0);

        // Create new order
        const order = new Order({
            userId,
            items: cart.items,
            totalAmount,
            address,
            paymentMethod,
        });
        await order.save();

        // Clear cart after placing the order
        cart.items = [];
        await cart.save();

        res.status(201).json(order);
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Failed to place order', error: error.message });
    }
};

// Get orders for a user
const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        // Verificăm dacă userId este un ObjectId valid
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        // Convertim userId în ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Găsim comenzile utilizatorului
        const orders = await Order.find({ userId: userObjectId }).populate('items.productId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
};

module.exports = { placeOrder, getUserOrders };
