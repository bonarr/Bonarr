import React from 'react';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import SettingsToolbarConnector from 'Settings/SettingsToolbarConnector';
import QualityProfilesConnector from './Quality/QualityProfilesConnector';

function Profiles(props) {
  return (
    <PageContent>
      <SettingsToolbarConnector
        showSave={false}
      />

      <PageContentBody>
        <QualityProfilesConnector />
        <div>Delay Profiles</div>
      </PageContentBody>
    </PageContent>
  );
}

export default Profiles;
