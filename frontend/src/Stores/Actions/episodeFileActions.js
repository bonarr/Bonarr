import { createAction } from 'redux-actions';
import * as types from './actionTypes';
import episodeFileActionHandlers from './episodeFileActionHandlers';

export const fetchEpisodeFiles = episodeFileActionHandlers[types.FETCH_EPISODE_FILES];
export const clearEpisodeFiles = createAction(types.CLEAR_EPISODE_FILES);
