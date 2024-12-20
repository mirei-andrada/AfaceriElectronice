// backend/controllers/productController.js

const Product = require('../models/Product');

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
};

// Add a new product
const addProduct = async (req, res) => {
    const { name, price, image, description } = req.body;
    try {
        const newProduct = new Product({ name, price, image, description });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add product', error: error.message });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, image, description } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, image, description },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product', error: error.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }
};

module.exports = { getAllProducts, addProduct, updateProduct, deleteProduct };
