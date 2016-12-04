import { createAction } from 'redux-actions';
import * as types from './actionTypes';
import episodeActionHandlers from './episodeActionHandlers';

export const fetchEpisodes = episodeActionHandlers[types.FETCH_EPISODES];
export const setEpisodesSort = episodeActionHandlers[types.SET_EPISODES_SORT];
export const clearEpisodes = createAction(types.CLEAR_EPISODES);
