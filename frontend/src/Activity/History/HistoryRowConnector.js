import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { markAsFailed } from 'Stores/Actions/historyActions';
import createEpisodeSelector from 'Stores/Selectors/createEpisodeSelector';
import createUISettingsSelector from 'Stores/Selectors/createUISettingsSelector';
import HistoryRow from './HistoryRow';

function createMapStateToProps() {
  return createSelector(
    createEpisodeSelector(),
    createUISettingsSelector(),
    (episode, uiSettings) => {
      return {
        episode,
        shortDateFormat: uiSettings.shortDateFormat,
        timeFormat: uiSettings.timeFormat
      };
    }
  );
}

const mapDispatchToProps = {
  markAsFailed
};

class HistoryRowConnector extends Component {

  //
  // Listeners

  onMarkAsFailedPress = () => {
    this.props.markAsFailed(this.props.id);
  }

  //
  // Render

  render() {
    return (
      <HistoryRow
        {...this.props}
        onMarkAsFailedPress={this.onMarkAsFailedPress}
      />
    );
  }
}

HistoryRowConnector.propTypes = {
  id: PropTypes.number.isRequired,
  markAsFailed: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(HistoryRowConnector);
