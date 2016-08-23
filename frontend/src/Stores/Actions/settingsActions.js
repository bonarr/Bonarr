import { createAction } from 'redux-actions';
import * as types from './actionTypes';
import settingsActionHandlers from './settingsActionHandlers';

export const toggleAdvancedSettings = createAction(types.TOGGLE_ADVANCED_SETTINGS);

export const fetchUISettings = settingsActionHandlers[types.FETCH_UI_SETTINGS];
export const saveUISettings = settingsActionHandlers[types.SAVE_UI_SETTINGS];

export const setUISettingsValue = createAction(types.SET_UI_SETTINGS_VALUE, (payload) => {
  return {
    section: 'ui',
    ...payload
  };
});
