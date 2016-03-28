var ThingyAddCollectionView = require('../../ThingyAddCollectionView');
var ThingyHeaderGroupView = require('../../ThingyHeaderGroupView');
var AddItemView = require('./DownloadClientAddItemView');
// var tpl = require('./DownloadClientAddCollectionView');

module.exports = ThingyAddCollectionView.extend({
  childView: ThingyHeaderGroupView.extend({ childView: AddItemView }),
  childViewContainer: '.add-download-client .items',
  template: 'Settings/DownloadClient/Add/DownloadClientAddCollectionViewTemplate'
});
