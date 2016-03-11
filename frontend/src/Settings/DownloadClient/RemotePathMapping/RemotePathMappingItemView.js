var vent = require('vent');
var Marionette = require('marionette');
var EditView = require('./RemotePathMappingEditView');

module.exports = Marionette.ItemView.extend({
  template: 'Settings/DownloadClient/RemotePathMapping/RemotePathMappingItemViewTemplate',
  className: 'row',

  events: {
    'click .x-edit': '_editMapping'
  },

  initialize() {
    this.listenTo(this.model, 'sync', this.render);
  },

  _editMapping() {
    var view = new EditView({
      model: this.model,
      targetCollection: this.model.collection
    });

    vent.trigger(vent.Commands.OpenFullscreenModal, view);
  }
});
