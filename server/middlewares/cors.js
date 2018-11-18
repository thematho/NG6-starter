const config = require('../config');
const cors = require('cors');
const CORSConf = config.ENV === 'DEV' ? {
  origin: (origin, cb) => {
    console.log(`CORS attempt origin: ${origin}`);
    // For testing with POSTMan and BrowserSync and AngularJS builds with livereload
    if (!origin || ~origin.indexOf('http://localhost:4100')) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
    }
  }, credentials: true
} : {};

module.exports = function CORSMiddleware() {
  return cors(CORSConf);
};