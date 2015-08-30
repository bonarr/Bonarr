var vent = require('vent');
var AppLayout = require('../../AppLayout');
var Marionette = require('marionette');

module.exports = Marionette.AppRouter.extend({
    initialize : function() {
        vent.on(vent.Commands.OpenControlPanel, this._openControlPanel, this);
        vent.on(vent.Commands.CloseControlPanel, this._closeControlPanel, this);
    },

    _openControlPanel : function(view) {
        AppLayout.controlPanelRegion.show(view);
    },

    _closeControlPanel : function() {
        AppLayout.controlPanelRegion.closePanel();
    }
});