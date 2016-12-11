const Marionette = require('marionette');
const vent = require('vent');
const tableRowMixin = require('Table/tableRowMixin');
const HistoryDetailsView = require('Activity/History/Details/HistoryDetailsView');
const tpl = require('./HistoryRow.hbs');

const HistoryRow = Marionette.LayoutView.extend({

  className: 'history-row',
  template: tpl,

  events: {
    'click .x-episode-title a': 'onTitleClick',
    'click .x-details': 'onDetailsClick'
  },

  regions: {
    details: '.x-details'
  },

  ui: {
    detailsCell: '.x-details-cell'
  },

  serializeData() {
    const result = this.model.toJSON();

    result.series = this.model.get('series').toJSON();
    result.episode = this.model.get('episode').toJSON();

    return result;
  },

  onTitleClick(e) {
    e.preventDefault();

    vent.trigger(vent.Commands.ShowEpisodeDetails, {
      episode: this.model.get('episode'),
      hideSeriesLink: true
    });
  },

  onDetailsClick() {
    vent.trigger(vent.Commands.ShowHistoryDetails, { model: this.model });
  }

});

tableRowMixin.apply(HistoryRow);

module.exports = HistoryRow;
