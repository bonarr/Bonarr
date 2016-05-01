const Marionette = require('marionette');
const BlacklistDetailsView = require('./BlacklistDetailsView');

module.exports = Marionette.LayoutView.extend({
  template: 'Activity/Blacklist/Details/BlacklistDetailsLayoutTemplate',

  regions: {
    bodyRegion: '.modal-body'
  },

  onShow() {
    this.bodyRegion.show(new BlacklistDetailsView({ model: this.model }));
  }
});
