import { put, takeLatest, all, call } from 'redux-saga/effects';

import userActionTypes from './user.types';

import {
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    signUpSuccess,
    signUpFailure,
    updateSettingsFailure,
    updateSettingsSuccess,
    changePasswordFailure,
    changePasswordSuccess,
} from './user.action';
import { activateLoading, deactivateLoading } from '../loading/loading.action';
import { closePopupModal } from '../popupModal/popupModal.action';
import { getInitialData } from '../data/data.action';
import { setPopupMessage } from '../popupMessage/popupMessage.action';

import { googleSigninPopup } from '../../firebase/firebase.util';
import { goldFlow } from '../../utils/axios';
import { getMonthAndYear } from '../../utils/date';

// CHECKING USER IS STILL LOGGED IN
export function* onIsUserLoggedIn() {
    yield takeLatest(userActionTypes.IS_USER_LOGGED_IN, isUserLoggedIn);
}
export function* isUserLoggedIn() {
    const { data } = yield goldFlow.get('/user');

    if (!data) return;

    yield put(signInSuccess(data.data));
}

// SIGN IN
export function* onSignInStart() {
    yield takeLatest(userActionTypes.SIGN_IN_START, signInStart);
}
export function* signInStart({ payload: { email, password } }) {
    yield put(activateLoading());
    try {
        const fetchedData = yield goldFlow.post('/user/signin', {
            validateStatus: () => true,
            email,
            password,
        });

        const { data } = fetchedData.data;

        yield put(signInSuccess(data));
    } catch (err) {
        if (err.response) {
            yield put(signInFailure(err.response.data.message));
        } else {
            yield put(signInFailure(err.message));
        }
    }
    yield put(deactivateLoading());
}

// GOOGLE SIGN IN
export function* onGoogleSignInStart() {
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, googleSignInStart);
}
export function* googleSignInStart() {
    yield put(activateLoading());
    try {
        const user = yield googleSigninPopup();

        if (!user) {
            yield put(deactivateLoading());
            return;
        }

        if (typeof user === 'string') throw new Error(user);

        const { displayName, email, photoURL } = user;

        const fetchedData = yield goldFlow.post('/user/googlesignin', {
            validateStatus: () => true,
            displayName,
            email,
            photoURL,
        });

        const { data } = fetchedData.data;

        yield put(signInSuccess(data));
    } catch (err) {
        if (err.response) {
            yield put(signInFailure(err.response.data.message));
        } else {
            yield put(signInFailure(err.message));
        }
    }
    yield put(deactivateLoading());
}

// SIGN OUT
export function* onSignOutStart() {
    yield takeLatest(userActionTypes.SIGN_OUT_START, signOutStart);
}
export function* signOutStart() {
    yield put(activateLoading());
    try {
        const fetchedData = yield goldFlow.get('/user/signout');

        if (fetchedData.status !== 200) throw new Error();

        yield put(signOutSuccess());
    } catch (err) {
        yield put(signOutFailure(err.message));
    }
    yield put(deactivateLoading());
}

// SIGN UP
export function* onSignUpStart() {
    yield takeLatest(userActionTypes.SIGN_UP_START, signUpStart);
}
export function* signUpStart({ payload: { name, email, password } }) {
    yield put(activateLoading());
    try {
        const fetchedData = yield goldFlow.post('/user/signup', {
            validateStatus: () => true,
            name,
            email,
            password,
        });

        const { data } = fetchedData.data;

        yield put(signUpSuccess(data));
    } catch (err) {
        if (err.response) {
            yield put(signUpFailure(err.response.data.message));
        } else {
            yield put(signUpFailure(err.message));
        }
        yield put(deactivateLoading());
    }
}

// FETCH TRANSACTIONS DATA AFTER SIGN IN
export function* onSignInSuccess() {
    yield takeLatest(userActionTypes.SIGN_IN_SUCCESS, getDataAfterSignIn);
}
export function* getDataAfterSignIn() {
    const [month, year] = getMonthAndYear(Date.now());

    yield put(getInitialData({ month, year }));
}

// AUTO LOGIN AFTER SIGN UP
export function* onSignUpSuccess() {
    yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}
export function* signInAfterSignUp({ payload: user }) {
    try {
        yield put(signInSuccess(user));
    } catch (err) {
        yield put(signInFailure(err.message));
    }
    yield put(deactivateLoading());
}

// UPDATE USER DATA
export function* onUpdateSettingsStart() {
    yield takeLatest(
        userActionTypes.UPDATE_SETTINGS_START,
        updateSettingsStart
    );
}
export function* updateSettingsStart({ payload: formData }) {
    yield put(activateLoading());

    try {
        const fetchedData = yield goldFlow.patch(
            '/user/accountSetting',
            formData,
            {
                validateStatus: () => true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        const { data } = fetchedData.data;

        yield put(updateSettingsSuccess(data));
        yield put(closePopupModal());
        yield put(
            setPopupMessage({
                typpe: 'success',
                message: 'Successfully updated!',
            })
        );
    } catch (err) {
        if (err.response) {
            yield put(updateSettingsFailure(err.response.data.message));
        } else {
            yield put(updateSettingsFailure(err.message));
        }
    }

    yield put(deactivateLoading());
}

// CHANGE PASSWORD
export function* onChangePasswordStart() {
    yield takeLatest(
        userActionTypes.CHANGE_PASSWORD_START,
        changePasswordStart
    );
}
export function* changePasswordStart({
    payload: { oldPassword, newPassword },
}) {
    yield put(activateLoading());

    try {
        const fetchedData = yield goldFlow.patch('/user/changePassword', {
            validateStatus: () => true,
            oldPassword,
            newPassword,
        });

        const { data } = fetchedData.data;

        yield put(changePasswordSuccess(data));
        yield put(closePopupModal());
        yield put(
            setPopupMessage({
                type: 'success',
                message: 'Successfully updated!',
            })
        );
    } catch (err) {
        if (err.response) {
            yield put(changePasswordFailure(err.response.data.message));
        } else {
            yield put(changePasswordFailure(err.message));
        }
    }

    yield put(deactivateLoading());
}

export function* userSaga() {
    yield all([
        call(onIsUserLoggedIn),
        call(onGoogleSignInStart),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignInStart),
        call(onSignInSuccess),
        call(onUpdateSettingsStart),
        call(onChangePasswordStart),
    ]);
}
