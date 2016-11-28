import React, { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import createSettingsSectionSelector from 'Stores/Selectors/createSettingsSectionSelector';
import { fetchDownloadClientOptions, setDownloadClientOptionsValue, saveDownloadClientOptions } from 'Stores/Actions/settingsActions';
import connectSection from 'Stores/connectSection';
import DownloadClientOptions from './DownloadClientOptions';

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
  fetchDownloadClientOptions,
  setDownloadClientOptionsValue,
  saveDownloadClientOptions
};

class DownloadClientOptionsConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchDownloadClientOptions();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.hasPendingChanges !== nextProps.hasPendingChanges) {
      this.props.onHasPendingChange(nextProps.hasPendingChanges);
    }
  }

  //
  // Control

  save = () => {
    this.props.saveDownloadClientOptions();
  }

  //
  // Listeners

  onInputChange = ({ name, value }) => {
    this.props.setDownloadClientOptionsValue({ name, value });
  }

  //
  // Render

  render() {
    return (
      <DownloadClientOptions
        onInputChange={this.onInputChange}
        {...this.props}
      />
    );
  }
}

DownloadClientOptionsConnector.propTypes = {
  hasPendingChanges: PropTypes.bool.isRequired,
  fetchDownloadClientOptions: PropTypes.func.isRequired,
  setDownloadClientOptionsValue: PropTypes.func.isRequired,
  saveDownloadClientOptions: PropTypes.func.isRequired,
  onHasPendingChange: PropTypes.func.isRequired
};

export default connectSection(
                createMapStateToProps,
                mapDispatchToProps,
                undefined,
                { withRef: true },
                { section: 'downloadClientOptions' }
               )(DownloadClientOptionsConnector);
