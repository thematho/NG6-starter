const db = require('./db')
const User = require('../models/user.model');
const { dbpassword } = process.env;

const InitUserList = [{
  email: 'root',
  password: dbpassword || 'root',
  role: 'ROOT',
  nickname: 'Root',
}, {
  email: 'admin@admin.com',
  password: 'admin',
  role: 'ADMIN',
  nickname: 'Admin',
}];

module.exports = () => {

  InitUserList.forEach(({ email, password, role, nickname }) => {
    let user = new User({ email, password, role, nickname });
    user.save();
  });
}