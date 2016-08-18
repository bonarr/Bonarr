import { combineReducers } from 'redux';
import settings from './settingsReducers';
import system from './systemReducers';
import commands from './commandReducers';

export default combineReducers({
  settings,
  system,
  commands
});
