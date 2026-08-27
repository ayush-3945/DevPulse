const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
// Import routes and middleware
const { errorHandler } = require('../server/src/middleware/errorHandler');
const githubRoutes = require('../server/src/routes/githubRoutes');
const aiRoutes = require('../server/src/routes/aiRoutes');

const app = express();

app.use(helmet());
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);

app.use('/api/github', githubRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Vercel API is running' });
});

app.use(errorHandler);

module.exports = app;
