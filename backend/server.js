require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todos'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/activity', require('./routes/activity'));

// Default Route
app.get('/', (req, res) => {
  res.send('Roadmap API is running...');
});

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/roadmap_db';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.log('WARNING: Make sure MongoDB is installed and running locally, or provide a valid Atlas URI in .env file.');
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
