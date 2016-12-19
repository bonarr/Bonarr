import moment from 'moment';
import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import { filterTypes, sortDirections } from 'Helpers/Props';
import createSetReducer from './Creators/createSetReducer';
import createSetClientSideCollectionSortReducer from './Creators/createSetClientSideCollectionSortReducer';
import createSetClientSideCollectionFilterReducer from './Creators/createSetClientSideCollectionFilterReducer';

export const defaultState = {
  sortKey: 'sortTitle',
  sortDirection: sortDirections.ASCENDING,
  filterKey: null,
  filterValue: null,
  filterType: filterTypes.EQUAL,
  view: 'table',

  sortPredicates: {
    network: function(item) {
      return item.network.toLowerCase();
    },

    nextAiring: function(item, direction) {
      const nextAiring = item.nextAiring;

      if (nextAiring) {
        return moment(nextAiring).unix();
      }

      if (direction === sortDirections.DESCENDING) {
        return 0;
      }

      return Number.MAX_VALUE;
    },

    episodeProgress: function(item) {
      const {
        episodeCount = 0,
        episodeFileCount
      } = item;

      const progress = episodeCount ? episodeFileCount / episodeCount * 100 : 100;

      return progress + episodeCount / 1000000;
    }
  },

  filterPredicates: {
    missing: function(item) {
      return item.episodeCount - item.episodeFileCount > 0;
    }
  }
};

export const persistState = [
  'seriesIndex.sortKey',
  'seriesIndex.sortDirection',
  'seriesIndex.filterKey',
  'seriesIndex.filterValue',
  'seriesIndex.filterType',
  'seriesIndex.view'
];

const reducerSection = 'seriesIndex';

const seriesIndexReducers = handleActions({

  [types.SET]: createSetReducer(reducerSection),

  [types.SET_SERIES_SORT]: createSetClientSideCollectionSortReducer(reducerSection),
  [types.SET_SERIES_FILTER]: createSetClientSideCollectionFilterReducer(reducerSection),

  [types.SET_SERIES_VIEW]: function(state, { payload }) {
    return Object.assign({}, state, { view: payload.view });
  }

}, defaultState);

export default seriesIndexReducers;
