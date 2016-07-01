import * as baseActions from './baseActions';

const createFetchCollectionHandler = (collection, url) => {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(baseActions.fetchingCollection({ collection, fetching: true }));

      const promise = $.ajax({
        url
      });

      promise.done((data) => {
        dispatch(baseActions.updateCollection({ collection, data }));

      });

      // TODO: Set an error on the collection
      promise.fail(() => {
        var f1 = 1;
      });

      promise.always(() => {
        dispatch(baseActions.fetchingCollection({ collection, fetching: false }));
      });
    };
  }
};

export default createFetchCollectionHandler;