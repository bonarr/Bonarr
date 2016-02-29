const Marionette = require('marionette');
const TableRowMixin = require('Table/TableRowMixin');
const tpl = require('./EpisodeRow.hbs');

const EpisodeRow = Marionette.ItemView.extend({

  className: 'episode-row',
  template: tpl,

  ui: {
    monitored     : '.x-episode-monitored',
    monitoredIcon : '.x-episode-monitored-icon'
  },

  events: {
    'click .x-episode-monitored': 'onMonitoredClick',
    'click .x-episode-title': 'onTitleClick'
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
  }

});

TableRowMixin(EpisodeRow);

module.exports = EpisodeRow;
