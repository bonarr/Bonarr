var Marionette = require('marionette');
var ActionBarRegion = require('Sidebar/ActionBar/ActionBarRegion');
var FullscreenModalRegion = require('Shared/Modal/FullscreenModalRegion');
var ModalRegion = require('Shared/Modal/ModalRegion');
var vent = require('vent');

var AppLayout = Marionette.Layout.extend({
  el: 'body',

  regions: {
    navbarRegion: '#navbar-region',
    sidebarRegion: '#sidebar-region',
    mainRegion: '#main-region',
    footerRegion: '#footer-region'
  },

  initialize() {
    this.addRegions({
      actionBarRegion: ActionBarRegion,
      modalRegion: ModalRegion,
      fullscreenModalRegion: FullscreenModalRegion
    });

    this.listenTo(vent, vent.Commands.OpenFooter, (view) => {
      this._showInRegion(this.footerRegion, view);
    });
  },

  _showInRegion(region, view) {
    region.show(view);

    // bind the region to main region
    if (region === this.footerRegion || region === this.actionBarRegion) {
      this.listenToOnce(this.mainRegion, 'close', () => {
        region.close();
      });
    }
  }
});

const appLayout = new AppLayout({

});

module.exports = appLayout;
