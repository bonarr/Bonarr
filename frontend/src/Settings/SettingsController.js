var Marionette = require('marionette');
var NzbDroneController = require('Shared/NzbDroneController');
var AppLayout = require('AppLayout');
var MediaManagementLayout = require('./MediaManagement/MediaManagementLayout');
var ProfileLayout = require('./Profile/ProfileLayout');
var QualityLayout = require('./Quality/QualityLayout');
var IndexerLayout = require('./Indexer/IndexerLayout');
var DownloadClientLayout = require('./DownloadClient/DownloadClientLayout');
var NotificationLayout = require('./Notification/NotificationLayout');
var MetadataLayout = require('./Metadata/MetadataLayout');
var GeneralLayout = require('./General/GeneralLayout');
var UiLayout = require('./Ui/UiLayout');

module.exports = NzbDroneController.extend({
  initialize() {
    this.route('settings', this.mediamanagement);
    this.route('settings/mediamanagement', this.mediamanagement);
    this.route('settings/profiles', this.profiles);
    this.route('settings/quality', this.quality);
    this.route('settings/indexers', this.indexers);
    this.route('settings/downloadclient', this.downloadclient);
    this.route('settings/connect', this.connect);
    this.route('settings/metadata', this.metadata);
    this.route('settings/general', this.general);
    this.route('settings/ui', this.ui);

    NzbDroneController.prototype.initialize.apply(this, arguments);
  },

  mediamanagement() {
    this.setTitle('Media Management');
    this.showMainRegion(new MediaManagementLayout());
  },

  profiles() {
    this.setTitle('Profiles');
    this.showMainRegion(new ProfileLayout());
  },

  quality() {
    this.setTitle('Quality');
    this.showMainRegion(new QualityLayout());
  },

  indexers() {
    this.setTitle('Indexers');
    this.showMainRegion(new IndexerLayout());
  },

  downloadclient() {
    this.setTitle('Download Client');
    this.showMainRegion(new DownloadClientLayout());
  },

  connect() {
    this.setTitle('Connect');
    this.showMainRegion(new NotificationLayout());
  },

  metadata() {
    this.setTitle('Metadata');
    this.showMainRegion(new MetadataLayout());
  },

  general() {
    this.setTitle('General');
    this.showMainRegion(new GeneralLayout());
  },

  ui() {
    this.setTitle('UI');
    this.showMainRegion(new UiLayout());
  },

  setTitle(subTitle) {
    NzbDroneController.prototype.setTitle('Settings - ' + subTitle);
  },

  _showActionBar() {}
});
