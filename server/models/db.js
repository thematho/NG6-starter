const mongoose = require('mongoose');
const { MONGO_DB_URL } = require('../config');

mongoose.connect(MONGO_DB_URL, { useNewUrlParser: true,  autoIndex: process.env});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports = db;