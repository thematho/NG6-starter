const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const logger = require('morgan');

const app = express();
const config = require('./config');
const cors = require('cors');
const security = require('./security');
require('./models/db');

// Routers
const router = express.Router();
const userRouter = require('./routes/user.router');
const taskRouter = require('./routes/task.router');

app.use(logger('info'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// gzip Compression
app.use(compression());
app.use(express.static(path.join(__dirname, '../dist')));

router.use('/users', userRouter);
router.use('/task', taskRouter);

app.use('/api', cors(config.CORS_CONF), security.validateUser, router);

module.exports = app;