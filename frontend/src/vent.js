var Wreqr = require('./JsLibraries/backbone.wreqr');

var vent = new Wreqr.EventAggregator();

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
  CloseModal: 'CloseModal',
  ShowEpisodeDetails: 'ShowEpisodeDetails',
  ShowHistoryDetails: 'ShowHistoryDetails',
  ShowLogDetails: 'ShowLogDetails',
  SaveSettings: 'saveSettings',
  ShowLogFile: 'showLogFile',
  ShowRenamePreview: 'showRenamePreview',
  ShowManualImport: 'showManualImport',
  ShowFileBrowser: 'showFileBrowser',
  OpenControlPanel: 'OpenControlPanel',
  CloseControlPanel: 'CloseControlPanel',
  OpenActionBarCommand: 'OpenActionBarCommand',
  CloseActionBarCommand: 'CloseActionBarCommand'
};

vent.Hotkeys = {
  NavbarSearch: 'navbar:search',
  SaveSettings: 'settings:save',
  ShowHotkeys: 'hotkeys:show'
};

module.exports = vent;
