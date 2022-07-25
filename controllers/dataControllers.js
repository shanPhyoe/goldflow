const Data = require('../models/dataModel');

const catchAsyncError = require('../utils/catchError');
const getRatio = require('../utils/ratio');

const singleMonthStatistics = data => {
    return data.transactions.reduce(
        (accu, el) => {
            if (el.transactionType === 'Investment') {
                accu.totalInvestment += el.amount;
                return accu;
            } else if (el.transactionType === 'Income') {
                accu.totalIncome += el.amount;
                return accu;
            } else if (el.transactionType === 'Expense') {
                accu.totalExpense += el.amount;
                return accu;
            }
        },
        {
            totalIncome: 0,
            totalExpense: 0,
            totalInvestment: 0,
            month: data.month,
            year: data.year,
        }
    );
};

const multiMonthsStatistics = (data, timeFrame) => {
    const monthsData = data.map(el => singleMonthStatistics(el));

    let mostSpent = data[0];
    let mostSpentMonth;
    const yearlyExpense = {};

    const result = monthsData.reduce(
        (accu, el) => {
            accu.totalExpense += el.totalExpense;
            accu.totalIncome += el.totalIncome;
            accu.totalInvestment += el.totalInvestment;

            mostSpentMonth =
                mostSpent.totalExpense > el.totalExpense
                    ? mostSpent.month
                    : el.month;

            yearlyExpense[el.year] = yearlyExpense[el.year]
                ? yearlyExpense[el.year] + el.totalExpense
                : el.totalExpense;

            return accu;
        },
        {
            totalExpense: 0,
            totalIncome: 0,
            totalInvestment: 0,
            year: data[0].year,
        }
    );

    if (timeFrame === 'yearly') {
        result.mostSpentMonth =
            result.totalExpense > 0 ? mostSpentMonth : 'N/A';

        return result;
    }

    result.netSavings =
        result.totalIncome - result.totalExpense - result.totalInvestment;
    result.costToIncomeRatio = getRatio(
        result.totalExpense,
        result.totalIncome
    );

    const yearsList = Object.keys(yearlyExpense);
    let maxSpentAmount = yearlyExpense[yearsList[0]];
    let mostSpentYear = yearsList[0];

    for (let i = 1; i < yearsList.length; i++) {
        if (yearlyExpense[yearsList[i]] > maxSpentAmount)
            mostSpentYear = yearsList[i];
    }

    result.mostSpentYear = result.totalExpense > 0 ? mostSpentYear : 'N/A';

    result.year = undefined;

    return result;
};

const calculateAllStatistics = async (month, year, req, res, next) => {
    const [monthlyData, yearlyData, lifetimeData] = await Promise.all([
        Data.findOne({
            user: req.user._id,
            month,
            year,
        }),
        Data.find({ user: req.user._id, year }),
        Data.find({ user: req.user._id }),
    ]);

    let monthlyStatistics;
    if (!monthlyData) {
        monthlyStatistics = {
            totalIncome: 0,
            totalExpense: 0,
            totalInvestment: 0,
            month,
            year,
        };
    } else {
        monthlyStatistics = singleMonthStatistics(monthlyData);
    }

    let yearlyStatistics;
    if (yearlyData.length === 0) {
        yearlyStatistics = {
            totalExpense: 0,
            totalIncome: 0,
            totalInvestment: 0,
            mostSpentMonth: 'N/A',
            year,
        };
    } else {
        yearlyStatistics = multiMonthsStatistics(yearlyData, 'yearly');
    }

    let lifetimeStatistics;
    if (lifetimeData.length === 0) {
        lifetimeStatistics = {
            totalExpense: 0,
            totalIncome: 0,
            totalInvestment: 0,
            mostSpentYear: 'N/A',
            costToIncomeRatio: '0:0',
            netSavings: 0,
        };
    } else {
        lifetimeStatistics = multiMonthsStatistics(lifetimeData, null);
    }

    return { monthlyStatistics, yearlyStatistics, lifetimeStatistics };
};

exports.addTransaction = catchAsyncError(async (req, res, next) => {
    const { newTransaction } = req.body;
    const { month, year } = req.query;

    let monthlyData = await Data.findOne({ user: req.user._id, month, year });

    if (!monthlyData) {
        monthlyData = await Data.create({
            user: req.user._id,
            month,
            year,
            transactions: [newTransaction],
        });
    } else {
        monthlyData.transactions.push(newTransaction);
        await monthlyData.save();
    }

    const statistics = await calculateAllStatistics(
        month,
        year,
        req,
        res,
        next
    );

    res.status(200).json({
        status: 'success',
        data: {
            monthlyData: {
                transactions: monthlyData.transactions,
                month,
                year,
            },
            statistics,
        },
    });
});

exports.deleteTransaction = catchAsyncError(async (req, res, next) => {
    const { transactionId } = req.body;
    const { month, year } = req.query;

    const monthlyData = await Data.findOneAndUpdate(
        { user: req.user._id, month, year },
        { $pull: { transactions: { _id: transactionId } } },
        { new: true }
    );

    if (monthlyData.transactions.length === 0) {
        await Data.findOneAndDelete({ user: req.user._id });

        const statistics = await calculateAllStatistics(
            month,
            year,
            req,
            res,
            next
        );

        return res.status(200).json({
            status: 'success',
            data: {
                monthlyData: {
                    transactions: null,
                    month,
                    year,
                },
                statistics,
            },
        });
    }

    const statistics = await calculateAllStatistics(
        month,
        year,
        req,
        res,
        next
    );

    res.status(200).json({
        status: 'success',
        data: {
            monthlyData: {
                transactions: monthlyData.transactions,
                month,
                year,
            },
            statistics,
        },
    });
});

exports.getMonthlyData = catchAsyncError(async (req, res, next) => {
    const { month, year } = req.query;

    const monthlyData = await Data.findOne({ user: req.user._id, month, year });

    return res.status(200).json({
        status: 'success',
        data: {
            transactions: monthlyData?.transactions || null,
            month,
            year,
        },
    });
});

exports.getAllStatistics = catchAsyncError(async (req, res, next) => {
    const { month, year } = req.query;

    const statistics = await calculateAllStatistics(
        month,
        year,
        req,
        res,
        next
    );

    return res.status(200).json({
        status: 'success',
        data: statistics,
    });
});

exports.getMonthlyStatistics = catchAsyncError(async (req, res, next) => {
    const { month, year } = req.query;

    const data = await Data.findOne({ user: req.user._id, year, month });

    let monthlyStatistics;

    if (!data) {
        monthlyStatistics = {
            totalIncome: 0,
            totalExpense: 0,
            totalInvestment: 0,
            month,
            year,
        };
    } else {
        monthlyStatistics = singleMonthStatistics(data);
    }

    return res.status(200).json({
        status: 'success',
        data: monthlyStatistics,
    });
});

exports.getYearlyStatistics = catchAsyncError(async (req, res, next) => {
    const { year } = req.query;

    const data = await Data.find({ user: req.user._id, year });

    if (data.length === 0) {
        return res.status(200).json({
            status: 'success',
            data: {
                totalExpense: 0,
                totalIncome: 0,
                totalInvestment: 0,
                mostSpentMonth: 'N/A',
                year,
            },
        });
    }

    const yearlyStatistics = multiMonthsStatistics(data, 'yearly');

    return res.status(200).json({
        status: 'success',
        data: yearlyStatistics,
    });
});
