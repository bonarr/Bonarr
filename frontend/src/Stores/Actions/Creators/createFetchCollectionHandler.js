import $ from 'jquery';
import { fetchingCollection, updateCollection, setCollectionError } from '../baseActions';

function createFetchCollectionHandler(collection, url) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(fetchingCollection({ collection, fetching: true }));

      const promise = $.ajax({
        url
      });

      promise.done((data) => {
        dispatch(updateCollection({ collection, data }));
        dispatch(setCollectionError({ collection, error: null }));
      });

      promise.fail((xhr) => {
        dispatch(setCollectionError({ collection, error: xhr }));
      });

      promise.always(() => {
        dispatch(fetchingCollection({ collection, fetching: false }));
      });
    };
  };
}

export default createFetchCollectionHandler;
