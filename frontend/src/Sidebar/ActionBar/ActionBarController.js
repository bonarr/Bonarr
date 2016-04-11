const Marionette = require('marionette');
const vent = require('vent');
const AppLayout = require('AppLayout');
const ActionBarLayout = require('./ActionBarLayout');

module.exports = Marionette.AppRouter.extend({
  initialize() {
    vent.on(vent.Commands.OpenActionBarCommand, this._openActionBar, this);
    vent.on(vent.Commands.CloseActionBarCommand, this._closeActionBar, this);
  },

  _openActionBar(options) {
    const view = new ActionBarLayout(options);
    AppLayout.actionBarRegion.show(view);
  },

  _closeActionBar() {
    AppLayout.actionBarRegion.empty();
  }
});
