import Marionette from 'marionette';
import tpl from'./TaskLayout.hbs';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import appStore from 'Stores/appStore';
import TasksConnector from './TasksConnector';

const StatusLayout = Marionette.LayoutView.extend({
  template: tpl,

  mountReact: function () {
    ReactDOM.render(
      <Provider store={appStore}>
        <TasksConnector />
      </Provider>,
      this.el
    );
  },

  unmountReact: function () {
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

  onClose: function () {
    this.unmountReact();
  }
});

export default StatusLayout;
