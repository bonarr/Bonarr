var Marionette = require('marionette');
var ActionBarRegion = require('./Sidebar/ActionBar/ActionBarRegion');
var FullscreenModalRegion = require('./Shared/Modal/FullscreenModalRegion');
var ModalRegion = require('./Shared/Modal/ModalRegion');
var ControlPanelRegion = require('./Shared/ControlPanel/ControlPanelRegion');

var AppLayout = Marionette.Layout.extend({
  regions: {
    navbarRegion: '#navbar-region',
    sidebarRegion: '#sidebar-region',
    mainRegion: '#main-region'
  },

  initialize: function() {
    this.addRegions({
      actionBarRegion: ActionBarRegion,
      fullscreenModalRegion: FullscreenModalRegion,
      modalRegion: ModalRegion,
      controlPanelRegion: ControlPanelRegion
    });
  }
});

module.exports = new AppLayout({el: 'body'});