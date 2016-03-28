var Marionette = require('marionette');
var SearchResultItemView = require('./SearchResultItemView');
const searchResultCollectionView = Marionette.CollectionView.extend({
  childView: SearchResultItemView
});

module.exports = searchResultCollectionView;
