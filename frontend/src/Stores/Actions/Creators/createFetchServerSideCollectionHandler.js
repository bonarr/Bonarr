import _ from 'underscore';
import $ from 'jquery';
import { fetching, updateServerSideCollection, setError } from '../baseActions';

function createFetchServerSideCollectionHandler(section, url, getFromState) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(fetching({ section, fetching: true }));

      const collectionState = getFromState(getState())[section];

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
        dispatch(updateServerSideCollection({ section, data: response }));
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

export default createFetchServerSideCollectionHandler;
