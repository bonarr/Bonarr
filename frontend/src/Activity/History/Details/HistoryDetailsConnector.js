import _ from 'lodash';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createUiSettingsSelector from 'Stores/Selectors/createUiSettingsSelector';
import HistoryDetails from './HistoryDetails';

function createMapStateToProps() {
  return createSelector(
    createUiSettingsSelector(),
    (uiSettings) => {
      return _.pick(uiSettings, [
        'shortDateFormat',
        'timeFormat'
      ]);
    }
  );
}

export default connect(createMapStateToProps)(HistoryDetails);
