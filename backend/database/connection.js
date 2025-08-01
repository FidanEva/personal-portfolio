const mongoose = require('mongoose');

const connectToDatabase = async () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME,
        })
        .then(() => {
            console.log('Connected to database successfully');
        })
        .catch((error) => {
            console.error('Error connecting to database:', error);
        });
}

module.exports = { connectToDatabase };