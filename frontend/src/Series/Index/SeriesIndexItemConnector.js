import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createCommandsSelector from 'Stores/Selectors/createCommandsSelector';
import createQualityProfileSelector from 'Stores/Selectors/createQualityProfileSelector';
import { executeCommand } from 'Stores/Actions/commandActions';
import commandNames from 'Commands/commandNames';

function createMapStateToProps() {
  return createSelector(
    (state, { id }) => id,
    createQualityProfileSelector(),
    createCommandsSelector(),
    (seriesId, qualityProfile, commands) => {
      const isRefreshingSeries = _.some(commands, (command) => {
        return command.name === commandNames.REFRESH_SERIES &&
          command.body.seriesId === seriesId;
      });

      return {
        qualityProfile,
        isRefreshingSeries
      };
    }
  );
}

const mapDispatchToProps = {
  executeCommand
};

class SeriesIndexItemConnector extends Component {

  //
  // Listeners

  onRefreshSeriesPress = () => {
    this.props.executeCommand({
      name: commandNames.REFRESH_SERIES,
      seriesId: this.props.id
    });
  }

  //
  // Render

  render() {
    const {
      component: ItemComponent,
      ...otherProps
    } = this.props;

    return (
      <ItemComponent
        {...otherProps}
        onRefreshSeriesPress={this.onRefreshSeriesPress}
      />
    );
  }
}

SeriesIndexItemConnector.propTypes = {
  id: PropTypes.number.isRequired,
  component: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(SeriesIndexItemConnector);
