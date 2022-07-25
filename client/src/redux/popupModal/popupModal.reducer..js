import popupModalActionTypes from './popupModal.types';

const INITIAL_STATE = {
    showModal: '',
};

const popupModalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case popupModalActionTypes.CLOSE_POPUP_MODAL:
            return {
                ...state,
                showModal: '',
            };
        case popupModalActionTypes.OPEN_ACC_SETTING_MODAL:
            return {
                ...state,
                showModal: 'accountSetting',
            };
        case popupModalActionTypes.OPEN_CHANGE_PASSWORD_MODAL:
            return {
                ...state,
                showModal: 'changePassword',
            };
        default:
            return {
                ...state,
            };
    }
};

export default popupModalReducer;
