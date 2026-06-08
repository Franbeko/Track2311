const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Get frontend URL from environment variable
const frontendUrl = process.env.FRONTEND_URL || 'https://track2311investments.org';

// Middleware - Allow both production and development origins
app.use(cors({
  origin: [frontendUrl, 'https://www.track2311investments.org', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth', require('./routes/auth-social'));
app.use('/api/investments', require('./routes/investments'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/password-reset', require('./routes/passwordReset'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/admin', require('./routes/admin'));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Health check route - useful for monitoring
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    databaseName: mongoose.connection.name || 'unknown',
    timestamp: new Date().toISOString()
  });
});

// --- IMPORTANT: Remove the old static file serving code ---
// The code that was here previously has been removed because
// the frontend is now hosted on Vercel, not on this server.

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong!',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 API URL: http://localhost:${PORT}/api/test`);
  console.log(`🌐 Frontend URL: ${frontendUrl}`);
});