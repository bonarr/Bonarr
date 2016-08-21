import _ from 'lodash';
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
    fetching,
    error,
    item,
    pendingChanges,
    saving,
    saveError
  } = state.settings.ui;

  const validationFailures = getValidationFailures(saveError);

  const settings = _.reduce(Object.assign({}, item, pendingChanges), (result, value, key) => {
    const setting = {
      value,
      pending: pendingChanges.hasOwnProperty(key),
      errors: _.remove(validationFailures, (failure) => {
        return failure.propertyName.toLowerCase() === key.toLowerCase() && !failure.isWarning;
      }),
      warnings: _.remove(validationFailures, (failure) => {
        return failure.propertyName.toLowerCase() === key.toLowerCase() && failure.isWarning;
      })
    };

    result[key] = setting;
    return result;
  }, {});

  const validationErrors = _.filter(validationFailures, (failure) => {
    return !failure.isWarning;
  });

  const validationWarnings = _.filter(validationFailures, (failure) => {
    return failure.isWarning;
  });

  return {
    fetching,
    error,
    settings,
    saving,
    validationErrors,
    validationWarnings,
    hasPendingChanges: !_.isEmpty(pendingChanges)
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

export default connect(mapStateToProps, mapDispatchToProps)(UISettingsConnector);
