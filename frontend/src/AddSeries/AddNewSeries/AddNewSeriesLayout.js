var _ = require('underscore');
var $ = require('jquery');
var Marionette = require('marionette');
var AddSeriesCollection = require('../AddSeriesCollection');
var SearchResultCollectionView = require('./SearchResultCollectionView');
var ProfileCollection = require('Profile/ProfileCollection');
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
    ProfileCollection.fetch();
    RootFolderCollection.fetch().done(() => {
      RootFolderCollection.synced = true;
    });

    this.collection = new AddSeriesCollection();
    this.listenTo(this.collection, 'sync reset', this.onCollectionSync);
    this.debouncedSearch = _.debounce(_.bind(this.search, this), 1000);
  },

  search() {
    if (this.closed) {
      return;
    }

    const term = this.ui.seriesSearch.val();
    if (!term || term === this.collection.term) {
      return $.Deferred().resolve();
    }

    console.log('searching for', term);

    this.$el.addClass('loading');

    // this.collection.reset();

    // this.searchResult.show(new LoadingView());
    this.currentSearchPromise = this.collection.search(term);

    this.currentSearchPromise.fail(_.bind(this.onError, this));
    this.currentSearchPromise.always(() => {
      this.$el.removeClass('loading');
    });

    return this.currentSearchPromise;
  },

  _abortExistingSearch() {
    if (this.currentSearchPromise) {
      console.log('aborting previous pending search request.');
      this.currentSearchPromise.abort();
      this.currentSearchPromise = undefined;
    }
  },

  onShow() {
    this.searchResult.show(new EmptyView());
    this.ui.seriesSearch.focus();
    this.ui.seriesSearch.text('wire');
    this.search();
  },

  onClose() {
    this._abortExistingSearch();
  },

  onSearchKeyUp() {
    this._abortExistingSearch();
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
      var resultCollectionView = new SearchResultCollectionView({
        collection: this.collection,
        isExisting: false
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
