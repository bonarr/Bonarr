var Marionette = require('marionette');
require('Mixins/CopyToClipboard');
var tpl = require('./CalendarFeedView.hbs');

module.exports = Marionette.LayoutView.extend({
  template: tpl,

  ui: {
    icalUrl: '.x-ical-url',
    icalCopy: '.x-ical-copy'
  },

  templateHelpers: {
    icalHttpUrl: `${window.location.origin}${window.Sonarr.UrlBase}/feed/calendar/NzbDrone.ics?apikey=${window.Sonarr.ApiKey}`,
    icalWebCalUrl:  `webcal://${window.location.host}${window.Sonarr.UrlBase}/feed/calendar/NzbDrone.ics?apikey=${window.Sonarr.ApiKey}`
  },

  onShow() {
    this.ui.icalCopy.copyToClipboard(this.ui.icalUrl);
  }
});
