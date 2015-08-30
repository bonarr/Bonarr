var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('marionette');
var RouteBinder = require('./jQuery/RouteBinder');
var SignalRBroadcaster = require('./Shared/SignalRBroadcaster');
var NavbarLayout = require('./Navbar/NavbarLayout');
var SidebarLayout = require('./Sidebar/SidebarLayout');
var AppLayout = require('./AppLayout');
var SeriesController = require('./Series/SeriesController');
var ActivityController = require('./Activity/ActivityController');
var WantedController = require('./Wanted/WantedController');
var SettingsController = require('./Settings/SettingsController');
var SystemController = require('./System/SystemController');
var Router = require('./Router');
var ModalController = require('./Shared/Modal/ModalController');
var ControlPanelController = require('./Shared/ControlPanel/ControlPanelController');
var ActionBarController = require('./Sidebar/ActionBar/ActionBarController');
var serverStatusModel = require('./System/StatusModel');
var Tooltip = require('./Shared/Tooltip');
var UiSettingsController = require('./Shared/UiSettingsController');

require('./jQuery/ToTheTop');
require('./Instrumentation/StringFormat');
require('./LifeCycle');
require('./Hotkeys/Hotkeys');
require('./Shared/piwikCheck');
require('./Shared/VersionChangeMonitor');

new SeriesController();
new ActivityController();
new WantedController();
new SettingsController();
new SystemController();
new ModalController();
new ControlPanelController();
new ActionBarController();
new Router();

var app = new Marionette.Application();

app.addInitializer(function() {
    console.log('starting application');
});

app.addInitializer(SignalRBroadcaster.appInitializer, { app : app });

app.addInitializer(Tooltip.appInitializer, { app : app });

app.addInitializer(function() {
    Backbone.history.start({
        pushState : true,
        root      : serverStatusModel.get('urlBase')
    });
    RouteBinder.bind();
    AppLayout.navbarRegion.show(new NavbarLayout());
    AppLayout.sidebarRegion.show(new SidebarLayout());
    $('body').addClass('started');
});

app.addInitializer(UiSettingsController.appInitializer);

app.addInitializer(function() {
    var footerText = serverStatusModel.get('version');
    if (serverStatusModel.get('branch') !== 'master') {
        footerText += '</br>' + serverStatusModel.get('branch');
    }
    $('#footer-region .version').html(footerText);
});

app.start();

module.exports = app;
