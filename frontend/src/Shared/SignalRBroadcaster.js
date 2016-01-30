var vent = require('vent');
var $ = require('jquery');
var Messenger = require('./Messenger');

require('signalR');

module.exports = {
  appInitializer() {
    console.log('starting signalR');

    var getStatus = function(status) {
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
          throw 'invalid status ' + status;
      }
    };

    var tryingToReconnect = false;
    var messengerId = 'signalR';

    this.signalRconnection = $.connection(`${window.Sonarr.UrlBase}/signalr`);

    this.signalRconnection.stateChanged(function(change) {
      console.debug(`SignalR: [${getStatus(change.newState)}]`);
    });

    this.signalRconnection.received(function(message) {
      vent.trigger('server:' + message.name, message.body);
    });

    this.signalRconnection.reconnecting(function() {
      if (window.Sonarr.unloading) {
        return;
      }

      tryingToReconnect = true;
    });

    this.signalRconnection.reconnected(function() {
      tryingToReconnect = false;
    });

    this.signalRconnection.disconnected(function() {
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

    return this;
  }
};
