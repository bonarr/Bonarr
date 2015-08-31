var _ = require('underscore');
var SettingsLayoutBase = require('../SettingsLayoutBase');
var UiView = require('./UiView');
var UiSettingsModel = require('./UiSettingsModel');

module.exports = SettingsLayoutBase.extend({
  template: 'Settings/Ui/UiLayout',

  regions: {
    uiRegion: '#ui'
  },

  initialize: function() {
    this.model = new UiSettingsModel();
    SettingsLayoutBase.prototype.initialize.apply(this, arguments);
  },

  onRender: function() {
    var promise = this.model.fetch();

    promise.done(_.bind(function() {
      if (this.isClosed) {
        return;
      }

      this.uiRegion.show(new UiView({model: this.model}));
    }, this));
  }
});
