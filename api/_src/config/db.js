const mongoose = require('mongoose');

let cachedConnection = null;

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) return;
    if (mongoose.connection.readyState === 1) return;
    if (cachedConnection) return cachedConnection;

    cachedConnection = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 2000,
      bufferCommands: false,
    });

    await cachedConnection;
    console.log('MongoDB Connected');
  } catch (error) {
    console.warn(`MongoDB Connection Warning: ${error.message}`);
    cachedConnection = null;
  }
};

module.exports = connectDB;
