const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Document must point to a user.'],
        },
        month: {
            type: String,
            required: [true, 'Document needs to be saved including a month.'],
        },
        year: {
            type: Number,
            required: [true, 'Document needs to be saved including a year.'],
        },
        transactions: [
            {
                date: {
                    type: Date,
                    required: [true, 'Data must have a date.'],
                },
                name: {
                    type: String,
                    required: [true, 'Data must have a name.'],
                },
                transactionType: {
                    type: String,
                    enum: ['Investment', 'Income', 'Expense'],
                },
                amount: {
                    type: Number,
                    required: [true, 'Data must have an amount.'],
                },
            },
        ],
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

dataSchema.index({ user: 1, month: 1, year: 1 }, { unique: true });

dataSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: '_id',
    });
    next();
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
