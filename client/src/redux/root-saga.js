import { all, call } from 'redux-saga/effects';

import { userSaga } from './user/user.saga';
import { dataSaga } from './data/data.saga';
import { popupMessageSaga } from './popupMessage/popupMessage.saga';

export default function* rootSaga() {
    yield all([call(userSaga), call(dataSaga), call(popupMessageSaga)]);
}
