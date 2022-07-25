import userActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    userError: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SIGN_IN_SUCCESS:
        case userActionTypes.UPDATE_SETTINGS_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
            };
        case userActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                userError: null,
            };
        case userActionTypes.SIGN_UP_FAILURE:
        case userActionTypes.SIGN_IN_FAILURE:
        case userActionTypes.SIGN_OUT_FAILURE:
        case userActionTypes.UPDATE_SETTINGS_FAILURE:
        case userActionTypes.CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                userError: action.payload,
            };
        case userActionTypes.CLEAR_USER_ERROR_MESSAGE:
            return {
                ...state,
                userError: null,
            };
        default:
            return state;
    }
};

export default userReducer;
