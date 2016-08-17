import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { fetchUpdates } from 'Stores/Actions/systemActions';
import { executeCommand } from 'Stores/Actions/commandActions';
import Updates from './Updates';

// TODO: use reselect for perfomance improvements
function mapStateToProps(state) {
  const {
    fetching,
    items
  } = state.system.updates;

  return {
    fetching,
    items
  };
}

const mapDispatchToProps = {
  fetchUpdates,
  executeCommand
};

class UpdatesConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchUpdates();
  }

  //
  // Listeners

  @autobind
  onInstallLatestPress() {
    this.props.executeCommand({ name: 'applicationUpdate' });
  }

  //
  // Render

  render() {
    return (
      <Updates
        onInstallLatestPress={this.onInstallLatestPress}
        {...this.props}
      />
    );
  }
}

UpdatesConnector.propTypes = {
  fetchUpdates: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatesConnector);
