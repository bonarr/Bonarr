import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { clearPendingChanges } from 'Stores/Actions/baseActions';
import EditIndexerModal from './EditIndexerModal';

const mapDispatchToProps = {
  clearPendingChanges
};

class EditIndexerModalConnector extends Component {

  //
  // Listeners

  onModalClose = () => {
    this.props.clearPendingChanges({ section: 'indexerSchema' });
    this.props.onModalClose();
  }

  //
  // Render

  render() {
    return (
      <EditIndexerModal
        {...this.props}
        onModalClose={this.onModalClose}
      />
    );
  }
}

EditIndexerModalConnector.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  clearPendingChanges: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(EditIndexerModalConnector);
