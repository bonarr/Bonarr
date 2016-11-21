import _ from 'lodash';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import EpisodeAiring from './EpisodeAiring';

// TODO: Get from the state tree
import UiSettings from 'Shared/UiSettingsModel';

function createMapStateToProps() {
  return createSelector(
    () => {
      return _.pick(UiSettings.toJSON(), [
        'shortDateFormat',
        'showRelativeDates',
        'timeFormat'
      ]);
    }
  );
}

export default connect(createMapStateToProps)(EpisodeAiring);
