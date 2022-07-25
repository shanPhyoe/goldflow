import dataActionTypes from './data.types';

const INITIAL_STATE = {
    monthlyStatistics: {
        totalIncome: 0,
        totalExpense: 0,
        totalInvestment: 0,
        month: new Date(Date.now()).toLocaleString('default', {
            month: 'long',
        }),
        year: new Date(Date.now()).getFullYear(),
    },
    yearlyStatistics: {
        totalExpense: 0,
        totalIncome: 0,
        totalInvestment: 0,
        mostSpentMonth: 'N/A',
        year: new Date(Date.now()).getFullYear(),
    },
    lifetimeStatistics: {
        totalExpense: 0,
        totalIncome: 0,
        totalInvestment: 0,
        mostSpentYear: 'N/A',
        costToIncomeRatio: '0:0',
        netSavings: 0,
    },
    monthlyData: {
        month: new Date(Date.now()).toLocaleString('default', {
            month: 'long',
        }),
        year: new Date(Date.now()).getFullYear(),
        transactions: null,
    },
};

const dataReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case dataActionTypes.MONTHLY_DATA_SUCCESS:
            return {
                ...state,
                monthlyData: action.payload,
            };
        case dataActionTypes.MONTHLY_STATISTICS_SUCCESS:
            return {
                ...state,
                monthlyStatistics: action.payload,
            };
        case dataActionTypes.YEARLY_STATISTICS_SUCCESS:
            return {
                ...state,
                yearlyStatistics: action.payload,
            };
        case dataActionTypes.LIFETIME_STATISTICS_SUCCESS:
            return {
                ...state,
                lifetimeStatistics: action.payload,
            };
        case dataActionTypes.SET_DEFAULT_DATA:
            return INITIAL_STATE;
        default:
            return {
                ...state,
            };
    }
};

export default dataReducer;
