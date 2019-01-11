const {
  dbuser,
  dbpassword,
  EXPRESS_ENV = 'DEV',
  CRYPT_SALT_ROUNDS = 0,
  SECRET_KEY = 'NG6-MEAN-secret',
  CRYPTO_PHRASE = 'secretKey',
  CRYPTO_BITS = 1024,
} = process.env;

const MONGO_DB_URL = `mongodb://${dbuser}:${dbpassword}@ds145043.mlab.com:45043/todo-crud`;

console.log(`Server Environment Config = ${EXPRESS_ENV}`);
module.exports = {
  MONGO_DB_URL,
  MONGO_TEST_DB_URL: "mongodb://localhost:27017/mock?socketTimeoutMS=120000",
  ENV: EXPRESS_ENV,
  SALT_ROUNDS: Number(CRYPT_SALT_ROUNDS),
  MAX_LOGIN_ATTEMPS: 3,
  USER_LOCKED_TIME: 2 * 60 * 60 * 1000,
  SECRET: SECRET_KEY,
  CRYPTO_PHRASE,
  CRYPTO_BITS,
};