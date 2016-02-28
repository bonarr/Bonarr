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

  onRender() {
    this._setMonitoredState();
  },

  _setMonitoredState() {
    const monitored = this.model.get('monitored');

    this.ui.monitoredIcon.toggleClass('icon-sonarr-monitored', monitored);
    this.ui.monitoredIcon.toggleClass('icon-sonarr-unmonitored', !monitored);

    if (monitored) {
      this.ui.monitored.prop('title', 'Episode monitored, click to unmonitor');
    } else {
      this.ui.monitored.prop('title', 'Episode unmonitored, click to monitor');
    }
  },

  onMonitoredClick(e) {
    e.preventDefault();

    this.model.set('monitored', !this.model.get('monitored'));

    var promise = this.model.save();

    this.ui.monitored.spinForPromise(promise);
    promise.always(() => this._setMonitoredState);
  }

});

TableRowMixin(EpisodeRow);

module.exports = EpisodeRow;
