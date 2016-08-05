import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchLogFiles } from 'Stores/Actions/systemActions';
import LogFiles from './LogFiles';

// TODO: use reselect for perfomance improvements
function mapStateToProps(state) {
  const {
    fetching,
    items
  } = state.system.logFiles;

  return {
    fetching,
    items
  };
}

const mapDispatchToProps = {
  fetchLogFiles
};

class LogFilesConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchLogFiles();
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

LogFilesConnector.propTypes = {
  fetchLogFiles: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LogFilesConnector);
