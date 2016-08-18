import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import createFetchingReducer from './Creators/createFetchingReducer';
import createSetSettingValueReducer from './Creators/createSetSettingValueReducer';
import createClearPendingChangesReducer from './Creators/createClearPendingChangesReducer';
import createSavingReducer from './Creators/createSavingReducer';
import createUpdateReducer from './Creators/createUpdateReducer';
import createReducers from './Creators/createReducers';

const defaultState = {
  fetchingUi: false,
  uiError: null,
  ui: {},
  uiPendingChanges: {},
  uiSaving: false,
  uiSaveError: null
};

const propertyNames = [
  'ui'
];

const settingsReducers = handleActions({

  [types.FETCHING]: createReducers(propertyNames, createFetchingReducer),
  [types.SAVING]: createReducers(propertyNames, createSavingReducer),
  [types.SET_SETTING_VALUE]: createReducers(propertyNames, createSetSettingValueReducer),
  [types.CLEAR_PENDING_CHANGES]: createReducers(propertyNames, createClearPendingChangesReducer),
  [types.UPDATE]: createReducers(propertyNames, createUpdateReducer)

}, defaultState);

export default settingsReducers;
