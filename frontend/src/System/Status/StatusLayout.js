const Marionette = require('marionette');
const AboutView = require('./About/AboutView');
const DiskSpaceLayout = require('./DiskSpace/DiskSpaceLayout');
const HealthLayout = require('./Health/HealthLayout');
const MoreInfoView = require('./MoreInfo/MoreInfoView');
const tpl = require('./StatusLayout.hbs');

module.exports = Marionette.LayoutView.extend({
  template: tpl,

  regions: {
    about: '#about',
    diskSpace: '#diskspace',
    health: '#health',
    moreInfo: '#more-info'
  },

  onRender() {
    this.health.show(new HealthLayout());
    this.diskSpace.show(new DiskSpaceLayout());
    this.about.show(new AboutView());
    this.moreInfo.show(new MoreInfoView());
  }
});
