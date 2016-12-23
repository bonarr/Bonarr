import { combineReducers } from 'redux';
import addSeries, { defaultState as defaultAddSeriesState } from './addSeriesReducers';
import series, { defaultState as defaultSeriesState } from './seriesReducers';
import seriesIndex, { defaultState as defaultSeriesIndexState } from './seriesIndexReducers';
import calendar, { defaultState as defaultCalendarState } from './calendarReducers';
import history, { defaultState as defaultHistoryState } from './historyReducers';
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
import rootFolders, { defaultState as defaultRootFoldersState } from './rootFolderReducers';

export const defaultState = {
  addSeries: defaultAddSeriesState,
  series: defaultSeriesState,
  seriesIndex: defaultSeriesIndexState,
  calendar: defaultCalendarState,
  history: defaultHistoryState,
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
  manualImport: defaultManualImportState,
  rootFolders: defaultRootFoldersState
};

export default combineReducers({
  addSeries,
  series,
  seriesIndex,
  calendar,
  history,
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
  manualImport,
  rootFolders
});
