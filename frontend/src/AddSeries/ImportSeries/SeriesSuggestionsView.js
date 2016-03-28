var _ = require('underscore');
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
    'keyup .x-search-input': 'onSearchInputKeyUp',
    'click .x-suggestion': 'onSuggestionClick'
  },

  initialize(options) {
    this.series = options.series;
    this.debouncedSearch = _.debounce(_.bind(this.search, this), 1000);
  },

  search() {
    if (this.isDestroyed) {
      return;
    }

    const term = this.ui.searchInput.val();
    this.series.search(term);
  },

  templateHelpers() {
    return {
      searchTerm: this.series.term,
      suggestions: this.series.toJSON()
    };
  },

  onShow() {
    this.stopListening(this.series);
    this.listenTo(this.series, {
      'sync': this.render,
      'request': this.onCollectionRequest
    });
    this.ui.searchInput.focus();
  },

  onRender() {
    this.ui.searchInput.focus();
    this.ui.searchInput.val(this.series.term);
  },

  onSearchInputKeyUp(e) {
    const term = this.ui.searchInput.val().trim();

    if (!term) {
      this.series.abort();
      this.series.reset();
    }

    // force search if key is Enter
    if (e.keyCode === 13) {
      this.term = term;
      this.search();
      return;
    }

    this.debouncedSearch();
  },

  onCollectionRequest(collection, xhr) {
    this.$el.addClass('state-loading');
    xhr.error(() => {
      if (this.isDestroyed) {
        return;
      }
      if (status === 'abort') {
        this.searchResult.empty();
      } else {
        this.series.term = '';
      }
    });

    xhr.always(() => {
      this.$el.removeClass('state-loading');
    });
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
