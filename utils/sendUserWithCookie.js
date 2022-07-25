const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.createAndSendToken = (user, statusCode, req, res) => {
    const { _id, name, email, photoURL, googleSignin } = user;

    const token = signToken(_id);

    res.cookie('goldflow', token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true,
    });

    return res.status(statusCode).json({
        status: 'success',
        data: {
            name,
            email,
            photoURL,
            googleSignin,
        },
    });
};
