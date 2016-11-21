import { createSelector } from 'reselect';

// TODO: Get the qualityProfiles from the state tree
import ProfileCollection from 'Profile/ProfileCollection';

function createQualityProfileSelector() {
  return createSelector(
    (state, { qualityProfileId }) => qualityProfileId,
    (qualityProfileId) => {
      return ProfileCollection.get(qualityProfileId).toJSON();
    }
  );
}

export default createQualityProfileSelector;
