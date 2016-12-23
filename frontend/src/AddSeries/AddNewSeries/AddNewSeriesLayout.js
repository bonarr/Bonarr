const Marionette = require('marionette');
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import appStore from 'Stores/appStore';
import AddNewSeriesConnector from './AddNewSeriesConnector';
import tpl from './AddNewSeriesLayout.hbs';

module.exports = Marionette.LayoutView.extend({
  template: tpl,

  mountReact() {
    ReactDOM.render(
      <Provider store={appStore}>
        <AddNewSeriesConnector />
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

  onDestroy() {
    this.unmountReact();
  }
});
