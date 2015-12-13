var Marionette = require('marionette');
var SearchResultItemView = require('./SearchResultItemView');
const searchResultCollectionView = Marionette.CollectionView.extend({
  itemView: SearchResultItemView
});

module.exports = searchResultCollectionView;
