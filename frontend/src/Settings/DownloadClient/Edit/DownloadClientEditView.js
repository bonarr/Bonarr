var vent = require('vent');
var Marionette = require('marionette');
var DeleteView = require('../Delete/DownloadClientDeleteView');
var AsModelBoundView = require('Mixins/AsModelBoundView');
var AsValidatedView = require('Mixins/AsValidatedView');
var AsEditModalView = require('Mixins/AsEditModalView');
require('../../../Form/FormBuilder');
require('Mixins/FileBrowser');
require('bootstrap');

var view = Marionette.ItemView.extend({
  template: 'Settings/DownloadClient/Edit/DownloadClientEditView',

  ui: {
    path: '.x-path',
    modalBody: '.fullscreen-modal-body'
  },

  events: {
    'click .x-back': '_back'
  },

  _deleteView: DeleteView,

  initialize(options) {
    this.targetCollection = options.targetCollection;
  },

  onShow() {
    if (this.ui.path.length > 0) {
      this.ui.modalBody.addClass('modal-overflow');
    }

    this.ui.path.fileBrowser();
  },

  _onAfterSave() {
    this.targetCollection.add(this.model, { merge: true });
    vent.trigger(vent.Commands.CloseFullscreenModal);
  },

  _onAfterSaveAndAdd() {
    this.targetCollection.add(this.model, { merge: true });

    require('../Add/DownloadClientSchemaModal').open(this.targetCollection);
  },
  _back() {
    require('../Add/DownloadClientSchemaModal').open(this.targetCollection);
  }
});

AsModelBoundView.call(view);
AsValidatedView.call(view);
AsEditModalView.call(view);

module.exports = view;