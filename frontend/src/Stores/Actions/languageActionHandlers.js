import * as types from './actionTypes';
import createFetchHandler from './Creators/createFetchHandler';

const languageActionHandlers = {
  [types.FETCH_LANGUAGES]: createFetchHandler('languages', '/language')
};

export default languageActionHandlers;
