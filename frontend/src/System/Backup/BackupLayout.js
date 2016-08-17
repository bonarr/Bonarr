import Marionette from 'marionette';
import tpl from './BackupLayout.hbs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import appStore from 'Stores/appStore';
import BackupsConnector from './BackupsConnector';

module.exports = Marionette.LayoutView.extend({
  template: tpl,

  mountReact: function() {
    ReactDOM.render(
      <Provider store={appStore}>
        <BackupsConnector />
      </Provider>,
      this.el
    );
  },

  unmountReact: function() {
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

  onClose: function() {
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
    //
    // vent.trigger(vent.Commands.OpenActionBarCommand, {
    //   parentView: this,
    //   actions: actions
    // });
  }
});
