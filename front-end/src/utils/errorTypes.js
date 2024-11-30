export const ErrorTypes = {
  VALIDATION_ERROR: 'ValidationError',
  AUTHENTICATION_ERROR: 'AuthenticationError',
  AUTHORIZATION_ERROR: 'AuthorizationError',
  NOT_FOUND_ERROR: 'NotFoundError',
  DATABASE_ERROR: 'DatabaseError',
  NETWORK_ERROR: 'NetworkError'
};

export const ErrorCodes = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION_FAILED: 422,
  INTERNAL_SERVER: 500
};

export const ErrorMessages = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  UNAUTHORIZED_ACCESS: 'You are not authorized to perform this action',
  RESOURCE_NOT_FOUND: 'The requested resource was not found',
  VALIDATION_FAILED: 'Validation failed',
  SERVER_ERROR: 'Internal server error occurred'
};