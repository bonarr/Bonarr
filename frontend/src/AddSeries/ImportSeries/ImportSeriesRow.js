var Marionette = require('marionette');
var tableRowMixin = require('Table/tableRowMixin');
var SeriesSuggestionsView = require('./SeriesSuggestionsView');
var SeriesSearchCollection = require('../SeriesSearchCollection');
var profileCollection = require('Profile/profileCollection');
var asModelBoundView = require('Mixins/AsModelBoundView');
var tpl = require('./ImportSeriesRow.hbs');
var errorPopoverTemplate = require('Shared/ApiErrorPopover.hbs');

const ImportSeriesRow = Marionette.Layout.extend({
  template: tpl,

  className: 'import-series-row',

  regions: {
    suggestions: '.suggestions-region'
  },

  ui: {
    seriesSelectWarning: '.x-series-select-warning',
    seriesSelectTitle: '.x-series-select-title',
    errors: '.x-errors'
  },

  events: {
    'click .x-series-dropdown': 'onSeriesDropdownClick'
  },

  bindings: {
    profileId: {
      converter(direction, value, attribute, model) {
        return parseInt(value);
      }
    },
    monitor: {}
  },

  initialize(options) {
    const queue = options.taskQueue;
    this.series = new SeriesSearchCollection();
    const name = this.model.get('name');

    this.promise = queue.enqueue(() => {
      return this.series.search(name);
    });

    this.listenTo(this.model, {
      'change:selectedSeries': this.onSelectedSeriesChanged,
      'change:profileId': this.onProfileIdChange,
      'change:monitor': this.onMonitorChange,
      'error': this.onModelError
    });

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

  onProfileIdChange() {
    const series = this.model.get('selectedSeries');
    // const profileId = parseInt(this.ui.profileSelect.val());

    if (series) {
      const profileId = this.model.get('profileId');
      series.set('profileId', profileId);
    }
  },

  onMonitorChange() {
    const series = this.model.get('selectedSeries');
    const monitor = this.model.get('monitor');

    if (series && monitor) {
      series.setAddOptions({
        monitor
      });
    }
  },

  onSelectedSeriesChanged() {
    this.stopListening(this.onSeriesSave);

    const selectedSeries = this.model.get('selectedSeries');
    const isSelectable = this.model.isSelectable();

    this.ui.seriesSelectWarning.toggle(!isSelectable);
    this.ui.selectCheckbox.prop('disabled', !isSelectable);

    let title = 'No match found!';

    if (selectedSeries) {
      this.listenTo(selectedSeries, 'request', this.onSeriesSave);
      title = selectedSeries.get('title');
      if (selectedSeries.isExisting()) {
        title += ' (Existing)';
      }
    }

    this.ui.seriesSelectTitle.text(title);

    if (isSelectable) {
      selectedSeries.set({
        path: this.model.get('path'),
        profileId: this.model.get('profileId')
      });

      const monitor = this.model.get('monitor');
      selectedSeries.setAddOptions({
        monitor
      });
    }
  },

  onSeriesSave(model, xhr) {
    this.ui.errors.html('');
    xhr.error((resp) => {
      let errors = null;
      if (xhr.status === 400) {
        errors = xhr.responseJSON;
      } else {
        errors = [{
          errorMessage: 'Couldn\'t add series, Check logs for details'
        }];
      }

      this.ui.errors.html(errorPopoverTemplate(errors));
      this.$('[data-toggle="popover"]').popover();
    });
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

tableRowMixin.apply(ImportSeriesRow);
asModelBoundView.apply(ImportSeriesRow);

module.exports = ImportSeriesRow;
