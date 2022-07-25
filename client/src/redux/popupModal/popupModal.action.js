import popupModalActionTypes from './popupModal.types';

export const closePopupModal = () => ({
    type: popupModalActionTypes.CLOSE_POPUP_MODAL,
});

export const openAccSettingModal = () => ({
    type: popupModalActionTypes.OPEN_ACC_SETTING_MODAL,
});

export const openChangePasswordModal = () => ({
    type: popupModalActionTypes.OPEN_CHANGE_PASSWORD_MODAL,
});
