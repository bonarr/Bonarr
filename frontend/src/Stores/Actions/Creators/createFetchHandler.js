import $ from 'jquery';
import { fetching, update, setError } from '../baseActions';

function createFetchHandler(section, url) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(fetching({ section, fetching: true }));

      const promise = $.ajax({
        url
      });

      promise.done((data) => {
        dispatch(update({ section, data }));
        dispatch(setError({ section, error: null }));
      });

      promise.fail((xhr) => {
        dispatch(setError({ section, error: xhr }));
      });

      promise.always(() => {
        dispatch(fetching({ section, fetching: false }));
      });
    };
  };
}

export default createFetchHandler;
