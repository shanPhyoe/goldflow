const jwt = require('jsonwebtoken');

const User = require('../models/userModel.js');

const AppError = require('../utils/appError.js');
const catchAsyncError = require('../utils/catchError.js');
const { createAndSendToken } = require('../utils/sendUserWithCookie');

exports.protect = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.goldflow;

    if (!token)
        return next(
            new AppError(
                'You are not logged in. Please log in to continue.',
                400
            )
        );

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user)
        return next(
            new AppError(
                "Forbidden. You don't have permission to perform this action.",
                403
            )
        );

    req.user = user;

    next();
});

exports.signup = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser)
        return next(new AppError('This email is already registered.', 409));

    const newUser = await User.create({
        name: name,
        email: email,
        password: password,
    });

    createAndSendToken(newUser, 201, req, res);
});

exports.signin = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (user && user.googleSignin)
        return next(
            new AppError('Please use sign in with Google for that email.', 405)
        );

    if (!user || !(await user.comparePassword(password, user.password)))
        return next(new AppError('Wrong username or password.', 403));

    createAndSendToken(user, 200, req, res);
});

exports.signout = (req, res) => {
    res.cookie('goldflow', '', {
        expires: new Date(Date.now() + 3000),
        httpOnly: true,
        secure: true,
    });

    res.status(200).json({
        status: 'success',
    });
};

exports.googleSignin = catchAsyncError(async (req, res, next) => {
    const { email, displayName, photoURL } = req.body;

    let user = await User.findOne({ email });

    if (user && !user.googleSignin)
        return next(new AppError('Please try signing in with password.', 400));

    if (!user) {
        user = await User.create({
            name: displayName,
            email,
            photoURL,
            googleSignin: true,
        });
    }

    createAndSendToken(user, 200, req, res);
});
