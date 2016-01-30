var vent = require('vent');
var Marionette = require('marionette');
var CommandController = require('Commands/CommandController');
var AsModelBoundView = require('Mixins/AsModelBoundView');
var AsValidatedView = require('Mixins/AsValidatedView');

require('Mixins/CopyToClipboard');

var view = Marionette.ItemView.extend({
  template: 'Settings/General/GeneralViewTemplate',

  events: {
    'change .x-auth': '_setAuthOptionsVisibility',
    'change .x-ssl': '_setSslOptionsVisibility',
    'click .x-reset-api-key': '_resetApiKey',
    'change .x-update-mechanism': '_setScriptGroupVisibility'
  },

  ui: {
    authToggle: '.x-auth',
    authOptions: '.x-auth-options',
    sslToggle: '.x-ssl',
    sslOptions: '.x-ssl-options',
    resetApiKey: '.x-reset-api-key',
    copyApiKey: '.x-copy-api-key',
    apiKeyInput: '.x-api-key',
    updateMechanism: '.x-update-mechanism',
    scriptGroup: '.x-script-group'
  },

  initialize() {
    this.listenTo(vent, vent.Events.CommandComplete, this._commandComplete);
  },

  onRender() {
    if (this.ui.authToggle.val() === 'none') {
      this.ui.authOptions.hide();
    }

    if (!this.ui.sslToggle.prop('checked')) {
      this.ui.sslOptions.hide();
    }

    if (!this._showScriptGroup()) {
      this.ui.scriptGroup.hide();
    }

    CommandController.bindToCommand({
      element: this.ui.resetApiKey,
      command: {
        name: 'resetApiKey'
      }
    });
  },

  onShow() {
    this.ui.copyApiKey.copyToClipboard(this.ui.apiKeyInput);
  },

  _setAuthOptionsVisibility() {
    var showAuthOptions = this.ui.authToggle.val() !== 'none';

    if (showAuthOptions) {
      this.ui.authOptions.slideDown();
    } else {
      this.ui.authOptions.slideUp();
    }
  },

  _setSslOptionsVisibility() {
    var showSslOptions = this.ui.sslToggle.prop('checked');

    if (showSslOptions) {
      this.ui.sslOptions.slideDown();
    } else {
      this.ui.sslOptions.slideUp();
    }
  },

  _resetApiKey() {
    if (window.confirm('Reset API Key?')) {
      CommandController.Execute('resetApiKey', {
        name: 'resetApiKey'
      });
    }
  },

  _commandComplete(options) {
    if (options.command.get('name') === 'resetapikey') {
      this.model.fetch();
    }
  },

  _setScriptGroupVisibility() {
    if (this._showScriptGroup()) {
      this.ui.scriptGroup.slideDown();
    } else {
      this.ui.scriptGroup.slideUp();
    }
  },

  _showScriptGroup() {
    return this.ui.updateMechanism.val() === 'script';
  }
});

AsModelBoundView.call(view);
AsValidatedView.call(view);

module.exports = view;

