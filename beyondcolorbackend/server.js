const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Use CORS Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(express.json());

// ✅ MongoDB Connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error("❌ MongoDB URI is missing! Check your .env file.");
    process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Routes
const IshiharaRoutes = require('./routes/IshiharaRoutes');
const HueScoreRoutes = require('./routes/HueScoreRoutes');

app.use('/api/ishihara', IshiharaRoutes);
app.use('/api/hue', HueScoreRoutes); // 🎯 ADD THIS

// ✅ Root Test Route
app.get('/', (req, res) => {
    res.send('Backend is running...');
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
