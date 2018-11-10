const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = require('../config').SALT_ROUNDS;
const config = require('./config');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  role: { type: String, required: true },
  nickname: { type: String, required: true },
  loginAttempts: { type: Number, required: true, default: 0 },
  lockedTime: { type: Number },
});

const authenticationErrors = UserSchema.static.loginErrors = {
  WRONG_PASSWORD: 0,
  MAX_ATTEMPTS: 1,
  USER_NOT_FOUND: 2,
};

// TODO: Add UserSchema.pre('save', fn) to hash user Password with bcrypt
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

UserSchema.methods.incLoginAttempts = function (cb) {
  // if we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.update({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 }
    }, cb);
  }
  // otherwise we're incrementing
  var updates = { $inc: { loginAttempts: 1 } };
  // lock the account if we've reached max attempts and it's not locked already
  if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + LOCK_TIME };
  }
  return this.update(updates, cb);
};

UserSchema.statics.authenticate = function authenticate(username, password, cb) {
  return this.findOne({ username }).then(()=>{
    
  }); (error, user) => {
    if (error) return cb(error);
    if (!user) return cb(null, null, authenticationErrors.USER_NOT_FOUND);

    if (this.isLocked) {
      return cb(null, null, authenticationErrors.MAX_ATTEMPTS);
    }
    user.checkPassword(password)
      .then((validPassword)=> {

      });
  });
}; a

module.exports = mongoose.model('User', UserSchema);  