var vent = require('vent');
var NzbDroneCell = require('./NzbDroneCell');
var CommandController = require('Commands/CommandController');

module.exports = NzbDroneCell.extend({
  className: 'series-actions-cell',

  ui: {
    refresh: '.x-refresh'
  },

  events: {
    'click .x-edit': '_editSeries',
    'click .x-refresh': '_refreshSeries'
  },

  render() {
    this.$el.empty();

    this.$el.html('<i class="icon-sonarr-refresh x-refresh hidden-xs" title="" data-original-title="Update series info and scan disk"></i> ' +
      '<i class="icon-sonarr-edit x-edit" title="" data-original-title="Edit Series"></i>');

    CommandController.bindToCommand({
      element: this.$el.find('.x-refresh'),
      command: {
        name: 'refreshSeries',
        seriesId: this.model.get('id')
      }
    });

    this.delegateEvents();
    return this;
  },

  _editSeries() {
    vent.trigger(vent.Commands.EditSeries, { series: this.model });
  },

  _refreshSeries() {
    CommandController.execute('refreshSeries', {
      name: 'refreshSeries',
      seriesId: this.model.id
    });
  }
});