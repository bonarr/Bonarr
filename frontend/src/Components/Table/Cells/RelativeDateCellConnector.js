import _ from 'lodash';
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

export default connect(createMapStateToProps)(RelativeDateCell);
