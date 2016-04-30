const vent = require('vent');
// const radio = require('radio').channel('signalR');
require('signalR');

// const radio = require('radio');
// const signalRChannel = radio.channel('signalR');

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

function AsSignalRCollection() {
  const originalConstructor = this.constructor;
  this.bindOptions = this.bindOptions || {};
  this.constructor = function() {
    if (originalConstructor) {
      originalConstructor.apply(this, arguments);
    }

    const resourceName = this.url.replace(/^\//, '');
    this.listenTo(vent, `server:${resourceName}`, processMessage, this);

    return this;
  };
}

module.exports = AsSignalRCollection;
