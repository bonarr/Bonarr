import { createAction } from 'redux-actions';
import * as types from './actionTypes';
import queueActionHandlers from './queueActionHandlers';

export const fetchQueueStatus = queueActionHandlers[types.FETCH_QUEUE_STATUS];
export const fetchQueueDetails = queueActionHandlers[types.FETCH_QUEUE_DETAILS];
export const clearQueueDetails = createAction(types.CLEAR_QUEUE_DETAILS);
