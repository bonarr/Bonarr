import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchStatus } from 'Stores/Actions/systemActions'
import About from './About';

function mapStateToProps(state) {
  return {
    ...state.system.status
  };
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
    )
  }
}

AboutConnector.propTypes = {
  fetchStatus: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutConnector);
