import $ from 'jquery';
import * as types from './actionTypes';
import { set, update } from './baseActions';

const episodeHistoryActionHandlers = {
  [types.FETCH_EPISODE_HISTORY]: function(payload) {
    const section = 'episodeHistory';

    return function(dispatch, getState) {
      dispatch(set({ section, fetching: true }));

      const queryParams = {
        pageSize: 1000,
        page: 1,
        filterKey: 'episodeId',
        filterValue: payload.episodeId,
        sortKey: 'date',
        sortValue: 'descending'
      };

      const promise = $.ajax({
        url: '/history',
        data: queryParams
      });

      promise.done((data) => {
        dispatch(update({ section, data: data.records }));

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

export default episodeHistoryActionHandlers;
