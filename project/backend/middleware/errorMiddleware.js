// const errorHandler = (err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || 'error';

//   // Development error response
//   if (process.env.NODE_ENV === 'development') {
//     return res.status(err.statusCode).json({
//       status: err.status,
//       error: err,
//       message: err.message,
//       stack: err.stack
//     });
//   }

//   // Production error response
//   if (err.isOperational) {
//     return res.status(err.statusCode).json({
//       status: err.status,
//       message: err.message
//     });
//   }

//   // Programming or unknown errors
//   console.error('ERROR 💥', err);
//   return res.status(500).json({
//     status: 'error',
//     message: 'Something went wrong!'
//   });
// };

// const notFound = (req, res, next) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// };

// export { errorHandler, notFound };