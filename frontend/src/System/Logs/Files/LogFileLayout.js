const vent = require('vent');
const Marionette = require('marionette');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import appStore from 'Stores/appStore';
import { fetchLogFiles } from 'Stores/Actions/systemActions';
import LogFilesConnector from './LogFilesConnector';

module.exports = Marionette.LayoutView.extend({
  template: 'System/Logs/Files/LogFileLayout',

  initialize(options) {
    this.listenTo(vent, vent.Events.CommandComplete, this._commandComplete);

    this._showActionBar();
  },

  mountReact() {
    ReactDOM.render(
      <Provider store={appStore}>
        <LogFilesConnector />
      </Provider>,
      this.el
    );
  },

  unmountReact() {
    if (this.isRendered) {
      ReactDOM.unmountComponentAtNode(this.el);
    }
  },

  onBeforeRender() {
    this.unmountReact();
  },

  onRender() {
    this.mountReact();
  },

  onClose() {
    this.unmountReact();
  },

  _showActionBar() {
    const actions = {
      type: 'default',
      storeState: false,
      items: [
        {
          tooltip: 'Refresh',
          icon: 'icon-sonarr-refresh',
          callback: this._refreshTable
        },
        {
          tooltip: 'Clear Log Files',
          icon: 'icon-sonarr-clear',
          command: this.deleteFilesCommand,
          successMessage: 'Log files have been deleted',
          errorMessage: 'Failed to delete log files'
        }
      ]
    };

    vent.trigger(vent.Commands.OpenActionBarCommand, {
      parentView: this,
      actions
    });
  },

  _refreshTable(buttonContext) {
    appStore.dispatch(fetchLogFiles());
  },

  _commandComplete(options) {
    if (options.command.get('name') === this.deleteFilesCommand.toLowerCase()) {
      this._refreshTable();
    }
  }
});
