const mongoose = require('mongoose');
const { MONGO_DB_URL, ENV } = require('../config');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const mongooseConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: true
};
const initDB = require('./db.init');
// TODO: Create script to clean DB and generate basic users on Production DB manually
// TODO: Create script to generate basic users on mocked DB on startup automatically

const connectToDB = (env, callback) => {
  console.log(`Connecting to ${env} DB...`);
  mongoose.connect(MONGO_DB_URL, mongooseConfig, (err)=> {
    console.log(`Connected to ${env} DB`);
    callback();
  });
};

if (ENV === 'DEV') {
  mockgoose.prepareStorage().then(() => {
    connectToDB('Mocked', () => {
      initDB();
    });
  });
} else {
  connectToDB('Production');
}

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;