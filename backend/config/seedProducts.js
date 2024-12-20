// backend/config/seedProducts.js

const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('./database');

const seedProducts = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:parola123@bdsa.y5vr2t6.mongodb.net/farmacie?retryWrites=true&w=majority&appName=BDSA', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected successfully!');

        const products = [
            {
                name: 'Paracetamol',
                price: 10.5,
                image: 'https://via.placeholder.com/150',
                description: 'Pain reliever and fever reducer.',
            },
            {
                name: 'Ibuprofen',
                price: 15,
                image: 'https://via.placeholder.com/150',
                description: 'Anti-inflammatory medication.',
            },
            {
                name: 'Vitamin C',
                price: 12,
                image: 'https://via.placeholder.com/150',
                description: 'Boosts immune system.',
            },
            {
                name: 'Moisturizer',
                price: 20,
                image: 'https://via.placeholder.com/150',
                description: 'Hydrates and softens skin.',
            },
            {
                name: 'Sunscreen',
                price: 25,
                image: 'https://via.placeholder.com/150',
                description: 'Protects skin from UV rays.',
            },
        ];

        await Product.deleteMany(); // Clear existing products
        await Product.insertMany(products);
        console.log('Products seeded successfully!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding products:', error);
        mongoose.connection.close();
    }
};

seedProducts();
