require('dotenv').config();
var cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/testJwt', { useNewUrlParser: true, useUnifiedTopology: true, 'useCreateIndex': true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Mongodb connected")
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var refreshRouter = require('./routes/refresh');

var app = express();

global.refreshTokens = [];
global.utils = require('./helpers/utils');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use('/', indexRouter);
app.use('/users', utils.authenticateToken, usersRouter);
app.use('/auth', authRouter);
app.use('/refresh', refreshRouter);

module.exports = app;