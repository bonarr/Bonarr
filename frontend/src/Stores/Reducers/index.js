import { combineReducers } from 'redux';
import queue, { defaultState as defaultQueueState } from './queueReducers';
import episodeFiles, { defaultState as defaultEpisodeFilesState } from './episodeFileReducers';
import wanted, { defaultState as defaultWantedState } from './wantedReducers';
import settings, { defaultState as defaultSettingsState } from './settingsReducers';
import system, { defaultState as defaultSystemState } from './systemReducers';
import commands, { defaultState as defaultCommandsState } from './commandReducers';
import paths, { defaultState as defaultPathsState } from './pathReducers';
import languages, { defaultState as defaultLanguagesState } from './languageReducers';
import tags, { defaultState as defaultTagsState } from './tagReducers';
import captcha, { defaultState as defaultCaptchaState } from './captchaReducers';
import oAuth, { defaultState as defaultOAuthState } from './oAuthReducers';

export const defaultState = {
  queue: defaultQueueState,
  episodeFiles: defaultEpisodeFilesState,
  wanted: defaultWantedState,
  settings: defaultSettingsState,
  system: defaultSystemState,
  commands: defaultCommandsState,
  paths: defaultPathsState,
  languages: defaultLanguagesState,
  tags: defaultTagsState,
  captcha: defaultCaptchaState,
  oAuth: defaultOAuthState
};

export default combineReducers({
  queue,
  episodeFiles,
  wanted,
  settings,
  system,
  commands,
  paths,
  languages,
  tags,
  captcha,
  oAuth
});
