import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import createSettingsSectionSelector from 'Stores/Selectors/createSettingsSectionSelector';
import createCommandsSelector from 'Stores/Selectors/createCommandsSelector';
import { setGeneralSettingsValue, saveGeneralSettings, fetchGeneralSettings } from 'Stores/Actions/settingsActions';
import { executeCommand, registerFinishCommandHandler, unregisterFinishCommandHandler } from 'Stores/Actions/commandActions';
import connectSettingsSection from 'Settings/connectSettingsSection';
import GeneralSettings from './GeneralSettings';

const resetApiKeyCommandName = 'ResetApiKey';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.advancedSettings,
    createSettingsSectionSelector(),
    createCommandsSelector(),
    (advancedSettings, sectionSettings, commands) => {
      const isResettingApiKey = _.some(commands, { name: resetApiKeyCommandName });

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
  executeCommand,
  registerFinishCommandHandler,
  unregisterFinishCommandHandler
};

class GeneralSettingsConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.registerFinishCommandHandler({
      key: 'fetchGeneralSettings',
      name: resetApiKeyCommandName,
      handler: fetchGeneralSettings
    });

    this.props.fetchGeneralSettings();
  }

  componentWillUnmount() {
    this.props.unregisterFinishCommandHandler({ key: 'fetchGeneralSettings' });
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
    this.props.executeCommand({ name: 'resetApiKey' });
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
  setGeneralSettingsValue: PropTypes.func.isRequired,
  saveGeneralSettings: PropTypes.func.isRequired,
  fetchGeneralSettings: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired,
  registerFinishCommandHandler: PropTypes.func.isRequired,
  unregisterFinishCommandHandler: PropTypes.func.isRequired
};

export default connectSettingsSection(
                createMapStateToProps,
                mapDispatchToProps,
                undefined,
                undefined,
                { section: 'general' }
               )(GeneralSettingsConnector);
