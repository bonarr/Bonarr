import _ from 'underscore';
import $ from 'jquery';
import { set, updateServerSideCollection } from '../baseActions';

function createFetchServerSideCollectionHandler(section, url, getFromState) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(set({ section, fetching: true }));

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

export default createFetchServerSideCollectionHandler;
