var _ = require('underscore');
var $ = require('jquery');
var vent = require('vent');
var CommandModel = require('./CommandModel');
var CommandCollection = require('./CommandCollection');
var CommandMessengerCollectionView = require('./CommandMessengerCollectionView');
var moment = require('moment');
var Messenger = require('Shared/Messenger');
require('jQuery/jquery.spin');

CommandMessengerCollectionView.render();

const CommandController = {
  _lastCommand: {},

  execute(name, properties) {
    var attr = _.extend({ name: name.toLocaleLowerCase() }, properties);
    var commandModel = new CommandModel(attr);

    if (this._lastCommand.command && this._lastCommand.command.isSameCommand(attr) && moment().add('seconds', -5).isBefore(this._lastCommand.time)) {

      Messenger.show({
        message: 'Please wait at least 5 seconds before running this command again',
        hideAfter: 5,
        type: 'error'
      });

      return this._lastCommand.command.deferred.promise();
    }

    commandModel.deferred = $.Deferred();

    commandModel.save().success(() => {
      CommandCollection.add(commandModel);

      commandModel.bind('change:status', (model) => {
        if (model.isComplete()) {
          commandModel.deferred.resolve(commandModel);
        } else if (model.isFailed()) {
          commandModel.deferred.reject(commandModel);
        }
      });
    });

    this._lastCommand = {
      command: commandModel,
      time: moment()
    };

    return commandModel.deferred.promise();
  },

  bindToCommand(options) {
    var existingCommand = CommandCollection.findCommand(options.command);

    if (existingCommand) {
      this._bindToCommandModel.call(this, existingCommand, options);
    }

    CommandCollection.bind('add', (model) => {
      if (model.isSameCommand(options.command)) {
        this._bindToCommandModel.call(this, model, options);
      }
    });

    CommandCollection.bind('sync', () => {
      var command = CommandCollection.findCommand(options.command);
      if (command) {
        this._bindToCommandModel.call(this, command, options);
      }
    });
  },

  _bindToCommandModel: function bindToCommand(model, options) {
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
