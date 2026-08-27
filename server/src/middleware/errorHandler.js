const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  // Log the error (in a real app, use a logger like Winston or Pino)
  console.error(`[Error] ${err.message}`);
  if (err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = { errorHandler };
