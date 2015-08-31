var vent = require('vent');
var Marionette = require('marionette');
var Backgrid = require('backgrid');
var HistoryCollection = require('./HistoryCollection');
var EventTypeCell = require('../../Cells/EventTypeCell');
var SeriesTitleCell = require('../../Cells/SeriesTitleCell');
var EpisodeNumberCell = require('../../Cells/EpisodeNumberCell');
var EpisodeTitleCell = require('../../Cells/EpisodeTitleCell');
var HistoryQualityCell = require('./HistoryQualityCell');
var RelativeDateCell = require('../../Cells/RelativeDateCell');
var HistoryDetailsCell = require('./HistoryDetailsCell');
var GridPager = require('../../Shared/Grid/Pager');
var LoadingView = require('../../Shared/LoadingView');

module.exports = Marionette.Layout.extend({
  template: 'Activity/History/HistoryLayoutTemplate',

  regions: {
    history: '#x-history',
    pager: '#x-history-pager'
  },

  columns: [
    {
      name: 'eventType',
      label: '',
      cell: EventTypeCell,
      cellValue: 'this'
    },
    {
      name: 'series',
      label: 'Series',
      cell: SeriesTitleCell
    },
    {
      name: 'episode',
      label: 'Episode',
      cell: EpisodeNumberCell,
      sortable: false
    },
    {
      name: 'episode',
      label: 'Episode Title',
      cell: EpisodeTitleCell,
      sortable: false
    },
    {
      name: 'this',
      label: 'Quality',
      cell: HistoryQualityCell,
      sortable: false
    },
    {
      name: 'date',
      label: 'Date',
      cell: RelativeDateCell
    },
    {
      name: 'this',
      label: '',
      cell: HistoryDetailsCell,
      sortable: false
    }
  ],

  initialize: function() {
    this.collection = new HistoryCollection({ tableName: 'history' });
    this.listenTo(this.collection, 'sync', this._showTable);

    this._showActionBar();
  },

  onShow: function() {
    this.history.show(new LoadingView());
  },

  _showTable: function(collection) {
    this.history.show(new Backgrid.Grid({
      columns: this.columns,
      collection: collection,
      className: 'table table-hover'
    }));

    this.pager.show(new GridPager({
      columns: this.columns,
      collection: collection
    }));
  },

  _showActionBar: function() {
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
