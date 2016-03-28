var Marionette = require('marionette');
var ItemView = require('./DownloadClientItemView');
var SchemaModal = require('./Add/DownloadClientSchemaModal');

module.exports = Marionette.CompositeView.extend({
  childView: ItemView,
  childViewContainer: '.download-client-list',
  template: 'Settings/DownloadClient/DownloadClientCollectionView',

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
