import React, { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import createProviderSettingsSelector from 'Stores/Selectors/createProviderSettingsSelector';
import { setNotificationValue, setNotificationFieldValue, saveNotification, testNotification } from 'Stores/Actions/settingsActions';
import { fetchTags } from 'Stores/Actions/tagActions';
import connectSection from 'Stores/connectSection';
import EditNotificationModalContent from './EditNotificationModalContent';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.advancedSettings,
    createProviderSettingsSelector(),
    (advancedSettings, notification) => {
      return {
        advancedSettings,
        ...notification
      };
    }
  );
}

const mapDispatchToProps = {
  setNotificationValue,
  setNotificationFieldValue,
  saveNotification,
  testNotification,
  fetchTags
};

class EditNotificationModalContentConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchTags();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.saving && !this.props.saving && !this.props.saveError) {
      this.props.onModalClose();
    }
  }

  //
  // Listeners

  onInputChange = ({ name, value }) => {
    this.props.setNotificationValue({ name, value });
  }

  onFieldChange = ({ name, value }) => {
    this.props.setNotificationFieldValue({ name, value });
  }

  onSavePress = () => {
    this.props.saveNotification({ id: this.props.id });
  }

  onTestPress = () => {
    this.props.testNotification({ id: this.props.id });
  }

  //
  // Render

  render() {
    return (
      <EditNotificationModalContent
        {...this.props}
        onSavePress={this.onSavePress}
        onTestPress={this.onTestPress}
        onInputChange={this.onInputChange}
        onFieldChange={this.onFieldChange}
      />
    );
  }
}

EditNotificationModalContentConnector.propTypes = {
  id: PropTypes.number,
  fetching: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  item: PropTypes.object.isRequired,
  setNotificationValue: PropTypes.func.isRequired,
  setNotificationFieldValue: PropTypes.func.isRequired,
  saveNotification: PropTypes.func.isRequired,
  testNotification: PropTypes.func.isRequired,
  fetchTags: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default connectSection(
  createMapStateToProps,
  mapDispatchToProps,
  undefined,
  undefined,
  { section: 'notifications' }
)(EditNotificationModalContentConnector);
