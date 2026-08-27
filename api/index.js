let appHandler;
let initError = null;

try {
  require('dotenv').config();
  const express = require('express');
  const cors = require('cors');
  const helmet = require('helmet');
  const rateLimit = require('express-rate-limit');
  const { errorHandler } = require('./_src/middleware/errorHandler');

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
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use('/api/', apiLimiter);

  app.use('/api/github', require('./_src/routes/githubRoutes'));
  app.use('/api/ai', require('./_src/routes/aiRoutes'));

  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'DevPulse API is running' });
  });

  app.use(errorHandler);
  
  appHandler = app;
} catch (error) {
  initError = error;
}

module.exports = (req, res) => {
  if (initError) {
    return res.status(500).json({ 
      status: 'error', 
      message: 'Initialization failed', 
      errorName: initError.name,
      errorMessage: initError.message,
      stack: initError.stack
    });
  }
  
  if (req.url.includes('/api/health')) {
    return res.status(200).json({ status: 'ok', message: 'Vercel raw handler is running' });
  }
  
  return appHandler(req, res);
};
