const _ = require('underscore');
const reqres = require('reqres');
const Backbone = require('Backbone');
const QueueCollection = require('Activity/Queue/QueueCollection');

function EpisodeStatusMixin({ prototype: base }) {
  const superTemplateHelpers = base.templateHelpers;
  const superinitialize = base.initialize;

  const extentions = {
    initialize(options = {}) {
      this.selectable = options.selectable;
      this.listenTo(QueueCollection, 'sync', this._episodeStatus_onQueueSync);

      if (superinitialize) {
        superinitialize.apply(this, arguments);
      }
    },

    templateHelpers() {
      if (this.episodeFile) {
        this.stopListening(this.episodeFile, 'change', this._refresh);
      }

      const superHelpers = superTemplateHelpers ? _.result(superTemplateHelpers) : {};
      this.episodeFile = this._episodeStatus_getEpisodeFile();

      if (this.episodeFile) {
        this.listenTo(this.episodeFile, 'change', this._refresh);

        return _.extend(superHelpers, {
          episodeFile: this.episodeFile.toJSON()
        });
      } else {
        return superHelpers;
      }
    },

    _episodeStatus_onQueueSync() {
      const downloading = QueueCollection.findEpisode(this.model.id);

      if (downloading) {
        this.render();
      }
    },

    _episodeStatus_getEpisodeFile() {
      const hasFile = this.model.get('hasFile');

      if (hasFile) {
        let episodeFile;

        if (reqres.hasHandler(reqres.Requests.GetEpisodeFileById)) {
          episodeFile = reqres.request(reqres.Requests.GetEpisodeFileById, this.model.get('episodeFileId'));
        } else if (this.model.has('episodeFile')) {
          episodeFile = new Backbone.Model(this.model.has('episodeFile'));
        }

        if (episodeFile) {
          return episodeFile;
        }
      }
    }
  };

  base = _.extend(base, extentions);
}

module.exports = EpisodeStatusMixin;
