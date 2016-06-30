import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { fetchTasks } from 'Stores/Actions/systemActions';
import { executeCommand } from 'Stores/Actions/commandActions';
import Tasks from './Tasks';

// TODO: use reselect for perfomance improvements
function mapStateToProps(state) {
  const {
    fetching,
    items
  } = state.system.tasks;

  const commands = state.commands.items;

  const tasks = items.map((task) => {
    const executing = _.some(commands, { name: task.taskName });
    return Object.assign({}, task, { executing })
  });

  return {
    fetching,
    items: tasks
  };
}

const mapDispatchToProps = {
  fetchTasks,
  executeCommand
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
  onExecutePress(name) {
    this.props.executeCommand({ name });
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
  fetchTasks: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksConnector);
