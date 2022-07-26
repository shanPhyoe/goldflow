import transactionPopupActionTypes from './transactionPopup.types';

export const setTransactionShown = boolean => ({
    type: transactionPopupActionTypes.SET_TRANSACTION_POPUP_SHOWN,
    payload: boolean,
});

export const setTransactionData = transactionData => ({
    type: transactionPopupActionTypes.SET_TRANSACTION_POPUP_DATA,
    payload: transactionData,
});
