import $ from 'jquery';
import * as types from './actionTypes';
import { set, update } from './baseActions';

const episodeFileActionHandlers = {
  [types.FETCH_EPISODE_FILES]: function(payload) {
    const section = 'episodeFiles';

    return function(dispatch, getState) {
      dispatch(set({ section, fetching: true }));

      const promise = $.ajax({
        url: '/episodeFile',
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
  }
};

export default episodeFileActionHandlers;
