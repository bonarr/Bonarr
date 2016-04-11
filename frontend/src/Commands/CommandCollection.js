const Backbone = require('backbone');
const CommandModel = require('./CommandModel');
require('Mixins/backbone.signalr.mixin');

const CommandCollection = Backbone.Collection.extend({
  url: '/command',
  model: CommandModel,

  findCommand(command) {
    return this.findWhere((model) => model.isSameCommand(command));
  }
});

const collection = new CommandCollection().bindSignalR();

collection.fetch();

module.exports = collection;
