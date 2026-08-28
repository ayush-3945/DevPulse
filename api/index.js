const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./_src/config/db');
const { errorHandler } = require('./_src/middleware/errorHandler');

require('dotenv').config();

const app = express();

// Enable trust proxy for Vercel serverless environment
app.set('trust proxy', 1);

app.use(helmet());
// CORS fix: origin must be true (reflecting request origin) when credentials is true
app.use(cors({
  origin: true, 
  credentials: true
}));
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 300, 
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);

// Mount routes on both /api/github and /github for local & Vercel flexibility
app.use('/api/github', require('./_src/routes/githubRoutes'));
app.use('/github', require('./_src/routes/githubRoutes'));

app.use('/api/ai', require('./_src/routes/aiRoutes'));
app.use('/ai', require('./_src/routes/aiRoutes'));

app.get(['/api/health', '/health'], (req, res) => {
  res.status(200).json({ status: 'ok', message: 'DevPulse API is running' });
});

app.use(errorHandler);

// Auto-connect to MongoDB if URI is provided
if (process.env.MONGODB_URI) {
  connectDB();
}

// If run directly (local development: node api/index.js)
const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 DevPulse API server running at http://localhost:${PORT}`);
  });
}

// Vercel Serverless Handler
module.exports = (req, res) => {
  return app(req, res);
};
module.exports.app = app;
