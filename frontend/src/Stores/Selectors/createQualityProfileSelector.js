import _ from 'lodash';
import { createSelector } from 'reselect';

function createQualityProfileSelector() {
  return createSelector(
    (state, { qualityProfileId }) => qualityProfileId,
    (state) => state.settings.qualityProfiles.items,
    (qualityProfileId, qualityProfiles) => {
      var test = _.find(qualityProfiles, { id: qualityProfileId });

      return test;
    }
  );
}

export default createQualityProfileSelector;
