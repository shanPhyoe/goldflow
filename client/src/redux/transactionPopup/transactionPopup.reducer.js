import transactionPopupActionTypes from './transactionPopup.types';

const INITIAL_STATE = {
    showTransaction: false,
    transactionData: null,
};

const transactionPopupReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case transactionPopupActionTypes.SET_TRANSACTION_POPUP_SHOWN:
            return {
                ...state,
                showTransaction: action.payload,
            };
        case transactionPopupActionTypes.SET_TRANSACTION_POPUP_DATA:
            return {
                ...state,
                transactionData: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export default transactionPopupReducer;
