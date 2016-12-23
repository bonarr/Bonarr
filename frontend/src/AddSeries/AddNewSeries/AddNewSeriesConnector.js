import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { lookupSeries, clearAddSeries } from 'Stores/Actions/addSeriesActions';
import { fetchRootFolders } from 'Stores/Actions/rootFolderActions';
import AddNewSeries from './AddNewSeries';

function createMapStateToProps() {
  return createSelector(
    (state) => state.addSeries,
    (addSeries) => {
      return addSeries;
    }
  );
}

const mapDispatchToProps = {
  lookupSeries,
  clearAddSeries,
  fetchRootFolders
};

class AddNewSeriesConnector extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this._seriesLookupTimeout = null;
  }

  componentWillMount() {
    this.props.fetchRootFolders();
  }

  componentWillUnmount() {
    if (this._seriesLookupTimeout) {
      clearTimeout(this._seriesLookupTimeout);
    }
  }

  //
  // Listeners

  onSeriesLookupChange = (term) => {
    if (this._seriesLookupTimeout) {
      clearTimeout(this._seriesLookupTimeout);
    }

    if (term.trim() !== '') {
      this._seriesLookupTimeout = setTimeout(() => {
        this.props.lookupSeries({ term });
      }, 200);
    }
  }

  onClearSeriesLookup = () => {
    this.props.clearAddSeries();
  }

  //
  // Render

  render() {
    return (
      <AddNewSeries
        {...this.props}
        onSeriesLookupChange={this.onSeriesLookupChange}
        onClearSeriesLookup={this.onClearSeriesLookup}
      />
    );
  }
}

AddNewSeriesConnector.propTypes = {
  lookupSeries: PropTypes.func.isRequired,
  clearAddSeries: PropTypes.func.isRequired,
  fetchRootFolders: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(AddNewSeriesConnector);
