const Marionette = require('marionette');
const tableRowMixin = require('Table/tableRowMixin');
const HistoryDetailsView = require('Activity/History/Details/HistoryDetailsView');
const tpl = require('./EpisodeHistoryRow.hbs');

const EpisodeHistoryRow = Marionette.LayoutView.extend({

  className: 'episode-history-row',
  template: tpl,

  events: {
    'click .x-failed': '_markAsFailed'
  },

  regions: {
    details: '.x-details'
  },

  ui: {
    detailsCell: '.x-details-cell'
  },

  onRender() {
    this.details.show(new HistoryDetailsView({ model: this.model }));

    this.ui.detailsCell.popover({
      content: this.details.currentView.$el.html(),
      html: true,
      trigger: 'hover',
      title: 'Details',
      placement: 'left',
      container: this.$el
    });
  },

  _markAsFailed() {
    var url = '/history/failed';
    var data = {
      id: this.model.get('id')
    };

    $.ajax({
      url,
      type: 'POST',
      data
    });
  }

});

tableRowMixin.apply(EpisodeHistoryRow);

module.exports = EpisodeHistoryRow;
