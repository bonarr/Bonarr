var Marionette = require('marionette');
var ItemView = require('./IndexerItemView');
var SchemaModal = require('./Add/IndexerSchemaModal');

module.exports = Marionette.CompositeView.extend({
  childView: ItemView,
  childViewContainer: '.indexer-list',
  template: 'Settings/Indexer/IndexerCollectionView',

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
