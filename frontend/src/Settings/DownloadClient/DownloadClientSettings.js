import React, { Component } from 'react';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import SettingsToolbarConnector from 'Settings/SettingsToolbarConnector';
import DownloadClientsConnector from './DownloadClients/DownloadClientsConnector';
// import DownloadClientOptionsConnector from './Options/DownloadClientOptionsConnector';
// import RemotePathMappingsConnector from './RemotePathMappings/RemotePathMappingsConnector';

class DownloadClientSettings extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      hasPendingChanges: false
    };
  }

  //
  // Listeners

  setDownloadClientOptionsRef = (ref) => {
    this._downloadClientOptions = ref;
  }

  onHasPendingChange = (hasPendingChanges) => {
    this.setState({
      hasPendingChanges
    });
  }

  onSavePress = () => {
    this._downloadClientOptions.getWrappedInstance().save();
  }

  //
  // Render

  render() {
    return (
      <PageContent>
        <SettingsToolbarConnector
          hasPendingChanges={this.state.hasPendingChanges}
          onSavePress={this.onSavePress}
        />

        <PageContentBody>
          <DownloadClientsConnector />

          {/* <DownloadClientOptionsConnector
            ref={this.setDownloadClientOptionsRef}
            onHasPendingChange={this.onHasPendingChange}
            />

          <RemotePathMappingsConnector /> */}
        </PageContentBody>
      </PageContent>
    );
  }
}

export default DownloadClientSettings;
