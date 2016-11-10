import React from 'react';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import SettingsToolbarConnector from 'Settings/SettingsToolbarConnector';
import NotificationsConnector from './Notifications/NotificationsConnector';

function NotificationSettings() {
  return (
    <PageContent>
      <SettingsToolbarConnector
        showSave={false}
      />

      <PageContentBody>
        <NotificationsConnector />
      </PageContentBody>
    </PageContent>
  );
}

export default NotificationSettings;
