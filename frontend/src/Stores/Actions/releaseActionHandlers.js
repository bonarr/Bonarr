import $ from 'jquery';
import * as types from './actionTypes';
import { set, update } from './baseActions';
import { updateRelease } from './releaseActions';

const section = 'releases';

const releaseActionHandlers = {
  [types.FETCH_RELEASES]: function(payload) {
    return function(dispatch, getState) {
      dispatch(set({ section, fetching: true }));

      const promise = $.ajax({
        url: '/release',
        data: payload,
        traditional: true
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

  [types.GRAB_RELEASE]: function(payload) {
    return function(dispatch, getState) {
      const guid = payload.guid;

      dispatch(updateRelease({ guid, grabbing: true }));

      const promise = $.ajax({
        url: '/release',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload)
      });

      promise.done((data) => {
        dispatch(updateRelease({
          guid,
          grabbing: false,
          grabbed: true,
          grabError: null
        }));
      });

      promise.fail((xhr) => {
        const grabError = xhr.responseJSON && xhr.responseJSON.message || 'Failed to add to download queue';

        dispatch(updateRelease({
          guid,
          grabbing: false,
          grabbed: false,
          grabError
        }));
      });
    };
  }
};

export default releaseActionHandlers;
