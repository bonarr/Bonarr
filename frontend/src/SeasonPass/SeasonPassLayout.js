var _ = require('underscore');
var vent = require('vent');
var Backgrid = require('backgrid');
var Marionette = require('marionette');
var EmptyView = require('../Series/Index/EmptyView');
var SeriesCollection = require('../Series/SeriesCollection');
var FooterView = require('./SeasonPassFooterView');
var SelectAllCell = require('../Cells/SelectAllCell');
var SeriesStatusCell = require('../Cells/SeriesStatusCell');
var SeriesTitleCell = require('../Cells/SeriesTitleCell');
var SeasonsCell = require('./SeasonsCell');
require('../Mixins/backbone.signalr.mixin');

module.exports = Marionette.Layout.extend({
  template: 'SeasonPass/SeasonPassLayoutTemplate',

  regions: {
    series: '#x-series'
  },

  columns: [
    {
      name: '',
      cell: SelectAllCell,
      headerCell: 'select-all',
      sortable: false
    },
    {
      name: 'statusWeight',
      label: '',
      cell: SeriesStatusCell
    },
    {
      name: 'title',
      label: 'Title',
      cell: SeriesTitleCell,
      cellValue: 'this'
    },
    {
      name: 'seasons',
      label: 'Seasons',
      cell: SeasonsCell,
      cellValue: 'this'
    }
  ],

  initialize: function() {
    this.seriesCollection = SeriesCollection.clone();
    this.seriesCollection.shadowCollection.bindSignalR();

    this.listenTo(this.seriesCollection, 'seasonpass:saved', this.render);

    this._showActionBar();
  },

  onRender: function() {
    this._showTable();
    this._showFooter();
  },

  onClose: function() {
    vent.trigger(vent.Commands.CloseControlPanel);
  },

  _showActionBar: function() {
    var filteringOptions = {
      type: 'radio',
      storeState: true,
      menuKey: 'seasonpass.filterMode',
      defaultAction: 'all',
      items: [
        {
          key: 'all',
          title: 'All',
          icon: 'icon-sonarr-all'
        },
        {
          key: 'monitored',
          title: 'Monitored Only',
          icon: 'icon-sonarr-monitored'
        },
        {
          key: 'continuing',
          title: 'Continuing Only',
          icon: 'icon-sonarr-series-continuing'
        },
        {
          key: 'ended',
          title: 'Ended Only',
          icon: 'icon-sonarr-series-ended'
        }
      ]
    };

    vent.trigger(vent.Commands.OpenActionBarCommand, {
      parentView: this,
      collection: this.seriesCollection,
      filtering: filteringOptions
    });
  },

  _showTable: function() {
    if (this.seriesCollection.shadowCollection.length === 0) {
      this.series.show(new EmptyView());
      return;
    }

    this.columns[0].sortedCollection = this.seriesCollection;

    this.editorGrid = new Backgrid.Grid({
      collection: this.seriesCollection,
      columns: this.columns,
      className: 'table table-hover'
    });

    this.series.show(this.editorGrid);
    this._showFooter();
  },

  _showFooter: function() {
    vent.trigger(vent.Commands.OpenControlPanel, new FooterView({
      editorGrid: this.editorGrid,
      collection: this.seriesCollection
    }));
  },

  _setFilter: function(buttonContext) {
    var mode = buttonContext.model.get('key');

    this.seriesCollection.setFilterMode(mode);
  }
});