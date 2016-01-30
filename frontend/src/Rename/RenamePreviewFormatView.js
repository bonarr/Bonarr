var vent = require('vent');
var Marionette = require('marionette');
var NamingModel = require('../Settings/MediaManagement/Naming/NamingModel');

module.exports = Marionette.ItemView.extend({
  template: 'Rename/RenamePreviewFormatView',

  templateHelpers() {
    var type = this.model.get('seriesType');
    return {
      rename: this.naming.get('renameEpisodes'),
      format: this.naming.get(type + 'EpisodeFormat')
    };
  },

  initialize() {
    this.naming = new NamingModel();
    this.naming.fetch();
    this.listenTo(this.naming, 'sync', this.render);
  }
});