var _ = require('underscore');
var Marionette = require('marionette');
var SeriesSearchCollection = require('../SeriesSearchCollection');
var SearchResultCollectionView = require('./SearchResultCollectionView');
var profileCollection = require('Profile/profileCollection');
var RootFolderCollection = require('../RootFolders/RootFolderCollection');
var tpl = require('./AddNewSeriesLayout.hbs');
var ErrorView = require('./ErrorView');
var EmptyView = require('./EmptyView');

const AddNewSeriesLayout = Marionette.Layout.extend({
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

    this.listenTo(this.collection, {
      'sync reset': this.onCollectionSync,
      'request': this.onCollectionRequest
    });

    this.debouncedSearch = _.debounce(_.bind(this.search, this), 1000);
  },

  search() {
    if (this.closed) {
      return;
    }

    const term = this.ui.seriesSearch.val();
    if (term) {
      this.collection.search(term);
    } else {
      this.collection.abort();
    }
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

  onSearchKeyUp(e) {
    this.collection.abort();
    const term = this.ui.seriesSearch.val().trim();

    // force search if key is Enter
    if (e.keyCode === 13) {
      this.term = term;
      this.search();
      return;
    }

    if (this.term === term) {
      return;
    }

    this.term = term;

    if (term) {
      this.debouncedSearch();
    } else {
      this.collection.abort();
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

  onCollectionRequest(collection, xhr) {
    this.$el.addClass('state-loading');
    xhr.error(() => {
      if (this.isClosed) {
        return;
      }
      if (status === 'abort') {
        this.searchResult.close();
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
