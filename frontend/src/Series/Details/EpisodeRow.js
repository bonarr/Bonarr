var vent = require('vent');
const Marionette = require('marionette');
const TableRowMixin = require('Table/TableRowMixin');
const EpisodeStatusMixin = require('Table/EpisodeStatusMixin');
const tpl = require('./EpisodeRow.hbs');

const EpisodeRow = Marionette.ItemView.extend({

  className: 'episode-row',
  template: tpl,

  ui: {
    monitored: '.x-episode-monitored'
  },

  events: {
    'click .x-episode-monitored': 'onMonitoredClick',
    'click .x-episode-title': 'onTitleClick',
    'click .x-episode-title a': 'onTitleClick'
  },

  initialize() {
    this.listenTo(this.model, 'change:monitored', this.render);
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
  }

});

TableRowMixin(EpisodeRow);
EpisodeStatusMixin(EpisodeRow);

module.exports = EpisodeRow;
