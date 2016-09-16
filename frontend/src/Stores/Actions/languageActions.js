import * as types from './actionTypes';
import languageActionHandlers from './languageActionHandlers';

export const fetchLanguages = languageActionHandlers[types.FETCH_LANGUAGES];
