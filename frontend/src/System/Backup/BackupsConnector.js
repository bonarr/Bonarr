import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { fetchBackups } from 'Stores/Actions/systemActions';
import Backups from './Backups';

// TODO: use reselect for perfomance improvements
function mapStateToProps(state) {
  const {
    fetching,
    items
  } = state.system.backups;

  return {
    fetching,
    items
  };
}

const mapDispatchToProps = {
  fetchBackups
};

class BackupsConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchBackups();
  }

  //
  // Listeners

  @autobind
  onExecutePress(name) {
    this.props.executeCommand({ name });
  }

  //
  // Render

  render() {
    return (
      <Backups
        onExecutePress={this.onExecutePress}
        {...this.props}
      />
    )
  }
}

BackupsConnector.propTypes = {
  fetchBackups: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(BackupsConnector);
