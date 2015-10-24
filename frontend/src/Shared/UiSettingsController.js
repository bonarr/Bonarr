var $ = require('jquery');
var _ = require('underscore');
var UiSettingsModel = require('./UiSettingsModel');

var UiSettingsController = {
  appInitializer: function() {
    UiSettingsModel.on('sync', this._updateUiSettings);

    this._updateUiSettings();
  },

  _updateUiSettings: function() {
    if (UiSettingsModel.get('enableColorImpairedMode')) {
      $('body').addClass('color-impaired-mode');
    } else {
      $('body').removeClass('color-impaired-mode');
    }
  }
};

_.bindAll(UiSettingsController, 'appInitializer');

module.exports = UiSettingsController;