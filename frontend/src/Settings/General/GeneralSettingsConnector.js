import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import createSettingsSectionSelector from 'Stores/Selectors/createSettingsSectionSelector';
import createCommandsSelector from 'Stores/Selectors/createCommandsSelector';
import { setGeneralSettingsValue, saveGeneralSettings, fetchGeneralSettings } from 'Stores/Actions/settingsActions';
import { executeCommand } from 'Stores/Actions/commandActions';
import connectSection from 'Stores/connectSection';
import commandNames from 'Commands/commandNames';
import GeneralSettings from './GeneralSettings';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.advancedSettings,
    createSettingsSectionSelector(),
    createCommandsSelector(),
    (advancedSettings, sectionSettings, commands) => {
      const isResettingApiKey = _.some(commands, { name: commandNames.RESET_API_KEY });

      return {
        advancedSettings,
        isResettingApiKey,
        ...sectionSettings
      };
    }
  );
}

const mapDispatchToProps = {
  setGeneralSettingsValue,
  saveGeneralSettings,
  fetchGeneralSettings,
  executeCommand
};

class GeneralSettingsConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchGeneralSettings();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isResettingApiKey && this.props.isResettingApiKey) {
      this.props.fetchGeneralSettings();
    }
  }

  //
  // Listeners

  onInputChange = ({ name, value }) => {
    this.props.setGeneralSettingsValue({ name, value });
  }

  onSavePress = () => {
    this.props.saveGeneralSettings();
  }

  onConfirmResetApiKey = () => {
    this.props.executeCommand({ name: commandNames.RESET_API_KEY });
  }

  //
  // Render

  render() {
    return (
      <GeneralSettings
        onInputChange={this.onInputChange}
        onSavePress={this.onSavePress}
        onConfirmResetApiKey={this.onConfirmResetApiKey}
        {...this.props}
      />
    );
  }
}

GeneralSettingsConnector.propTypes = {
  isResettingApiKey: PropTypes.bool.isRequired,
  setGeneralSettingsValue: PropTypes.func.isRequired,
  saveGeneralSettings: PropTypes.func.isRequired,
  fetchGeneralSettings: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connectSection(
                createMapStateToProps,
                mapDispatchToProps,
                undefined,
                undefined,
                { section: 'general' }
               )(GeneralSettingsConnector);
