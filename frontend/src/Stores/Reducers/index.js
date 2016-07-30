import { combineReducers } from 'redux';
import system from './systemReducers';
import commands from './commandReducers';

export default combineReducers({
  system,
  commands
});
