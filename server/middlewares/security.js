const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { AUTHENTICATION_ERRORS } = require('../errors');
const { INVALID_CREDENTIALS, USER_DISABLED } = AUTHENTICATION_ERRORS;
const safeURLS = [
  '/api/users/authenticate',
];
const isSafeURL = (userURL) => {
  return safeURLS.some((URL) => {
    return userURL === URL;
  });
};

function verifyToken(req, res, next) {
  if (isSafeURL(req.path)) {
    return next();
  }
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.status(INVALID_CREDENTIALS.status).json({
        message: INVALID_CREDENTIALS.message
      });
    } else {
      res.locals.username = decoded.id;
      next();
    }
  });
}

function verifyUser(req, res, next) {
  User.findOne({ username: res.locals.username, enabled: true })
    .then(next)
    .catch((err) => {
      res.status(USER_DISABLED.status)
        .json({
          message: USER_DISABLED.message
        });
    });
}

module.exports = {
  verifyToken,
  verifyUser,
};