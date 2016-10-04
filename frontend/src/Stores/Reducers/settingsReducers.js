import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import createSetReducer from './Creators/createSetReducer';
import createSetSettingValueReducer from './Creators/createSetSettingValueReducer';
import createClearPendingChangesReducer from './Creators/createClearPendingChangesReducer';
import createUpdateReducer from './Creators/createUpdateReducer';
import createUpdateThingyReducer from './Creators/createUpdateThingyReducer';
import createDeleteThingyReducer from './Creators/createDeleteThingyReducer';
import createReducers from './Creators/createReducers';

const defaultState = {
  ui: {
    fetching: false,
    populated: false,
    error: null,
    pendingChanges: {},
    saving: false,
    saveError: null,
    item: {}
  },

  mediaManagement: {
    fetching: false,
    populated: false,
    error: null,
    pendingChanges: {},
    saving: false,
    saveError: null,
    item: {}
  },

  naming: {
    fetching: false,
    populated: false,
    error: null,
    pendingChanges: {},
    saving: false,
    saveError: null,
    item: {}
  },

  namingExamples: {
    fetching: false,
    populated: false,
    error: null,
    item: {}
  },

  qualityProfiles: {
    fetching: false,
    populated: false,
    error: null,
    items: []
  },

  qualityProfileSchema: {
    fetching: false,
    populated: false,
    error: null,
    saving: false,
    saveError: null,
    item: {},
    pendingChanges: {}
  },

  delayProfiles: {
    fetching: false,
    populated: false,
    error: null,
    items: [],
    saving: false,
    saveError: null,
    pendingChanges: {}
  },

  advancedSettings: false
};

const propertyNames = [
  'ui',
  'mediaManagement',
  'naming',
  'namingExamples',
  'qualityProfileSchema'
];

const thingyPropertyNames = [
  'qualityProfiles',
  'delayProfiles'
];

const settingsReducers = handleActions({

  [types.TOGGLE_ADVANCED_SETTINGS]: (state, { payload }) => {
    return Object.assign({}, state, { advancedSettings: !state.advancedSettings });
  },

  [types.SET]: createReducers([...propertyNames, ...thingyPropertyNames], createSetReducer),
  [types.UPDATE]: createReducers([...propertyNames, ...thingyPropertyNames], createUpdateReducer),
  [types.UPDATE_THINGY]: createReducers(thingyPropertyNames, createUpdateThingyReducer),
  [types.CLEAR_PENDING_CHANGES]: createReducers([...propertyNames, ...thingyPropertyNames], createClearPendingChangesReducer),

  [types.DELETE_THINGY]: createReducers(thingyPropertyNames, createDeleteThingyReducer),

  [types.SET_UI_SETTINGS_VALUE]: createSetSettingValueReducer('ui'),
  [types.SET_MEDIA_MANAGEMENT_SETTINGS_VALUE]: createSetSettingValueReducer('mediaManagement'),
  [types.SET_NAMING_SETTINGS_VALUE]: createSetSettingValueReducer('naming'),
  [types.SET_QUALITY_PROFILE_VALUE]: createSetSettingValueReducer('qualityProfileSchema'),
  [types.SET_DELAY_PROFILE_VALUE]: createSetSettingValueReducer('delayProfiles')

}, defaultState);

export default settingsReducers;
