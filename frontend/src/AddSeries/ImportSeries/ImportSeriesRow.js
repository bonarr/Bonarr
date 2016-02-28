var Marionette = require('marionette');
var TableRowMixin = require('Table/TableRowMixin');
var SeriesSuggestionsView = require('./SeriesSuggestionsView');
var AddSeriesCollection = require('../AddSeriesCollection');
var ProfileSelectView = require('Profile/ProfileSelectView');
var tpl = require('./ImportSeriesRow.hbs');

const ImportSeriesRow = Marionette.Layout.extend({
  template: tpl,

  className: 'import-series-row',

  regions: {
    suggestions: '.suggestions-region',
    profile: '.profile-region'
  },

  ui: {
    seriesSelectWarning: '.x-series-select-warning',
    seriesSelectTitle: '.x-series-select-title'
  },

  events: {
    'click .x-series-dropdown': 'onSeriesDropdownClick'
  },

  initialize(options) {
    const queue = options.taskQueue;
    this.series = new AddSeriesCollection();
    const name = this.model.get('name');

    this.promise = queue.enqueue(() => {
      return this.series.search(name);
    });

    this.listenTo(this.model, 'change:selectedSeries', this.onSelectedSeriesChanged);

    this.promise.always(() => {
      // todo: try and avoid the re-render.
      this.render();
      this.model.set('selectedSeries', this.series.at(0));
    });
  },

  templateHelpers() {
    return {
      loading: this.promise.state() === 'pending'
    };
  },

  onRender() {
    const profileSelectView = new ProfileSelectView();
    this.profile.show(profileSelectView);
  },

  onSelectedSeriesChanged() {
    const selectedSeries = this.model.get('selectedSeries');
    this.ui.seriesSelectWarning.toggle(!selectedSeries);

    const title = selectedSeries ? selectedSeries.get('title') : 'No match found!';
    this.ui.seriesSelectTitle.text(title);
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
