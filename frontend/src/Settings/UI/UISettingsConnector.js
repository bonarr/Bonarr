import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { setUISettingsValue, saveUISettings, fetchUISettings } from 'Stores/Actions/settingsActions';
import UISettings from './UISettings';

// TODO: use reselect for perfomance improvements
function mapStateToProps(state) {
  const {
    fetchingUi: fetching,
    uiError: error,
    ui: settings,
    uiPendingChanges: pending,
    savingUi: saving,
    uiSaveError: saveError
  } = state.settings;

  return {
    fetching,
    error,
    settings,
    pending,
    saving,
    saveError
  };
}

const mapDispatchToProps = {
  setUISettingsValue,
  saveUISettings,
  fetchUISettings
};

class UISettingsCSonnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchUISettings();
  }

  //
  // Listeners

  @autobind
  onInputChange({ name, value }) {
    this.props.setUISettingsValue({ property: 'ui', name, value });
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

UISettingsCSonnector.propTypes = {
  setUISettingsValue: PropTypes.func.isRequired,
  saveUISettings: PropTypes.func.isRequired,
  fetchUISettings: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UISettingsCSonnector);
