var $ = require('jquery');
var vent = require('vent');

$(document).ajaxSuccess(function(event, xhr) {
    var version = xhr.getResponseHeader('X-ApplicationVersion');
    if (!version || !window.Sonarr || !window.Sonarr.Version) {
        return;
    }

    if (version !== window.Sonarr.Version) {
        vent.trigger(vent.Events.ServerUpdated);
    }
});
