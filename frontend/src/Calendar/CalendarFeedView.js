var Marionette = require('marionette');
var StatusModel = require('../System/StatusModel');
require('../Mixins/CopyToClipboard');

module.exports = Marionette.Layout.extend({
    template : 'Calendar/CalendarFeedView',

    ui : {
        icalUrl  : '.x-ical-url',
        icalCopy : '.x-ical-copy'
    },

    templateHelpers : {
        icalHttpUrl   : window.location.protocol + '//' + window.location.host + StatusModel.get('urlBase') + '/feed/calendar/NzbDrone.ics?apikey=' + window.Sonarr.ApiKey,
        icalWebCalUrl : 'webcal://' + window.location.host + StatusModel.get('urlBase') + '/feed/calendar/NzbDrone.ics?apikey=' + window.Sonarr.ApiKey
    },

    onShow : function() {
        this.ui.icalCopy.copyToClipboard(this.ui.icalUrl);
    }
});