import loadingActionTypes from './loading.types';

const INITIAL_STATE = {
    showLoading: false,
};

const loadingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case loadingActionTypes.ACTIVATE_LOADING:
            return {
                ...state,
                showLoading: true,
            };
        case loadingActionTypes.DEACTIVATE_LOADING:
            return {
                ...state,
                showLoading: false,
            };
        default:
            return {
                ...state,
            };
    }
};

export default loadingReducer;
