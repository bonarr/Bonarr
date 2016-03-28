var ThingyAddCollectionView = require('../../ThingyAddCollectionView');
var ThingyHeaderGroupView = require('../../ThingyHeaderGroupView');
var AddItemView = require('./IndexerAddItemView');

module.exports = ThingyAddCollectionView.extend({
  childView: ThingyHeaderGroupView.extend({ childView: AddItemView }),
  childViewContainer: '.add-indexer .items',
  template: 'Settings/Indexer/Add/IndexerAddCollectionViewTemplate'
});
