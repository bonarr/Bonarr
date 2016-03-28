var $ = require('jquery');
var vent = require('vent');
var Marionette = require('marionette');
var HistoryDetailsView = require('./HistoryDetailsView');
var tpl = require('./HistoryDetailsLayout.hbs');

module.exports = Marionette.LayoutView.extend({
  template: tpl,

  regions: {
    bodyRegion: '.x-modal-body'
  },

  events: {
    'click .x-mark-as-failed': '_markAsFailed'
  },

  onShow() {
    this.bodyRegion.show(new HistoryDetailsView({ model: this.model }));
  },

  _markAsFailed() {
    var url = '/history/failed';
    var data = {
      id: this.model.get('id')
    };

    $.ajax({
      url,
      type: 'POST',
      data
    });

    vent.trigger(vent.Commands.CloseFullscreenModal);
  }
});
