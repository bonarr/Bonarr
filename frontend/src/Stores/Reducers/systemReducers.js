import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import createFetchingReducer from './createFetchingReducer';
import createFetchingCollectionReducer from './createFetchingCollectionReducer';
import createUpdateReducer from './createUpdateReducer';
import createUpdateCollectionReducer from './createUpdateCollectionReducer';
import createCollectionReducers from './createCollectionReducers';

const defaultState = {
  fetchingStatus: false,
  status: {},

  health: {
    fetching: false,
    items: []
  },

  diskSpace: {
    fetching: false,
    items: []
  },

  tasks: {
    fetching: false,
    items: []
  },

  backups: {
    fetching: false,
    items: []
  }
};

const collectionNames = [
  'health',
  'diskSpace',
  'tasks',
  'backups'
];

const systemReducers = handleActions({

  [types.FETCHING]: createFetchingReducer('status'),
  [types.FETCHING_COLLECTION]: createCollectionReducers(collectionNames, createFetchingCollectionReducer),
  [types.UPDATE]: createUpdateReducer('status'),
  [types.UPDATE_COLLECTION]: createCollectionReducers(collectionNames, createUpdateCollectionReducer)

}, defaultState);

export default systemReducers;
