import React, { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import createThingySettingsSelector from 'Stores/Selectors/createThingySettingsSelector';
import { setIndexerValue, setIndexerFieldValue, saveIndexer } from 'Stores/Actions/settingsActions';
import connectSettingsSection from 'Settings/connectSettingsSection';
import EditIndexerModalContent from './EditIndexerModalContent';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.advancedSettings,
    createThingySettingsSelector(),
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
  saveIndexer
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

  //
  // Render

  render() {
    // if (_.isEmpty(this.props.item.items) && !this.props.fetching) {
    //   return null;
    // }

    return (
      <EditIndexerModalContent
        {...this.state}
        {...this.props}
        onSavePress={this.onSavePress}
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
  onModalClose: PropTypes.func.isRequired
};

export default connectSettingsSection(
  createMapStateToProps,
  mapDispatchToProps,
  undefined,
  undefined,
  { section: 'indexers', schemaSection: 'indexerSchema' }
)(EditIndexerModalContentConnector);
