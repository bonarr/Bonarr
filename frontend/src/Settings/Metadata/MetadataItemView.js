var vent = require('vent');
var Marionette = require('marionette');
var EditView = require('./MetadataEditView');
var AsModelBoundView = require('Mixins/AsModelBoundView');

var view = Marionette.ItemView.extend({
  template: 'Settings/Metadata/MetadataItemViewTemplate',
  className: 'thingy metadata-item',

  events: {
    'click': '_edit'
  },

  initialize() {
    this.listenTo(this.model, 'sync', this.render);
  },

  _edit() {
    var view = new EditView({ model: this.model });
    vent.trigger(vent.Commands.OpenFullscreenModal, view);
  }
});

module.exports = AsModelBoundView.call(view);