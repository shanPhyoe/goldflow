const express = require('express');

const {
    signup,
    signin,
    signout,
    googleSignin,
    protect,
} = require('../controllers/authControllers');
const {
    changePassword,
    checkCurrentUser,
    accountSetting,
    uploadUserPhoto,
    resizeUserPhoto,
} = require('../controllers/userControllers');

const userRouter = express.Router();

userRouter.get('/', checkCurrentUser);
userRouter.post('/signup', signup);
userRouter.post('/signin', signin);
userRouter.post('/googlesignin', googleSignin);
userRouter.get('/signout', signout);

userRouter.use(protect);

userRouter.patch('/changePassword', changePassword);
userRouter.patch(
    '/accountSetting',
    uploadUserPhoto,
    resizeUserPhoto,
    accountSetting
);

module.exports = userRouter;
