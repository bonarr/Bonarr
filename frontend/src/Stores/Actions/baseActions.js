import { createAction } from 'redux-actions';
import * as types from './actionTypes';

export const fetching = createAction(types.FETCHING);
export const fetchingCollection = createAction(types.FETCHING_COLLECTION);
export const update = createAction(types.UPDATE);
export const updateCollection = createAction(types.UPDATE_COLLECTION);
