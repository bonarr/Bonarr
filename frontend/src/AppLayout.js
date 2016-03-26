var _ = require('underscore');
var Marionette = require('marionette');
var ActionBarRegion = require('Sidebar/ActionBar/ActionBarRegion');
var FullscreenModalRegion = require('Shared/Modal/FullscreenModalRegion');
var ModalRegion = require('Shared/Modal/ModalRegion');
var FooterRegion = require('Layout/Footer/FooterRegion');
var vent = require('vent');

var AppLayout = Marionette.Layout.extend({
  el: 'body',

  ui: {
    footerRegion: '#footer-region'
  },

  regions: {
    navbarRegion: '#navbar-region',
    sidebarRegion: '#sidebar-region',
    mainRegion: '#main-region'
  },

  initialize() {
    this.addRegions({
      actionBarRegion: ActionBarRegion,
      modalRegion: ModalRegion,
      fullscreenModalRegion: FullscreenModalRegion,
      footerRegion: FooterRegion
    });

    // this.$('#footer-region').on('DOMSubtreeModified', _.debounce(this.onFooterResize, 200));

    // this.listenTo(this.footerRegion, 'show', this.onFooterResize);

    this.listenTo(vent, vent.Commands.OpenFooter, (view) => {
      // this.listenTo(footer, 'DOMSubtreeModified', this.onFooterResize);
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
  },

  onFooterResize() {
    console.log('a');
  }
});

const appLayout = new AppLayout({

});

module.exports = appLayout;
