var Marionette = require('marionette');
var ItemView = require('./IndexerItemView');
var SchemaModal = require('./Add/IndexerSchemaModal');

module.exports = Marionette.CompositeView.extend({
  itemView: ItemView,
  itemViewContainer: '.indexer-list',
  template: 'Settings/Indexer/IndexerCollectionView',

  ui: {
    'addCard': '.x-add-card'
  },

  events: {
    'click .x-add-card': '_openSchemaModal'
  },

  appendHtml(collectionView, itemView, index) {
    collectionView.ui.addCard.before(itemView.el);
  },

  _openSchemaModal() {
    SchemaModal.open(this.collection);
  }
});
