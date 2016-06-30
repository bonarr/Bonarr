import _ from 'underscore';
import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import createFetchingCollectionReducer from './createFetchingCollectionReducer';
import createUpdateCollectionReducer from './createUpdateCollectionReducer';

const defaultState = {
  fetching: false,
  items: []
};

const reducerCollection = 'commands';

const commandReducers = handleActions({

  [types.FETCHING_COLLECTION]: createFetchingCollectionReducer(reducerCollection),
  [types.UPDATE_COLLECTION]: createUpdateCollectionReducer(reducerCollection),
  [types.ADD_COMMAND]: (state, { payload }) => {
    const newState = Object.assign({}, state);

    newState.items.push(payload);

    return newState;
  },
  [types.UPDATE_COMMAND]: (state, { payload }) => {
    const newState = Object.assign({}, state);
    const index = _.findIndex(newState.items, { id: payload.id });

    if (index > -1) {
      newState.items[index] = payload;
    } else {
      newState.items.push(payload);
    }

    return newState;
  },
  [types.FINISH_COMMAND]: (state, { payload }) => {
    const newState = Object.assign({}, state);

    const index = _.findIndex(newState.items, { id: payload.id });

    if (index > -1) {
      newState.items.splice(index, 1);
    }

    return newState;
  }

}, defaultState);

export default commandReducers;
