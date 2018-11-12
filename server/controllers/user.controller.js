const UserSchema = require('../models/user.model');
const sanitize = require('mongo-sanitize');
const jwt = require('jsonwebtoken');

const TaskController = {
  get: function getTask(req, res, next) {
    res.send({ name: 'User name test', completed: false });
  },
  createUser: function saveTODO(req, res, next) {
    const user = new UserSchema({
      username: sanitize(req.body.username),
      password: sanitize(req.body.password),
      role: 'User',
      nickname: sanitize(req.body.nickname),
    });
    user.save()
      .then((user) => {
        res.json(user);
      }, error => res.status(500).json({ message: error }));
  },
  signIn: function signIn(req, res, next) {
    UserSchema
      .authenticate(sanitize(req.body.username), sanitize(req.body.password))
      .then((user) => {
        const token = jwt.sign({ id: user.username }, req.app.get('secret'), { expiresIn: '1h' });
        res.json({ status: "success", message: "user found!!!", data: { user, token } });
      }, (error) => {
        res.status(401).json({
          status: "error",
          message: "Wrong user or password", data: null
        });
      });
  },
  signOut: function signOut(req, res, next) {
    req.session.destroy();
    next();
  },
}

module.exports = TaskController;
