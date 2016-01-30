var _ = require('underscore');
var Marionette = require('marionette');
var SeasonLayout = require('./SeasonLayout');
var AsSortedCollectionView = require('Mixins/AsSortedCollectionView');

var view = Marionette.CollectionView.extend({
  itemView: SeasonLayout,

  initialize(options) {
    if (!options.episodeCollection) {
      throw 'episodeCollection is needed';
    }

    this.episodeCollection = options.episodeCollection;
    this.series = options.series;

    this.listenTo(this.series, 'seasons:expand', this._showHideEpisodes);
  },

  itemViewOptions() {
    return {
      episodeCollection: this.episodeCollection,
      series: this.series
    };
  },

  onEpisodeGrabbed(message) {
    if (message.episode.series.id !== this.episodeCollection.seriesId) {
      return;
    }

    var self = this;

    _.each(message.episode.episodes, function(episode) {
      var ep = self.episodeCollection.get(episode.id);
      ep.set('downloading', true);
    });

    this.render();
  },

  _showHideEpisodes() {
    var allShowingEpisodes = _.every(this.children._views, 'showingEpisodes');

    _.each(this.children._views, function (view) {
      if (allShowingEpisodes) {
        view._hideEpisodes();
      } else {
        view._showEpisodes();
      }
    });
  }
});

AsSortedCollectionView.call(view);

module.exports = view;