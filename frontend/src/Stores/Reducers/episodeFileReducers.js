import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import createSetReducer from './Creators/createSetReducer';
import createUpdateReducer from './Creators/createUpdateReducer';

export const defaultState = {
  fetching: false,
  populated: false,
  error: null,
  items: []
};

const reducerSection = 'episodeFiles';

const episodeFileReducers = handleActions({

  [types.SET]: createSetReducer(reducerSection),
  [types.UPDATE]: createUpdateReducer(reducerSection),

  [types.CLEAR_EPISODE_FILES]: (state) => {
    return Object.assign({}, state, defaultState);
  }

}, defaultState);

export default episodeFileReducers;
