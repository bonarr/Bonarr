import $ from 'jquery';
import createSetClientSideCollectionSortHandler from 'Stores/Actions/Creators/createSetClientSideCollectionSortHandler';
import * as types from './actionTypes';
import { set, update } from './baseActions';

const section = 'manualImport';

const manualImportActionHandlers = {
  [types.FETCH_MANUAL_IMPORT_ITEMS]: function(payload) {
    return function(dispatch, getState) {
      if (!payload.downloadId && !payload.folder) {
        dispatch(set({ section, error: { message: '`downloadId` or `folder` is required.' } }));
        return;
      }

      dispatch(set({ section, fetching: true }));

      const promise = $.ajax({
        url: '/manualimport',
        data: payload
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

  [types.SET_MANUAL_IMPORT_SORT]: createSetClientSideCollectionSortHandler(section, (state) => state)
};

export default manualImportActionHandlers;
