var vent = require('vent');
var Marionette = require('marionette');
var DeleteView = require('../Delete/IndexerDeleteView');
var AsModelBoundView = require('Mixins/AsModelBoundView');
var AsValidatedView = require('Mixins/AsValidatedView');
var AsEditModalView = require('Mixins/AsEditModalView');
require('../../../Form/FormBuilder');
require('Mixins/AutoComplete');
require('bootstrap');

var view = Marionette.ItemView.extend({
  template: 'Settings/Indexer/Edit/IndexerEditView',

  events: {
    'click .x-back': '_back'
  },

  _deleteView: DeleteView,

  initialize(options) {
    this.targetCollection = options.targetCollection;
  },

  _onAfterSave() {
    this.targetCollection.add(this.model, { merge: true });
    vent.trigger(vent.Commands.CloseFullscreenModal);
  },

  _onAfterSaveAndAdd() {
    this.targetCollection.add(this.model, { merge: true });

    require('../Add/IndexerSchemaModal').open(this.targetCollection);
  },

  _back() {
    if (this.model.isNew()) {
      this.model.destroy();
    }

    require('../Add/IndexerSchemaModal').open(this.targetCollection);
  }
});

AsModelBoundView.call(view);
AsValidatedView.call(view);
AsEditModalView.call(view);

module.exports = view;
