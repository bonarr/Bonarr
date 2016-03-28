var Marionette = require('marionette');
var ItemView = require('./NotificationItemView');
var SchemaModal = require('./Add/NotificationSchemaModal');

module.exports = Marionette.CompositeView.extend({
  childView: ItemView,
  childViewContainer: '.notification-list',
  template: 'Settings/Notification/NotificationCollectionView',

  ui: {
    'addCard': '.x-add-card'
  },

  events: {
    'click .x-add-card': '_openSchemaModal'
  },

  appendHtml(collectionView, childView, index) {
    collectionView.ui.addCard.before(childView.el);
  },

  _openSchemaModal() {
    SchemaModal.open(this.collection);
  }
});
