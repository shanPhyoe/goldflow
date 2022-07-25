import popupActionTypes from './popupMessage.types';

const INITIAL_STATE = {
    messageData: null,
};

const popupMessageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case popupActionTypes.POPUP_MESSAGE_SET:
            return {
                ...state,
                messageData: action.payload,
            };
        case popupActionTypes.POPUP_MESSAGE_CLEAR:
            return {
                ...state,
                messageData: null,
            };
        default:
            return {
                ...state,
            };
    }
};

export default popupMessageReducer;
