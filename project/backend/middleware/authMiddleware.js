// import jwt from 'jsonwebtoken';
// import AppError from '../utils/AppError.js';
// import User from '../models/User.js';

// const protect = async (req, res, next) => {
//   try {
//     // 1) Check if token exists
//     let token;
//     if (req.headers.authorization?.startsWith('Bearer')) {
//       token = req.headers.authorization.split(' ')[1];
//     }

//     if (!token) {
//       return next(new AppError('Please log in to access this route', 401));
//     }

//     // 2) Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // 3) Check if user still exists
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return next(new AppError('User no longer exists', 401));
//     }

//     // 4) Grant access to protected route
//     req.user = user;
//     next();
//   } catch (error) {
//     next(new AppError('Invalid token. Please log in again.', 401));
//   }
// };

// const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(new AppError('You do not have permission to perform this action', 403));
//     }
//     next();
//   };
// };

// export { protect, authorize };