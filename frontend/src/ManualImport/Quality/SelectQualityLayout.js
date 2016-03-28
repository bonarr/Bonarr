var _ = require('underscore');
var Marionette = require('marionette');
var LoadingView = require('Shared/LoadingView');
var ProfileSchemaCollection = require('../../Settings/Profile/ProfileSchemaCollection');
var SelectQualityView = require('./SelectQualityView');

module.exports = Marionette.LayoutView.extend({
  template: 'ManualImport/Quality/SelectQualityLayoutTemplate',

  regions: {
    quality: '.x-quality'
  },

  events: {
    'click .x-select': '_selectQuality'
  },

  initialize() {
    this.profileSchemaCollection = new ProfileSchemaCollection();
    this.profileSchemaCollection.fetch();

    this.listenTo(this.profileSchemaCollection, 'sync', this._showQuality);
  },

  onRender() {
    this.quality.show(new LoadingView());
  },

  _showQuality() {
    var qualities = _.map(this.profileSchemaCollection.first().get('items'), function(quality) {
      return quality.quality;
    });

    this.selectQualityView = new SelectQualityView({ qualities: qualities });
    this.quality.show(this.selectQualityView);
  },

  _selectQuality() {
    this.trigger('manualimport:selected:quality', { quality: this.selectQualityView.selectedQuality() });
    this.close();
  }
});
