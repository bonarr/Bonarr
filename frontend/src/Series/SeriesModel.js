var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.Model.extend({
  urlRoot: '/series',

  defaults: {
    episodeFileCount: 0,
    episodeCount: 0
  },

  isExisting() {
    return !!this.get('added');
  },

  getRoute() {
    const slug = this.get('titleSlug');
    return `/series/${slug}`;
  },

  toggleSeasonMonitored(seasonNumber) {
    _.each(this.get('seasons'), (season) => {
      if (season.seasonNumber === seasonNumber) {
        season.monitored = !season.monitored;
      }
    });
  },

  setSeasonMonitor(seasonNumber, monitor) {
    _.each(this.get('seasons'), (season) => {
      if (season.seasonNumber === seasonNumber) {
        season.monitored = !!monitor;
      }
    });
  },

  setSeasonPass(seasonNumber) {
    _.each(this.get('seasons'), (season) => {
      season.monitored = season.seasonNumber >= seasonNumber;
    });
  },

  unMonitorAllSeasons() {
    _.each(this.get('seasons'), (season) => {
      season.monitored = false;
    });
  },

  setAddOptions(options) {
    const allSeasons = _.pluck(this.get('seasons'), 'seasonNumber');
    const seasonsNumbers = _.without(allSeasons, 0);

    const addOptions = _.extend(options, {
      ignoreEpisodesWithFiles: false,
      ignoreEpisodesWithoutFiles: false
    });

    switch (options.monitor) {
      case 'all':
        {
          break;
        }
      case 'none':
        {
          this.unMonitorAllSeasons();
          break;
        }
      case 'future':
        {
          addOptions.ignoreEpisodesWithFiles = true;
          addOptions.ignoreEpisodesWithoutFiles = true;
          break;
        }
      case 'latest':
        {
          this.unMonitorAllSeasons();
          this.setSeasonMonitor(_.max(seasonsNumbers), true);
          break;
        }
      case 'first':
        {
          this.unMonitorAllSeasons();
          this.setSeasonMonitor(_.min(seasonsNumbers), true);
          break;
        }
      case 'missing':
        {
          addOptions.ignoreEpisodesWithFiles = true;
          break;
        }
      case 'existing':
        {
          addOptions.ignoreEpisodesWithoutFiles = true;
          break;
        }
    }

    this.set('addOptions', addOptions, {
      silent: true
    });
  }
});
