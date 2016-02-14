var Marionette = require('marionette');
var TableRowMixin = require('Table/TableRowMixin');
var SuggestionsView = require('./SuggestionsView');
var AddSeriesCollection = require('../AddSeriesCollection');
var tpl = require('./ImportSeriesRow.hbs');

const ImportSeriesRow = Marionette.Layout.extend({
  template: tpl,

  className: 'import-series-row',

  regions: {
    suggestions: '.x-suggestions'
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
      this.render();
      this.model.set('selectedSeries', this.series.at(0));
    });
  },

  templateHelpers() {
    return {
      loading: this.promise.state() === 'pending'
    };
  },

  onSelectedSeriesChanged() {
    const selectedSeries = this.model.get('selectedSeries');
    this.ui.seriesSelectWarning.toggle(!selectedSeries);

    const title = selectedSeries ? selectedSeries.get('title') : 'No match found!';
    this.ui.seriesSelectTitle.text(title);
  },

  onSeriesDropdownClick() {
    const suggestionsView = new SuggestionsView({
      model: this.model,
      series: this.series,
      promise: this.promise
    });
    this.suggestions.show(suggestionsView);
  }
});

TableRowMixin(ImportSeriesRow.prototype);

module.exports = ImportSeriesRow;
