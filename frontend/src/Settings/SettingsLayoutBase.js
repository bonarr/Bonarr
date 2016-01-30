var $ = require('jquery');
var _ = require('underscore');
var vent = require('vent');
var Marionette = require('marionette');
var Config = require('Config');

module.exports = Marionette.Layout.extend({
  initialize(options) {
    if (options.action) {
      this.action = options.action.toLowerCase();
    }

    this.listenTo(vent, vent.Hotkeys.SaveSettings, this._save);
    this._showActionBar();
    this._setAdvancedSettingsState();
  },

  _save() {
    vent.trigger(vent.Commands.SaveSettings);
  },

  _setAdvancedSettingsState() {
    var advanced = Config.getValueBoolean(Config.Keys.AdvancedSettings);

    if (advanced) {
      $('body').addClass('show-advanced-settings');
    }
  },

  _toggleAdvancedSettings() {
    var advanced = Config.getValueBoolean(Config.Keys.AdvancedSettings);
    Config.setValue(Config.Keys.AdvancedSettings, !advanced);

    if (advanced) {
      $('body').removeClass('show-advanced-settings');
    } else {
      $('body').addClass('show-advanced-settings');
    }
  },

  _showActionBar() {
    var actions = {
      items: [
        {
          tooltip: 'Save',
          icon: 'icon-sonarr-save',
          callback: this._save
        },
        {
          tooltip: 'Advanced Settings',
          icon: 'icon-sonarr-advanced-settings',
          callback: this._toggleAdvancedSettings
        }
      ]
    };

    vent.trigger(vent.Commands.OpenActionBarCommand, {
      parentView: this,
      actions: actions
    });
  }
});