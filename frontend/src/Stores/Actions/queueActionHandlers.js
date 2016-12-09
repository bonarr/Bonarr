import $ from 'jquery';
import serverSideCollectionHandlers from 'Utilities/serverSideCollectionHandlers';
import createServerSideCollectionHandlers from './Creators/createServerSideCollectionHandlers';
import createToggleEpisodeMonitoredHandler from './Creators/createToggleEpisodeMonitoredHandler';
import * as types from './actionTypes';
import { set, update, updateItem } from './baseActions';
import { fetchQueue } from './queueActions';

const queueActionHandlers = {
  [types.FETCH_QUEUE_STATUS]: function(payload) {
    const section = 'status';

    return function(dispatch, getState) {
      dispatch(set({ section, fetching: true }));

      const promise = $.ajax({
        url: '/queue/status'
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

  [types.FETCH_QUEUE_DETAILS]: function(payload) {
    const section = 'details';

    return function(dispatch, getState) {
      dispatch(set({ section, fetching: true }));

      const promise = $.ajax({
        url: '/queue/details',
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

  ...createServerSideCollectionHandlers('paged', '/queue', (state) => state.queue, {
    [serverSideCollectionHandlers.FETCH]: types.FETCH_QUEUE,
    [serverSideCollectionHandlers.FIRST_PAGE]: types.GOTO_FIRST_QUEUE_PAGE,
    [serverSideCollectionHandlers.PREVIOUS_PAGE]: types.GOTO_PREVIOUS_QUEUE_PAGE,
    [serverSideCollectionHandlers.NEXT_PAGE]: types.GOTO_NEXT_QUEUE_PAGE,
    [serverSideCollectionHandlers.LAST_PAGE]: types.GOTO_LAST_QUEUE_PAGE,
    [serverSideCollectionHandlers.EXACT_PAGE]: types.GOTO_QUEUE_PAGE,
    [serverSideCollectionHandlers.SORT]: types.SET_QUEUE_SORT
  }),

  [types.TOGGLE_QUEUE_EPISODE_MONITORED]: createToggleEpisodeMonitoredHandler('episodes', (state) => state.queue.episodes),

  [types.REMOVE_QUEUE_ITEM]: function(payload) {
    const section = 'paged';

    const {
      id,
      blacklist
    } = payload;

    return function(dispatch, getState) {
      dispatch(updateItem({ section, id, removing: true }));

      const promise = $.ajax({
        url: `/queue/${id}?blacklist=${blacklist}`,
        type: 'DELETE'
      });

      promise.done((data) => {
        dispatch(fetchQueue());
      });

      promise.fail((xhr) => {
        dispatch(updateItem({ section, id, removing: false }));
      });
    };
  },

  [types.GRAB_QUEUE_ITEM]: function(payload) {
    const section = 'paged';

    const {
      id
    } = payload;

    return function(dispatch, getState) {
      dispatch(updateItem({ section, id, grabbing: true }));

      const promise = $.ajax({
        url: `/queue/grab/${id}`,
        type: 'POST'
      });

      promise.done((data) => {
        dispatch(fetchQueue());
      });

      promise.fail((xhr) => {
        dispatch(updateItem({ section, id, grabbing: false }));
      });
    };
  }
};

export default queueActionHandlers;
