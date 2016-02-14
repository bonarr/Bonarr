var Marionette = require('marionette');
var tpl = require('./SeriesSuggestionsView.hbs');

const SeriesSuggestionsView = Marionette.ItemView.extend({
  template: tpl,

  tagName: 'ul',
  className: 'dropdown-menu',

  events: {
    'click .x-suggestion': 'onSuggestionClick'
  },

  initialize(options) {
    this.series = options.series;
  },

  templateHelpers() {
    return {
      // loading: this.promise.state() === 'pending',
      suggestions: this.series.toJSON()
    };
  },

  onShow() {
    this.listenTo(this.series, 'sync', this.render);
  },

  onSuggestionClick(e) {
    const $target = this.$(e.currentTarget);
    const tvdbId = $target.closest('.x-suggestion').data('tvdbid');
    const selectedModel = this.series.findWhere({ tvdbId });
    this.model.set('selectedSeries', selectedModel);
  }
});

module.exports = SeriesSuggestionsView;
