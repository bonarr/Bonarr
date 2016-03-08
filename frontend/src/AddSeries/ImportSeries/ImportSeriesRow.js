var Marionette = require('marionette');
var TableRowMixin = require('Table/TableRowMixin');
var SeriesSuggestionsView = require('./SeriesSuggestionsView');
var SeriesSearchCollection = require('../SeriesSearchCollection');
var profileCollection = require('Profile/profileCollection');
var tpl = require('./ImportSeriesRow.hbs');

const ImportSeriesRow = Marionette.Layout.extend({
  template: tpl,

  className: 'import-series-row',

  regions: {
    suggestions: '.suggestions-region'
  },

  ui: {
    seriesSelectWarning: '.x-series-select-warning',
    seriesSelectTitle: '.x-series-select-title',
    profileSelect: '.x-profile',
    monitorSelect: '.x-monitor'
  },

  events: {
    'click .x-series-dropdown': 'onSeriesDropdownClick',
    'change .x-profile': '_assignProfile',
    'change .x-monitor': '_assignMonitor'
  },



  initialize(options) {
    const queue = options.taskQueue;
    this.series = new SeriesSearchCollection();
    const name = this.model.get('name');

    this.promise = queue.enqueue(() => {
      return this.series.search(name);
    });

    this.listenTo(this.model, 'change:selectedSeries', this.onSelectedSeriesChanged);

    this.promise.always(() => {
      // todo: try and avoid the re-render.
      this.render();
      const selectedSeries = this.series.at(0);
      if (selectedSeries) {
        this.model.set('selectedSeries', selectedSeries);
        this.model.select();
      } else {
        this.onSelectedSeriesChanged();
      }
    });
  },

  serializeData() {
    const series = this.model.get('selectedSeries');
    return {
      loading: this.promise.state() === 'pending',
      name: this.model.get('name'),
      profiles: profileCollection.toJSON(),
      series: series ? series.toJSON() : ''
    };
  },

  _assignProfile() {
    const series = this.model.get('selectedSeries');
    const profileId = parseInt(this.ui.profileSelect.val(), 10);

    this.model.set('profileId', profileId);

    if (series && profileId) {
      series.set('profileId', profileId);
    }
  },

  _assignMonitor() {
    const series = this.model.get('selectedSeries');
    const monitor = this.ui.monitorSelect.val();

    this.model.set('monitor', monitor);

    if (series && monitor) {
      series.setAddOptions({
        monitor
      });
    }
  },

  onRender() {
    this._assignProfile();
  },

  onSelectedSeriesChanged() {
    const selectedSeries = this.model.get('selectedSeries');
    const isSelectable = this.model.isSelectable();

    this.ui.seriesSelectWarning.toggle(!isSelectable);
    // this.ui.profileSelect.prop('disabled', !isSelectable);
    this.ui.selectCheckbox.prop('disabled', !isSelectable);

    let title = 'No match found!';

    if (selectedSeries) {
      title = selectedSeries.get('title');
      if (selectedSeries.isExisting()) {
        title += ' (Existing)';
      }
    }

    this.ui.seriesSelectTitle.text(title);

    if (isSelectable) {
      selectedSeries.set('path', this.model.get('path'));
      this._assignProfile();
    }
  },

  onSeriesDropdownClick() {
    const suggestionsView = new SeriesSuggestionsView({
      model: this.model,
      series: this.series,
      promise: this.promise
    });

    this.suggestions.show(suggestionsView);
  }
});

TableRowMixin(ImportSeriesRow);

module.exports = ImportSeriesRow;
