import userActionTypes from './user.types';

export const isUserLoggedIn = () => ({
    type: userActionTypes.IS_USER_LOGGED_IN,
});

export const signInSuccess = user => ({
    type: userActionTypes.SIGN_IN_SUCCESS,
    payload: user,
});

export const signInStart = userCredentials => ({
    type: userActionTypes.SIGN_IN_START,
    payload: userCredentials,
});

export const googleSignInStart = () => ({
    type: userActionTypes.GOOGLE_SIGN_IN_START,
});

export const signInFailure = error => ({
    type: userActionTypes.SIGN_IN_FAILURE,
    payload: error,
});

export const signOutStart = () => ({
    type: userActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
    type: userActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = error => ({
    type: userActionTypes.SIGN_OUT_FAILURE,
    payload: error,
});

export const signUpStart = userCredentials => ({
    type: userActionTypes.SIGN_UP_START,
    payload: userCredentials,
});

export const signUpSuccess = user => ({
    type: userActionTypes.SIGN_UP_SUCCESS,
    payload: user,
});

export const signUpFailure = error => ({
    type: userActionTypes.SIGN_UP_FAILURE,
    payload: error,
});

export const updateSettingsStart = userData => ({
    type: userActionTypes.UPDATE_SETTINGS_START,
    payload: userData,
});

export const updateSettingsFailure = error => ({
    type: userActionTypes.UPDATE_SETTINGS_FAILURE,
    payload: error,
});

export const updateSettingsSuccess = userData => ({
    type: userActionTypes.UPDATE_SETTINGS_SUCCESS,
    payload: userData,
});

export const changePasswordStart = passwords => ({
    type: userActionTypes.CHANGE_PASSWORD_START,
    payload: passwords,
});

export const changePasswordFailure = error => ({
    type: userActionTypes.CHANGE_PASSWORD_FAILURE,
    payload: error,
});

export const changePasswordSuccess = user => ({
    type: userActionTypes.CHANGE_PASSWORD_SUCCESS,
    payload: user,
});

export const clearUserErrorMessage = () => ({
    type: userActionTypes.CLEAR_USER_ERROR_MESSAGE,
});
