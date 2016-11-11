import React, { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import autobind from 'autobind-decorator';
import createSettingsSectionSelector from 'Stores/Selectors/createSettingsSectionSelector';
import { setGeneralSettingsValue, saveGeneralSettings, fetchGeneralSettings } from 'Stores/Actions/settingsActions';
import connectSettingsSection from 'Settings/connectSettingsSection';
import GeneralSettings from './GeneralSettings';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.advancedSettings,
    createSettingsSectionSelector(),
    (advancedSettings, sectionSettings) => {
      return {
        advancedSettings,
        ...sectionSettings
      };
    }
  );
}

const mapDispatchToProps = {
  setGeneralSettingsValue,
  saveGeneralSettings,
  fetchGeneralSettings
};

class GeneralSettingsConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchGeneralSettings();
  }

  //
  // Listeners

  @autobind
  onInputChange({ name, value }) {
    this.props.setGeneralSettingsValue({ name, value });
  }

  @autobind
  onSavePress() {
    this.props.saveGeneralSettings();
  }

  //
  // Render

  render() {
    return (
      <GeneralSettings
        onInputChange={this.onInputChange}
        onSavePress={this.onSavePress}
        {...this.props}
      />
    );
  }
}

GeneralSettingsConnector.propTypes = {
  setGeneralSettingsValue: PropTypes.func.isRequired,
  saveGeneralSettings: PropTypes.func.isRequired,
  fetchGeneralSettings: PropTypes.func.isRequired
};

export default connectSettingsSection(
                createMapStateToProps,
                mapDispatchToProps,
                undefined,
                undefined,
                { section: 'general' }
               )(GeneralSettingsConnector);
