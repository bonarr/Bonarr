import vent from 'vent';
import Marionette from 'marionette';
import tpl from './LogsTableLayout.hbs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import appStore from 'Stores/appStore';
import { fetchLogs } from 'Stores/Actions/systemActions';
import LogsTableConnector from './LogsTableConnector';

module.exports = Marionette.LayoutView.extend({
  template: tpl,

  regions: {
    grid: '#x-grid',
    pager: '#x-pager'
  },

  attributes: {
    id: 'logs-screen'
  },

  initialize() {
    this.listenTo(vent, vent.Events.CommandComplete, this._commandComplete);

    this._showActionBar();
  },

  mountReact() {
    ReactDOM.render(
      <Provider store={appStore}>
        <LogsTableConnector />
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
          tooltip: 'Clear Logs',
          icon: 'icon-sonarr-clear',
          command: 'clearLog'
        }
      ]
    };

    const filteringOptions = {
      type: 'radio',
      storeState: true,
      menuKey: 'logs.filterMode',
      defaultAction: 'all',
      items: [
        {
          key: 'all',
          title: 'All',
          icon: 'icon-sonarr-all'
        },
        {
          key: 'info',
          title: 'Info',
          icon: 'icon-sonarr-log-info'
        },
        {
          key: 'warn',
          title: 'Warn',
          icon: 'icon-sonarr-log-warn'
        },
        {
          key: 'error',
          title: 'Error',
          icon: 'icon-sonarr-log-error'
        }
      ]
    };

    vent.trigger(vent.Commands.OpenActionBarCommand, {
      parentView: this,
      collection: this.collection,
      actions,
      filtering: filteringOptions
    });
  },

  _refreshTable(buttonContext) {
    appStore.dispatch(fetchLogs());
  },

  _commandComplete(options) {
    if (options.command.get('name') === 'clearlog') {
      this._refreshTable();
    }
  }
});
