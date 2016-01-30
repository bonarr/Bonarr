var vent = require('vent');
var AppLayout = require('AppLayout');
var Marionette = require('marionette');
var NotFoundView = require('./NotFoundView');
var Messenger = require('./Messenger');

module.exports = Marionette.AppRouter.extend({
  initialize() {
    this.listenTo(vent, vent.Events.ServerUpdated, this._onServerUpdated);
  },

  showNotFound() {
    this.setTitle('Not Found');
    this.showMainRegion(new NotFoundView(this));
  },

  setTitle(title) {
    title = title;
    if (title === 'Sonarr') {
      document.title = 'Sonarr';
    } else {
      document.title = title + ' - Sonarr';
    }

    if (window.Sonarr.Analytics && window.Piwik) {
      try {
        var piwik = window.Piwik.getTracker(window.location.protocol + '//piwik.nzbdrone.com/piwik.php', 1);
        piwik.setReferrerUrl('');
        piwik.setCustomUrl('http://local' + window.location.pathname);
        piwik.setCustomVariable(1, 'version', window.Sonarr.Version, 'page');
        piwik.setCustomVariable(2, 'branch', window.Sonarr.Branch, 'page');
        piwik.trackPageView(title);
      } catch (e) {
        console.error(e);
      }
    }
  },

  _onServerUpdated() {
    var label = window.location.pathname === window.Sonarr.UrlBase + '/system/updates' ? 'Reload' : 'View Changes';

    Messenger.show({
      message: 'Sonarr has been updated',
      hideAfter: 0,
      id: 'sonarrUpdated',
      actions: {
        viewChanges: {
          label: label,
          action() {
            window.location = window.Sonarr.UrlBase + '/system/updates';
          }
        }
      }
    });

    this.pendingUpdate = true;
  },

  showMainRegion(view) {
    if (this.pendingUpdate) {
      window.location.reload();
    } else {
      AppLayout.mainRegion.show(view);
    }
  }
});