
const { dbuser, dbpassword, ENV } = process.env;
const MONGO_DB_URL = `mongodb://${dbuser}:${dbpassword}@ds145043.mlab.com:45043/todo-crud`;

module.exports = {
  MONGO_DB_URL,
  ENV: ENV || 'DEV',
};