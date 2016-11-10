import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { clearPendingChanges } from 'Stores/Actions/baseActions';
import EditNotificationModal from './EditNotificationModal';

const mapDispatchToProps = {
  clearPendingChanges
};

class EditNotificationModalConnector extends Component {

  //
  // Listeners

  onModalClose = () => {
    this.props.clearPendingChanges({ section: 'notifications' });
    this.props.onModalClose();
  }

  //
  // Render

  render() {
    return (
      <EditNotificationModal
        {...this.props}
        onModalClose={this.onModalClose}
      />
    );
  }
}

EditNotificationModalConnector.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  clearPendingChanges: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(EditNotificationModalConnector);
