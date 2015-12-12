var _ = require('underscore');
var $ = require('jquery');
var Marionette = require('marionette');
var AddSeriesCollection = require('../AddSeriesCollection');
var SearchResultCollectionView = require('./SearchResultCollectionView');
var ProfileCollection = require('../../Profile/ProfileCollection');
var RootFolderCollection = require('../RootFolders/RootFolderCollection');
var ErrorView = require('./ErrorView');
var EmptyView = require('./EmptyView');

module.exports = Marionette.Layout.extend({
  id: 'add-new-series',

  template: 'AddSeries/AddNewSeries/AddNewSeriesLayout',

  ui: {
    seriesSearch: '.x-search-box',
    spinner: '.x-spinner'
  },

  events: {
    'keyup .x-search-box': 'onSearchKeyUp'
  },

  regions: {
    searchResult: '#search-result'
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

  search(options) {
    if (this.closed || !options.term || options.term === this.collection.term) {
      return $.Deferred().resolve();
    }

    console.log('searching for', options);

    this.searchResult.$el.addClass('fade-out');

    this.ui.spinner.show();

    // this.collection.reset();

    // this.searchResult.show(new LoadingView());
    this.collection.term = options.term;
    this.currentSearchPromise = this.collection.fetch({
      data: {
        term: options.term
      }
    });

    this.currentSearchPromise.fail(_.bind(this.onError, this));
    this.currentSearchPromise.always(() => {
      this.ui.spinner.hide();
      this.searchResult.$el.removeClass('fade-out');
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

    this.search({ term: 'wire' });
  },

  onClose() {
    this._abortExistingSearch();
  },

  onSearchKeyUp() {
    this._abortExistingSearch();
    var term = this.ui.seriesSearch.val();

    if (term) {
      this.debouncedSearch({
        term: term
      });
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
