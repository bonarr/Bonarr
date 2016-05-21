const Marionette = require('marionette');
const ActionBarRegion = require('Sidebar/ActionBar/ActionBarRegion');
const FullscreenModalRegion = require('Shared/Modal/FullscreenModalRegion');
const ModalRegion = require('Shared/Modal/ModalRegion');
const FooterRegion = require('Layout/Footer/FooterRegion');
const vent = require('vent');

const AppLayout = Marionette.LayoutView.extend({
  el: 'body',

  regions: {
    navbarRegion: '#navbar-region',
    sidebarRegion: '#sidebar-region',
    mainRegion: '#main-region',
    actionBarRegion: ActionBarRegion,
    modalRegion: ModalRegion,
    fullscreenModalRegion: FullscreenModalRegion,
    footerRegion: FooterRegion
  },

  initialize() {
    this.listenTo(vent, vent.Commands.OpenFooter, (view) => {
      this._showInRegion(this.footerRegion, view);
    });

    const $contentWrapper = this.$('#content-wrapper');

    this.listenTo(this.mainRegion, 'show', () => {
      // reset scroll state when main region is replaces
      $contentWrapper.scrollTop(0);
    });
  },

  _showInRegion(region, view) {
    region.show(view);

    // bind the region to main region
    if (region === this.footerRegion || region === this.actionBarRegion) {
      this.listenToOnce(this.mainRegion, 'empty', () => region.empty());
    }
  }
});

const appLayout = new AppLayout();

module.exports = appLayout;
