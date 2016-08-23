import * as types from './actionTypes';
import createFetchHandler from './Creators/createFetchHandler';
import createSaveHandler from './Creators/createSaveHandler';

const settingsActionHandlers = {
  [types.FETCH_UI_SETTINGS]: createFetchHandler('ui', '/config/ui'),
  [types.SAVE_UI_SETTINGS]: createSaveHandler('ui', '/config/ui', (state) => state.settings.ui)
};

export default settingsActionHandlers;
