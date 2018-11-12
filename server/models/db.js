const mongoose = require('mongoose');
const { MONGO_DB_URL, ENV } = require('../config');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);


if (ENV === 'DEV') {
  mockgoose.prepareStorage()
    .then(function () {
      mongoose.connect(MONGO_DB_URL, { useNewUrlParser: true }, function (err) {
        console.log(`Connected to Mocked DB ${err ? err : ''}`);
      });
    });
} else {
  mongoose.connect(MONGO_DB_URL, { useNewUrlParser: true, autoIndex: true });
  mongoose.Promise = global.Promise;
}


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports = db;