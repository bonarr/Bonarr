var $ = require('jquery');
var Marionette = require('marionette');
var vent = require('vent');
var StatusModel = require('System/StatusModel');
var Messenger = require('Shared/Messenger');

require('./Search');

module.exports = Marionette.Layout.extend({
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

  initialize: function() {
    vent.on(vent.Hotkeys.NavbarSearch, function() {
      this.ui.searchInput.focus();
    });

    this.templateHelpers = {
      authentication: StatusModel.get('authentication')
    };
  },

  onShow: function() {
    this.ui.searchInput.bindSearch();
  },

  _onSearchClick: function(e) {
    e.preventDefault();
    e.stopPropagation();

    this.ui.search.show();
    this.ui.searchInput.focus();
  },

  _onRestartClick: function(e) {
    e.preventDefault();

    $.ajax({
      url: window.Sonarr.ApiRoot + '/system/restart',
      type: 'POST'
    });

    Messenger.show({
      message: 'Sonarr will restart shortly',
      type: 'info'
    });
  },

  _onShutdownClick: function(e) {
    e.preventDefault();

    $.ajax({
      url: window.Sonarr.ApiRoot + '/system/shutdown',
      type: 'POST'
    });

    Messenger.show({
      message: 'Sonarr will shutdown shortly',
      type: 'info'
    });
  }
});
