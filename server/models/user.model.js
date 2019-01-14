const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = require('../config').SALT_ROUNDS;
const { USER_LOCKED_TIME, MAX_LOGIN_ATTEMPS } = require('../config');
const ERROR = require('../errors').AUTHENTICATION_ERRORS;

// TODO Add validators for different errors.
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['USER', 'ADMIN', 'ROOT'] },
  nickname: { type: String, required: true },
  loginAttempts: { type: Number, required: true, default: 0 },
  lockUntil: { type: Number },
  enabled: { type: Boolean, default: true },
});


UserSchema.pre('save', function onPreSave(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  return next();
});

UserSchema.virtual('isLocked').get(() => {
  return this.lockUntil && this.lockUntil > Date.now();
});

UserSchema.methods.checkPassword = function checkPassword(incomingPassword) {
  return bcrypt.compareSync(incomingPassword, this.password);
};

UserSchema.statics.authenticate = function (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) return mongoose.Promise.reject(ERROR.USER_NOT_FOUND);
      if (user.isLocked) return mongoose.Promise.reject(ERROR.MAX_ATTEMPTS);
      if (!user.checkPassword(password)) {
        let lockUntil = 0;
        if (user.loginAttempts === MAX_LOGIN_ATTEMPS) {
          lockUntil = Date.now() + USER_LOCKED_TIME;
        }
        user.update({
          $set: { loginAttempts: user.loginAttempts++ },
          $set: { lockUntil }
        });
        return mongoose.Promise.reject(ERROR.WRONG_CREDENTIALS);
      }
      user.update({ $set: { loginAttempts: 0 }, $unset: { lockUntil: 0 } });
      return user;
    }, error => mongoose.Promise.reject(error));
};

module.exports = mongoose.model('User', UserSchema);  