var _ = require('underscore');
var vent = require('vent');
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

  //    attributes : {
  //        id : 'add-series-screen'
  //    },

  initialize: function() {
    ProfileCollection.fetch();
    RootFolderCollection.fetch().done(function() {
      RootFolderCollection.synced = true;
    });

    this.collection = new AddSeriesCollection();

    this.listenTo(vent, vent.Events.SeriesAdded, this._onSeriesAdded);
    this.listenTo(this.collection, 'sync', this.onCollectionSync);

    this.resultCollectionView = new SearchResultCollectionView({
      collection: this.collection,
      isExisting: false
    });

    this.debouncedSearch = _.debounce(_.bind(this.search, this), 1000);

  //this._showActionBar();
  },

  search: function(options) {
    if (!options.term || options.term === this.collection.term) {
      return Marionette.$.Deferred().resolve();
    }

    console.log('searching for', options);

    this.searchResult.$el.addClass('fade-out');

    this.ui.spinner.show();

    //this.collection.reset();

    //this.searchResult.show(new LoadingView());
    this.collection.term = options.term;
    this.currentSearchPromise = this.collection.fetch({
      data: {
        term: options.term
      }
    });

    this.currentSearchPromise.fail(_.bind(this.onError, this));
    this.currentSearchPromise.always(_.bind(function() {
      this.ui.spinner.hide();
      this.searchResult.$el.removeClass('fade-out');
    }, this));

    return this.currentSearchPromise;
  },

  _abortExistingSearch: function() {
    if (this.currentSearchPromise && this.currentSearchPromise.readyState > 0 && this.currentSearchPromise.readyState < 4) {
      console.log('aborting previous pending search request.');
      this.currentSearchPromise.abort();
    }
  },

  onShow: function() {
    this.searchResult.show(new EmptyView());
    this.ui.seriesSearch.focus();

    this.search({term: 'wire'});
  },

  onSearchKeyUp: function() {
    this._abortExistingSearch();
    var term = this.ui.seriesSearch.val();
    this.debouncedSearch({
      term: term
    });
  },

  onCollectionSync: function() {
    if (this.collection.length) {
      this.searchResult.show(this.resultCollectionView);
    } else {
      this.searchResult.show(new EmptyView({
        term: this.collection.term
      }));
    }
  },

  onError: function(xhr, status) {
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