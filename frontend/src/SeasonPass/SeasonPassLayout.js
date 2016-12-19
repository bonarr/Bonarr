const vent = require('vent');
const Backgrid = require('backgrid');
const Marionette = require('marionette');
const EmptyView = require('./EmptyView');
const seriesCollection = require('Series/seriesCollection');
const FooterView = require('./SeasonPassFooterView');
const SelectAllCell = require('Cells/SelectAllCell');
const SeriesStatusCell = require('Cells/SeriesStatusCell');
const SeriesTitleCell = require('Cells/SeriesTitleCell');
const SeasonsCell = require('./SeasonsCell');
const tpl = require('./SeasonPassLayout.hbs');

const SeasonPassLayout = Marionette.LayoutView.extend({
  template: tpl,

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

  initialize() {
    this.seriesCollection = seriesCollection.clone();
    this.listenTo(this.seriesCollection, 'seasonpass:saved', this.render);
    this._showActionBar();
  },

  onRender() {
    this._showTable();
    this._showFooter();
  },

  _showActionBar() {
    const filteringOptions = {
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

  _showTable() {
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

  _showFooter() {
    vent.trigger(vent.Commands.OpenFooter, new FooterView({
      editorGrid: this.editorGrid,
      collection: this.seriesCollection
    }));
  },

  _setFilter(buttonContext) {
    const mode = buttonContext.model.get('key');
    this.seriesCollection.setFilterMode(mode);
  }
});

module.exports = SeasonPassLayout;
