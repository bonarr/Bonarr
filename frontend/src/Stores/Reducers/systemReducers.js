import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import fetching from './fetching';
import fetchingCollection from './fetchingCollection';
import update from './update';
import updateCollection from './updateCollection';

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
  }
};

const systemReducers = handleActions({

  [types.FETCHING]: fetching,
  [types.FETCHING_COLLECTION]: fetchingCollection,
  [types.UPDATE]: update,
  [types.UPDATE_COLLECTION]: updateCollection

}, defaultState);

export default systemReducers;
