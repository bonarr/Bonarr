import * as types from './actionTypes';
import createFetchHandler from './Creators/createFetchHandler';
import createSaveHandler from './Creators/createSaveHandler';

const settingsActionHandlers = {
  [types.FETCH_UI_SETTINGS]: createFetchHandler('ui', '/config/ui'),
  [types.SAVE_UI_SETTINGS]: createSaveHandler('ui', '/config/ui', (state) => state.settings.ui),

  [types.FETCH_NAMING_SETTINGS]: createFetchHandler('naming', '/config/naming'),
  [types.SAVE_NAMING_SETTINGS]: createSaveHandler('naming', '/config/naming', (state) => state.settings.naming),
  [types.FETCH_NAMING_EXAMPLES]: createFetchHandler('namingExamples', '/config/naming/examples'),

  [types.FETCH_MEDIA_MANAGEMENT_SETTINGS]: createFetchHandler('mediaManagement', '/config/mediamanagement'),
  [types.SAVE_MEDIA_MANAGEMENT_SETTINGS]: createSaveHandler('mediaManagement', '/config/mediamanagement', (state) => state.settings.mediaManagement)
};

export default settingsActionHandlers;
