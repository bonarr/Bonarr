import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import autobind from 'autobind-decorator';
import createSettingsSectionSelector from 'Stores/Selectors/createSettingsSectionSelector';
import { fetchMediaManagementSettings, setMediaManagementSettingsValue, saveMediaManagementSettings, saveNamingSettings } from 'Stores/Actions/settingsActions';
import MediaManagement from './MediaManagement';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.advancedSettings,
    (state) => state.settings.naming,
    createSettingsSectionSelector(),
    (advancedSettings, namingSettings, sectionSettings) => {
      return {
        advancedSettings,
        ...sectionSettings,
        hasPendingChanges: !_.isEmpty(namingSettings.pendingChanges) || sectionSettings.hasPendingChanges
      };
    }
  );
}

const mapDispatchToProps = {
  fetchMediaManagementSettings,
  setMediaManagementSettingsValue,
  saveMediaManagementSettings,
  saveNamingSettings
};

class MediaManagementConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchMediaManagementSettings();
  }

  //
  // Listeners

  @autobind
  onInputChange({ name, value }) {
    this.props.setMediaManagementSettingsValue({ name, value });
  }

  @autobind
  onSavePress() {
    this.props.saveMediaManagementSettings();
    this.props.saveNamingSettings();
  }

  //
  // Render

  render() {
    return (
      <MediaManagement
        onInputChange={this.onInputChange}
        onSavePress={this.onSavePress}
        {...this.props}
      />
    );
  }
}

MediaManagementConnector.propTypes = {
  fetchMediaManagementSettings: PropTypes.func.isRequired,
  setMediaManagementSettingsValue: PropTypes.func.isRequired,
  saveMediaManagementSettings: PropTypes.func.isRequired,
  saveNamingSettings: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(MediaManagementConnector);
