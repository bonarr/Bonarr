import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchNotificationSchema, selectNotificationSchema } from 'Stores/Actions/settingsActions';
import AddNotificationModalContent from './AddNotificationModalContent';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.notifications,
    (notifications) => {
      const {
        fetching,
        error,
        populated,
        schema
      } = notifications;

      return {
        fetching,
        error,
        populated,
        schema
      };
    }
  );
}

const mapDispatchToProps = {
  fetchNotificationSchema,
  selectNotificationSchema
};

class AddNotificationModalContentConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchNotificationSchema();
  }

  //
  // Listeners

  onNotificationSelect = ({ implementation, name }) => {
    this.props.selectNotificationSchema({ implementation, presetName: name });
    this.props.onModalClose({ notificationSelected: true });
  }

  //
  // Render

  render() {
    return (
      <AddNotificationModalContent
        {...this.props}
        onNotificationSelect={this.onNotificationSelect}
      />
    );
  }
}

AddNotificationModalContentConnector.propTypes = {
  fetchNotificationSchema: PropTypes.func.isRequired,
  selectNotificationSchema: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(AddNotificationModalContentConnector);
