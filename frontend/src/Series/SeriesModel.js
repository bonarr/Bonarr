var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.Model.extend({
  urlRoot: window.Sonarr.ApiRoot + '/series',

  defaults: {
    episodeFileCount: 0,
    episodeCount: 0,
    isExisting: false,
    status: ''
  },

  setSeasonMonitored: function(seasonNumber) {
    _.each(this.get('seasons'), function(season) {
      if (season.seasonNumber === seasonNumber) {
        season.monitored = !season.monitored;
      }
    });
  },

  setSeasonPass: function(seasonNumber) {
    _.each(this.get('seasons'), function(season) {
      if (season.seasonNumber >= seasonNumber) {
        season.monitored = true;
      } else {
        season.monitored = false;
      }
    });
  }
});