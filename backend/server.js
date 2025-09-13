const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Import utilities
const { Utils, DemoMessages } = require('./utils.js');

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Legal Youth Backend is running' });
});

// Demo endpoints for frontend functionality
app.get('/api/demo/:messageKey', (req, res) => {
  const { messageKey } = req.params;
  const message = DemoMessages[messageKey] || 'This feature would be implemented here.';
  res.json({ message });
});

// Search endpoint
app.get('/api/search', (req, res) => {
  const { q } = req.query;
  // Search functionality would be implemented here
  res.json({ 
    query: q, 
    results: [],
    message: 'Search functionality would be implemented here'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Legal Youth Backend server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
