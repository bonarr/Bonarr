import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createSettingsSectionSelector from 'Stores/Selectors/createSettingsSectionSelector';
import { fetchIndexerSettings, setIndexerSettingsValue, saveIndexerSettings } from 'Stores/Actions/settingsActions';
import IndexerOptions from './IndexerOptions';

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
  fetchIndexerSettings,
  setIndexerSettingsValue,
  saveIndexerSettings
};

class IndexerOptionsConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchIndexerSettings();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.hasPendingChanges !== nextProps.hasPendingChanges) {
      this.props.onHasPendingChange(nextProps.hasPendingChanges);
    }
  }

  //
  // Control

  save = () => {
    this.props.saveIndexerSettings();
  }

  //
  // Listeners

  onInputChange = ({ name, value }) => {
    this.props.setIndexerSettingsValue({ name, value });
  }

  //
  // Render

  render() {
    return (
      <IndexerOptions
        onInputChange={this.onInputChange}
        {...this.props}
      />
    );
  }
}

IndexerOptionsConnector.propTypes = {
  hasPendingChanges: PropTypes.bool.isRequired,
  fetchIndexerSettings: PropTypes.func.isRequired,
  setIndexerSettingsValue: PropTypes.func.isRequired,
  saveIndexerSettings: PropTypes.func.isRequired,
  onHasPendingChange: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps, null, { withRef: true })(IndexerOptionsConnector);
