var vent = require('vent');
var Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: 'Rename/RenamePreviewInfoView',

  initialize({ naming, renameCollection }) {
    this.naming = naming;
    this.renameCollection = renameCollection;
  },

  serializeData() {
    var type = this.model.get('seriesType');
    return {
      episodesToRename: this.renameCollection.length > 0,
      path: this.model.get('path'),
      rename: this.naming.get('renameEpisodes'),
      format: this.naming.get(type + 'EpisodeFormat'),
      seasonFormat: this.naming.get('seasonFolderFormat')
    };
  }
});