const Backbone = require('backbone');

const vent = new Backbone.Wreqr.EventAggregator();

vent.Events = {
  SeriesAdded: 'series:added',
  SeriesDeleted: 'series:deleted',
  CommandComplete: 'command:complete',
  ServerUpdated: 'server:updated',
  EpisodeFileDeleted: 'episodefile:deleted'
};

vent.Commands = {
  EditSeries: 'EditSeries',
  DeleteSeries: 'DeleteSeries',
  OpenFullscreenModal: 'OpenFullscreenModal',
  CloseFullscreenModal: 'CloseFullscreenModal',
  OpenModal: 'OpenModal',
  ShowEpisodeDetails: 'ShowEpisodeDetails',
  ShowHistoryDetails: 'ShowHistoryDetails',
  ShowLogDetails: 'ShowLogDetails',
  SaveSettings: 'saveSettings',
  ShowLogFile: 'showLogFile',
  ShowRenamePreview: 'showRenamePreview',
  ShowManualImport: 'showManualImport',
  OpenFooter: 'OpenFooter',
  OpenActionBarCommand: 'OpenActionBarCommand',
  CloseActionBarCommand: 'CloseActionBarCommand'
};

vent.Hotkeys = {
  NavbarSearch: 'navbar:search',
  SaveSettings: 'settings:save',
  ShowHotkeys: 'hotkeys:show'
};

module.exports = vent;
