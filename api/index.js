require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./_src/middleware/errorHandler');
const connectDB = require('./_src/config/db');

const app = express();

if (process.env.MONGODB_URI) {
  connectDB();
}

app.use(helmet());
app.use(cors({
  origin: '*', 
  credentials: true
}));
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);

// Routes
app.use('/api/github', require('./_src/routes/githubRoutes'));
app.use('/api/ai', require('./_src/routes/aiRoutes'));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'DevPulse API is running' });
});

app.use(errorHandler);

module.exports = app;
