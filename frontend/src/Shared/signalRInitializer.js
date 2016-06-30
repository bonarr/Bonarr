import $ from 'jquery';
import vent from 'vent';
import Messenger from 'Shared/Messenger';
import appStore from 'Stores/appStore';
import { updateCommand, finishCommand } from 'Stores/Actions/commandActions';

require('signalR');

const messengerId = 'signalR';

function getStatus(status) {
  switch (status) {
    case 0:
      return 'connecting';
    case 1:
      return 'connected';
    case 2:
      return 'reconnecting';
    case 4:
      return 'disconnected';
    default:
      throw new Error(`invalid status ${status}`);
  }
}

const handlers = {
  command(resource) {
    const state = resource.state;

    if (state === 'completed') {
      appStore.dispatch(finishCommand(resource));
    } else {
      appStore.dispatch(updateCommand(resource));
    }
  }
};

const signalRInitializer = {
  init() {
    console.log('starting signalR');

    let tryingToReconnect = false;

    this.signalRconnection = $.connection('/signalr');

    this.signalRconnection.stateChanged((change) => {
      console.log(`SignalR: [${getStatus(change.newState)}]`);
    });

    this.signalRconnection.received((message) => {
      console.debug('SignalR: received', message.name, message.body);
      vent.trigger(`server:${message.name}`, message.body);

      const handler = handlers[message.name];

      if (handler) {
        handler(message.body.resource);
      }
    });

    this.signalRconnection.reconnecting(() => {
      if (window.Sonarr.unloading) {
        return;
      }

      tryingToReconnect = true;
    });

    this.signalRconnection.reconnected(() => {
      tryingToReconnect = false;
    });

    this.signalRconnection.disconnected(() => {
      if (tryingToReconnect) {
        $('<div class="modal-backdrop fade in"></div>').appendTo(document.body);

        Messenger.show({
          id: messengerId,
          type: 'error',
          hideAfter: 0,
          message: 'Connection to backend lost',
          actions: {
            cancel: {
              label: 'Reload',
              action() {
                window.location.reload();
              }
            }
          }
        });
      }
    });

    this.signalRconnection.start({ transport: ['longPolling'] });
  }
};

export default signalRInitializer;
