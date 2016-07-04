import $ from 'jquery';
import * as types from './actionTypes';
import * as baseActions from './baseActions';
import createFetchCollectionHandler from './createFetchCollectionHandler';

const systemActionHandlers = {
  [types.FETCH_STATUS](payload) {
    return (dispatch, getState) => {
      dispatch(baseActions.fetching({ property: 'status', fetching: true }));

      const promise = $.ajax({
        url: '/system/status'
      });

      promise.done((data) => {
        dispatch(baseActions.update({ property: 'status', data }));
      });

      promise.fail(() => {
        var f1 = 1;
      });

      promise.always(() => {
        dispatch(baseActions.fetching({ property: 'status', fetching: false }));
      });
    };
  },

  [types.FETCH_HEALTH]: createFetchCollectionHandler('health', '/health'),
  [types.FETCH_DISK_SPACE]: createFetchCollectionHandler('diskSpace', '/diskspace'),
  [types.FETCH_TASKS]: createFetchCollectionHandler('tasks', '/system/task'),
  [types.FETCH_BACKUPS]: createFetchCollectionHandler('backups', '/system/backup'),
  [types.FETCH_UPDATES]: createFetchCollectionHandler('updates', '/update')
};

export default systemActionHandlers;