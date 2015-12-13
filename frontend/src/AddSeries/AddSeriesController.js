var NzbDroneController = require('../Shared/NzbDroneController');
var AddNewSeriesLayout = require('./AddNewSeries/AddNewSeriesLayout');
var ImportSeriesLayout = require('./ImportSeries/ImportSeriesLayout');

const AddSeriesController = NzbDroneController.extend({
  initialize() {
    this.route('add/new', this.addSeries);
    this.route('add/import', this.importSeries);

    NzbDroneController.prototype.initialize.apply(this, arguments);
  },

  addSeries() {
    this.setTitle('Add New Series');
    this.showMainRegion(new AddNewSeriesLayout());
  },

  importSeries() {
    this.setTitle('Import Series');
    this.showMainRegion(new ImportSeriesLayout());
  }
});

module.exports = AddSeriesController;
