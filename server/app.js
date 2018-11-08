const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const config = require('./config');
const cors = require('cors');

require('./models/db');

// Routers
const router = express.Router();
const userRouter = require('./routes/user.router');
const taskRouter = require('./routes/task.router');

app.use(logger('info'));  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist')));

router.use('/users', userRouter);
router.use('/task', taskRouter);

app.use('/api', cors(config.CORS_CONF), router);

module.exports = app;