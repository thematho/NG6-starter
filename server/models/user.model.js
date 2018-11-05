const mongoose = require('mongoose');
const bcrypt = require('bcrypt'),

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  role: { type: String, required: true },
  nickname: { type: String, required: true },
});

// TODO: Add UserSchema.pre('save', fn) to hash user Password with bcrypt

UserSchema.method.checkPassword = function checkPassword(incomingPassword, cb) {
  // TODO: Implement bcrypt compare  function
  return this.password === incomingPassword ?
    cb(null, true) :
    cb({ name: 'PASS_ERROR', message: 'Wrong Password' });
};

UserSchema.statics.authenticate = function authenticate(username, password, cb) {
  this.findOne({ username }, function onFindUser(error, user) {
    if (error) return cb(error);
    if (!user) return cb(null, null, 'User not found');
    user.checkPassword(password, function onCheckPassword(error, validPassword) {
      if (error) return cb(error);
      if (validPassword) return cb(null, user);
      // TODO: Add account lock on multiple retries
    })

  })
}

module.exports = mongoose.model('User', UserSchema);