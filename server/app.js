const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const logger = require('morgan');

const app = express();
const { SECRET } = require('./config');
const corsMiddleware = require('./middlewares/cors')();
const { validateUser } = require('./middlewares/security');
const errorHandlerMiddleware = require('./middlewares/error-handler');

// Init
require('./models/db');
app.set('secretKey', SECRET)
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

app.use('/api', corsMiddleware, validateUser, router);
// Handle API errors with proper status code
app.use(errorHandlerMiddleware);

module.exports = app;