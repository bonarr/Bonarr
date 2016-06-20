const vent = require('vent');
const Marionette = require('marionette');
const TableView = require('Table/TableView');
const TablePagerView = require('Table/TablePagerView');
const LoadingView = require('Shared/LoadingView');
const HistoryCollection = require('./HistoryCollection');
const HistoryRow = require('./HistoryRow');

const HistoryLayout = Marionette.LayoutView.extend({
  template: 'Activity/History/HistoryLayoutTemplate',

  regions: {
    history: '.x-history',
    pager: '.x-history-pager'
  },

  headers: [
    {
      name: 'eventType',
      label: ' '
    },
    {
      name: 'seriesTitle',
      label: 'Series'
    },
    {
      name: 'episodeNumber',
      sortable: false
    },
    {
      name: 'episodeTitle',
      label: 'Episode Title',
      sortable: false
    },
    {
      name: 'quality',
      sortable: false
    },
    {
      name: 'date'
    },
    {
      name: 'details',
      label: ' '
    }
  ],

  initialize() {
    this.collection = new HistoryCollection([], { tableName: 'history' });
    this.listenTo(this.collection, 'sync', this._showTable);

    this._showActionBar();
  },

  onRender() {
    this.history.show(new LoadingView());
    this.collection.fetch();
  },

  _showTable(collection) {
    this.history.show(new TableView({
      collection: this.collection,
      childView: HistoryRow,
      headers: this.headers,
      className: 'table table-hover'
    }));

    this.pager.show(new TablePagerView({
      collection: collection
    }));
  },

  _showActionBar() {
    var filteringOptions = {
      type: 'radio',
      storeState: true,
      menuKey: 'history.filterMode',
      defaultAction: 'all',
      items: [
        {
          key: 'all',
          title: 'All',
          icon: 'icon-sonarr-all'
        },
        {
          key: 'grabbed',
          title: 'Grabbed',
          icon: 'icon-sonarr-downloading'
        },
        {
          key: 'imported',
          title: 'Imported',
          icon: 'icon-sonarr-imported'
        },
        {
          key: 'failed',
          title: 'Failed',
          icon: 'icon-sonarr-download-failed'
        },
        {
          key: 'deleted',
          title: 'Deleted',
          icon: 'icon-sonarr-deleted'
        }
      ]
    };

    vent.trigger(vent.Commands.OpenActionBarCommand, {
      parentView: this,
      collection: this.collection,
      filtering: filteringOptions
    });
  }
});

module.exports = HistoryLayout;
