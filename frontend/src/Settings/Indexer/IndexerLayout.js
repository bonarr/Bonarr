import Marionette from 'marionette';
import tpl from './IndexerLayout.hbs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import appStore from 'Stores/appStore';
import IndexerSettings from './IndexerSettings';

module.exports = Marionette.LayoutView.extend({
  template: tpl,

  mountReact: function() {
    ReactDOM.render(
      <Provider store={appStore}>
        <IndexerSettings />
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
  }
});
