import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import createFetchingReducer from './createFetchingReducer';
import createFetchingCollectionReducer from './createFetchingCollectionReducer';
import createUpdateReducer from './createUpdateReducer';
import createUpdateCollectionReducer from './createUpdateCollectionReducer';
import createUpdateServerSideCollectionReducer from './createUpdateServerSideCollectionReducer';
import createSetServerSideCollectionPageReducer from './createSetServerSideCollectionPageReducer';
import createSetServerSideCollectionSortReducer from './createSetServerSideCollectionSortReducer';
import createSetServerSideCollectionFilterReducer from './createSetServerSideCollectionFilterReducer';
import createCollectionReducers from './createCollectionReducers';

const defaultState = {
  fetchingStatus: false,
  statusError: null,
  status: {},

  health: {
    fetching: false,
    error: null,
    items: []
  },

  diskSpace: {
    fetching: false,
    error: null,
    items: []
  },

  tasks: {
    fetching: false,
    error: null,
    items: []
  },

  backups: {
    fetching: false,
    error: null,
    items: []
  },

  updates: {
    fetching: false,
    error: null,
    items: []
  },

  logs: {
    fetching: false,
    pageSize: 50,
    sortKey: 'time',
    sortDirection: 'descending',
    error: null,
    items: []
  },

  logFiles: {
    fetching: false,
    error: null,
    items: []
  }
};

const collectionNames = [
  'health',
  'diskSpace',
  'tasks',
  'backups',
  'updates',
  'logFiles'
];

const serverSideCollectionNames = [
  'logs'
];

const systemReducers = handleActions({

  [types.FETCHING]: createFetchingReducer('status'),
  [types.FETCHING_COLLECTION]: createCollectionReducers(collectionNames, createFetchingCollectionReducer),
  [types.UPDATE]: createUpdateReducer('status'),
  [types.UPDATE_COLLECTION]: createCollectionReducers(collectionNames, createUpdateCollectionReducer),
  [types.UPDATE_SERVER_SIDE_COLLECTION]: createCollectionReducers(serverSideCollectionNames, createUpdateServerSideCollectionReducer),
  [types.SET_SERVER_SIDE_COLLECTION_PAGE]: createCollectionReducers(serverSideCollectionNames, createSetServerSideCollectionPageReducer),
  [types.SET_SERVER_SIDE_COLLECTION_SORT]: createCollectionReducers(serverSideCollectionNames, createSetServerSideCollectionSortReducer),
  [types.SET_SERVER_SIDE_COLLECTION_FILTER]: createCollectionReducers(serverSideCollectionNames, createSetServerSideCollectionFilterReducer)

}, defaultState);

export default systemReducers;
