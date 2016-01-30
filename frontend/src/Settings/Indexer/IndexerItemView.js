var vent = require('vent');
var Marionette = require('marionette');
var EditView = require('./Edit/IndexerEditView');

module.exports = Marionette.ItemView.extend({
  template: 'Settings/Indexer/IndexerItemView',
  className: 'indexer-item thingy',

  events: {
    'click': '_edit'
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