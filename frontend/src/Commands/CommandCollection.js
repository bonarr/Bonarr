var Backbone = require('backbone');
var CommandModel = require('./CommandModel');
require('Mixins/backbone.signalr.mixin');

var CommandCollection = Backbone.Collection.extend({
  url: window.Sonarr.ApiRoot + '/command',
  model: CommandModel,

  findCommand(command) {
    return this.find(function(model) {
      return model.isSameCommand(command);
    });
  }
});

var collection = new CommandCollection().bindSignalR();

collection.fetch();

module.exports = collection;