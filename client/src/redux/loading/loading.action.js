import loadingActionTypes from './loading.types';

export const activateLoading = () => ({
    type: loadingActionTypes.ACTIVATE_LOADING,
});

export const deactivateLoading = () => ({
    type: loadingActionTypes.DEACTIVATE_LOADING,
});
