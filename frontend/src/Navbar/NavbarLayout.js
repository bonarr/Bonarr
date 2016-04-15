var $ = require('jquery');
var Marionette = require('marionette');
var vent = require('vent');
var statusModel = require('System/statusModel');
var Messenger = require('Shared/Messenger');

require('./Search');

module.exports = Marionette.LayoutView.extend({
  template: 'Navbar/NavbarLayout',

  ui: {
    searchInput: '.x-navbar-search-input',
    search: '.x-navbar-search'
  },

  events: {
    'click .x-navbar-search': '_onSearchClick',
    'click .x-navbar-restart': '_onRestartClick',
    'click .x-navbar-shutdown': '_onShutdownClick'
  },

  initialize() {
    vent.on(vent.Hotkeys.NavbarSearch, function() {
      this.ui.searchInput.focus();
    });

    this.templateHelpers = {
      authentication: statusModel.get('authentication')
    };
  },

  onShow() {
    this.ui.searchInput.bindSearch();
  },

  _onSearchClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this.ui.search.show();
    this.ui.searchInput.focus();
  },

  _onRestartClick(e) {
    e.preventDefault();

    $.ajax({
      url: '/system/restart',
      type: 'POST'
    });

    Messenger.show({
      message: 'Sonarr will restart shortly',
      type: 'info'
    });
  },

  _onShutdownClick(e) {
    e.preventDefault();

    $.ajax({
      url: '/system/shutdown',
      type: 'POST'
    });

    Messenger.show({
      message: 'Sonarr will shutdown shortly',
      type: 'info'
    });
  }
});
