import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchUpdateLogFiles } from 'Stores/Actions/systemActions';
import LogFiles from '../Files/LogFiles';

// TODO: use reselect for perfomance improvements
function mapStateToProps(state) {
  const {
    fetching,
    items
  } = state.system.updateLogFiles;

  return {
    fetching,
    items,
    currentLogView: 'Update Log Files'
  };
}

const mapDispatchToProps = {
  fetchUpdateLogFiles
};

class UpdateLogFilesConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchUpdateLogFiles();
  }

  //
  // Render

  render() {
    return (
      <LogFiles
        {...this.props}
      />
    );
  }
}

UpdateLogFilesConnector.propTypes = {
  fetchUpdateLogFiles: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateLogFilesConnector);
