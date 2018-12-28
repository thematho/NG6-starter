const User = require('../../models/user.model');
const sanitize = require('mongo-sanitize');
const jwt = require('jsonwebtoken');
const { toggleUser } = require('./user.update');

const UserController = {
  get: (req, res, next) => {
    const searchEx = new RegExp(search, 'i');
    User.find({
      $or: [{
        username: { $regex: searchEx }
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
      username: sanitize(req.body.username),
      password: sanitize(req.body.password),
      role: sanitize(req.body.role) || 'USER',
      nickname: sanitize(req.body.nickname),
    });
    user.save()
      .then(({ username, role, nickname, _id }) => {
        res.json({ username, role, nickname, _id });
      })
      .catch(next);
  },

  disableUser: toggleUser(false),

  enableUser: toggleUser(true),

  signIn: (req, res, next) => {
    User.authenticate(sanitize(req.body.username), sanitize(req.body.password))
      .then(({ username, role, nickname, _id }) => {
        const token = jwt.sign({ id: username }, req.app.get('secretKey'), { expiresIn: '1h' });
        res.json({
          user: { username, role, nickname, _id },
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
