import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchDiskSpace } from 'Stores/Actions/systemActions'
import DiskSpace from './DiskSpace';

function mapStateToProps(state) {
  const {
    fetching,
    items
  } = state.system.diskSpace;

  return {
    fetching,
    items
  };
}

const mapDispatchToProps = {
  fetchDiskSpace
};

class DiskSpaceConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchDiskSpace();
  }

  //
  // Render

  render() {
    return (
      <DiskSpace
        {...this.props}
      />
    )
  }
}

DiskSpaceConnector.propTypes = {
  fetchDiskSpace: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DiskSpaceConnector);
