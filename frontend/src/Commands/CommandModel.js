var _ = require('underscore');
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  url: window.Sonarr.ApiRoot + '/command',

  parse(response) {
    response.name = response.name.toLocaleLowerCase();
    response.body.name = response.body.name.toLocaleLowerCase();

    for (var key in response.body) {
      response[key] = response.body[key];
    }

    delete response.body;

    return response;
  },

  isSameCommand(command) {
    if (command.name.toLocaleLowerCase() !== this.get('name').toLocaleLowerCase()) {
      return false;
    }

    for (var key in command) {
      if (key !== 'name') {
        if (Array.isArray(command[key])) {
          if (_.difference(command[key], this.get(key)).length > 0) {
            return false;
          }
        } else if (command[key] !== this.get(key)) {
          return false;
        }
      }
    }

    return true;
  },

  isActive() {
    return this.get('status') !== 'completed' && this.get('status') !== 'failed';
  },

  isComplete() {
    return this.get('status') === 'completed';
  },

  isFailed() {
    return this.get('status') === 'failed';
  }
});