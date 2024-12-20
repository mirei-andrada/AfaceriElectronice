// backend/controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verificare dacă utilizatorul există
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash parola
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creare utilizator
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Generare JWT
        const token = jwt.sign(
            { id: newUser._id, name: newUser.name },
            'your_jwt_secret',
            { expiresIn: '1h' }
        );

        res.status(201).json({
            userId: newUser._id, // Trimitem userId
            token, // Trimitem token
            message: 'User registered successfully',
        });
        

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Găsire utilizator după email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Comparare parole
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generare JWT
        const token = jwt.sign(
            { id: user._id, name: user.name },
            'your_jwt_secret',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            userId: user._id, // Trimitem userId
            token, // Trimitem token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { register, login };
