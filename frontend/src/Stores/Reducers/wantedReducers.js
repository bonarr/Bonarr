import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import createSetReducer from './Creators/createSetReducer';
import createUpdateReducer from './Creators/createUpdateReducer';
import createUpdateServerSideCollectionReducer from './Creators/createUpdateServerSideCollectionReducer';
import createReducers from './Creators/createReducers';

export const defaultState = {
  missing: {
    fetching: false,
    populated: false,
    pageSize: 20,
    sortKey: 'airDateUtc',
    sortDirection: 'descending',
    filterKey: 'monitored',
    filterValue: true,
    error: null,
    items: []
  }
};

export const persistState = [
  'wanted.missing.sortKey',
  'wanted.missing.sortDirection',
  'wanted.missing.filterKey',
  'wanted.missing.filterValue'
];

const serverSideCollectionNames = [
  'missing'
];

const wantedReducers = handleActions({

  [types.SET]: createReducers(serverSideCollectionNames, createSetReducer),
  [types.UPDATE]: createReducers(serverSideCollectionNames, createUpdateReducer),
  [types.UPDATE_SERVER_SIDE_COLLECTION]: createReducers(serverSideCollectionNames, createUpdateServerSideCollectionReducer)

}, defaultState);

export default wantedReducers;
