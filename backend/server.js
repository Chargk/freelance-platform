const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// JWT Secret (зазвичай це має бути в .env файлі)
process.env.JWT_SECRET = 'your_super_secret_jwt_key_123';

// Connect to database
connectDB();

const app = express();

// Enable CORS for all routes with specific origin
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/boards', require('./routes/boardRoutes'));
app.use('/api/invitations', require('./routes/invitationRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});