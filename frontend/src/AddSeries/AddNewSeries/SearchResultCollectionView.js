const Marionette = require('marionette');
const SearchResultItemView = require('./SearchResultItemView');
const SearchResultCollectionView = Marionette.CollectionView.extend({
  childView: SearchResultItemView
});

module.exports = SearchResultCollectionView;
