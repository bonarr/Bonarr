import React, { Component } from 'react';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import SettingsToolbarConnector from 'Settings/SettingsToolbarConnector';
import QualityDefinitionsConnector from './Definition/QualityDefinitionsConnector';

class Quality extends Component {

  //
  // Listeners

  setQualityDefinitionsRef = (ref) => {
    this._qualityDefinitions = ref;
  }

  onSavePress = () => {
    this._qualityDefinitions.getWrappedInstance().save();
  }

  //
  // Render

  render() {
    return (
      <PageContent>
        <SettingsToolbarConnector
          hasPendingChanges={true}
          onSavePress={this.onSavePress}
        />

        <PageContentBody>
          <QualityDefinitionsConnector
            ref={this.setQualityDefinitionsRef}
          />
        </PageContentBody>
      </PageContent>
    );
  }
}

export default Quality;
