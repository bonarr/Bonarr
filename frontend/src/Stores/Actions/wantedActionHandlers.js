import _ from 'lodash';
import $ from 'jquery';
import serverSideCollectionHandlers from 'Utilities/serverSideCollectionHandlers';
import * as types from './actionTypes';
import createServerSideCollectionHandlers from './Creators/createServerSideCollectionHandlers';
import { update } from './baseActions';

function updateEpisodes(dispatch, section, episodes, episodeIds, options) {
  const data = _.reduce(episodes, (result, item) => {
    if (episodeIds.indexOf(item.id) > -1) {
      result.push({
        ...item,
        ...options
      });
    } else {
      result.push(item);
    }

    return result;
  }, []);

  dispatch(update({ section, data }));
}

const wantedActionHandlers = {
  ...createServerSideCollectionHandlers('missing', '/wanted/missing', (state) => state.wanted, {
    [serverSideCollectionHandlers.FETCH]: types.FETCH_MISSING,
    [serverSideCollectionHandlers.FIRST_PAGE]: types.GOTO_FIRST_MISSING_PAGE,
    [serverSideCollectionHandlers.PREVIOUS_PAGE]: types.GOTO_PREVIOUS_MISSING_PAGE,
    [serverSideCollectionHandlers.NEXT_PAGE]: types.GOTO_NEXT_MISSING_PAGE,
    [serverSideCollectionHandlers.LAST_PAGE]: types.GOTO_LAST_MISSING_PAGE,
    [serverSideCollectionHandlers.EXACT_PAGE]: types.GOTO_MISSING_PAGE,
    [serverSideCollectionHandlers.SORT]: types.SET_MISSING_SORT,
    [serverSideCollectionHandlers.FILTER]: types.SET_MISSING_FILTER
  }),

  [types.MONITOR_MISSING_EPISODE]: function(payload) {
    return (dispatch, getState) => {
      const section = 'missing';

      const {
        episodeId,
        monitored
      } = payload;

      updateEpisodes(dispatch, section, getState().wanted.missing.items, [episodeId], {
        isSaving: true
      });

      const promise = $.ajax({
        url: `/episode/${episodeId}`,
        method: 'PUT',
        data: JSON.stringify({ monitored }),
        dataType: 'json'
      });

      promise.done(() => {
        updateEpisodes(dispatch, section, getState().wanted.missing.items, [episodeId], {
          isSaving: false,
          monitored
        });
      });

      promise.fail(() => {
        updateEpisodes(dispatch, section, getState().wanted.missing.items, [episodeId], {
          isSaving: false
        });
      });
    };
  },

  [types.UNMONITOR_MISSING_EPISODES]: function(payload) {
    return (dispatch, getState) => {
      const section = 'missing';
      const monitored = false;

      const {
        episodeIds
      } = payload;

      updateEpisodes(dispatch, section, getState().wanted.missing.items, episodeIds, {
        isSaving: true
      });

      const promise = $.ajax({
        url: '/episode/monitor',
        method: 'PUT',
        data: JSON.stringify({ episodeIds, monitored }),
        dataType: 'json'
      });

      promise.done(() => {
        updateEpisodes(dispatch, section, getState().wanted.missing.items, episodeIds, {
          isSaving: false,
          monitored
        });
      });

      promise.fail(() => {
        updateEpisodes(dispatch, section, getState().wanted.missing.items, episodeIds, {
          isSaving: false
        });
      });
    };
  }
};

export default wantedActionHandlers;
