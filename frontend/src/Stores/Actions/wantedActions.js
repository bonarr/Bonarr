import * as types from './actionTypes';
import wantedActionHandlers from './wantedActionHandlers';

export const fetchMissing = wantedActionHandlers[types.FETCH_MISSING];
export const gotoMissingFirstPage = wantedActionHandlers[types.GOTO_FIRST_MISSING_PAGE];
export const gotoMissingPreviousPage = wantedActionHandlers[types.GOTO_PREVIOUS_MISSING_PAGE];
export const gotoMissingNextPage = wantedActionHandlers[types.GOTO_NEXT_MISSING_PAGE];
export const gotoMissingLastPage = wantedActionHandlers[types.GOTO_LAST_MISSING_PAGE];
export const gotoMissingPage = wantedActionHandlers[types.GOTO_MISSING_PAGE];
export const setMissingSort = wantedActionHandlers[types.SET_MISSING_SORT];
export const setMissingFilter = wantedActionHandlers[types.SET_MISSING_FILTER];
