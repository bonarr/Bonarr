import _ from 'lodash';
import $ from 'jquery';
import * as types from './actionTypes';
import { set, update, updateItem } from './baseActions';

const section = 'addSeries';

function monitorSeasons(seasons, startingSeason) {
  seasons.forEach((season) => {
    if (season.seasonNumber >= startingSeason) {
      season.monitored = true;
    } else {
      season.monitored = false;
    }
  });
}

function getNewSeries(series, payload) {
  const {
    rootFolder,
    monitor,
    qualityProfileId,
    seriesType,
    seasonFolder,
    searchForMissingEpisodes
  } = payload;

  series.monitored = true;
  series.qualityProfileId = qualityProfileId;
  series.rootFolderPath = rootFolder;
  series.seriesType = seriesType;
  series.seasonFolder = seasonFolder;

  const seasons = series.seasons;
  const firstSeason = _.min(_.reject(seasons, { seasonNumber: 0 }), 'seasonNumber').seasonNumber;
  const lastSeason = _.max(seasons, 'seasonNumber').seasonNumber;

  monitorSeasons(seasons, firstSeason);

  const options = {
    ignoreEpisodesWithFiles: false,
    ignoreEpisodesWithoutFiles: false,
    searchForMissingEpisodes
  };

  switch (monitor) {
    case 'future':
      options.ignoreEpisodesWithFiles = true;
      options.ignoreEpisodesWithoutFiles = true;
      break;
    case 'latest':
      monitorSeasons(seasons, lastSeason);
      break;
    case 'first':
      monitorSeasons(seasons, lastSeason + 1);
      _.find(seasons, { seasonNumber: firstSeason }).monitored = true;
      break;
    case 'missing':
      options.ignoreEpisodesWithFiles = true;
      break;
    case 'existing':
      options.ignoreEpisodesWithoutFiles = true;
      break;
    case 'none':
      monitorSeasons(seasons, lastSeason + 1);
      break;
    default:
      break;
  }

  series.addOptions = options;

  return series;
}

const addSeriesActionHandlers = {
  [types.LOOKUP_SERIES]: function(payload) {
    return function(dispatch, getState) {
      dispatch(set({ section, fetching: true }));

      const promise = $.ajax({
        url: '/series/lookup',
        data: {
          term: payload.term
        }
      });

      promise.done((data) => {
        dispatch(update({ section, data }));

        dispatch(set({
          section,
          fetching: false,
          populated: true,
          error: null
        }));
      });

      promise.fail((xhr) => {
        dispatch(set({
          section,
          fetching: false,
          populated: false,
          error: xhr
        }));
      });
    };
  },

  [types.ADD_SERIES]: function(payload) {
    return function(dispatch, getState) {
      dispatch(set({ section, adding: true }));

      const tvdbId = payload.tvdbId;
      const items = getState().addSeries.items;
      const newSeries = getNewSeries(_.cloneDeep(_.find(items, { tvdbId })), payload);

      const promise = $.ajax({
        url: '/series',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(newSeries)
      });

      promise.done((data) => {
        dispatch(updateItem({ section: 'series', ...data }));

        dispatch(set({
          section,
          adding: false,
          added: true,
          addError: null
        }));
      });

      promise.fail((xhr) => {
        dispatch(set({
          section,
          adding: false,
          added: false,
          addError: xhr
        }));
      });
    };
  }
};

export default addSeriesActionHandlers;
