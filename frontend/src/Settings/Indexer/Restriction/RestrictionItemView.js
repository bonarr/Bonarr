var vent = require('vent');
var Marionette = require('marionette');
var EditView = require('./RestrictionEditView');

module.exports = Marionette.ItemView.extend({
  template: 'Settings/Indexer/Restriction/RestrictionItemView',
  className: 'row',

  ui: {
    tags: '.x-tags'
  },

  events: {
    'click .x-edit': '_edit'
  },

  initialize() {
    this.listenTo(this.model, 'sync', this.render);
  },

  _edit() {
    var view = new EditView({
      model: this.model,
      targetCollection: this.model.collection
    });
    vent.trigger(vent.Commands.OpenFullscreenModal, view);
  }
});