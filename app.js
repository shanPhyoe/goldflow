const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');

const userRouter = require('./routes/userRoutes');
const dataRouter = require('./routes/dataRoutes');

const AppError = require('./utils/appError');
const errorController = require('./controllers/errorControllers');

const app = express();

app.enable('trust proxy');

// implementing cors
app.use(
    cors({
        origin: true, // dev
        credentials: true,
    })
);

// serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/build')));

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// data sanitization against nosql query injection
app.use(mongoSanitize());

// compression in request
app.use(compression());

// development logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.use('/user', userRouter);
app.use('/data', dataRouter);

// for error handling
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorController);

module.exports = app;
