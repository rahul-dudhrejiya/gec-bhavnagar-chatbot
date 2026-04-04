require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const { processChat, searchQuery } = require('./controllers/chatController');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ─── Connect Database ─────────────────────────────────────────────────────────
connectDB();

// ─── Security Middleware ──────────────────────────────────────────────────────
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { success: false, error: 'Too many requests. Please try again later.' },
});
app.use('/api/', limiter);

// Chat-specific rate limiter
const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30,
  message: { success: false, error: 'Too many chat messages. Slow down!' },
});

// ─── General Middleware ───────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? (process.env.FRONTEND_URL || 'http://localhost:5173') : true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ─── Routes ───────────────────────────────────────────────────────────────────

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    message: 'GEC Bhavnagar Chatbot API is running',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// API Routes
app.use('/api', apiRoutes);

// Chat endpoint
app.post('/api/chat', chatLimiter, processChat);

// Search endpoint  
app.get('/api/search', searchQuery);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
    availableEndpoints: [
      'GET  /health',
      'POST /api/chat',
      'GET  /api/search?q=query',
      'GET  /api/branches',
      'GET  /api/branches/:code',
      'GET  /api/branches/:code/faculty',
      'GET  /api/branches/:code/semesters/:sem',
      'GET  /api/placements',
      'GET  /api/placements/:branch',
      'GET  /api/holidays',
      'GET  /api/notices',
      'GET  /api/college-info',
    ],
  });
});

// ─── Error Handler ────────────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log('\n🚀 ════════════════════════════════════════════');
  console.log(`   GEC Bhavnagar Chatbot Backend v2.0`);
  console.log(`   Server running on port ${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log('════════════════════════════════════════════\n');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});

module.exports = app;
