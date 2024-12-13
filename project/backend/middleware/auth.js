// import jwt from 'jsonwebtoken';
// import { promisify } from 'util';
// import User from '../models/User.js';
// import { catchAsync } from '../utils/catchAsync.js';
// import { AppError } from '../utils/AppError.js';

// export const protect = catchAsync(async (req, res, next) => {
//   let token;
//   if (req.headers.authorization?.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) {
//     return next(new AppError('Please log in to access this route', 401));
//   }

//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
//   const user = await User.findById(decoded.id);

//   if (!user) {
//     return next(new AppError('User no longer exists', 401));
//   }

//   req.user = user;
//   next();
// });

// export const restrictTo = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(new AppError('You do not have permission to perform this action', 403));
//     }
//     next();
//   };
// };