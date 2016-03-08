var Marionette = require('marionette');
var tpl = require('./SeriesSuggestionsView.hbs');

const SeriesSuggestionsView = Marionette.ItemView.extend({
  template: tpl,

  tagName: 'ul',
  className: 'dropdown-menu',

  ui: {
    searchInput: '.x-search-input'
  },

  events: {
    'keyup .x-search-input': 'onSearchInputKeyup',
    'click .x-suggestion': 'onSuggestionClick'
  },

  initialize(options) {
    this.series = options.series;
    this.debouncedSearch = _.debounce(_.bind(this.search, this), 1000);
  },

  templateHelpers() {
    return {
      suggestions: this.series.toJSON()
    };
  },

  onShow() {
    this.stopListening(this.series);
    this.listenTo(this.series, 'sync reset', this.render);
  },

  onSearchInputChange() {

  },

  onSuggestionClick(e) {
    const $target = this.$(e.currentTarget);
    const tvdbId = $target.closest('.x-suggestion').data('tvdbid');
    const selectedModel = this.series.findWhere({
      tvdbId
    });
    this.model.set('selectedSeries', selectedModel);
  }
});

module.exports = SeriesSuggestionsView;
