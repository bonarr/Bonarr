var _ = require('underscore');
var SettingsLayoutBase = require('../SettingsLayoutBase');
var MetadataCollection = require('./MetadataCollection');
var MetadataCollectionView = require('./MetadataCollectionView');

module.exports = SettingsLayoutBase.extend({
  template: 'Settings/Metadata/MetadataLayoutTemplate',

  regions: {
    metadata: '#x-metadata-providers'
  },

  initialize() {
    this.metadataCollection = new MetadataCollection();
    SettingsLayoutBase.prototype.initialize.apply(this, arguments);
  },

  onRender() {
    var promise = this.metadataCollection.fetch();

    promise.done(_.bind(function() {
      if (this.isDestroyed) {
        return;
      }

      this.metadata.show(new MetadataCollectionView({ collection: this.metadataCollection }));
    }, this));
  }
});
