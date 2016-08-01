import { createAction } from 'redux-actions';
import * as types from './actionTypes';

export const fetching = createAction(types.FETCHING);
export const fetchingCollection = createAction(types.FETCHING_COLLECTION);
export const update = createAction(types.UPDATE);
export const updateCollection = createAction(types.UPDATE_COLLECTION);
export const updateServerSideCollection = createAction(types.UPDATE_SERVER_SIDE_COLLECTION);
export const setError = createAction(types.SET_ERROR);
export const setCollectionError = createAction(types.SET_COLLECTION_ERROR);
export const setServerSideCollectionPage = createAction(types.SET_SERVER_SIDE_COLLECTION_PAGE);
export const setServerSideCollectionSort = createAction(types.SET_SERVER_SIDE_COLLECTION_SORT);
export const setServerSideCollectionFilter = createAction(types.SET_SERVER_SIDE_COLLECTION_FILTER);
