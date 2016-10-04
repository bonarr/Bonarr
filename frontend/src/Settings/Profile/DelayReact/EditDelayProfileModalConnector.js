import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { clearPendingChanges } from 'Stores/Actions/baseActions';
import EditDelayProfileModal from './EditDelayProfileModal';

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  clearPendingChanges
};

class EditDelayProfileModalConnector extends Component {

  //
  // Listeners

  @autobind
  onModalClose() {
    this.props.clearPendingChanges({ section: 'delayProfiles' });
    this.props.onModalClose();
  }

  //
  // Render

  render() {
    return (
      <EditDelayProfileModal
        {...this.props}
        onModalClose={this.onModalClose}
      />
    );
  }
}

EditDelayProfileModalConnector.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  clearPendingChanges: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDelayProfileModalConnector);
