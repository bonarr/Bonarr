import _ from 'lodash';
import { createSelector } from 'reselect';

function createEpisodeSelector() {
  return createSelector(
    (state, { episodeId }) => episodeId,
    (state, { episodeEntity }) => _.get(state, episodeEntity, { items: [] }),
    (episodeId, episodes) => {
      return _.find(episodes.items, { id: episodeId });
    }
  );
}

export default createEpisodeSelector;
