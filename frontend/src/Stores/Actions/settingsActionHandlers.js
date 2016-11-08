import _ from 'lodash';
import $ from 'jquery';
import * as types from './actionTypes';
import createFetchHandler from './Creators/createFetchHandler';
import createFetchSchemaHandler from './Creators/createFetchSchemaHandler';
import createSaveHandler from './Creators/createSaveHandler';
import createSaveProviderHandler from './Creators/createSaveProviderHandler';
import createDeleteProviderHandler from './Creators/createDeleteProviderHandler';
import createTestProviderHandler from './Creators/createTestProviderHandler';
import { set, update, clearPendingChanges } from './baseActions';

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
      dispatch(set({ section, fetching: true }));

      const naming = getState().settings.naming;

      const promise = $.ajax({
        url: '/config/naming/examples',
        data: Object.assign({}, naming.item, naming.pendingChanges)
      });

      promise.done((data) => {
        dispatch(update({ section, data }));

        dispatch(set({
          section,
          fetching: false,
          populated: true,
          error: null
        }));
      });

      promise.fail((xhr) => {
        dispatch(set({
          section,
          fetching: false,
          populated: false,
          error: xhr
        }));
      });
    };
  },

  [types.REORDER_DELAY_PROFILE]: function(payload) {
    const section = 'delayProfiles';

    return function(dispatch, getState) {
      const { id, moveIndex } = payload;
      const moveOrder = moveIndex + 1;
      const delayProfiles = getState().settings.delayProfiles.items;
      const moving = _.find(delayProfiles, { id });

      // Don't move if the order hasn't changed
      if (moving.order === moveOrder) {
        return;
      }

      const after = moveIndex > 0 ? _.find(delayProfiles, { order: moveIndex }) : null;
      const afterQueryParam = after ? `after=${after.id}` : '';

      const promise = $.ajax({
        type: 'PUT',
        url: `/delayprofile/reorder/${id}?${afterQueryParam}`
      });

      promise.done((data) => {
        dispatch(update({ section, data }));
      });
    };
  },

  [types.FETCH_QUALITY_PROFILES]: createFetchHandler('qualityProfiles', '/profile'),
  [types.FETCH_QUALITY_PROFILE_SCHEMA]: createFetchSchemaHandler('qualityProfiles', '/profile/schema'),

  [types.SAVE_QUALITY_PROFILE]: createSaveProviderHandler('qualityProfiles',
                                                          '/profile',
                                                          (state) => state.settings.qualityProfiles),

  [types.DELETE_QUALITY_PROFILE]: createDeleteProviderHandler('qualityProfiles',
                                                              '/profile',
                                                              (state) => state.settings.qualityProfiles),

  [types.FETCH_DELAY_PROFILES]: createFetchHandler('delayProfiles', '/delayprofile'),

  [types.SAVE_DELAY_PROFILE]: createSaveProviderHandler('delayProfiles',
                                                        '/delayprofile',
                                                        (state) => state.settings.delayProfiles),

  [types.DELETE_DELAY_PROFILE]: createDeleteProviderHandler('delayProfiles',
                                                            '/delayprofile',
                                                            (state) => state.settings.delayProfiles),

  [types.FETCH_QUALITY_DEFINITIONS]: createFetchHandler('qualityDefinitions', '/qualitydefinition'),
  [types.SAVE_QUALITY_DEFINITIONS]: createSaveHandler('qualityDefinitions', '/qualitydefinition', (state) => state.settings.qualitydefinitions),

  [types.SAVE_QUALITY_DEFINITIONS]: function() {
    const section = 'qualityDefinitions';

    return function(dispatch, getState) {
      const qualityDefinitions = getState().settings.qualityDefinitions;

      const upatedDefinitions = Object.keys(qualityDefinitions.pendingChanges).map((key) => {
        const id = parseInt(key);
        const pendingChanges = qualityDefinitions.pendingChanges[id] || {};
        const item = _.find(qualityDefinitions.items, { id });

        return Object.assign({}, item, pendingChanges);
      });

      // If there is nothing to save don't bother saving
      if (!upatedDefinitions || !upatedDefinitions.length) {
        return;
      }

      const promise = $.ajax({
        type: 'PUT',
        url: '/qualityDefinition/update',
        data: JSON.stringify(upatedDefinitions)
      });

      promise.done((data) => {
        dispatch(update({ section, data }));
        dispatch(clearPendingChanges({ section: 'qualityDefinitions' }));
      });
    };
  },

  [types.FETCH_INDEXERS]: createFetchHandler('indexers', '/indexer'),
  [types.FETCH_INDEXER_SCHEMA]: createFetchSchemaHandler('indexers', '/indexer/schema'),

  [types.SAVE_INDEXER]: createSaveProviderHandler('indexers',
                                                  '/indexer',
                                                  (state) => state.settings.indexers),

  [types.DELETE_INDEXER]: createDeleteProviderHandler('indexers',
                                                      '/indexer',
                                                      (state) => state.settings.indexers),

  [types.TEST_INDEXER]: createTestProviderHandler('indexers',
                                                  '/indexer',
                                                  (state) => state.settings.indexers),

  [types.FETCH_INDEXER_SETTINGS]: createFetchHandler('indexerSettings', '/config/indexer'),
  [types.SAVE_INDEXER_SETTINGS]: createSaveHandler('indexerSettings', '/config/indexer', (state) => state.settings.indexerSettings),

  [types.FETCH_RESTRICTIONS]: createFetchHandler('restrictions', '/restriction'),

  [types.SAVE_RESTRICTION]: createSaveProviderHandler('restrictions',
                                                      '/restriction',
                                                      (state) => state.settings.restrictions),

  [types.DELETE_RESTRICTION]: createDeleteProviderHandler('restrictions',
                                                          '/restriction',
                                                          (state) => state.settings.restrictions),

  [types.FETCH_DOWNLOAD_CLIENTS]: createFetchHandler('downloadClients', '/downloadClient'),
  [types.FETCH_DOWNLOAD_CLIENT_SCHEMA]: createFetchSchemaHandler('downloadClients', '/downloadClient/schema'),

  [types.SAVE_DOWNLOAD_CLIENT]: createSaveProviderHandler('downloadClients',
                                                          '/downloadClient',
                                                          (state) => state.settings.downloadClients),

  [types.DELETE_DOWNLOAD_CLIENT]: createDeleteProviderHandler('downloadClients',
                                                                '/downloadClient',
                                                              (state) => state.settings.downloadClients),

  [types.TEST_DOWNLOAD_CLIENT]: createTestProviderHandler('downloadClients',
                                                          '/downloadClient',
                                                          (state) => state.settings.downloadClients)
};

export default settingsActionHandlers;
