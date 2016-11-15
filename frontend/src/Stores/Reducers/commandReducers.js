import _ from 'underscore';
import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import createSetReducer from './Creators/createSetReducer';
import createUpdateReducer from './Creators/createUpdateReducer';

export const defaultState = {
  fetching: false,
  populated: false,
  error: null,
  items: [],
  handlers: {}
};

const reducerSection = 'commands';

const commandReducers = handleActions({

  [types.SET]: createSetReducer(reducerSection),
  [types.UPDATE]: createUpdateReducer(reducerSection),

  [types.ADD_COMMAND]: (state, { payload }) => {
    const newState = Object.assign({}, state);
    newState.items = [...state.items, payload];

    return newState;
  },

  [types.UPDATE_COMMAND]: (state, { payload }) => {
    const newState = Object.assign({}, state);
    const index = _.findIndex(newState.items, { id: payload.id });

    newState.items = [...state.items];

    if (index > -1) {
      newState.items[index] = payload;
    } else {
      newState.items.push(payload);
    }

    return newState;
  },

  [types.REMOVE_COMMAND]: (state, { payload }) => {
    const newState = Object.assign({}, state);
    newState.items = [...state.items];

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
