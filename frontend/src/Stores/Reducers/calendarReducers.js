import { handleActions } from 'redux-actions';
import getSectionState from 'Utilities/State/getSectionState';
import updateSectionState from 'Utilities/State/updateSectionState';
import * as types from 'Stores/Actions/actionTypes';
import createSetReducer from './Creators/createSetReducer';
import createUpdateReducer from './Creators/createUpdateReducer';
import createUpdateItemReducer from './Creators/createUpdateItemReducer';

export const defaultState = {
  fetching: false,
  populated: false,
  start: null,
  end: null,
  dates: [],
  view: 'week',
  unmonitored: false,
  showUpcoming: true,
  error: null,
  items: []
};

export const persistState = [
  'calendar.view',
  'calendar.unmonitored',
  'calendar.showUpcoming'
];

const section = 'calendar';

const calendarReducers = handleActions({

  [types.SET]: createSetReducer(section),
  [types.UPDATE]: createUpdateReducer(section),
  [types.UPDATE_ITEM]: createUpdateItemReducer(section),

  [types.CLEAR_CALENDAR]: (state) => {
    const {
      view,
      unmonitored,
      showUpcoming,
      ...otherDefaultState
    } = defaultState;

    return Object.assign({}, state, otherDefaultState);
  }

}, defaultState);

export default calendarReducers;
