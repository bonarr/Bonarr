var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('marionette');
var RouteBinder = require('./jQuery/RouteBinder');
var SignalRBroadcaster = require('./Shared/SignalRBroadcaster');
var NavbarLayout = require('./Navbar/NavbarLayout');
var SidebarLayout = require('./Sidebar/SidebarLayout');
var AppLayout = require('./AppLayout');
var SeriesController = require('./Series/SeriesController');
var AddSeriesController = require('./AddSeries/AddSeriesController');
var ActivityController = require('./Activity/ActivityController');
var WantedController = require('./Wanted/WantedController');
var SettingsController = require('./Settings/SettingsController');
var SystemController = require('./System/SystemController');
var Router = require('./Router');
var ModalController = require('./Shared/Modal/ModalController');
var ActionBarController = require('./Sidebar/ActionBar/ActionBarController');
var UiSettingsController = require('./Shared/UiSettingsController');
var StatusModel = require('./System/StatusModel');
var TagCollection = require('./Tags/TagCollection');
var UiSettingsModel = require('./Shared/UiSettingsModel');
var SeriesCollection = require('./Series/SeriesCollection');

require('./jQuery/ToTheTop');
require('./Instrumentation/StringFormat');
require('./LifeCycle');
require('./Hotkeys/Hotkeys');
require('./Shared/piwikCheck');
require('./Shared/VersionChangeMonitor');

new SeriesController();
new AddSeriesController();
new ActivityController();
new WantedController();
new SettingsController();
new SystemController();
new ModalController();
new ActionBarController();
new Router();

var app = new Marionette.Application();

app.addInitializer(() => {
  console.log('starting application');
});

// Preload data
var preloadPromise = $.when(
  StatusModel.fetch(),
  TagCollection.fetch(),
  UiSettingsModel.fetch(),
  SeriesCollection.fetch()
);

preloadPromise.done(() => {
  app.addInitializer(SignalRBroadcaster.appInitializer, { app: app });
  app.addInitializer(() => {
    Backbone.history.start({
      pushState: true,
      root: window.Sonarr.UrlBase
    });

    RouteBinder.bind();
    AppLayout.navbarRegion.show(new NavbarLayout());
    AppLayout.sidebarRegion.show(new SidebarLayout());
    $('body').addClass('started');
  });

  app.addInitializer(UiSettingsController.appInitializer);

  app.addInitializer(() => {
    var footerText = StatusModel.get('version');

    if (StatusModel.get('branch') !== 'master') {
      footerText += '</br>' + StatusModel.get('branch');
    }
    $('#footer-region .version').html(footerText);
  });

  app.start();
});

preloadPromise.fail(() => {
  $('#main-region').html('<h2>Loading failed, check console log</h2>');
});

module.exports = app;
