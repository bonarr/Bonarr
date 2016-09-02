import $ from 'jquery';
import * as types from './actionTypes';
import { fetching, setError } from './baseActions';
import { updatePaths } from './pathActions';

const section = 'paths';

const pathActionHandlers = {
  [types.FETCH_PATHS](payload) {
    return (dispatch, getState) => {
      dispatch(fetching({ section, fetching: true }));

      const promise = $.ajax({
        url: '/filesystem',
        data: {
          path: payload.path
        }
      });

      promise.done((data) => {
        dispatch(updatePaths({ path: payload.path, ...data }));
        dispatch(setError({ section, error: null }));
      });

      promise.fail((xhr) => {
        dispatch(setError({ section, error: xhr }));
      });

      promise.always(() => {
        dispatch(fetching({ section, fetching: false }));
      });
    };
  }
};

export default pathActionHandlers;
