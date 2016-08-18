import * as types from './actionTypes';
import createFetchHandler from './Creators/createFetchHandler';
import createSetSettingValueHandler from './Creators/createSetSettingValueHandler';
import createSaveHandler from './Creators/createSaveHandler';

const settingsActionHandlers = {
  [types.FETCH_UI_SETTINGS]: createFetchHandler('ui', '/config/ui'),
  [types.SET_UI_SETTINGS_VALUE]: createSetSettingValueHandler('ui'),
  [types.SAVE_UI_SETTINGS]: createSaveHandler('ui', '/config/ui', (state) => state.settings)
};

export default settingsActionHandlers;
