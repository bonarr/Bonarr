var _ = require('underscore');
var Marionette = require('marionette');
var TableView = require('../../Table/TableView');
var EpisodeCollection = require('Series/EpisodeCollection');
var LoadingView = require('Shared/LoadingView');
var SelectEpisodeRow = require('./SelectEpisodeRow');
var tpl = require('./SelectEpisodeLayout.hbs');

module.exports = Marionette.LayoutView.extend({
  template: tpl,

  regions: {
    episodes: '.x-episodes'
  },

  events: {
    'click .x-select': '_selectEpisodes'
  },

  headers: [
    {
      name: 'episodeNumber',
      label: '#'
    },
    {
      name: 'title'
    },
    {
      name: 'airDateUtc',
      label: 'Air Date'
    }
  ],

  initialize(options) {
    this.series = options.series;
    this.seasonNumber = options.seasonNumber;
  },

  onRender() {
    this.episodes.show(new LoadingView());

    this.episodeCollection = new EpisodeCollection({ seriesId: this.series.id });
    this.episodeCollection.fetch();

    this.listenToOnce(this.episodeCollection, 'sync', function() {
      this.episodes.show(new TableView({
        collection: this.episodeCollection.bySeason(this.seasonNumber),
        childView: SelectEpisodeRow,
        headers: this.headers,
        selectable: true,
        className: 'table table-hover season-grid'
      }));
    });
  },

  _selectEpisodes() {
    const episodes = _.map(this.episodeCollection.getSelected(), (episode) => {
      return episode.toJSON();
    });

    this.trigger('manualimport:selected:episodes', { episodes });
    this.destroy();
  }
});
