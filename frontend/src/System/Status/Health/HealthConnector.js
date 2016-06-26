import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchHealth } from 'Stores/Actions/systemActions'
import Health from './Health';

function mapStateToProps(state) {
  const {
    fetching,
    items
  } = state.system.health;

  return {
    fetching,
    items
  };
}

const mapDispatchToProps = {
  fetchHealth
};

class HealthConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchHealth();
  }

  //
  // Render

  render() {
    return (
      <Health
        {...this.props}
      />
    )
  }
}

HealthConnector.propTypes = {
  fetchHealth: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HealthConnector);
