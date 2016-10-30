import React, { Component } from 'react';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import SettingsToolbarConnector from 'Settings/SettingsToolbarConnector';
import IndexerOptionsConnector from './Options/IndexerOptionsConnector';

class IndexerSettings extends Component {

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

  setIndexerOptionsRef = (ref) => {
    this._indexerOptions = ref;
  }

  onHasPendingChange = (hasPendingChanges) => {
    this.setState({
      hasPendingChanges
    });
  }

  onSavePress = () => {
    this._indexerOptions.getWrappedInstance().save();
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
          <IndexerOptionsConnector
            ref={this.setIndexerOptionsRef}
            section="indexerSettings"
            onHasPendingChange={this.onHasPendingChange}
          />
        </PageContentBody>
      </PageContent>
    );
  }
}

export default IndexerSettings;
