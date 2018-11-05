const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const router = express.Router();

const db = require('./models/db');
// Routers
const userRouter = require('./routes/user.router');
const taskRouter = require('./routes/task.router');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist')));

router.use('/users', userRouter);
router.use('/task', taskRouter);

app.use('/api', router);

module.exports = app;
