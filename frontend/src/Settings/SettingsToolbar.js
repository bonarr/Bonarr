import React, { PropTypes } from 'react';
import classNames from 'classNames';
import PageToolbar from 'Components/Page/Toolbar/PageToolbar';
import PageToolbarSection from 'Components/Page/Toolbar/PageToolbarSection';
import PageToolbarButton from 'Components/Page/Toolbar/PageToolbarButton';
import styles from './SettingsToolbar.css';

function SettingsToolbar(props) {
  const {
    advancedSettings,
    saving,
    hasPendingChanges,
    onSavePress,
    onAdvancedSettingsPress
  } = props;

  return (
    <PageToolbar>
      <PageToolbarSection>
        <PageToolbarButton
          iconName="icon-sonarr-save"
          title="Save"
          animate={saving}
          isDisabled={!hasPendingChanges}
          onPress={onSavePress}
        />

        <PageToolbarButton
          className={classNames(
            styles.advancedSettings,
            advancedSettings && styles.advancedSettingsEnabled
          )}
          iconName="icon-sonarr-advanced-settings"
          title="Advanced Settings"
          animate={saving}
          onPress={onAdvancedSettingsPress}
        />
      </PageToolbarSection>
    </PageToolbar>
  );
}

SettingsToolbar.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  hasPendingChanges: PropTypes.bool.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onAdvancedSettingsPress: PropTypes.func.isRequired
};

export default SettingsToolbar;
