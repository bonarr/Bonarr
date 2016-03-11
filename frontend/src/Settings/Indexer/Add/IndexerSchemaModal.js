var _ = require('underscore');
var vent = require('vent');
var Backbone = require('backbone');
var SchemaCollection = require('../IndexerCollection');
var AddCollectionView = require('./IndexerAddCollectionView');

module.exports = {
  open(collection) {
    var schemaCollection = new SchemaCollection();
    var originalUrl = schemaCollection.url;
    schemaCollection.url = schemaCollection.url + '/schema';
    schemaCollection.fetch();
    schemaCollection.url = originalUrl;

    var groupedSchemaCollection = new Backbone.Collection();

    schemaCollection.on('sync', function() {
      var groups = schemaCollection.groupBy(function(model, iterator) {
        return model.get('protocol');
      });
      var modelCollection = _.map(groups, function(values, key, list) {
        return {
          'header': key,
          collection: values
        };
      });

      groupedSchemaCollection.reset(modelCollection);
    });

    var view = new AddCollectionView({
      collection: groupedSchemaCollection,
      targetCollection: collection
    });

    vent.trigger(vent.Commands.OpenFullscreenModal, view);
  }
};
