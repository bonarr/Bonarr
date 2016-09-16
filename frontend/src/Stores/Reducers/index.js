import { combineReducers } from 'redux';
import settings from './settingsReducers';
import system from './systemReducers';
import commands from './commandReducers';
import paths from './pathReducers';
import languages from './languageReducers';

export default combineReducers({
  settings,
  system,
  commands,
  paths,
  languages
});
