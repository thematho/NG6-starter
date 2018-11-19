const User = require('../models/user.model');
const sanitize = require('mongo-sanitize');
const jwt = require('jsonwebtoken');

const UserController = {
  get: (req, res, next) => {
    User.getAll(sanitize(req.query.id))
      .then((list) => {
        req.json({ list });
      })
      .catch(next);
  },
  createUser: (req, res, next) => {
    const user = new User({
      username: sanitize(req.body.username),
      password: sanitize(req.body.password),
      role: 'User',
      nickname: sanitize(req.body.nickname),
    });
    user.save()
      .then((user) => {
        res.json(user);
      });
  },
  signIn: (req, res, next) => {
    User.authenticate(sanitize(req.body.username), sanitize(req.body.password))
      .then((user) => {
        const token = jwt.sign({ id: user.username }, req.app.get('secretKey'), { expiresIn: '1h' });
        res.json({ user, token });
      })
      .catch(next);
  },
  signOut: (req, res, next) => {
    req.session.destroy();
    next();
  },
}

module.exports = UserController;
