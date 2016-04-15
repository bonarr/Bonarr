const Marionette = require('marionette');
const SearchResultItemView = require('./SearchResultItemView');
const searchResultCollectionView = Marionette.CollectionView.extend({
  childView: SearchResultItemView
});

module.exports = searchResultCollectionView;
