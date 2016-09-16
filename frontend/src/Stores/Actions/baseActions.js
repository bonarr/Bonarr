import { createAction } from 'redux-actions';
import * as types from './actionTypes';

export const fetching = createAction(types.FETCHING);

export const update = createAction(types.UPDATE);
export const updateThingy = createAction(types.UPDATE_THINGY);
export const updateServerSideCollection = createAction(types.UPDATE_SERVER_SIDE_COLLECTION);

export const setError = createAction(types.SET_ERROR);

export const setServerSideCollectionPage = createAction(types.SET_SERVER_SIDE_COLLECTION_PAGE);
export const setServerSideCollectionSort = createAction(types.SET_SERVER_SIDE_COLLECTION_SORT);
export const setServerSideCollectionFilter = createAction(types.SET_SERVER_SIDE_COLLECTION_FILTER);

export const saving = createAction(types.SAVING);
export const setSettingValue = createAction(types.SET_SETTING_VALUE);
export const clearPendingChanges = createAction(types.CLEAR_PENDING_CHANGES);
export const setSaveError = createAction(types.SET_SAVE_ERROR);
