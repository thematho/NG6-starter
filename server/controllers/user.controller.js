const UserSchema = require('../models/user.model');
const sanitize = require('mongo-sanitize');
const jwt = require('jsonwebtoken');

const TaskController = {
  get: function getTask(req, res, next) {
    res.send({ name: 'User name test', completed: false });
  },
  save: function saveTODO(req, res, next) {
    // Save TODO list in MongoDB
  },
  signIn: function signIn(req, res, next) {
    UserSchema.authenticate(sanitize(req.body.username), sanitize(req.body.password),
      function afterAuthentication(error, user) {
        if (!error) {
          const token = jwt.sign({ id: user.username }, req.app.get('secret'), { expiresIn: '1h' });
          res.json({ status: "success", message: "user found!!!", data: { user, token } });
        } else {

          res
            .status(401)
            .json({ status: "error", message: "Wrong user or password", data: null });
        }
      });

  },
  signOut: function signOut(req, res, next) {
    req.session.destroy();
    next();
  },
}

module.exports = TaskController;
