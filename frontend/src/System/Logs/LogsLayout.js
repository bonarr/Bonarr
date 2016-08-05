const Marionette = require('marionette');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import appStore from 'Stores/appStore';
import Logs from './Logs';

module.exports = Marionette.LayoutView.extend({
  template: 'System/Logs/LogsLayout',

  initialize({ view }) {
    this.view = view;
  },

  mountReact() {
    ReactDOM.render(
      <Provider store={appStore}>
        <Logs view={this.view} />
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
