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
    profileSelect: '.x-profile'
  },

  events: {
    'click .x-series-dropdown': 'onSeriesDropdownClick',
    'change .x-profile': '_assignProfile'
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

    if (series && profileId) {
      series.set('profileId', profileId);
    }
  },

  onRender() {
    this._assignProfile();
  },

  onSelectedSeriesChanged() {
    const selectedSeries = this.model.isSelectable();

    this.ui.seriesSelectWarning.toggle(!selectedSeries);
    this.ui.profileSelect.prop('disabled', !selectedSeries);
    this.ui.selectCheckbox.prop('disabled', !selectedSeries);

    const title = selectedSeries ? selectedSeries.get('title') : 'No match found!';
    this.ui.seriesSelectTitle.text(title);

    if (selectedSeries) {
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
