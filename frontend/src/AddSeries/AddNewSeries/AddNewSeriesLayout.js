var _ = require('underscore');
var Marionette = require('marionette');
var SeriesSearchCollection = require('../SeriesSearchCollection');
var SearchResultCollectionView = require('./SearchResultCollectionView');
var profileCollection = require('Profile/profileCollection');
var RootFolderCollection = require('../RootFolders/RootFolderCollection');
var tpl = require('./AddNewSeriesLayout.hbs');
var ErrorView = require('./ErrorView');
var EmptyView = require('./EmptyView');

module.exports = Marionette.Layout.extend({
  id: 'add-new-series',

  template: tpl,

  ui: {
    seriesSearch: '.x-search-box'
  },

  events: {
    'keyup .x-search-box': 'onSearchKeyUp'
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
    this.listenTo(this.collection, 'sync reset', this.onCollectionSync);
    this.debouncedSearch = _.debounce(_.bind(this.search, this), 1000);
  },

  search() {
    if (this.closed) {
      return;
    }

    const term = this.ui.seriesSearch.val();
    if (!term || term === this.collection.term) {
      return;
    }

    this.$el.addClass('state-loading');

    // this.collection.reset();

    // this.searchResult.show(new LoadingView());
    this.currentSearchPromise = this.collection.search(term);

    this.currentSearchPromise.fail(_.bind(this.onError, this));
    this.currentSearchPromise.always(() => {
      this.$el.removeClass('state-loading');
    });

    return this.currentSearchPromise;
  },

  onShow() {
    this.searchResult.show(new EmptyView());
    this.ui.seriesSearch.focus();
    this.ui.seriesSearch.text('wire');
    this.search();
  },

  onClose() {
    this.collection.abort();
  },

  onSearchKeyUp() {
    this.collection.abort();
    var term = this.ui.seriesSearch.val();

    if (term) {
      this.debouncedSearch();
    } else {
      this.collection.term = '';
      this.collection.reset();
    }
  },

  onCollectionSync() {
    if (this.isClosed) {
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

  onError(xhr, status) {
    if (this.isClosed) {
      return;
    }

    if (status === 'abort') {
      this.searchResult.close();
    } else {
      this.searchResult.show(new ErrorView({
        term: this.collection.term,
        xhr: xhr
      }));
      this.collection.term = '';
    }
  }
});
