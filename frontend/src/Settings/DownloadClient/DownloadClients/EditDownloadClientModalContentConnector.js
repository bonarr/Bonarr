import React, { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import createProviderSettingsSelector from 'Stores/Selectors/createProviderSettingsSelector';
import { setDownloadClientValue, setDownloadClientFieldValue, saveDownloadClient, testDownloadClient } from 'Stores/Actions/settingsActions';
import connectSection from 'Stores/connectSection';
import EditDownloadClientModalContent from './EditDownloadClientModalContent';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.advancedSettings,
    createProviderSettingsSelector(),
    (advancedSettings, downloadClient) => {
      return {
        advancedSettings,
        ...downloadClient
      };
    }
  );
}

const mapDispatchToProps = {
  setDownloadClientValue,
  setDownloadClientFieldValue,
  saveDownloadClient,
  testDownloadClient
};

class EditDownloadClientModalContentConnector extends Component {

  //
  // Lifecycle

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.saving && !this.props.saving && !this.props.saveError) {
      this.props.onModalClose();
    }
  }

  //
  // Listeners

  onInputChange = ({ name, value }) => {
    this.props.setDownloadClientValue({ name, value });
  }

  onFieldChange = ({ name, value }) => {
    this.props.setDownloadClientFieldValue({ name, value });
  }

  onSavePress = () => {
    this.props.saveDownloadClient({ id: this.props.id });
  }

  onTestPress = () => {
    this.props.testDownloadClient({ id: this.props.id });
  }

  //
  // Render

  render() {
    return (
      <EditDownloadClientModalContent
        {...this.props}
        onSavePress={this.onSavePress}
        onTestPress={this.onTestPress}
        onInputChange={this.onInputChange}
        onFieldChange={this.onFieldChange}
      />
    );
  }
}

EditDownloadClientModalContentConnector.propTypes = {
  id: PropTypes.number,
  fetching: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  item: PropTypes.object.isRequired,
  setDownloadClientValue: PropTypes.func.isRequired,
  setDownloadClientFieldValue: PropTypes.func.isRequired,
  saveDownloadClient: PropTypes.func.isRequired,
  testDownloadClient: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default connectSection(
  createMapStateToProps,
  mapDispatchToProps,
  undefined,
  undefined,
  { section: 'downloadClients' }
)(EditDownloadClientModalContentConnector);
