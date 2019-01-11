const User = require('../../models/user.model');
const sanitize = require('mongo-sanitize');
const jwt = require('jsonwebtoken');
const { toggleUser } = require('./user.update');

const UserController = {
  get: (req, res, next) => {
    const searchEx = new RegExp(search, 'i');
    User.find({
      $or: [{
        email: { $regex: searchEx }
      }, {
        nickname: { $regex: searchEx }
      }],
    })
      .then(list => req.json({ list }))
      .catch(next);
  },

  // TODO Add encription on user side and backend for password
  createUser: (req, res, next) => {
    const user = new User({
      email: sanitize(req.body.email),
      password: sanitize(req.body.password),
      role: sanitize(req.body.role) || 'USER',
      nickname: sanitize(req.body.nickname),
    });
    user.save()
      .then(({ email, role, nickname, _id }) => {
        res.json({ email, role, nickname, _id });
      })
      .catch(next);
  },

  disableUser: toggleUser(false),

  enableUser: toggleUser(true),

  signIn: (req, res, next) => {
    User.authenticate(sanitize(req.body.email), sanitize(req.body.password))
      .then(({ email, role, nickname, _id }) => {
        const token = jwt.sign({ id: email }, req.app.get('secretKey'), { expiresIn: '1h' });
        res.json({
          user: { email, role, nickname, _id },
          token
        });
      })
      .catch(next);
  },

  signOut: (req, res, next) => {
    req.session.destroy();
    next();
  },
}

module.exports = UserController;
