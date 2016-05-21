var NzbDroneController = require('Shared/NzbDroneController');
var MissingLayout = require('./Missing/MissingLayout');
var CutoffUnmetLayout = require('./Cutoff/CutoffUnmetLayout');

module.exports = NzbDroneController.extend({
  initialize() {
    this.route('wanted', this.missing);
    this.route('wanted/missing', this.missing);
    this.route('wanted/cutoff', this.cutoff);

    NzbDroneController.prototype.initialize.apply(this, arguments);
  },

  missing() {
    this.setTitle('Missing');
    this.showMainRegion(new MissingLayout());
  },

  cutoff() {
    this.setTitle('Cutoff Unment');
    this.showMainRegion(new CutoffUnmetLayout());
  }
});
