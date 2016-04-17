const vent = require('vent');
const _ = require('underscore');
const Backbone = require('backbone');

require('signalR');

module.exports = _.extend(Backbone.Collection.prototype, {
  bindSignalR(bindOptions = {}) {
    const resourceName = this.url.replace(/^\//, '');

    function processMessage(message) {
      const action = message.action;
      const resource = message.resource;

      if (action === 'sync') {
        this.fetch();
        return;
      }

      const id = resource.id;
      const model = this.get(id);

      if (action === 'deleted') {
        if (model) {
          this.remove(model);
        }
        return;
      } else if (action === 'updated') {
        if (model) {
          model.set(resource);
        } else if (!bindOptions.updateOnly) {
          this.create(resource);
        }
        return;
      } else if (action === 'created') {
        this.create(resource);
        return;
      }
    }

    this.listenTo(vent, `server:${resourceName}`, processMessage, this);

    return this;
  }
});
