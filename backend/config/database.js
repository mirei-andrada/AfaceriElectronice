// backend/config/database.js

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:parola123@bdsa.y5vr2t6.mongodb.net/farmacie?retryWrites=true&w=majority&appName=BDSA', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Atlas connected successfully.');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
