var NzbDroneController = require('Shared/NzbDroneController');
var MissingLayout = require('./Missing/MissingLayout');
var CutoffUnmetLayout = require('./CutoffUnmet/CutoffUnmetLayout');

module.exports = NzbDroneController.extend({
  initialize() {
    this.route('wanted', this.missing);
    this.route('wanted/missing', this.missing);
    this.route('wanted/cutoff', this.cutoffUnmet);

    NzbDroneController.prototype.initialize.apply(this, arguments);
  },

  missing() {
    this.setTitle('Missing');
    this.showMainRegion(new MissingLayout());
  },

  cutoffUnmet() {
    this.setTitle('Cutoff Unmet');
    this.showMainRegion(new CutoffUnmetLayout());
  }
});
