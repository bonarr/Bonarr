import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import CommandController from 'Commands/CommandController';
import { fetchTasks } from 'Stores/Actions/systemActions'
import Tasks from './Tasks';

function mapStateToProps(state) {
  // TODO: Get executing commands so we can show the spinner

  const {
    fetching,
    items
  } = state.system.tasks;

  return {
    fetching,
    items
  };
}

const mapDispatchToProps = {
  fetchTasks
};

class TasksConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchTasks();
  }

  //
  // Listeners

  @autobind
  onExecutePress(taskName) {
    CommandController.execute(taskName, { name: taskName });
  }

  //
  // Render

  render() {
    return (
      <Tasks
        onExecutePress={this.onExecutePress}
        {...this.props}
      />
    )
  }
}

TasksConnector.propTypes = {
  fetchTasks: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksConnector);
