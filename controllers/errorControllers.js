const AppError = require('../utils/appError');

// for invalid mongoDB id
const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsErrorDB = err => {
    const message = `The name: ${err.keyValue.email} already exists. Please insert different email!`;

    return new AppError(message, 400);
};

// for invalid validation in schema
const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors)
        .map(err => err.message)
        .join('. ');

    const message = 'Invalid input: ' + errors;
    return new AppError(message, 400);
};

const sendResponseDev = (err, req, res) => {
    console.log(err);

    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        statck: err.stack,
    });
};

const sendResponseProd = (err, req, res) => {
    if (err.isOperationalError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    return res.status(err.statusCode).json({
        status: 'error',
        message: 'Something went very wrong!',
    });
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') sendResponseDev(err, req, res);
    else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };

        error.message = err.message;

        if (err.code === 11000) error = handleDuplicateFieldsErrorDB(error);
        if (err.name === 'CastError') error = handleCastErrorDB(error);
        if (err.name === 'ValidationError')
            error = handleValidationErrorDB(error);

        sendResponseProd(error, req, res);
    }
};
