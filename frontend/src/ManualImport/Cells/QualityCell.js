var vent = require('vent');
var QualityCell = require('Cells/QualityCell');
var SelectQualityLayout = require('../Quality/SelectQualityLayout');

module.exports = QualityCell.extend({
  className: 'quality-cell editable',

  events: {
    'click': '_onClick'
  },

  _onClick() {
    var view = new SelectQualityLayout();

    this.listenTo(view, 'manualimport:selected:quality', this._setQuality);

    vent.trigger(vent.Commands.OpenModal, view);
  },

  _setQuality(e) {
    this.model.set('quality', e.quality);
  }
});
