const express = require('express');

const { protect } = require('../controllers/authControllers');
const {
    getMonthlyStatistics,
    getYearlyStatistics,
    getAllStatistics,
    addTransaction,
    deleteTransaction,
    getMonthlyData,
} = require('../controllers/dataControllers');

const dataRouter = express.Router();

dataRouter.use(protect);

dataRouter.get('/monthlyStatistics', getMonthlyStatistics);
dataRouter.get('/yearlyStatistics', getYearlyStatistics);
dataRouter.get('/allStatistics', getAllStatistics);
dataRouter.get('/monthlyData', getMonthlyData);
dataRouter.post('/transaction', addTransaction);
dataRouter.delete('/transaction', deleteTransaction);

module.exports = dataRouter;
