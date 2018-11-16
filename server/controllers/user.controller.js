const User = require('../models/user.model');
const sanitize = require('mongo-sanitize');
const jwt = require('jsonwebtoken');
const errorFactory = require('./error-handler')('User Controller');

const UserController = {
  get: function getTask(req, res, next) {
    User.getAll(sanitize(req.query.id))
      .then((list) => {
        req.json({ list });
      }, errorFactory.getHandler('get'));
  },
  createUser: function saveTODO(req, res, next) {
    const user = new User({
      username: sanitize(req.body.username),
      password: sanitize(req.body.password),
      role: 'User',
      nickname: sanitize(req.body.nickname),
    });
    user.save()
      .then((user) => {
        res.json(user);
      }, errorFactory.getHandler('create user'));
  },
  signIn: function signIn(req, res, next) {
    User
      .authenticate(sanitize(req.body.username), sanitize(req.body.password))
      .then((user) => {
        const token = jwt.sign({ id: user.username }, req.app.get('secret'), { expiresIn: '1h' });
        res.json({ status: "success", message: "user found!!!", data: { user, token } });
      }, errorFactory.getHandler('signIn', {
        status: 401,
        message: "Wrong user or password",
      }));
  },
  signOut: function signOut(req, res, next) {
    req.session.destroy();
    next();
  },
}

module.exports = UserController;
