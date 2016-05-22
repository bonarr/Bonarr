const vent = require('vent');
const reqres = require('reqres');
const Marionette = require('marionette');
const CommandController = require('Commands/CommandController');
const tableRowMixin = require('Table/tableRowMixin');
const EpisodeStatusMixin = require('Table/EpisodeStatusMixin');
const tpl = require('./EpisodeRow.hbs');

const EpisodeRow = Marionette.ItemView.extend({

  className: 'episode-row',
  template: tpl,

  ui: {
    monitored: '.x-episode-monitored',
    episodeNumber: '.x-episode-number',
    sceneInfo: '.x-scene-info'
  },

  events: {
    'click .x-episode-monitored': 'onMonitoredClick',
    'click .x-episode-title a': 'onTitleClick',
    'click .x-quick-search': 'onQuickSearchClick',
    'click .x-interactive-search': 'onInteractiveSearchClick',
    'click .x-interactive-search a': 'onInteractiveSearchClick'
  },

  initialize(options = {}) {
    this.series = options.series;
    this.listenTo(this.model, 'change:monitored', this.render);
    this.alternateTitles = [];

    if (reqres.hasHandler(reqres.Requests.GetAlternateNameBySeasonNumber)) {
      if (this.model.get('sceneSeasonNumber') > 0) {
        this.alternateTitles = reqres.request(reqres.Requests.GetAlternateNameBySeasonNumber, this.model.get('seriesId'), this.model.get('sceneSeasonNumber'));
      }

      if (this.alternateTitles.length === 0) {
        this.alternateTitles = reqres.request(reqres.Requests.GetAlternateNameBySeasonNumber, this.model.get('seriesId'), this.model.get('seasonNumber'));
      }
    }
  },

  templateHelpers() {
    return {
      seriesType: this.series.get('seriesType'),
      alternateTitles: this.alternateTitles
    };
  },

  onRender() {
    const animeWithSceneAbsoluteEpisodeNumber = this.series.get('seriesType') && this.model.get('sceneAbsoluteEpisodeNumber');

    if (this.alternateTitles.length ||
        this.model.get('sceneSeasonNumber') ||
        this.model.get('sceneEpisodeNumber') ||
        animeWithSceneAbsoluteEpisodeNumber) {
      this.ui.episodeNumber.popover({
        content: this.ui.sceneInfo.html(),
        html: true,
        trigger: 'hover',
        title: 'Scene Information',
        placement: 'right',
        container: this.$el
      });
    }
  },

  onMonitoredClick(e) {
    e.preventDefault();

    this.model.set('monitored', !this.model.get('monitored'));

    var promise = this.model.save();

    this.ui.monitored.spinForPromise(promise);
    promise.always(() => this.render);
  },

  onTitleClick(e) {
    e.preventDefault();

    vent.trigger(vent.Commands.ShowEpisodeDetails, {
      episode: this.model,
      hideSeriesLink: true
    });
  },

  onQuickSearchClick() {
    CommandController.execute('episodeSearch', {
      name: 'episodeSearch',
      episodeIds: [this.model.get('id')]
    });
  },

  onInteractiveSearchClick(e) {
    e.preventDefault();

    vent.trigger(vent.Commands.ShowEpisodeDetails, {
      episode: this.model,
      hideSeriesLink: true,
      openingTab: 'search'
    });
  }

});

tableRowMixin.apply(EpisodeRow);
EpisodeStatusMixin(EpisodeRow);

module.exports = EpisodeRow;
