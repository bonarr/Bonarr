import * as types from './actionTypes';
import settingsActionHandlers from './settingsActionHandlers';

export const fetchUISettings = settingsActionHandlers[types.FETCH_UI_SETTINGS];
export const setUISettingsValue = settingsActionHandlers[types.SET_UI_SETTINGS_VALUE];
export const saveUISettings = settingsActionHandlers[types.SAVE_UI_SETTINGS];
