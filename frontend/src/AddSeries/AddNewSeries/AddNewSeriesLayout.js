var _ = require('underscore');
var Marionette = require('marionette');
var SeriesSearchCollection = require('../SeriesSearchCollection');
var SearchResultCollectionView = require('./SearchResultCollectionView');
var profileCollection = require('Profile/profileCollection');
var RootFolderCollection = require('../RootFolders/RootFolderCollection');
var tpl = require('./AddNewSeriesLayout.hbs');
var ErrorView = require('./ErrorView');
var EmptyView = require('./EmptyView');

const AddNewSeriesLayout = Marionette.LayoutView.extend({
  id: 'add-new-series',

  template: tpl,

  ui: {
    searchInput: '.x-search-input'
  },

  events: {
    'keyup .x-search-input': 'onSearchInputKeyUp'
  },

  regions: {
    searchResult: '#result-region'
  },

  initialize() {
    profileCollection.fetch();
    RootFolderCollection.fetch().done(() => {
      RootFolderCollection.synced = true;
    });

    this.collection = new SeriesSearchCollection();

    this.listenTo(this.collection, {
      'sync reset': this.onCollectionSync,
      'request': this.onCollectionRequest
    });

    this.debouncedSearch = _.debounce(_.bind(this.search, this), 1000);
  },

  search() {
    if (this.isDestroyed) {
      return;
    }

    const term = this.ui.searchInput.val();
    this.collection.search(term);
  },

  onShow() {
    this.searchResult.show(new EmptyView());
    this.ui.searchInput.focus();
    this.ui.searchInput.text('wire');
    this.search();
  },

  onDestroy() {
    this.collection.abort();
  },

  onSearchInputKeyUp(e) {
    const term = this.ui.searchInput.val().trim();

    if (!term) {
      this.collection.abort();
      this.collection.reset();
    }

    // force search if key is Enter
    if (e.keyCode === 13) {
      this.term = term;
      this.search();
      return;
    }

    this.debouncedSearch();
  },

  onCollectionSync() {
    if (this.isDestroyed) {
      return;
    }

    if (this.collection.length) {
      const resultCollectionView = new SearchResultCollectionView({
        collection: this.collection
      });
      this.searchResult.show(resultCollectionView);
    } else {
      this.searchResult.show(new EmptyView({
        term: this.collection.term
      }));
    }
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
        this.searchResult.show(new ErrorView({
          term: this.collection.term,
          xhr
        }));
        this.collection.term = '';
      }
    });

    xhr.always(() => {
      this.$el.removeClass('state-loading');
    });
  }
});

module.exports = AddNewSeriesLayout;
