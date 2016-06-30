const $ = require('jquery');
const Backbone = require('backbone');
const Marionette = require('marionette');
const RouteBinder = require('jQuery/RouteBinder');
const signalRInitializer = require('Shared/signalRInitializer').default;
const NavbarLayout = require('Navbar/NavbarLayout');
const SidebarLayout = require('Sidebar/SidebarLayout');
const appLayout = require('appLayout');
const AddSeriesController = require('AddSeries/AddSeriesController');
const ActivityController = require('Activity/ActivityController');
const WantedController = require('Wanted/WantedController');
const SettingsController = require('Settings/SettingsController');
const SystemController = require('System/SystemController');
const Router = require('Router');
const ModalController = require('Shared/Modal/ModalController');
const ActionBarController = require('Sidebar/ActionBar/ActionBarController');
const UiSettingsController = require('Shared/UiSettingsController');
const statusModel = require('System/statusModel');
const TagCollection = require('Tags/TagCollection');
const UiSettingsModel = require('Shared/UiSettingsModel');
const SeriesController = require('Series/SeriesController');
const seriesCollection = require('Series/seriesCollection');

require('jQuery/ToTheTop');
require('Instrumentation/StringFormat');
require('LifeCycle');
require('Hotkeys/Hotkeys');
require('Shared/piwikCheck');
require('Shared/VersionChangeMonitor');

new SeriesController();
new AddSeriesController();
new ActivityController();
new WantedController();
new SettingsController();
new SystemController();
new ModalController();
new ActionBarController();
new Router();

const app = new Marionette.Application();

app.addInitializer(() => {
  console.log('starting application');
});

// Preload data
const preloadPromise = $.when(
  statusModel.fetch(),
  TagCollection.fetch(),
  UiSettingsModel.fetch(),
  seriesCollection.fetch()
);

preloadPromise.done(() => {
  app.addInitializer(signalRInitializer.init, { app });
  app.addInitializer(() => {
    Backbone.history.start({
      pushState: true,
      root: window.Sonarr.UrlBase
    });

    RouteBinder.bind();
    appLayout.navbarRegion.show(new NavbarLayout());
    appLayout.sidebarRegion.show(new SidebarLayout());
    // $('body').addClass('started');
  });

  app.addInitializer(UiSettingsController.appInitializer);

  app.addInitializer(() => {
    let footerText = statusModel.get('version');

    if (statusModel.get('branch') !== 'master') {
      footerText += `</br>${statusModel.get('branch')}`;
    }
    $('#footer-region .version').html(footerText);
  });

  app.start();
});

preloadPromise.fail(() => {
  $('#main-region').html('<h2>Loading failed, check console log</h2>');
});
