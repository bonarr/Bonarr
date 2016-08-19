import _ from 'underscore';
import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import createFetchingCollectionReducer from './Creators/createFetchingCollectionReducer';
import createSetCollectionErrorReducer from './Creators/createSetCollectionErrorReducer';
import createUpdateCollectionReducer from './Creators/createUpdateCollectionReducer';

const defaultState = {
  fetching: false,
  items: [],
  handlers: {}
};

const reducerCollection = 'commands';

const commandReducers = handleActions({

  [types.FETCHING_COLLECTION]: createFetchingCollectionReducer(reducerCollection),
  [types.SET_COLLECTION_ERROR]: createSetCollectionErrorReducer(reducerCollection),
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

  [types.REMOVE_COMMAND]: (state, { payload }) => {
    const newState = Object.assign({}, state);

    const index = _.findIndex(newState.items, { id: payload.id });

    if (index > -1) {
      newState.items.splice(index, 1);
    }

    return newState;
  },

  [types.REGISTER_FINISH_COMMAND_HANDLER]: (state, { payload }) => {
    const newState = Object.assign({}, state);

    newState.handlers[payload.key] = {
      name: payload.name,
      handler: payload.handler
    };

    return newState;
  },

  [types.UNREGISTER_FINISH_COMMAND_HANDLER]: (state, { payload }) => {
    const newState = Object.assign({}, state);
    delete newState.handlers[payload.key];

    return newState;
  }

}, defaultState);

export default commandReducers;
