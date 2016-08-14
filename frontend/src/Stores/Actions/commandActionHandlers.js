import $ from 'jquery';
import isSameCommand from 'Utilities/isSameCommand';
import * as types from './actionTypes';
import createFetchCollectionHandler from './createFetchCollectionHandler';
import { addCommand, removeCommand } from './commandActions';

let lastCommand = null;
let lastCommandTimeout = null;

const commandActionHandlers = {
  [types.FETCH_COMMANDS]: createFetchCollectionHandler('commands', '/command'),

  [types.EXECUTE_COMMAND](payload) {
    return (dispatch, getState) => {
      // TODO: show a message for the user
      if (lastCommand && isSameCommand(lastCommand, payload)) {
        throw new Error('Please wait at least 5 seconds before running this command again');
      }

      lastCommand = payload;

      // clear last command after 5 seconds.
      if (lastCommandTimeout) {
        clearTimeout(lastCommandTimeout);
      }

      lastCommandTimeout = setTimeout(() => {
        lastCommand = null;
      }, 5000);

      const promise = $.ajax({
        url: '/command',
        method: 'POST',
        data: JSON.stringify(payload)
      });

      promise.done((data) => {
        dispatch(addCommand(data));
      });
    };
  },

  [types.FINISH_COMMAND](payload) {
    return (dispatch, getState) => {
      const state = getState();
      const handlers = state.commands.handlers;

      Object.keys(handlers).forEach((key) => {
        const handler = handlers[key];

        if (handler.name === payload.name) {
          dispatch(handler.handler(payload));
        }
      });

      dispatch(removeCommand(payload));
    };
  }

};

export default commandActionHandlers;
