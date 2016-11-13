import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import createSetReducer from './Creators/createSetReducer';

export const defaultState = {
  currentPath: '',
  populated: false,
  fetching: false,
  error: null,
  directories: [],
  files: [],
  parent: null
};

const reducerSection = 'paths';

const pathReducers = handleActions({

  [types.SET]: createSetReducer(reducerSection),

  [types.UPDATE_PATHS]: (state, { payload }) => {
    const newState = Object.assign({}, state);

    newState.currentPath = payload.path;
    newState.directories = payload.directories;
    newState.files = payload.files;
    newState.parent = payload.parent;

    return newState;
  },

  [types.CLEAR_PATHS]: (state, { payload }) => {
    const newState = Object.assign({}, state);

    newState.path = '';
    newState.directories = [];
    newState.files = [];
    newState.parent = '';

    return newState;
  }

}, defaultState);

export default pathReducers;
