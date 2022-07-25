import { put, takeLatest, delay, call, all } from 'redux-saga/effects';

import { clearPopupMessage } from './popupMessage.action';

import popupActionTypes from './popupMessage.types';

export function* onPopupMessageDisplay() {
    yield takeLatest(
        popupActionTypes.POPUP_MESSAGE_SET,
        clearPopupMessageOnTimeout
    );
}
export function* clearPopupMessageOnTimeout() {
    yield delay(3000);
    yield put(clearPopupMessage());
}

export function* popupMessageSaga() {
    yield all([call(onPopupMessageDisplay)]);
}
