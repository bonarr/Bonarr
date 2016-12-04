import $ from 'jquery';
import { sortDirections } from 'Helpers/Props';
import * as types from './actionTypes';
import { set, update } from './baseActions';
import { fetchEpisodeHistory } from './episodeHistoryActions';

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
        sortDirection: sortDirections.DESCENDING
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
  },

  [types.EPISODE_HISTORY_MARK_AS_FAILED]: function(payload) {
    return function(dispatch, getState) {
      const {
        historyId,
        episodeId
      } = payload;

      const promise = $.ajax({
        url: '/history/failed',
        type: 'POST',
        data: {
          id: historyId
        }
      });

      promise.done(() => {
        dispatch(fetchEpisodeHistory({ episodeId }));
      });
    };
  }
};

export default episodeHistoryActionHandlers;
