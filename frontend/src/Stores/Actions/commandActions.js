import { createAction } from 'redux-actions';
import * as types from './actionTypes';
import commandActionHandlers from './commandActionHandlers';

export const fetchCommands = commandActionHandlers[types.FETCH_COMMANDS];
export const executeCommand = commandActionHandlers[types.EXECUTE_COMMAND];
export const addCommand = createAction(types.ADD_COMMAND);
export const updateCommand = createAction(types.UPDATE_COMMAND);
export const finishCommand = createAction(types.FINISH_COMMAND);
