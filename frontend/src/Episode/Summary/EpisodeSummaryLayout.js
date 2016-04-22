const reqres = require('reqres');
const Marionette = require('marionette');
const TableView = require('Table/TableView');
const EpisodeFileModel = require('Series/EpisodeFileModel');
const EpisodeFileCollection = require('Series/EpisodeFileCollection');
const LoadingView = require('Shared/LoadingView');
const EpisodeFileRow = require('./EpisodeFileRow');
const NoFileView = require('./NoFileView');

module.exports = Marionette.LayoutView.extend({
  template: 'Episode/Summary/EpisodeSummaryLayoutTemplate',

  regions: {
    overview: '.episode-overview',
    activity: '.episode-file-info'
  },

  headers: [
    {
      name: 'path'
    },
    {
      name: 'size'
    },
    {
      name: 'quality'
    },
    {
      name: 'actions',
      label: ' '
    }
  ],

  templateHelpers: {},

  initialize(options) {
    if (!this.model.series) {
      this.templateHelpers.series = options.series.toJSON();
    }
  },

  onShow() {
    if (this.model.get('hasFile')) {
      var episodeFileId = this.model.get('episodeFileId');

      if (reqres.hasHandler(reqres.Requests.GetEpisodeFileById)) {
        var episodeFile = reqres.request(reqres.Requests.GetEpisodeFileById, episodeFileId);
        this.episodeFileCollection = new EpisodeFileCollection(episodeFile, { seriesId: this.model.get('seriesId') });
        this.listenTo(episodeFile, 'destroy', this._episodeFileDeleted);

        this._showTable();
      } else {
        this.activity.show(new LoadingView());

        var self = this;
        var newEpisodeFile = new EpisodeFileModel({ id: episodeFileId });
        this.episodeFileCollection = new EpisodeFileCollection(newEpisodeFile, { seriesId: this.model.get('seriesId') });
        var promise = newEpisodeFile.fetch();
        this.listenTo(newEpisodeFile, 'destroy', this._episodeFileDeleted);

        promise.done(function() {
          self._showTable();
        });
      }

      this.listenTo(this.episodeFileCollection, 'add remove', this._collectionChanged);
    } else {
      this._showNoFileView();
    }
  },

  _showTable() {
    this.activity.show(new TableView({
      collection: this.episodeFileCollection,
      childView: EpisodeFileRow,
      headers: this.headers,
      className: 'table table-bordered'
    }));
  },

  _showNoFileView() {
    this.activity.show(new NoFileView());
  },

  _collectionChanged() {
    if (!this.episodeFileCollection.any()) {
      this._showNoFileView();
    } else {
      this._showTable();
    }
  },

  _episodeFileDeleted() {
    this.model.set({
      episodeFileId: 0,
      hasFile: false
    });
  }
});
