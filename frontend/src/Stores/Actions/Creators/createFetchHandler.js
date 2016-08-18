import $ from 'jquery';
import { fetching, update, setError } from '../baseActions';

function createFetchHandler(property, url) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(fetching({ property, fetching: true }));

      const promise = $.ajax({
        url
      });

      promise.done((data) => {
        dispatch(update({ property, data }));
        dispatch(setError({ property, error: null }));
      });

      promise.fail((xhr) => {
        dispatch(setError({ property, error: xhr }));
      });

      promise.always(() => {
        dispatch(fetching({ property, fetching: false }));
      });
    };
  };
}

export default createFetchHandler;
