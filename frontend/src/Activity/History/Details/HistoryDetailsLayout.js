var $ = require('jquery');
var vent = require('vent');
var Marionette = require('marionette');
var HistoryDetailsView = require('./HistoryDetailsView');
var tpl = require('./HistoryDetailsLayout.hbs');


module.exports = Marionette.Layout.extend({
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
    var url = window.Sonarr.ApiRoot + '/history/failed';
    var data = {
      id: this.model.get('id')
    };

    $.ajax({
      url: url,
      type: 'POST',
      data: data
    });

    vent.trigger(vent.Commands.CloseFullscreenModal);
  }
});
