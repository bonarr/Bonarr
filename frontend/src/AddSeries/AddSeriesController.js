var NzbDroneController = require('Shared/NzbDroneController');
var AddNewSeriesLayout = require('./AddNewSeries/AddNewSeriesLayout');
var ImportSeriesLayout = require('./ImportSeries/ImportSeriesLayout');
var ImportSeriesTableLayout = require('./ImportSeries/ImportSeriesTableLayout');

const AddSeriesController = NzbDroneController.extend({
  initialize() {
    this.route('add/new', this.addSeries);
    this.route('add/import', this.importSeries);
    this.route('add/import/:query*', this.importFolder);

    NzbDroneController.prototype.initialize.apply(this, arguments);
  },

  addSeries() {
    this.setTitle('Add New Series');
    this.showMainRegion(new AddNewSeriesLayout());
  },

  importSeries() {
    this.setTitle('Import Series');
    this.showMainRegion(new ImportSeriesLayout());
  },

  importFolder(id) {
    this.setTitle('Import Series');
    this.showMainRegion(new ImportSeriesTableLayout({ rootFolderId: id }));
  }
});

module.exports = AddSeriesController;
