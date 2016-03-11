var _ = require('underscore');
var vent = require('vent');
var Backbone = require('backbone');
var Marionette = require('marionette');
var CommandController = require('Commands/CommandController');
var template = require('./OrganizeFilesView.hbs');

module.exports = Marionette.ItemView.extend({
  template: template,

  events: {
    'click .x-confirm-organize': '_organize'
  },

  initialize(options) {
    this.series = options.series;
    this.templateHelpers = {
      numberOfSeries: this.series.length,
      series: new Backbone.Collection(this.series).toJSON()
    };
  },

  _organize() {
    var seriesIds = _.pluck(this.series, 'id');

    CommandController.execute('renameSeries', {
      name: 'renameSeries',
      seriesIds: seriesIds
    });

    this.trigger('organizingFiles');
    vent.trigger(vent.Commands.CloseFullscreenModal);
  }
});
