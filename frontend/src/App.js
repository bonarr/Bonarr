import React, { Component } from 'react';
import { Provider } from 'react-redux';
import SonarrApp from './SonarrApp';
import appStore from 'Stores/appStore';

class App extends Component {
  render() {
    return (
      <Provider store={appStore}>
        <SonarrApp />
      </Provider>
    );
  }
}

export default App;
