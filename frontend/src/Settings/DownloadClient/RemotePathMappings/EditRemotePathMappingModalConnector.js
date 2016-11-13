import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { clearPendingChanges } from 'Stores/Actions/baseActions';
import EditRemotePathMappingModal from './EditRemotePathMappingModal';

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  clearPendingChanges
};

class EditRemotePathMappingModalConnector extends Component {

  //
  // Listeners

  onModalClose = () => {
    this.props.clearPendingChanges({ section: 'remotePathMappings' });
    this.props.onModalClose();
  }

  //
  // Render

  render() {
    return (
      <EditRemotePathMappingModal
        {...this.props}
        onModalClose={this.onModalClose}
      />
    );
  }
}

EditRemotePathMappingModalConnector.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  clearPendingChanges: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRemotePathMappingModalConnector);
