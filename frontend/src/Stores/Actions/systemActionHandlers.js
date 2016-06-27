import $ from 'jquery';
import * as types from './actionTypes';
import * as baseActions from './baseActions';

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

  [types.FETCH_HEALTH](payload) {
    return (dispatch, getState) => {
      dispatch(baseActions.fetchingCollection({ collection: 'health', fetching: true }));

      const promise = $.ajax({
        url: '/health'
      });

      promise.done((data) => {
        dispatch(baseActions.updateCollection({ collection: 'health', data }));

      });

      promise.fail(() => {
        var f1 = 1;
      });

      promise.always(() => {
        dispatch(baseActions.fetchingCollection({ collection: 'health', fetching: false }));
      });
    };
  },

  [types.FETCH_DISK_SPACE](payload) {
    return (dispatch, getState) => {
      dispatch(baseActions.fetchingCollection({ collection: 'diskSpace', fetching: true }));

      const promise = $.ajax({
        url: '/diskspace'
      });

      promise.done((data) => {
        dispatch(baseActions.updateCollection({ collection: 'diskSpace', data }));

      });

      promise.fail(() => {
        var f1 = 1;
      });

      promise.always(() => {
        dispatch(baseActions.fetchingCollection({ collection: 'diskSpace', fetching: false }));
      });
    };
  },

  [types.FETCH_TASKS](payload) {
    return (dispatch, getState) => {
      dispatch(baseActions.fetchingCollection({ collection: 'tasks', fetching: true }));

      const promise = $.ajax({
        url: '/system/task'
      });

      promise.done((data) => {
        dispatch(baseActions.updateCollection({ collection: 'tasks', data }));

      });

      promise.fail(() => {
        var f1 = 1;
      });

      promise.always(() => {
        dispatch(baseActions.fetchingCollection({ collection: 'tasks', fetching: false }));
      });
    };
  }
};

export default systemActionHandlers;