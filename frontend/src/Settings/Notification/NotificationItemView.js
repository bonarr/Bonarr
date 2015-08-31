var vent = require('vent');
var Marionette = require('marionette');
var EditView = require('./Edit/NotificationEditView');

module.exports = Marionette.ItemView.extend({
  template: 'Settings/Notification/NotificationItemViewTemplate',
  tagName: 'li',

  events: {
    'click': '_edit'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  _edit: function() {
    var view = new EditView({
      model: this.model,
      targetCollection: this.model.collection
    });
    vent.trigger(vent.Commands.OpenFullscreenModal, view);
  }
});