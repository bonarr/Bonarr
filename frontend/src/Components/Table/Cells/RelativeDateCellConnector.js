import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createUiSettingsSelector from 'Stores/Selectors/createUiSettingsSelector';
import RelativeDateCell from './RelativeDateCell';

function createMapStateToProps() {
  return createSelector(
    createUiSettingsSelector(),
    (uiSettings) => {
      return _.pick(uiSettings, [
        'showRelativeDates',
        'shortDateFormat',
        'longDateFormat',
        'timeFormat'
      ]);
    }
  );
}

const mapDispatchToProps = {
};

function RelativeDateCellConnector(props) {
  return (
    <RelativeDateCell
      {...props}
    />
  );
}

RelativeDateCellConnector.propTypes = {
  date: PropTypes.string.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(RelativeDateCellConnector);
