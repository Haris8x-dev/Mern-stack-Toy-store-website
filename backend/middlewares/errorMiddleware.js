// middlewares/errorMiddleware.js
export const notFound = (req, res, next) => {
  res.status(404);
  const err = new Error(`Not Found - ${req.originalUrl}`);
  next(err);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    // only show stack in development
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
