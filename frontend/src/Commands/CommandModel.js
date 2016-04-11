const _ = require('underscore');
const Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  url: '/command',

  initialize() {
    this.listenTo(this, 'request', this.onRequest);
  },

  parse(response) {
    response.name = response.name.toLocaleLowerCase();
    response.body.name = response.body.name.toLocaleLowerCase();

    for (const key in response.body) {
      response[key] = response.body[key];
    }

    delete response.body;

    return response;
  },

  isSameCommand(command) {
    if (command.name.toLocaleLowerCase() !== this.get('name').toLocaleLowerCase()) {
      return false;
    }

    for (const key in command) {
      if (key !== 'name') {
        const value = command[key];
        if (Array.isArray(value)) {
          if (_.difference(value, this.get(key)).length > 0) {
            return false;
          }
        } else if (value !== this.get(key)) {
          return false;
        }
      }
    }

    return true;
  },

  isActive() {
    const status = this.get('status');
    return status !== 'completed' && status !== 'failed';
  },

  isComplete() {
    return this.get('status') === 'completed';
  },

  isFailed() {
    return this.get('status') === 'failed';
  },

  onRequest(model, promise) {
    this.promise = promise;
  }
});
