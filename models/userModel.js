const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        googleSignin: {
            type: Boolean,
            default: false,
        },
        photoURL: {
            type: String,
            default: 'user.jpg',
        },
        password: {
            type: String,
            select: false,
            validate: {
                validator: function (el) {
                    return el.length >= 8;
                },
                message: 'Password must have at least 8 characters.',
            },
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

userSchema.index({ email: 1 });

// virtual populate
userSchema.virtual('transaction', {
    ref: 'Data',
    foreignField: 'user',
    localField: '_id',
});

userSchema.pre('save', async function (next) {
    // run this function only when password field is going to be modified
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    next();
});

userSchema.methods.comparePassword = async function (
    candidatePassword,
    actualPassword
) {
    return await bcrypt.compare(candidatePassword, actualPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
