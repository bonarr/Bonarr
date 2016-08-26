import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchStatus } from 'Stores/Actions/systemActions';
import About from './About';

function createMapStateToProps() {
  return createSelector(
    (state) => state.system.status,
    (status) => {
      return {
        ...status.item
      };
    }
  );
}

const mapDispatchToProps = {
  fetchStatus
};

class AboutConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchStatus();
  }

  //
  // Render

  render() {
    return (
      <About
        {...this.props}
      />
    );
  }
}

AboutConnector.propTypes = {
  fetchStatus: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(AboutConnector);
