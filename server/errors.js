module.exports = {
  AUTHENTICATION_ERRORS: {
    WRONG_CREDENTIALS: {
      status: 401,
      message: 'Wrong user or password',
    },
    MAX_ATTEMPTS: {
      status: 401,
      message: 'Your account has been locked due to many failed login attempts',
    },
    USER_NOT_FOUND: {
      status: 403,
      message: 'Wrong user or password',
    },
  }
};