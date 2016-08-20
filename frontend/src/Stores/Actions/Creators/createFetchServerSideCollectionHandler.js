import _ from 'underscore';
import $ from 'jquery';
import { fetching, updateServerSideCollection, setError } from '../baseActions';

function createFetchServerSideCollectionHandler(collection, url, getFromState) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(fetching({ section: collection, fetching: true }));

      const collectionState = getFromState(getState())[collection];

      const data = Object.assign({ page: 1 },
        _.pick(collectionState, [
          'page',
          'pageSize',
          'sortDirection',
          'sortKey',
          'filterKey',
          'filterValue'
        ]));

      const promise = $.ajax({
        url,
        data
      });

      promise.done((response) => {
        dispatch(updateServerSideCollection({ collection, data: response }));
        dispatch(setError({ section: collection, error: null }));
      });

      promise.fail((xhr) => {
        dispatch(setError({ section: collection, error: xhr }));
      });

      promise.always(() => {
        dispatch(fetching({ section: collection, fetching: false }));
      });
    };
  };
}

export default createFetchServerSideCollectionHandler;
