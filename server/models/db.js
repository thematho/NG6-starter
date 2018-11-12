const mongoose = require('mongoose');
const { MONGO_DB_URL, ENV } = require('../config');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const mongooseConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: true
};

const connectToDB = () => {
  mongoose.connect(MONGO_DB_URL, mongooseConfig, function (err) {
    console.log(`Connected to Mocked DB ${err ? err : ''}`);
  });
};

if (ENV === 'DEV') {
  mockgoose.prepareStorage()
    .then(connectToDB);
} else {
  connectToDB();
}

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;