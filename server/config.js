
const { dbuser, dbpassword, EXPRESS_ENV, CRYPT_SALT_ROUNDS } = process.env;
const MONGO_DB_URL = `mongodb://${dbuser}:${dbpassword}@ds145043.mlab.com:45043/todo-crud`;
const CORS_DEV_CONFIG = {
  origin: (origin, cb) => {
    console.log(`CORS attempt origin: ${origin}`);
    if (!origin || ~origin.indexOf('http://localhost:4100')) {
      cb(null, true)
    } else {
      cb(new Error('Not allowed by CORS'))
    }
  }, credentials: true
};

module.exports = {
  MONGO_DB_URL,
  MONGO_TEST_DB_URL: "mongodb://localhost:27017/mock?socketTimeoutMS=120000",
  ENV: EXPRESS_ENV || 'DEV',
  CORS_CONF: EXPRESS_ENV !== 'DEV' ? {} : CORS_DEV_CONFIG,
  SALT_ROUNDS: CRYPT_SALT_ROUNDS || 0,
  MAX_LOGIN_ATTEMPS: 3,
  USER_LOCKED_TIME: 2 * 60 * 60 * 1000,
};