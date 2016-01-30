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

  getRoute() {
    const slug = this.get('titleSlug');
    return `${window.Sonarr.UrlBase}series/${slug}`;
  },

  setSeasonMonitored(seasonNumber) {
    _.each(this.get('seasons'), (season) => {
      if (season.seasonNumber === seasonNumber) {
        season.monitored = !season.monitored;
      }
    });
  },

  setSeasonPass(seasonNumber) {
    _.each(this.get('seasons'), (season) => {
      if (season.seasonNumber >= seasonNumber) {
        season.monitored = true;
      } else {
        season.monitored = false;
      }
    });
  }
});
