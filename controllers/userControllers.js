const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const sharp = require('sharp');

const User = require('../models/userModel');
const AppError = require('../utils/appError');

const catchAsyncError = require('../utils/catchError');
const { createAndSendToken } = require('../utils/sendUserWithCookie');

// MULTER SETUP
// stores in buffer
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(
            new AppError(
                'The file format is not an image. Please upload only image.',
                400
            ),
            false
        );
    }
};
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsyncError(async (req, res, next) => {
    if (!req.file) return next();

    // req.user is available from protected from authController
    req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(300)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/users/${req.file.filename}`);

    next();
});

exports.changePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id).select('+password');

    if (!(await bcrypt.compare(req.body.oldPassword, user.password)))
        return next(new AppError('The old password is not correct.', 401));

    user.password = req.body.newPassword;
    await user.save();

    createAndSendToken(user, 200, req, res);
});

exports.checkCurrentUser = catchAsyncError(async (req, res, next) => {
    if (req.cookies.goldflow) {
        const decodedToken = await jwt.verify(
            req.cookies.goldflow,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decodedToken.id);
        if (!user) return res.end();

        return res.status(200).json({
            status: 'success',
            data: {
                name: user.name,
                email: user.email,
                photoURL: user.photoURL,
                googleSignin: user.googleSignin,
            },
        });
    }

    return res.end();
});

exports.accountSetting = catchAsyncError(async (req, res, next) => {
    const filteredBody = { name: req.body.name, email: req.body.email };

    if (req.file) filteredBody.photoURL = req.file.filename;

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        filteredBody,
        { new: true, runValidators: true }
    );

    const { name, email, googleSignin, photoURL } = updatedUser;

    res.status(200).json({
        status: 'success',
        data: {
            name,
            email,
            googleSignin,
            photoURL,
        },
    });
});
