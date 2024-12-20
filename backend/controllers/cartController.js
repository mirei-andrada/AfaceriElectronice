// backend/controllers/cartController.js

const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get cart for a user
const getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        // Caută coșul în baza de date
        let cart = await Cart.findOne({ userId }).populate('items.productId');
        
        // Dacă coșul nu există, îl creăm
        if (!cart) {
            cart = new Cart({ userId, items: [] });
            await cart.save();
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch cart', error: error.message });
    }
};


// Add item to cart
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const productExists = cart.items.find(item => item.productId.toString() === productId);
        if (productExists) {
            productExists.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add item to cart', error: error.message });
    }
};

// Update item quantity in cart
const updateCartItem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productExists = cart.items.find(item => item.productId.toString() === productId);
        if (!productExists) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        if (quantity > 0) {
            productExists.quantity = quantity;
        } else {
            cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update item in cart', error: error.message });
    }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove item from cart', error: error.message });
    }
};

// Salvarea sau actualizarea coșului
const saveCart = async (req, res) => {
    try {
        const { userId, items } = req.body;

        // Găsește coșul utilizatorului
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Creează un coș nou dacă nu există
            cart = new Cart({ userId, items });
        } else {
            // Actualizează coșul existent
            cart.items = items;
        }

        await cart.save();
        res.status(200).json({ message: 'Cart saved successfully', cart });
    } catch (error) {
        console.error('Error saving cart:', error);
        res.status(500).json({ message: 'Failed to save cart', error: error.message });
    }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, saveCart };
