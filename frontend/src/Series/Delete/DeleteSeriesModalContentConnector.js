import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createSeriesSelector from 'Stores/Selectors/createSeriesSelector';
import { deleteSeries } from 'Stores/Actions/seriesActions';
import DeleteSeriesModalContent from './DeleteSeriesModalContent';

function createMapStateToProps() {
  return createSelector(
    createSeriesSelector(),
    (series) => {
      return series;
    }
  );
}

const mapDispatchToProps = {
  deleteSeries
};

class DeleteSeriesModalContentConnector extends Component {

  //
  // Listeners

  onDeletePress = (deleteFiles) => {
    this.props.deleteSeries({
      id: this.props.seriesId,
      deleteFiles
    });

    this.props.onModalClose(true);
  }

  //
  // Render

  render() {
    return (
      <DeleteSeriesModalContent
        {...this.props}
        onDeletePress={this.onDeletePress}
      />
    );
  }
}

DeleteSeriesModalContentConnector.propTypes = {
  seriesId: PropTypes.number.isRequired,
  onModalClose: PropTypes.func.isRequired,
  deleteSeries: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(DeleteSeriesModalContentConnector);
