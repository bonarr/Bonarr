import { combineReducers } from 'redux';
import queue, { defaultState as defaultQueueState } from './queueReducers';
import blacklist, { defaultState as defaultBlacklistState } from './blacklistReducers';
import episodes, { defaultState as defaultEpisodesState } from './episodeReducers';
import episodeFiles, { defaultState as defaultEpisodeFilesState } from './episodeFileReducers';
import episodeHistory, { defaultState as defaultEpisodeHistoryState } from './episodeHistoryReducers';
import releases, { defaultState as defaultReleasesState } from './releaseReducers';
import wanted, { defaultState as defaultWantedState } from './wantedReducers';
import settings, { defaultState as defaultSettingsState } from './settingsReducers';
import system, { defaultState as defaultSystemState } from './systemReducers';
import commands, { defaultState as defaultCommandsState } from './commandReducers';
import paths, { defaultState as defaultPathsState } from './pathReducers';
import languages, { defaultState as defaultLanguagesState } from './languageReducers';
import tags, { defaultState as defaultTagsState } from './tagReducers';
import captcha, { defaultState as defaultCaptchaState } from './captchaReducers';
import oAuth, { defaultState as defaultOAuthState } from './oAuthReducers';
import manualImport, { defaultState as defaultManualImportState } from './manualImportReducers';

export const defaultState = {
  queue: defaultQueueState,
  blacklist: defaultBlacklistState,
  episodes: defaultEpisodesState,
  episodeFiles: defaultEpisodeFilesState,
  episodeHistory: defaultEpisodeHistoryState,
  releases: defaultReleasesState,
  wanted: defaultWantedState,
  settings: defaultSettingsState,
  system: defaultSystemState,
  commands: defaultCommandsState,
  paths: defaultPathsState,
  languages: defaultLanguagesState,
  tags: defaultTagsState,
  captcha: defaultCaptchaState,
  oAuth: defaultOAuthState,
  manualImport: defaultManualImportState
};

export default combineReducers({
  queue,
  blacklist,
  episodes,
  episodeFiles,
  episodeHistory,
  releases,
  wanted,
  settings,
  system,
  commands,
  paths,
  languages,
  tags,
  captcha,
  oAuth,
  manualImport
});
