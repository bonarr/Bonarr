var _ = require('underscore');
var Marionette = require('marionette');
var SettingsLayoutBase = require('../SettingsLayoutBase');
var IndexerCollection = require('./IndexerCollection');
var CollectionView = require('./IndexerCollectionView');
var OptionsView = require('./Options/IndexerOptionsView');
var RestrictionCollection = require('./Restriction/RestrictionCollection');
var RestrictionCollectionView = require('./Restriction/RestrictionCollectionView');
var IndexerSettingsModel = require('./IndexerSettingsModel');

module.exports = SettingsLayoutBase.extend({
  template: 'Settings/Indexer/IndexerLayoutTemplate',

  regions: {
    indexers: '#x-indexers-region',
    indexerOptions: '#x-indexer-options-region',
    restriction: '#x-restriction-region'
  },

  initialize() {
    this.model = new IndexerSettingsModel();
    this.indexersCollection = new IndexerCollection();
    this.restrictionCollection = new RestrictionCollection();
    SettingsLayoutBase.prototype.initialize.apply(this, arguments);
  },

  onRender() {
    var promise = Marionette.$.when(this.model.fetch(),
      this.indexersCollection.fetch(),
      this.restrictionCollection.fetch());

    promise.done(_.bind(function() {
      if (this.isClosed) {
        return;
      }

      this.indexers.show(new CollectionView({ collection: this.indexersCollection }));
      this.indexerOptions.show(new OptionsView({ model: this.model }));
      this.restriction.show(new RestrictionCollectionView({ collection: this.restrictionCollection }));
    }, this));
  }
});
