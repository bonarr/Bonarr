import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import createFetchingReducer from './Creators/createFetchingReducer';
import createUpdateReducer from './Creators/createUpdateReducer';
import createUpdateServerSideCollectionReducer from './Creators/createUpdateServerSideCollectionReducer';
import createSetErrorReducer from './Creators/createSetErrorReducer';
import createSetServerSideCollectionPageReducer from './Creators/createSetServerSideCollectionPageReducer';
import createSetServerSideCollectionSortReducer from './Creators/createSetServerSideCollectionSortReducer';
import createSetServerSideCollectionFilterReducer from './Creators/createSetServerSideCollectionFilterReducer';
import createReducers from './Creators/createReducers';

const defaultState = {
  status: {
    fetching: false,
    error: null,
    item: {}
  },

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
  },

  updateLogFiles: {
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
  'logFiles',
  'updateLogFiles'
];

const serverSideCollectionNames = [
  'logs'
];

const systemReducers = handleActions({

  [types.FETCHING]: createReducers(['status', ...collectionNames, ...serverSideCollectionNames], createFetchingReducer),
  [types.SET_ERROR]: createReducers(['status', ...collectionNames, ...serverSideCollectionNames], createSetErrorReducer),
  [types.UPDATE]: createReducers(['status', ...collectionNames, ...serverSideCollectionNames], createUpdateReducer),
  [types.UPDATE_SERVER_SIDE_COLLECTION]: createReducers(serverSideCollectionNames, createUpdateServerSideCollectionReducer),
  [types.SET_SERVER_SIDE_COLLECTION_PAGE]: createReducers(serverSideCollectionNames, createSetServerSideCollectionPageReducer),
  [types.SET_SERVER_SIDE_COLLECTION_SORT]: createReducers(serverSideCollectionNames, createSetServerSideCollectionSortReducer),
  [types.SET_SERVER_SIDE_COLLECTION_FILTER]: createReducers(serverSideCollectionNames, createSetServerSideCollectionFilterReducer)

}, defaultState);

export default systemReducers;
