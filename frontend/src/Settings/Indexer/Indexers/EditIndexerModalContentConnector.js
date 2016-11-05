import React, { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import createProviderSettingsSelector from 'Stores/Selectors/createProviderSettingsSelector';
import { setIndexerValue, setIndexerFieldValue, saveIndexer, testIndexer } from 'Stores/Actions/settingsActions';
import connectSettingsSection from 'Settings/connectSettingsSection';
import EditIndexerModalContent from './EditIndexerModalContent';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.advancedSettings,
    createProviderSettingsSelector(),
    (advancedSettings, indexer) => {
      return {
        advancedSettings,
        ...indexer
      };
    }
  );
}

const mapDispatchToProps = {
  setIndexerValue,
  setIndexerFieldValue,
  saveIndexer,
  testIndexer
};

class EditIndexerModalContentConnector extends Component {

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
    this.props.setIndexerValue({ name, value });
  }

  onFieldChange = ({ name, value }) => {
    this.props.setIndexerFieldValue({ name, value });
  }

  onSavePress = () => {
    this.props.saveIndexer({ id: this.props.id });
  }

  onTestPress = () => {
    this.props.testIndexer({ id: this.props.id });
  }

  //
  // Render

  render() {
    return (
      <EditIndexerModalContent
        {...this.props}
        onSavePress={this.onSavePress}
        onTestPress={this.onTestPress}
        onInputChange={this.onInputChange}
        onFieldChange={this.onFieldChange}
      />
    );
  }
}

EditIndexerModalContentConnector.propTypes = {
  id: PropTypes.number,
  fetching: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  item: PropTypes.object.isRequired,
  setIndexerValue: PropTypes.func.isRequired,
  setIndexerFieldValue: PropTypes.func.isRequired,
  saveIndexer: PropTypes.func.isRequired,
  testIndexer: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default connectSettingsSection(
  createMapStateToProps,
  mapDispatchToProps,
  undefined,
  undefined,
  { section: 'indexers', schemaSection: 'indexerSchema' }
)(EditIndexerModalContentConnector);
