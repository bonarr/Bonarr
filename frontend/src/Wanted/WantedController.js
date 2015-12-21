var NzbDroneController = require('Shared/NzbDroneController');
var AppLayout = require('AppLayout');
var MissingLayout = require('./Missing/MissingLayout');
var CutoffUnmetLayout = require('./Cutoff/CutoffUnmetLayout');

module.exports = NzbDroneController.extend({
  initialize: function() {
    this.route('wanted', this.missing);
    this.route('wanted/missing', this.missing);
    this.route('wanted/cutoff', this.cutoff);

    NzbDroneController.prototype.initialize.apply(this, arguments);
  },

  missing: function() {
    this.setTitle('Missing');
    this.showMainRegion(new MissingLayout());
  },

  cutoff: function() {
    this.setTitle('Cutoff Unment');
    this.showMainRegion(new CutoffUnmetLayout());
  }
});