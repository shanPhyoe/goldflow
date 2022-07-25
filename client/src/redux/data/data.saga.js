import { all, call, takeLatest, put } from 'redux-saga/effects';

import {
    lifetimeStatisticsSuccess,
    monthlyDataSuccess,
    monthlyStatisticsSuccess,
    yearlyStatisticsSuccess,
    setDefaultData,
} from './data.action';
import { setPopupMessage } from '../popupMessage/popupMessage.action';

import dataActionTypes from './data.types';
import userActionTypes from '../user/user.types';

import { goldFlow } from '../../utils/axios';
import { getMonthAndYear } from '../../utils/date';

function* dataErrorHandler(err) {
    if (err.code === 'ERR_NETWORK') {
        yield put(
            setPopupMessage({
                message: err.message,
                type: 'error',
            })
        );
    } else {
        yield put(
            setPopupMessage({
                message: err.response.data.message,
                type: 'error',
            })
        );
    }
    return;
}

export function* onGetMonthlyData() {
    yield takeLatest(
        [dataActionTypes.GET_INITIAL_DATA, dataActionTypes.GET_MONTHLY_DATA],
        getMonthlyData
    );
}
export function* getMonthlyData({ payload: { month, year } }) {
    try {
        const { data } = yield goldFlow.get(
            `/data/monthlyData?month=${month}&year=${year}`,
            {
                validateStatus: () => true,
            }
        );

        yield put(monthlyDataSuccess(data.data));
        yield put(
            setPopupMessage({
                message: 'Successfully loaded data.',
                type: 'success',
            })
        );
    } catch (err) {
        yield* dataErrorHandler(err);
    }
}

export function* onGetMonthlyStatistics() {
    yield takeLatest(
        dataActionTypes.GET_MONTHLY_STATISTICS,
        getMonthlyStatistics
    );
}
export function* getMonthlyStatistics({ payload: { month, year } }) {
    try {
        const { data } = yield goldFlow.get(
            `/data/monthlyStatistics?month=${month}&year=${year}`,
            {
                validateStatus: () => true,
            }
        );

        yield put(monthlyStatisticsSuccess(data.data));
        yield put(
            setPopupMessage({
                message: 'Successfully loaded data.',
                type: 'success',
            })
        );
    } catch (err) {
        yield* dataErrorHandler(err);
    }
}

export function* onGetYearlyStatistics() {
    yield takeLatest(
        dataActionTypes.GET_YEARLY_STATISTICS,
        getYearlyStatistics
    );
}
export function* getYearlyStatistics({ payload: year }) {
    try {
        const { data } = yield goldFlow.get(
            `/data/yearlyStatistics?year=${year}`
        );

        // const { data } = fetchedData;

        yield put(yearlyStatisticsSuccess(data.data));
        yield put(
            setPopupMessage({
                message: 'Successfully loaded data.',
                type: 'success',
            })
        );
    } catch (err) {
        yield* dataErrorHandler(err);
    }
}

export function* onGetAllStatistics() {
    yield takeLatest(dataActionTypes.GET_INITIAL_DATA, getAllStatistics);
}
export function* getAllStatistics({ payload: { month, year } }) {
    try {
        const { data } = yield goldFlow.get(
            `/data/allStatistics?month=${month}&year=${year}`,
            { validateStatus: () => true }
        );

        // const { data } = fetchedData;
        const { monthlyStatistics, yearlyStatistics, lifetimeStatistics } =
            data.data;

        yield put(monthlyStatisticsSuccess(monthlyStatistics));
        yield put(yearlyStatisticsSuccess(yearlyStatistics));
        yield put(lifetimeStatisticsSuccess(lifetimeStatistics));
    } catch (err) {
        yield* dataErrorHandler(err);
    }
}

export function* onAddTransaction() {
    yield takeLatest(dataActionTypes.ADD_TRANSACTION, addTransaction);
}
export function* addTransaction({ payload: transaction }) {
    try {
        const [month, year] = getMonthAndYear(transaction.date);

        const { data } = yield goldFlow.post(
            `/data/transaction?month=${month}&year=${year}`,
            { validateStatus: () => true, newTransaction: transaction }
        );

        const { monthlyData, statistics } = data.data;
        const { monthlyStatistics, yearlyStatistics, lifetimeStatistics } =
            statistics;

        yield put(monthlyDataSuccess(monthlyData));
        yield put(monthlyStatisticsSuccess(monthlyStatistics));
        yield put(yearlyStatisticsSuccess(yearlyStatistics));
        yield put(lifetimeStatisticsSuccess(lifetimeStatistics));
        yield put(
            setPopupMessage({
                message: 'Transaction added to database.',
                type: 'success',
            })
        );
    } catch (err) {
        yield* dataErrorHandler(err);
    }
}

export function* onDeleteTransaction() {
    yield takeLatest(dataActionTypes.DELETE_TRANSACTION, deleteTransaction);
}
export function* deleteTransaction({ payload: transaction }) {
    try {
        const { _id, date } = transaction;
        const [month, year] = getMonthAndYear(date);

        const { data } = yield goldFlow.delete(
            `/data/transaction?month=${month}&year=${year}`,
            {
                data: { transactionId: _id },
            },
            {
                validateStatus: () => true,
            }
        );

        const { monthlyData, statistics } = data.data;
        const { monthlyStatistics, yearlyStatistics, lifetimeStatistics } =
            statistics;

        yield put(monthlyDataSuccess(monthlyData));
        yield put(monthlyStatisticsSuccess(monthlyStatistics));
        yield put(yearlyStatisticsSuccess(yearlyStatistics));
        yield put(lifetimeStatisticsSuccess(lifetimeStatistics));
        yield put(
            setPopupMessage({
                message: 'Transaction deleted from database.',
                type: 'success',
            })
        );
    } catch (err) {
        yield* dataErrorHandler(err);
    }
}

export function* onSignoutSuccess() {
    yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearDataOnSignout);
}
export function* clearDataOnSignout() {
    yield put(setDefaultData());
}

export function* dataSaga() {
    yield all([
        call(onGetMonthlyData),
        call(onGetMonthlyStatistics),
        call(onGetYearlyStatistics),
        call(onGetAllStatistics),
        call(onAddTransaction),
        call(onDeleteTransaction),
        call(onSignoutSuccess),
    ]);
}
