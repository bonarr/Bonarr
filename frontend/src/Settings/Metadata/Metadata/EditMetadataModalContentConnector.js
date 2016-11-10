import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import selectSettings from 'Stores/Selectors/selectSettings';
import { setMetadataValue, setMetadataFieldValue, saveMetadata } from 'Stores/Actions/settingsActions';
import EditMetadataModalContent from './EditMetadataModalContent';

function createMapStateToProps() {
  return createSelector(
    (state, { id }) => id,
    (state) => state.settings.metadata,
    (id, metadata) => {
      const {
        saving,
        saveError,
        pendingChanges,
        items
      } = metadata;

      const settings = selectSettings(_.find(items, { id }), pendingChanges, saveError);

      return {
        id,
        saving,
        saveError,
        item: settings.settings,
        ...settings
      };
    }
  );
}

const mapDispatchToProps = {
  setMetadataValue,
  setMetadataFieldValue,
  saveMetadata
};

class EditMetadataModalContentConnector extends Component {

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
    this.props.setMetadataValue({ name, value });
  }

  onFieldChange = ({ name, value }) => {
    this.props.setMetadataFieldValue({ name, value });
  }

  onSavePress = () => {
    this.props.saveMetadata({ id: this.props.id });
  }

  //
  // Render

  render() {
    return (
      <EditMetadataModalContent
        {...this.props}
        onSavePress={this.onSavePress}
        onInputChange={this.onInputChange}
        onFieldChange={this.onFieldChange}
      />
    );
  }
}

EditMetadataModalContentConnector.propTypes = {
  id: PropTypes.number,
  saving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  item: PropTypes.object.isRequired,
  setMetadataValue: PropTypes.func.isRequired,
  setMetadataFieldValue: PropTypes.func.isRequired,
  saveMetadata: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(EditMetadataModalContentConnector);
