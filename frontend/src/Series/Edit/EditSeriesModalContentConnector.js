import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import selectSettings from 'Stores/Selectors/selectSettings';
import createSeriesSelector from 'Stores/Selectors/createSeriesSelector';
import { setSeriesValue, saveSeries } from 'Stores/Actions/seriesActions';
import EditSeriesModalContent from './EditSeriesModalContent';

function createMapStateToProps() {
  return createSelector(
    (state) => state.series,
    createSeriesSelector(),
    (seriesState, series) => {
      const {
        saving,
        saveError,
        pendingChanges
      } = seriesState;

      const seriesSettings = _.pick(series, [
        'monitored',
        'seasonFolder',
        'qualityProfileId',
        'seriesType',
        'path',
        'tags'
      ]);

      const settings = selectSettings(seriesSettings, pendingChanges, saveError);

      return {
        title: series.title,
        saving,
        saveError,
        pendingChanges,
        item: settings.settings,
        ...settings
      };
    }
  );
}

const mapDispatchToProps = {
  setSeriesValue,
  saveSeries
};

class EditSeriesModalContentConnector extends Component {

  //
  // Lifecycle

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.saving && !this.props.saving && !this.props.saveError) {
      this.props.onModalClose();
    }
  }

  //
  // Listeners

  onInputChange = ({ name, value }) => {
    this.props.setSeriesValue({ name, value });
  }

  onSavePress = () => {
    this.props.saveSeries({ id: this.props.seriesId });
  }

  //
  // Render

  render() {
    return (
      <EditSeriesModalContent
        {...this.props}
        onInputChange={this.onInputChange}
        onSavePress={this.onSavePress}
      />
    );
  }
}

EditSeriesModalContentConnector.propTypes = {
  seriesId: PropTypes.number,
  saving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  setSeriesValue: PropTypes.func.isRequired,
  saveSeries: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(EditSeriesModalContentConnector);
