var ThingyAddCollectionView = require('../../ThingyAddCollectionView');
var AddItemView = require('./NotificationAddItemView');

module.exports = ThingyAddCollectionView.extend({
  childView: AddItemView,
  childViewContainer: '.add-notifications .items',
  template: 'Settings/Notification/Add/NotificationAddCollectionViewTemplate'
});
