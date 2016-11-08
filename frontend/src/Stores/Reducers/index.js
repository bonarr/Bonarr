import { combineReducers } from 'redux';
import settings, { defaultState as defaultSettingsState } from './settingsReducers';
import system, { defaultState as defaultSystemState } from './systemReducers';
import commands, { defaultState as defaultCommandsState } from './commandReducers';
import paths, { defaultState as defaultPathsState } from './pathReducers';
import languages, { defaultState as defaultLanguagesState } from './languageReducers';
import tags, { defaultState as defaultTagsState } from './tagReducers';
import captcha, { defaultState as defaultCaptchaState } from './captchaReducers';

export const defaultState = {
  settings: defaultSettingsState,
  system: defaultSystemState,
  commands: defaultCommandsState,
  paths: defaultPathsState,
  languages: defaultLanguagesState,
  tags: defaultTagsState,
  captcha: defaultCaptchaState
};

export default combineReducers({
  settings,
  system,
  commands,
  paths,
  languages,
  tags,
  captcha
});
