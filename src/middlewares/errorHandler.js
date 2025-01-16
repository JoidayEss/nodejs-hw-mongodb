const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Something went wrong';

  res.status(statusCode).json({
    status: statusCode,
    message: message,
    data: err.data || null,
  });
};

export default errorHandler;
