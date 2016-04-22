const Marionette = require('marionette');
const tableRowMixin = require('Table/tableRowMixin');
const tpl = require('./EpisodeFileRow.hbs');

const EpisodeFileRow = Marionette.ItemView.extend({

  className: 'episode-file-row',
  template: tpl,

  events: {
    'click .x-delete': '_deleteEpisodeFile'
  },

  _deleteEpisodeFile() {
    if (window.confirm('Are you sure you want to delete \'{0}\' from disk?'.format(this.model.get('path')))) {
      this.model.destroy().done(function() {
        vent.trigger(vent.Events.EpisodeFileDeleted, { episodeFile: self.model });
      });
    }
  }

});

tableRowMixin.apply(EpisodeFileRow);

module.exports = EpisodeFileRow;
