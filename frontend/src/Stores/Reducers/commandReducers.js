import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import createFetchingCollectionReducer from './createFetchingCollectionReducer';
import createUpdateCollectionReducer from './createUpdateCollectionReducer';

const defaultState = {
  fetching: false,
  items: {}
};

const reducerCollection = 'commands';

const commandReducers = handleActions({

  [types.FETCHING_COLLECTION]: createFetchingCollectionReducer(reducerCollection),
  [types.UPDATE_COLLECTION]: createUpdateCollectionReducer(reducerCollection)

}, defaultState);

export default commandReducers;
