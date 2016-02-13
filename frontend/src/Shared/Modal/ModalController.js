var vent = require('vent');
var reqres = require('reqres');

var AppLayout = require('AppLayout');
var Marionette = require('marionette');
var EditSeriesView = require('Series/Edit/EditSeriesView');
var DeleteSeriesView = require('Series/Delete/DeleteSeriesView');
var EpisodeDetailsLayout = require('../../Episode/EpisodeDetailsLayout');
var HistoryDetailsLayout = require('Activity/History/Details/HistoryDetailsLayout');
var LogDetailsView = require('System/Logs/Table/Details/LogDetailsView');
var RenamePreviewLayout = require('../../Rename/RenamePreviewLayout');
var ManualImportLayout = require('../../ManualImport/ManualImportLayout');
var FileBrowserLayout = require('../FileBrowser/FileBrowserLayout');

module.exports = Marionette.AppRouter.extend({
  initialize() {
    vent.on(vent.Commands.OpenFullscreenModal, this._openFullscreenModal, this);
    vent.on(vent.Commands.CloseFullscreenModal, this._closeFullscreenModal, this);

    vent.on(vent.Commands.OpenModal, this._openModal, this);

    vent.on(vent.Commands.EditSeries, this._editSeries, this);
    vent.on(vent.Commands.DeleteSeries, this._deleteSeries, this);
    vent.on(vent.Commands.ShowEpisodeDetails, this._showEpisode, this);
    vent.on(vent.Commands.ShowHistoryDetails, this._showHistory, this);
    vent.on(vent.Commands.ShowLogDetails, this._showLogDetails, this);
    vent.on(vent.Commands.ShowRenamePreview, this._showRenamePreview, this);
    vent.on(vent.Commands.ShowManualImport, this._showManualImport, this);

    reqres.setHandler(reqres.selectPath, this._selectPath, this);
  },

  _openFullscreenModal(view) {
    AppLayout.fullscreenModalRegion.show(view);
  },

  _closeFullscreenModal() {
    AppLayout.fullscreenModalRegion.close();
  },

  _openModal(view) {
    AppLayout.modalRegion.show(view);
  },

  _editSeries(options) {
    var view = new EditSeriesView({ model: options.series });
    AppLayout.fullscreenModalRegion.show(view);
  },

  _deleteSeries(options) {
    var view = new DeleteSeriesView({ model: options.series });
    AppLayout.modalRegion.show(view);
  },

  _showEpisode(options) {
    var view = new EpisodeDetailsLayout({
      model: options.episode,
      hideSeriesLink: options.hideSeriesLink,
      openingTab: options.openingTab
    });
    AppLayout.fullscreenModalRegion.show(view);
  },

  _showHistory(options) {
    var view = new HistoryDetailsLayout({ model: options.model });
    AppLayout.fullscreenModalRegion.show(view);
  },

  _showLogDetails(options) {
    var view = new LogDetailsView({ model: options.model });
    AppLayout.fullscreenModalRegion.show(view);
  },

  _showRenamePreview(options) {
    var view = new RenamePreviewLayout(options);
    AppLayout.fullscreenModalRegion.show(view);
  },

  _showManualImport(options) {
    var view = new ManualImportLayout(options);
    AppLayout.fullscreenModalRegion.show(view);
  },

  _selectPath(options) {
    var view = new FileBrowserLayout(options);
    AppLayout.modalRegion.show(view);
    return view.promise;
  }

});
