import dataActionTypes from './data.types';

export const getInitialData = date => ({
    type: dataActionTypes.GET_INITIAL_DATA,
    payload: date,
});

export const getMonthlyData = monthAndYear => ({
    type: dataActionTypes.GET_MONTHLY_DATA,
    payload: monthAndYear,
});

export const monthlyDataSuccess = transactions => ({
    type: dataActionTypes.MONTHLY_DATA_SUCCESS,
    payload: transactions,
});

export const getMonthlyStatistics = monthAndYear => ({
    type: dataActionTypes.GET_MONTHLY_STATISTICS,
    payload: monthAndYear,
});

export const monthlyStatisticsSuccess = statistics => ({
    type: dataActionTypes.MONTHLY_STATISTICS_SUCCESS,
    payload: statistics,
});

export const getYearlyStatistics = year => ({
    type: dataActionTypes.GET_YEARLY_STATISTICS,
    payload: year,
});

export const yearlyStatisticsSuccess = statistics => ({
    type: dataActionTypes.YEARLY_STATISTICS_SUCCESS,
    payload: statistics,
});

export const lifetimeStatisticsSuccess = statistics => ({
    type: dataActionTypes.LIFETIME_STATISTICS_SUCCESS,
    payload: statistics,
});

export const addTransaction = transaction => ({
    type: dataActionTypes.ADD_TRANSACTION,
    payload: transaction,
});

export const editTransaction = transaction => ({
    type: dataActionTypes.EDIT_TRANSACTION,
    payload: transaction,
});

export const deleteTransaction = transaction => ({
    type: dataActionTypes.DELETE_TRANSACTION,
    payload: transaction,
});

export const setDefaultData = () => ({
    type: dataActionTypes.SET_DEFAULT_DATA,
});
