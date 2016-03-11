var _ = require('underscore');
var $ = require('jquery');
var vent = require('vent');
var Marionette = require('marionette');
var EditView = require('../Edit/IndexerEditView');

module.exports = Marionette.ItemView.extend({
  template: 'Settings/Indexer/Add/IndexerAddItemViewTemplate',
  tagName: 'li',
  className: 'add-thingy-item',

  events: {
    'click .x-preset': '_addPreset',
    'click': '_add'
  },

  initialize(options) {
    this.targetCollection = options.targetCollection;
  },

  _addPreset(e) {
    var presetName = $(e.target).closest('.x-preset').attr('data-id');
    var presetData = _.where(this.model.get('presets'), { name: presetName })[0];

    this.model.set(presetData);

    this._openEdit();
  },

  _add(e) {
    if ($(e.target).closest('.btn,.btn-group').length !== 0 && $(e.target).closest('.x-custom').length === 0) {
      return;
    }

    this._openEdit();
  },

  _openEdit() {
    this.model.set({
      id: undefined,
      enableRss: this.model.get('supportsRss'),
      enableSearch: this.model.get('supportsSearch')
    });

    var editView = new EditView({
      model: this.model,
      targetCollection: this.targetCollection
    });

    vent.trigger(vent.Commands.OpenFullscreenModal, editView);
  }
});
