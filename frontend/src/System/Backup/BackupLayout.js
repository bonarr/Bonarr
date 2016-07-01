import vent from 'vent';
import Marionette from 'marionette';
import tpl from './BackupLayout.hbs';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import appStore from 'Stores/appStore';
import BackupsConnector from './BackupsConnector';

module.exports = Marionette.LayoutView.extend({
  template: 'System/Backup/BackupLayoutTemplate',

  ui: {
    backups: '#x-backups'
  },

  headers: [
    {
      name: 'type',
      label: ''
    },
    {
      name: 'name',
      label: 'Name'
    },
    {
      name: 'time',
      label: 'Time'
    }
  ],

  leftSideButtons: {
    type: 'default',
    storeState: false,
    collapse: false,
    items: [
      {
        title: 'Backup',
        icon: 'icon-sonarr-file-text',
        command: 'backup',
        properties: { type: 'manual' },
        successMessage: 'Database and settings were backed up successfully',
        errorMessage: 'Backup Failed!'
      }
    ]
  },

  initialize() {
    this._showActionBar();
  },

  mountReact: function () {
    ReactDOM.render(
      <Provider store={appStore}>
        <BackupsConnector />
      </Provider>,
      this.ui.backups[0]
    );
  },

  unmountReact: function () {
    if (this.isRendered) {
      ReactDOM.unmountComponentAtNode(this.ui.backups[0]);
    }
  },

  onBeforeRender() {
    this.unmountReact();
  },

  onRender() {
    this.mountReact();
  },

  onClose: function () {
    this.unmountReact();
  },

  _showActionBar() {
    var actions = {
      items: [
        {
          tooltip: 'Backup',
          icon: 'icon-sonarr-file-text',
          command: 'backup',
          properties: { type: 'manual' },
          successMessage: 'Database and settings were backed up successfully',
          errorMessage: 'Backup Failed!'
        }
      ]
    };

    vent.trigger(vent.Commands.OpenActionBarCommand, {
      parentView: this,
      actions: actions
    });
  }
});
