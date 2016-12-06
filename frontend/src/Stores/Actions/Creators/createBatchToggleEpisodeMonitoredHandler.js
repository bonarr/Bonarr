import $ from 'jquery';
import updateEpisodes from 'Utilities/Episode/updateEpisodes';

function createToggleEpisodeMonitoredHandler(section, getFromState) {
  return function(payload) {
    return function(dispatch, getState) {
      const {
        episodeIds,
        monitored
      } = payload;

      updateEpisodes(dispatch, section, getState().wanted.missing.items, episodeIds, {
        isSaving: true
      });

      const promise = $.ajax({
        url: '/episode/monitor',
        method: 'PUT',
        data: JSON.stringify({ episodeIds, monitored }),
        dataType: 'json'
      });

      promise.done(() => {
        updateEpisodes(dispatch, section, getState().wanted.missing.items, episodeIds, {
          isSaving: false,
          monitored
        });
      });

      promise.fail(() => {
        updateEpisodes(dispatch, section, getState().wanted.missing.items, episodeIds, {
          isSaving: false
        });
      });
    };
  };
}

export default createToggleEpisodeMonitoredHandler;
