
const { dbuser, dbpassword, EXPRESS_ENV } = process.env;
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
  ENV: EXPRESS_ENV || 'DEV',
  CORS_CONF: EXPRESS_ENV !== 'DEV' ? {} : CORS_DEV_CONFIG,
};