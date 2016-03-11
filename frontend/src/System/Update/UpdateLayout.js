var Marionette = require('marionette');
var UpdateCollection = require('./UpdateCollection');
var UpdateCollectionView = require('./UpdateCollectionView');
var LoadingView = require('Shared/LoadingView');

module.exports = Marionette.Layout.extend({
  template: 'System/Update/UpdateLayoutTemplate',

  regions: {
    updates: '#x-updates'
  },

  initialize() {
    this.updateCollection = new UpdateCollection();

    this.listenTo(this.updateCollection, 'sync', this._showUpdates);
  },

  onRender() {
    this.updates.show(new LoadingView());

    this.updateCollection.fetch();
  },

  _showUpdates() {
    this.updates.show(new UpdateCollectionView({ collection: this.updateCollection }));
  }
});
