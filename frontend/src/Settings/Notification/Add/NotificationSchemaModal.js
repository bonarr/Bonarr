var vent = require('vent');
var SchemaCollection = require('../NotificationCollection');
var AddCollectionView = require('./NotificationAddCollectionView');

module.exports = {
  open: function(collection) {
    var schemaCollection = new SchemaCollection();
    var originalUrl = schemaCollection.url;
    schemaCollection.url = schemaCollection.url + '/schema';
    schemaCollection.fetch();
    schemaCollection.url = originalUrl;
    var view = new AddCollectionView({
      collection: schemaCollection,
      targetCollection: collection
    });
    vent.trigger(vent.Commands.OpenFullscreenModal, view);
  }
};