var vent = require('vent');
var _ = require('underscore');
var Marionette = require('marionette');
var DeleteView = require('../Delete/NotificationDeleteView');
var AsModelBoundView = require('Mixins/AsModelBoundView');
var AsValidatedView = require('Mixins/AsValidatedView');
var AsEditModalView = require('Mixins/AsEditModalView');
require('../../../Form/FormBuilder');
require('Mixins/TagInput');
require('Mixins/FileBrowser');
require('bootstrap.tagsinput');

var view = Marionette.ItemView.extend({
  template: 'Settings/Notification/Edit/NotificationEditView',

  ui: {
    onDownloadToggle: '.x-on-download',
    onUpgradeSection: '.x-on-upgrade',
    tags: '.x-tags',
    modalBody: '.x-modal-body',
    formTag: '.x-form-tag',
    path: '.x-path',
    authorizedNotificationButton: '.AuthorizeNotification'
  },

  events: {
    'click .x-back': '_back',
    'change .x-on-download': '_onDownloadChanged',
    'click .AuthorizeNotification': '_onAuthorizeNotification'
  },

  _deleteView: DeleteView,

  initialize(options) {
    this.targetCollection = options.targetCollection;
  },

  onRender() {
    this._onDownloadChanged();

    this.ui.tags.tagInput({
      model: this.model,
      property: 'tags'
    });

    this.ui.formTag.tagsinput({
      trimValue: true,
      tagClass: 'label label-default'
    });
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

    require('../Add/NotificationSchemaModal').open(this.targetCollection);
  },

  _back() {
    if (this.model.isNew()) {
      this.model.destroy();
    }

    require('../Add/NotificationSchemaModal').open(this.targetCollection);
  },

  _onDownloadChanged() {
    var checked = this.ui.onDownloadToggle.prop('checked');

    if (checked) {
      this.ui.onUpgradeSection.show();
    } else {
      this.ui.onUpgradeSection.hide();
    }
  },

  _onAuthorizeNotification() {
    this.ui.indicator.show();

    var fields = this.model.get('fields');
    var consumerKeyObj = _.findWhere(fields, { name: 'ConsumerKey' });
    var consumerSecretObj = _.findWhere(fields, { name: 'ConsumerSecret' });
    var callbackUrl = window.location.origin + '/oauth.html';
    
    var queryParams = {
      callbackUrl: callbackUrl,
      consumerKey: (consumerKeyObj ? consumerKeyObj.value : ''),
      consumerSecret: (consumerSecretObj ? consumerSecretObj.value : '')
    };

    var promise = this.model.connectData(this.ui.authorizedNotificationButton.data('value'), queryParams);

    promise.always(() => {
      this.ui.indicator.hide();
    });
  }
});

AsModelBoundView.call(view);
AsValidatedView.call(view);
AsEditModalView.call(view);

module.exports = view;