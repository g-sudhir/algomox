/**
 * Wraps an async function to catch any errors and pass them to the error handler
 * @param {Function} fn - The async function to wrap
 * @returns {Function} - The wrapped function that handles errors
 */
export const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};