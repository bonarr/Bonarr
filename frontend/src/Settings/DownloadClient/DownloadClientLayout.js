var _ = require('underscore');
var Marionette = require('marionette');
var SettingsLayoutBase = require('../SettingsLayoutBase');
var DownloadClientCollection = require('./DownloadClientCollection');
var DownloadClientCollectionView = require('./DownloadClientCollectionView');
var DownloadHandlingView = require('./DownloadHandling/DownloadHandlingView');
var DroneFactoryView = require('./DroneFactory/DroneFactoryView');
var DownloadClientSettingsModel = require('./DownloadClientSettingsModel');
var RemotePathMappingCollection = require('./RemotePathMapping/RemotePathMappingCollection');
var RemotePathMappingCollectionView = require('./RemotePathMapping/RemotePathMappingCollectionView');

module.exports = SettingsLayoutBase.extend({
  template: 'Settings/DownloadClient/DownloadClientLayoutTemplate',

  regions: {
    downloadClients: '#x-download-clients-region',
    downloadHandling: '#x-download-handling-region',
    droneFactory: '#x-dronefactory-region',
    remotePathMappings: '#x-remotepath-mapping-region'
  },

  initialize() {
    this.model = new DownloadClientSettingsModel();
    this.downloadClientsCollection = new DownloadClientCollection();
    this.remotePathMappingCollection = new RemotePathMappingCollection();

    SettingsLayoutBase.prototype.initialize.apply(this, arguments);
  },

  onRender() {
    var promise = Marionette.$.when(this.model.fetch(),
      this.downloadClientsCollection.fetch(),
      this.remotePathMappingCollection.fetch()
    );

    promise.done(_.bind(function() {
      if (this.isClosed) {
        return;
      }

      this.downloadClients.show(new DownloadClientCollectionView({ collection: this.downloadClientsCollection }));
      this.downloadHandling.show(new DownloadHandlingView({ model: this.model }));
      this.droneFactory.show(new DroneFactoryView({ model: this.model }));
      this.remotePathMappings.show(new RemotePathMappingCollectionView({ collection: this.remotePathMappingCollection }));
    }, this));
  }
});
