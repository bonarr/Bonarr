const Marionette = require('marionette');
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import appStore from 'Stores/appStore';
import MissingConnector from './MissingConnector';

module.exports = Marionette.LayoutView.extend({
  template: 'System/Logs/LogsLayout',

  mountReact() {
    ReactDOM.render(
      <Provider store={appStore}>
        <MissingConnector />
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
  }
});
