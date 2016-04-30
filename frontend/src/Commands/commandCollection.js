const Backbone = require('backbone');
const CommandModel = require('./CommandModel');
const asSignalRCollection = require('Mixins/Collection/asSignalRCollection');

const CommandCollection = Backbone.Collection.extend({
  url: '/command',
  model: CommandModel,

  findCommand(command) {
    return this.findWhere((model) => model.isSameCommand(command));
  }
});

asSignalRCollection.apply(CommandCollection.prototype);

const commandCollection = new CommandCollection();

commandCollection.fetch();

module.exports = commandCollection;
