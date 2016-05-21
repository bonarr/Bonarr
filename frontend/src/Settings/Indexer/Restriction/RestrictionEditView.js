var _ = require('underscore');
var vent = require('vent');
var Marionette = require('marionette');
var DeleteView = require('./RestrictionDeleteView');
var CommandController = require('Commands/CommandController');
var AsModelBoundView = require('Mixins/AsModelBoundView');
var AsValidatedView = require('Mixins/AsValidatedView');
var AsEditModalView = require('Mixins/AsEditModalView');
require('Mixins/TagInput');
require('bootstrap');
require('bootstrap.tagsinput');

var view = Marionette.ItemView.extend({
  template: 'Settings/Indexer/Restriction/RestrictionEditView',

  ui: {
    required: '.x-required',
    ignored: '.x-ignored',
    tags: '.x-tags'
  },

  _deleteView: DeleteView,

  initialize(options) {
    this.targetCollection = options.targetCollection;
  },

  onRender() {
    this.ui.required.tagsinput({
      trimValue: true,
      tagClass: 'label label-success'
    });

    this.ui.ignored.tagsinput({
      trimValue: true,
      tagClass: 'label label-danger'
    });

    this.ui.tags.tagInput({
      model: this.model,
      property: 'tags'
    });
  },

  _onAfterSave() {
    this.targetCollection.add(this.model, { merge: true });
    vent.trigger(vent.Commands.CloseFullscreenModal);
  }
});

AsModelBoundView.call(view);
AsValidatedView.call(view);
AsEditModalView.call(view);
module.exports = view;
