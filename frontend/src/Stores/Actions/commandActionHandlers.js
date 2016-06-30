import $ from 'jquery';
import isSameCommand from 'Utilities/isSameCommand';
import * as types from './actionTypes';
import * as baseActions from './baseActions';
import { addCommand } from './commandActions';

let lastCommand = null;
let lastCommandTimeout = null;



const commandActionHandlers = {
  [types.FETCH_COMMANDS](payload) {
    return (dispatch, getState) => {
      dispatch(baseActions.fetchingCollection({ collection: 'commands', fetching: true }));

      const promise = $.ajax({
        url: '/command'
      });

      promise.done((data) => {
        dispatch(baseActions.updateCollection({ collection: 'commands', data }));

      });

      promise.fail(() => {
        var f1 = 1;
      });

      promise.always(() => {
        dispatch(baseActions.fetchingCollection({ collection: 'commands', fetching: false }));
      });
    };
  },

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
  }
};

export default commandActionHandlers;