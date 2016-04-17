const _ = require('underscore');
const $ = require('jquery');
const vent = require('vent');
const CommandModel = require('./CommandModel');
const commandCollection = require('./commandCollection');
const CommandMessengerCollectionView = require('./CommandMessengerCollectionView');
const Messenger = require('Shared/Messenger');
require('jQuery/jquery.spin');

CommandMessengerCollectionView.render();

let lastCommand = null;

const CommandController = {

  execute(name, properties) {
    const attr = _.extend({ name: name.toLocaleLowerCase() }, properties);
    const commandModel = new CommandModel(attr);

    if (lastCommand && lastCommand.isSameCommand(attr)) {
      Messenger.show({
        message: 'Please wait at least 5 seconds before running this command again',
        hideAfter: 5,
        type: 'error'
      });

      return lastCommand.promise;
    }

    commandModel.deferred = $.Deferred();

    commandModel.save().success(() => {
      commandCollection.add(commandModel);

      commandModel.bind('change:status', (model) => {
        if (model.isComplete()) {
          commandModel.deferred.resolve(commandModel);
        } else if (model.isFailed()) {
          commandModel.deferred.reject(commandModel);
        }
      });
    });

    lastCommand = commandModel;

    // clear last command after 5 seconds.
    clearTimeout(this.lastCommandTimeout);
    this.lastCommandTimeout = setTimeout(() => {
      lastCommand = null;
    }, 5000);

    return commandModel.deferred.promise();
  },

  bindToCommand(options) {
    const existingCommand = commandCollection.findCommand(options.command);

    if (existingCommand) {
      this._bindToCommandModel(existingCommand, options);
    }

    commandCollection.bind('add', (model) => {
      if (model.isSameCommand(options.command)) {
        this._bindToCommandModel(model, options);
      }
    });

    commandCollection.bind('sync', () => {
      const command = commandCollection.findCommand(options.command);
      if (command) {
        this._bindToCommandModel(command, options);
      }
    });
  },

  _bindToCommandModel(model, options) {
    if (!model.isActive()) {
      options.element.stopSpin();
      return;
    }

    model.bind('change:status', (model) => {
      if (model.isComplete() || model.isFailed()) {
        options.element.stopSpin();

        if (model.isComplete()) {
          vent.trigger(vent.Events.CommandComplete, {
            command: model,
            model: options.model
          });
        }
      }
    });

    options.element.startSpin();
  }
};

module.exports = CommandController;
