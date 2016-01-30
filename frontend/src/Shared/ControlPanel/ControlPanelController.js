var vent = require('vent');
var AppLayout = require('AppLayout');
var Marionette = require('marionette');

module.exports = Marionette.AppRouter.extend({
  initialize() {
    vent.on(vent.Commands.OpenControlPanel, this._openControlPanel, this);
    vent.on(vent.Commands.CloseControlPanel, this._closeControlPanel, this);
  },

  _openControlPanel(view) {
    AppLayout.controlPanelRegion.show(view);
  },

  _closeControlPanel() {
    AppLayout.controlPanelRegion.closePanel();
  }
});