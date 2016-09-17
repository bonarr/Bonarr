import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import createSetReducer from './Creators/createSetReducer';
import createUpdateReducer from './Creators/createUpdateReducer';
import createUpdateServerSideCollectionReducer from './Creators/createUpdateServerSideCollectionReducer';
import createReducers from './Creators/createReducers';

const defaultState = {
  status: {
    fetching: false,
    populated: false,
    error: null,
    item: {}
  },

  health: {
    fetching: false,
    populated: false,
    error: null,
    items: []
  },

  diskSpace: {
    fetching: false,
    populated: false,
    error: null,
    items: []
  },

  tasks: {
    fetching: false,
    populated: false,
    error: null,
    items: []
  },

  backups: {
    fetching: false,
    populated: false,
    error: null,
    items: []
  },

  updates: {
    fetching: false,
    populated: false,
    error: null,
    items: []
  },

  logs: {
    fetching: false,
    populated: false,
    pageSize: 50,
    sortKey: 'time',
    sortDirection: 'descending',
    error: null,
    items: []
  },

  logFiles: {
    fetching: false,
    populated: false,
    error: null,
    items: []
  },

  updateLogFiles: {
    fetching: false,
    populated: false,
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

  [types.SET]: createReducers(['status', ...collectionNames, ...serverSideCollectionNames], createSetReducer),
  [types.UPDATE]: createReducers(['status', ...collectionNames, ...serverSideCollectionNames], createUpdateReducer),
  [types.UPDATE_SERVER_SIDE_COLLECTION]: createReducers(serverSideCollectionNames, createUpdateServerSideCollectionReducer)

}, defaultState);

export default systemReducers;
