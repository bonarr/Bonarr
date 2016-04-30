const vent = require('vent');
require('signalR');

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
    } else if (!this.bindOptions.updateOnly) {
      this.create(resource);
    }
    return;
  } else if (action === 'created') {
    this.create(resource);
    return;
  }
}

function asSignalRCollection() {
  const originalInit = this.initialize;
  this.bindOptions = this.bindOptions || {};
  this.initialize = function() {
    if (originalInit) {
      originalInit.apply(this, arguments);
    }

    const resourceName = this.url.replace(/^\//, '');
    this.listenTo(vent, `server:${resourceName}`, processMessage, this);

    return this;
  };
}

module.exports = asSignalRCollection;
