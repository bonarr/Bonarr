import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import selectSettings from 'Stores/Selectors/selectSettings';
import { setRemotePathMappingValue, saveRemotePathMapping } from 'Stores/Actions/settingsActions';
import EditRemotePathMappingModalContent from './EditRemotePathMappingModalContent';

const newRemotePathMapping = {
  host: '',
  remotePath: '',
  localPath: ''
};

function createRemotePathMappingSelector() {
  return createSelector(
    (state, { id }) => id,
    (state) => state.settings.remotePathMappings,
    (id, remotePathMappings) => {
      const {
        fetching,
        error,
        saving,
        saveError,
        pendingChanges,
        items
      } = remotePathMappings;

      const mapping = id ? _.find(items, { id }) : newRemotePathMapping;
      const settings = selectSettings(mapping, pendingChanges, saveError);

      return {
        id,
        fetching,
        error,
        saving,
        saveError,
        item: settings.settings,
        ...settings
      };
    }
  );
}

function createMapStateToProps() {
  return createSelector(
    createRemotePathMappingSelector(),
    (remotePathMapping) => {
      return {
        ...remotePathMapping
      };
    }
  );
}

const mapDispatchToProps = {
  setRemotePathMappingValue,
  saveRemotePathMapping
};

class EditRemotePathMappingModalContentConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    if (!this.props.id) {
      Object.keys(newRemotePathMapping).forEach((name) => {
        this.props.setRemotePathMappingValue({
          name,
          value: newRemotePathMapping[name]
        });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.saving && !this.props.saving && !this.props.saveError) {
      this.props.onModalClose();
    }
  }

  //
  // Listeners

  onInputChange = ({ name, value }) => {
    this.props.setRemotePathMappingValue({ name, value });
  }

  onSavePress = () => {
    this.props.saveRemotePathMapping({ id: this.props.id });
  }

  //
  // Render

  render() {
    return (
      <EditRemotePathMappingModalContent
        {...this.props}
        onSavePress={this.onSavePress}
        onInputChange={this.onInputChange}
      />
    );
  }
}

EditRemotePathMappingModalContentConnector.propTypes = {
  id: PropTypes.number,
  saving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  item: PropTypes.object.isRequired,
  setRemotePathMappingValue: PropTypes.func.isRequired,
  saveRemotePathMapping: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(EditRemotePathMappingModalContentConnector);
