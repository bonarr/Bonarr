import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { setUISettingsValue, saveUISettings, fetchUISettings } from 'Stores/Actions/settingsActions';
import UISettings from './UISettings';

function getValidationFailures(saveError, isWarning) {
  if (!saveError || saveError.status !== 400) {
    return [];
  }

  return saveError.responseJSON;
}

// TODO: use reselect for perfomance improvements
function mapStateToProps(state) {
  const {
    fetchingUi: fetching,
    uiError: error,
    ui,
    uiPendingChanges,
    savingUi: saving,
    uiSaveError: saveError
  } = state.settings;

  const validationFailures = getValidationFailures(saveError);

  const settings = _.reduce(Object.assign({}, ui, uiPendingChanges), (result, value, key) => {
    const setting = {
      value,
      pending: uiPendingChanges.hasOwnProperty(key),
      errors: _.filter(validationFailures, (failure) => {
        return failure.propertyName.toLowerCase() === key.toLowerCase() && !failure.isWarning;
      }),
      warnings: _.filter(validationFailures, (failure) => {
        return failure.propertyName.toLowerCase() === key.toLowerCase() && failure.isWarning;
      })
    };

    result[key] = setting;
    return result;
  }, {});

  return {
    fetching,
    error,
    settings,
    saving,
    saveError
  };
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

UISettingsConnector.propTypes = {
  setUISettingsValue: PropTypes.func.isRequired,
  saveUISettings: PropTypes.func.isRequired,
  fetchUISettings: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UISettingsConnector);
