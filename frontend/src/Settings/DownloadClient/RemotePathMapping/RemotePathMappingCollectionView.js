var vent = require('vent');
var Marionette = require('marionette');
var RemotePathMappingItemView = require('./RemotePathMappingItemView');
var EditView = require('./RemotePathMappingEditView');
var RemotePathMappingModel = require('./RemotePathMappingModel');
require('bootstrap');

module.exports = Marionette.CompositeView.extend({
  template: 'Settings/DownloadClient/RemotePathMapping/RemotePathMappingCollectionViewTemplate',
  childViewContainer: '.x-rows',
  childView: RemotePathMappingItemView,

  events: {
    'click .x-add': '_addMapping'
  },

  _addMapping() {
    var model = new RemotePathMappingModel();
    model.collection = this.collection;

    var view = new EditView({
      model: model,
      targetCollection: this.collection
    });

    vent.trigger(vent.Commands.OpenFullscreenModal, view);
  }
});
