import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import autobind from 'autobind-decorator';
import { toggleAdvancedSettings } from 'Stores/Actions/settingsActions';
import SettingsToolbar from './SettingsToolbar';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.advancedSettings,
    (advancedSettings) => {
      return {
        advancedSettings
      };
    }
  );
}

const mapDispatchToProps = {
  toggleAdvancedSettings
};

class SettingsToolbarConnector extends Component {

  //
  // Listeners

  @autobind
  onAdvancedSettingsPress() {
    this.props.toggleAdvancedSettings();
  }

  //
  // Render

  render() {
    return (
      <SettingsToolbar
        onSavePress={this.props.onSavePress}
        onAdvancedSettingsPress={this.onAdvancedSettingsPress}
        {...this.props}
      />
    );
  }
}

SettingsToolbarConnector.propTypes = {
  onSavePress: PropTypes.func,
  toggleAdvancedSettings: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(SettingsToolbarConnector);
