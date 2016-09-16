import $ from 'jquery';
import * as types from './actionTypes';
import createFetchHandler from './Creators/createFetchHandler';
import createSaveHandler from './Creators/createSaveHandler';
import createSaveThingyHandler from './Creators/createSaveThingyHandler';
import { fetching, update, setError } from './baseActions';

const settingsActionHandlers = {
  [types.FETCH_UI_SETTINGS]: createFetchHandler('ui', '/config/ui'),
  [types.SAVE_UI_SETTINGS]: createSaveHandler('ui', '/config/ui', (state) => state.settings.ui),

  [types.FETCH_MEDIA_MANAGEMENT_SETTINGS]: createFetchHandler('mediaManagement', '/config/mediamanagement'),
  [types.SAVE_MEDIA_MANAGEMENT_SETTINGS]: createSaveHandler('mediaManagement', '/config/mediamanagement', (state) => state.settings.mediaManagement),

  [types.FETCH_NAMING_SETTINGS]: createFetchHandler('naming', '/config/naming'),
  [types.SAVE_NAMING_SETTINGS]: createSaveHandler('naming', '/config/naming', (state) => state.settings.naming),

  [types.FETCH_NAMING_EXAMPLES]: function(payload) {
    const section = 'namingExamples';

    return function(dispatch, getState) {
      dispatch(fetching({ section, fetching: true }));

      const naming = getState().settings.naming;

      const promise = $.ajax({
        url: '/config/naming/examples',
        data: Object.assign({}, naming.item, naming.pendingChanges)
      });

      promise.done((data) => {
        dispatch(update({ section, data }));
        dispatch(setError({ section, error: null }));
      });

      promise.fail((xhr) => {
        dispatch(setError({ section, error: xhr }));
      });

      promise.always(() => {
        dispatch(fetching({ section, fetching: false }));
      });
    };
  },

  [types.FETCH_QUALITY_PROFILES]: createFetchHandler('qualityProfiles', '/profile'),
  [types.FETCH_QUALITY_PROFILE_SCHEMA]: createFetchHandler('qualityProfileSchema', '/profile/schema'),

  [types.SAVE_QUALITY_PROFILE]: createSaveThingyHandler('qualityProfileSchema',
                                                    'qualityProfiles',
                                                    '/profile',
                                                    (state) => state.settings.qualityProfileSchema,
                                                    (state) => state.settings.qualityProfiles)
};

export default settingsActionHandlers;
