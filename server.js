// server.js
const express = require('express');
const dotenv = require('dotenv');
const stockRoutes = require('./routes/stockRoutes');
const connectDB = require('./config/db'); // Ensure this path is correct

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB(); // Call the connectDB function to connect to MongoDB

// Middleware
app.use(express.json());
app.use('/api', stockRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
