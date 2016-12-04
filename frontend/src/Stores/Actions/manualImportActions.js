import { createAction } from 'redux-actions';
import * as types from './actionTypes';
import manualImportActionHandlers from './manualImportActionHandlers';

export const fetchManualImportItems = manualImportActionHandlers[types.FETCH_MANUAL_IMPORT_ITEMS];
export const setManualImportSort = manualImportActionHandlers[types.SET_MANUAL_IMPORT_SORT];
export const updateManualImportItem = createAction(types.UPDATE_MANUAL_IMPORT_ITEM);
export const clearManualImport = createAction(types.CLEAR_MANUAL_IMPORT);
export const addRecentFolder = createAction(types.ADD_RECENT_FOLDER);
export const removeRecentFolder = createAction(types.REMOVE_RECENT_FOLDER);
