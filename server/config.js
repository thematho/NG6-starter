const { dbuser, dbpassword, EXPRESS_ENV, CRYPT_SALT_ROUNDS, SECRET_KEY} = process.env;
const MONGO_DB_URL = `mongodb://${dbuser}:${dbpassword}@ds145043.mlab.com:45043/todo-crud`;

console.log(`Server Environment Config = ${EXPRESS_ENV}`);
module.exports = {
  MONGO_DB_URL,
  MONGO_TEST_DB_URL: "mongodb://localhost:27017/mock?socketTimeoutMS=120000",
  ENV: EXPRESS_ENV || 'DEV',
  SALT_ROUNDS: Number(CRYPT_SALT_ROUNDS) || 0,
  MAX_LOGIN_ATTEMPS: 3,
  USER_LOCKED_TIME: 2 * 60 * 60 * 1000,
  SECRET: SECRET_KEY || 'NG6-MEAN-secret', 
};