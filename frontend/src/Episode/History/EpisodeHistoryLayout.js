const Marionette = require('marionette');
const TableView = require('Table/TableView');
const HistoryCollection = require('Activity/History/HistoryCollection');
const LoadingView = require('Shared/LoadingView');
const NoHistoryView = require('./NoHistoryView');
const EpisodeHistoryLayout = require('./EpisodeHistoryLayout');
const EpisodeHistoryRow = require('./EpisodeHistoryRow');
const tpl = require('./EpisodeHistoryLayoutTemplate.hbs');

module.exports = Marionette.LayoutView.extend({
  template: tpl,

  regions: {
    historyTable: '.history-table'
  },

  headers: [
    {
      name: 'eventType',
      label: ' '
    },
    {
      name: 'sourceTitle',
      label: 'Source Title'
    },
    {
      name: 'quality'
    },
    {
      name: 'date'
    },
    {
      name: 'details',
      label: ''
    },
    {
      name: 'actions',
      label: ''
    }
  ],

  initialize(options) {
    this.model = options.model;
    this.series = options.series;

    this.collection = new HistoryCollection({
      episodeId: this.model.id,
      tableName: 'episodeHistory'
    });
    this.collection.fetch();
    this.listenTo(this.collection, 'sync', this._showTable);
  },

  onRender() {
    this.historyTable.show(new LoadingView());
  },

  _showTable() {
    if (this.collection.any()) {
      this.historyTable.show(new TableView({
        collection: this.collection,
        childView: EpisodeHistoryRow,
        headers: this.headers,
        className: 'table table-hover table-condensed'
      }));
    } else {
      this.historyTable.show(new NoHistoryView());
    }
  }
});
