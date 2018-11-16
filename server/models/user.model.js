const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = require('../config').SALT_ROUNDS;
const { USER_LOCKED_TIME, MAX_LOGIN_ATTEMPS } = require('../config');
const ERROR = require('../errors').AUTHENTICATION_ERRORS;

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  role: { type: String, required: true },
  nickname: { type: String, required: true },
  loginAttempts: { type: Number, required: true, default: 0 },
  lockedTime: { type: Number },
});


UserSchema.pre('save', function onPreSave(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  return next();
});

UserSchema.virtual('isLocked').get(() => {
  return this.lockedTime && this.lockedTime > Date.now();
});

UserSchema.method.checkPassword = function checkPassword(incomingPassword) {
  return bcrypt.compareSync(this.password, incomingPassword);
};

UserSchema.statics.authenticate = function (username, password) {
  return this.findOne({ username })
    .then((user) => {
      if (!user) return mongoose.Promise.reject(ERROR.USER_NOT_FOUND);
      if (user.isLocked) return mongoose.Promise.reject(ERROR.MAX_ATTEMPTS);
      if (!user.checkPassword(password)) {
        user.update({
          $set: { loginAttempts: user.loginAttempts++ },
          $set: { lockUntil: Date.now() + USER_LOCKED_TIME }
        });
        return mongoose.Promise.reject(ERROR.WRONG_CREDENTIALS);
      }
      user.update({ $set: { loginAttempts: 0 }, $unset: { lockUntil: 0 } });
      return user;
    }, error => mongoose.Promise.reject(error));
};

UserSchema.statics.getList = function (search) {
  const searchEx = new RegExp(search, 'i');
  return this.find({
    $or: [{
      username: { $regex: searchEx }
    }, {
      nickname: { $regex: searchEx }
    }],
  });
};

UserSchema.statics.createUser = function (username, password) {

};
module.exports = mongoose.model('User', UserSchema);  