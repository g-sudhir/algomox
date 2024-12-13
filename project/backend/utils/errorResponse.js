// /**
//  * Creates a standardized error response object
//  * @param {string} message - Error message
//  * @param {number} statusCode - HTTP status code
//  * @param {Object} [additionalData] - Any additional data to include in the response
//  * @returns {Object} Formatted error response
//  */
// export const createErrorResponse = (message, statusCode, additionalData = {}) => {
//   return {
//     success: false,
//     status: statusCode >= 500 ? 'error' : 'fail',
//     statusCode,
//     message,
//     ...additionalData
//   };
// };

// /**
//  * Creates a standardized success response object
//  * @param {string} message - Success message
//  * @param {Object} data - The data to send in the response
//  * @param {number} [statusCode=200] - HTTP status code
//  * @returns {Object} Formatted success response
//  */
// export const createSuccessResponse = (message, data, statusCode = 200) => {
//   return {
//     success: true,
//     status: 'success',
//     statusCode,
//     message,
//     data
//   };
// };