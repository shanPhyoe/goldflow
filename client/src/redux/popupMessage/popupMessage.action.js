import popupActionTypes from './popupMessage.types';

export const setPopupMessage = messageData => ({
    type: popupActionTypes.POPUP_MESSAGE_SET,
    payload: messageData,
});

export const clearPopupMessage = () => ({
    type: popupActionTypes.POPUP_MESSAGE_CLEAR,
});
