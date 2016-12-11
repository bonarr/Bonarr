var vent = require('vent');
var reqres = require('reqres');

var appLayout = require('appLayout');
var Marionette = require('marionette');
var EditSeriesView = require('Series/Edit/EditSeriesView');
var DeleteSeriesView = require('Series/Delete/DeleteSeriesView');
var EpisodeDetailsLayout = require('../../Episode/EpisodeDetailsLayout');
var RenamePreviewLayout = require('../../Rename/RenamePreviewLayout');
var FileBrowserLayout = require('../FileBrowser/FileBrowserLayout');

module.exports = Marionette.AppRouter.extend({
  initialize() {
    vent.on(vent.Commands.OpenFullscreenModal, this._openFullscreenModal, this);
    vent.on(vent.Commands.CloseFullscreenModal, this._closeFullscreenModal, this);

    vent.on(vent.Commands.OpenModal, this._openModal, this);

    vent.on(vent.Commands.EditSeries, this._editSeries, this);
    vent.on(vent.Commands.DeleteSeries, this._deleteSeries, this);
    vent.on(vent.Commands.ShowEpisodeDetails, this._showEpisode, this);
    vent.on(vent.Commands.ShowRenamePreview, this._showRenamePreview, this);

    reqres.setHandler(reqres.selectPath, this._selectPath, this);
  },

  _openFullscreenModal(view) {
    appLayout.fullscreenModalRegion.show(view);
  },

  _closeFullscreenModal() {
    appLayout.fullscreenModalRegion.empty();
  },

  _openModal(view) {
    appLayout.modalRegion.show(view);
  },

  _editSeries(options) {
    var view = new EditSeriesView({ model: options.series });
    appLayout.fullscreenModalRegion.show(view);
  },

  _deleteSeries(options) {
    var view = new DeleteSeriesView({ model: options.series });
    appLayout.modalRegion.show(view);
  },

  _showEpisode(options) {
    var view = new EpisodeDetailsLayout({
      model: options.episode,
      hideSeriesLink: options.hideSeriesLink,
      openingTab: options.openingTab
    });
    appLayout.fullscreenModalRegion.show(view);
  },

  _showRenamePreview(options) {
    var view = new RenamePreviewLayout(options);
    appLayout.fullscreenModalRegion.show(view);
  },

  _selectPath(options) {
    var view = new FileBrowserLayout(options);
    appLayout.modalRegion.show(view);
    return view.promise;
  }

});
