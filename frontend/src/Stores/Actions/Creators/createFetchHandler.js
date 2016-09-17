import $ from 'jquery';
import { set, update } from '../baseActions';

function createFetchHandler(section, url) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(set({ section, fetching: true }));

      const promise = $.ajax({
        url
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
  };
}

export default createFetchHandler;
