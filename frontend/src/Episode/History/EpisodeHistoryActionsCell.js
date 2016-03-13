var $ = require('jquery');
var NzbDroneCell = require('Cells/NzbDroneCell');

module.exports = NzbDroneCell.extend({
  className: 'episode-actions-cell',

  events: {
    'click .x-failed': '_markAsFailed'
  },

  render() {
    this.$el.empty();

    if (this.model.get('eventType') === 'grabbed') {
      this.$el.html('<i class="icon-sonarr-delete x-failed" title="Mark download as failed"></i>');
    }

    return this;
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
  }
});
