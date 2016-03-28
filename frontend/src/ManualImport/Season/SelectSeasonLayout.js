var Marionette = require('marionette');

module.exports = Marionette.LayoutView.extend({
  template: 'ManualImport/Season/SelectSeasonLayoutTemplate',

  events: {
    'change .x-select-season': '_selectSeason'
  },

  initialize(options) {
    this.templateHelpers = {
      seasons: options.seasons
    };
  },

  _selectSeason(e) {
    var seasonNumber = parseInt(e.target.value, 10);

    if (seasonNumber === -1) {
      return;
    }

    this.trigger('manualimport:selected:season', { seasonNumber: seasonNumber });
    this.close();
  }
});
