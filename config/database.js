const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // Add timeout
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Test the connection
        await mongoose.connection.db.admin().ping();
        console.log('Database ping successful');
        
    } catch (error) {
        console.error('MongoDB connection error details:', {
            name: error.name,
            message: error.message,
            code: error.code
        });
        process.exit(1);
    }
};

module.exports = connectDB; 