import $ from 'jquery';
import serverSideCollectionHandlers from 'Utilities/serverSideCollectionHandlers';
import * as types from './actionTypes';
import { fetching, update, setError } from './baseActions';
import createFetchCollectionHandler from './createFetchCollectionHandler';
import createServerSideCollectionHandlers from './createServerSideCollectionHandlers';

const systemActionHandlers = {
  [types.FETCH_STATUS](payload) {
    return (dispatch, getState) => {
      dispatch(fetching({ property: 'status', fetching: true }));

      const promise = $.ajax({
        url: '/system/status'
      });

      promise.done((data) => {
        dispatch(update({ property: 'status', data }));
        dispatch(setError({ property: 'status', error: null }));
      });

      promise.fail((xhr) => {
        dispatch(setError({ property: 'status', error: xhr }));
      });

      promise.always(() => {
        dispatch(fetching({ property: 'status', fetching: false }));
      });
    };
  },

  [types.FETCH_HEALTH]: createFetchCollectionHandler('health', '/health'),
  [types.FETCH_DISK_SPACE]: createFetchCollectionHandler('diskSpace', '/diskspace'),
  [types.FETCH_TASKS]: createFetchCollectionHandler('tasks', '/system/task'),
  [types.FETCH_BACKUPS]: createFetchCollectionHandler('backups', '/system/backup'),
  [types.FETCH_UPDATES]: createFetchCollectionHandler('updates', '/update'),
  [types.FETCH_LOG_FILES]: createFetchCollectionHandler('logFiles', '/log/file'),

  ...createServerSideCollectionHandlers('logs', '/log', (state) => state.system, {
    [serverSideCollectionHandlers.FETCH]: types.FETCH_LOGS,
    [serverSideCollectionHandlers.FIRST_PAGE]: types.GOTO_FIRST_LOGS_PAGE,
    [serverSideCollectionHandlers.PREVIOUS_PAGE]: types.GOTO_PREVIOUS_LOGS_PAGE,
    [serverSideCollectionHandlers.NEXT_PAGE]: types.GOTO_NEXT_LOGS_PAGE,
    [serverSideCollectionHandlers.LAST_PAGE]: types.GOTO_LAST_LOGS_PAGE,
    [serverSideCollectionHandlers.EXACT_PAGE]: types.GOTO_LOGS_PAGE,
    [serverSideCollectionHandlers.SORT]: types.SET_LOGS_SORT,
    [serverSideCollectionHandlers.FILTER]: types.SET_LOGS_FILTER
  })
};

export default systemActionHandlers;
