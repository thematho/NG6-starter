const jwt = require('jsonwebtoken');
const User = require('../models/user.model')
const safeURLS = [
  '/api/users/authenticate',
];
const isSafeURL = (userURL) => {
  return safeURLS.some((URL) => {
    return userURL === URL;
  });
}

function verifyToken(req, res, next) {
  if (isSafeURL(req.path)) {
    return next();
  }
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.status(401).json({ status: "error", message: err.message, data: null });
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
      res.status(401).json({
        status: "error",
        message: 'Your user is not longer available',
        data: null
      });
    });
}

module.exports = {
  verifyToken,
  verifyUser,
};