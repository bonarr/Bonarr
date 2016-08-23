import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import autobind from 'autobind-decorator';
import createSettingsSectionSelector from 'Stores/Selectors/createSettingsSectionSelector';
import { setUISettingsValue, saveUISettings, fetchUISettings } from 'Stores/Actions/settingsActions';
import UISettings from './UISettings';

function createMapStateToProps() {
  return createSelector(
    createSettingsSectionSelector(),
    (sectionSettings) => {
      return {
        ...sectionSettings
      };
    }
  );
}

const mapDispatchToProps = {
  setUISettingsValue,
  saveUISettings,
  fetchUISettings
};

class UISettingsConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchUISettings();
  }

  //
  // Listeners

  @autobind
  onInputChange({ name, value }) {
    this.props.setUISettingsValue({ name, value });
  }

  @autobind
  onSubmit() {
    this.props.saveUISettings();
  }

  //
  // Render

  render() {
    return (
      <UISettings
        onInputChange={this.onInputChange}
        onSubmit={this.onSubmit}
        {...this.props}
      />
    );
  }
}

UISettingsConnector.propTypes = {
  setUISettingsValue: PropTypes.func.isRequired,
  saveUISettings: PropTypes.func.isRequired,
  fetchUISettings: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(UISettingsConnector);
