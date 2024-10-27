const express = require('express');
const dotenv = require('dotenv');
const stockRoutes = require('./routes/stockRoutes');
const connectDB = require('./config/db');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/api', stockRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
