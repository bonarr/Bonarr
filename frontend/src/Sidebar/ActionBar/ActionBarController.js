const Marionette = require('marionette');
const vent = require('vent');
const appLayout = require('appLayout');
const ActionBarLayout = require('./ActionBarLayout');

module.exports = Marionette.AppRouter.extend({
  initialize() {
    vent.on(vent.Commands.OpenActionBarCommand, this._openActionBar, this);
    vent.on(vent.Commands.CloseActionBarCommand, this._closeActionBar, this);
  },

  _openActionBar(options) {
    const actionBar = new ActionBarLayout(options);
    appLayout.actionBarRegion.show(actionBar);
  },

  _closeActionBar() {
    appLayout.actionBarRegion.empty();
  }
});
