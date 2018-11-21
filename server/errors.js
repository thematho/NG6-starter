module.exports = {
  AUTHENTICATION_ERRORS: {
    INVALID_CREDENTIALS: {
      status: 403,
      message: 'Your credentials are invalid or expired',
    },
    WRONG_CREDENTIALS: {
      status: 401,
      message: 'Wrong user or password',
    },
    MAX_ATTEMPTS: {
      status: 401,
      message: 'Your account has been locked due to many failed login attempts',
    },
    USER_NOT_FOUND: {
      status: 401,
      message: 'Wrong user or password',
    },
    USER_DISABLED: {
      status: 401,
      message: 'Your user is not longer available',
    },
  }
};