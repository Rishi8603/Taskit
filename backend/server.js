const express = require('express');
const app = express();
require('dotenv').config();

// Import configurations and middleware
const connectDB = require('./config/database');
const corsMiddleware = require('./middleware/cors');
const taskRoutes = require('./routes/taskRoutes');

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(corsMiddleware);

// Routes
app.use('/api', taskRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});