import { combineReducers } from '@reduxjs/toolkit';

import popupModalReducer from './popupModal/popupModal.reducer.';
import loadingReducer from './loading/loading.reducer';
import userReducer from './user/user.reducer';
import dataReducer from './data/data.reducer';
import popupMessageReducer from './popupMessage/popupMessage.reducer';

const rootReducer = combineReducers({
    popupModal: popupModalReducer,
    loading: loadingReducer,
    user: userReducer,
    data: dataReducer,
    popupMessage: popupMessageReducer,
});

export default rootReducer;
